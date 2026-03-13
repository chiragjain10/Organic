import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "./Firebase";
import { collection, onSnapshot } from "firebase/firestore";

const ShopDataContext = createContext(null);

export default function ShopDataProvider({ children }) {
  const { user } = useAuth();
  const [cartIds, setCartIds] = useState(new Set());
  const [wishlistIds, setWishlistIds] = useState(new Set());

  useEffect(() => {
    if (!user) {
      setCartIds(new Set());
      setWishlistIds(new Set());
      return;
    }
    const cartRef = collection(db, "users", user.uid, "cart");
    const wishRef = collection(db, "users", user.uid, "wishlist");
    const unsubCart = onSnapshot(cartRef, (snap) => {
      const ids = new Set(snap.docs.map((d) => d.id));
      setCartIds(ids);
    });
    const unsubWish = onSnapshot(wishRef, (snap) => {
      const ids = new Set(snap.docs.map((d) => d.id));
      setWishlistIds(ids);
    });
    return () => {
      unsubCart();
      unsubWish();
    };
  }, [user]);

  const value = useMemo(
    () => ({
      cartCount: cartIds.size,
      wishlistCount: wishlistIds.size,
      isInCart: (id) => cartIds.has(id),
      isInWishlist: (id) => wishlistIds.has(id),
    }),
    [cartIds, wishlistIds]
  );

  return <ShopDataContext.Provider value={value}>{children}</ShopDataContext.Provider>;
}

export const useShopData = () => useContext(ShopDataContext);
