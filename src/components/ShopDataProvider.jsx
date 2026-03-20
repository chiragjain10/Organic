import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "./Firebase";
import { collection, onSnapshot, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";

const ShopDataContext = createContext(null);

const LOCAL_CART_KEY = "leaf_burst_local_cart";

export default function ShopDataProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Load guest cart from localStorage on mount
  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem(LOCAL_CART_KEY);
      if (saved) {
        try {
          setCartItems(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse local cart", e);
        }
      }
      setLoading(false);
    }
  }, [user]);

  // Sync Guest Cart to LocalStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // Sync with Firestore when user is logged in
  useEffect(() => {
    if (!user) return;

    const cartRef = collection(db, "users", user.uid, "cart");
    const wishRef = collection(db, "users", user.uid, "wishlist");

    const unsubCart = onSnapshot(cartRef, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setCartItems(items);
      setLoading(false);
    });

    const unsubWish = onSnapshot(wishRef, (snap) => {
      const ids = new Set(snap.docs.map((d) => d.id));
      setWishlistIds(ids);
    });

    // Merge logic: Move local cart items to Firestore once on login
    const mergeLocalCart = async () => {
      const saved = localStorage.getItem(LOCAL_CART_KEY);
      if (saved) {
        try {
          const localItems = JSON.parse(saved);
          if (localItems.length > 0) {
            const batch = writeBatch(db);
            localItems.forEach((item) => {
              const itemRef = doc(db, "users", user.uid, "cart", item.id);
              batch.set(itemRef, { ...item, addedAt: new Date().toISOString() }, { merge: true });
            });
            await batch.commit();
            localStorage.removeItem(LOCAL_CART_KEY);
          }
        } catch (e) {
          console.error("Merge failed", e);
        }
      }
    };

    mergeLocalCart();

    return () => {
      unsubCart();
      unsubWish();
    };
  }, [user]);

  const value = useMemo(
    () => ({
      cartItems,
      cartCount: cartItems.length,
      wishlistCount: wishlistIds.size,
      isInCart: (id) => cartItems.some((item) => item.id === id),
      isInWishlist: (id) => wishlistIds.has(id),
      addToCart: async (product) => {
        const item = {
          id: product.id,
          title: product.title || product.name,
          name: product.title || product.name,
          price: product.price,
          image: product.image || product.images?.[0] || "",
          category: product.category || "",
        };

        if (user) {
          const ref = doc(db, "users", user.uid, "cart", product.id);
          await setDoc(ref, { ...item, addedAt: new Date().toISOString() });
        } else {
          setCartItems((prev) => [...prev.filter((i) => i.id !== product.id), item]);
        }
      },
      removeFromCart: async (id) => {
        if (user) {
          const ref = doc(db, "users", user.uid, "cart", id);
          await deleteDoc(ref);
        } else {
          setCartItems((prev) => prev.filter((item) => item.id !== id));
        }
      },
      addToWishlist: async (product) => {
        if (!user) return; // Wishlist remains logged-in only for now
        const ref = doc(db, "users", user.uid, "wishlist", product.id);
        await setDoc(ref, {
          id: product.id,
          title: product.title || product.name,
          price: product.price,
          image: product.image || product.images?.[0] || "",
        });
      },
      removeFromWishlist: async (id) => {
        if (!user) return;
        const ref = doc(db, "users", user.uid, "wishlist", id);
        await deleteDoc(ref);
      }
    }),
    [cartItems, wishlistIds, user]
  );

  return <ShopDataContext.Provider value={value}>{children}</ShopDataContext.Provider>;
}

export const useShopData = () => useContext(ShopDataContext);

