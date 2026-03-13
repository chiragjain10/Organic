import React, { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db } from "./Firebase";
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowLeft, Star } from "lucide-react";

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const snap = await getDocs(collection(db, "users", user.uid, "wishlist"));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(list);
      } catch (error) {
        console.error("Error loading wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const removeItem = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "wishlist", id));
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const moveToCart = async (item) => {
    if (!user) return;
    try {
      // Add to cart
      await addDoc(collection(db, "users", user.uid, "cart"), {
        ...item,
        addedAt: new Date().toISOString()
      });
      // Remove from wishlist
      await removeItem(item.id);
      alert("Moved to cart!");
    } catch (error) {
      console.error("Error moving to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2F6F4E]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center px-6">
        <div className="bg-white p-12 rounded-[40px] border border-[#6E8B3D] shadow-[0_20px_50px_rgba(197,168,128,0.08)] max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#F7F6F2] rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#2F6F4E]/20">
            <Heart size={40} />
          </div>
          <h2 className="h-serif text-2xl font-black text-[#1E3D2B] mb-4 text-center">Your Organic Wishlist</h2>
          <p className="text-[#6B4F3F] font-medium mb-8">
            Sign in to view your curated superfoods and herbal blends.
          </p>
          <Link 
            to="/login" 
            className="block w-full py-4 bg-[#6E8B3D] text-white rounded-2xl font-black hover:bg-[#1E3D2B] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#6E8B3D]/20"
          >
            Sign In to Wishlist
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-20 px-6">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#6B4F3F] hover:text-[#2F6F4E] transition-colors">
              <ArrowLeft size={14} />
              Back to Collection
            </Link>
            <h1 className="h-serif text-5xl md:text-7xl font-black text-[#1E3D2B] tracking-tighter leading-none">
              The <span className="text-[#6E8B3D]">Wishlist</span>
            </h1>
            <p className="text-lg text-[#6B4F3F] font-medium max-w-md">
              Your personal selection of organic powders and herbal blends.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-[#6E8B3D] shadow-sm">
            <div className="w-10 h-10 bg-[#2F6F4E]/10 rounded-xl flex items-center justify-center text-[#2F6F4E]">
              <Heart size={20} fill="currentColor" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#1E3D2B] leading-none">{items.length}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#6B4F3F] mt-1">Saved Items</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <div 
                key={item.id}
                className="group relative bg-white rounded-[40px] p-6 transition-all duration-500 hover:shadow-[0_30px_100px_rgba(197,168,128,0.15)] border border-[#6E8B3D]/50"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-[#F7F6F2] mb-8">
                  <img 
                    src={item.image || item.images?.[0]} 
                    alt={item.title || item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2F6F4E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Quick Actions */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#C6A664]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                  
                  <h3 className="h-serif text-xl font-black text-[#1E3D2B] leading-tight group-hover:text-[#2F6F4E] transition-colors">
                    {item.title || item.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black text-[#1E3D2B]">
                      ₹{Number(item.price || 0).toFixed(2)}
                    </p>
                    <button 
                      onClick={() => moveToCart(item)}
                      className="flex items-center gap-2 bg-[#6E8B3D] text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-[#1E3D2B] transition-all transform active:scale-95 shadow-lg shadow-[#6E8B3D]/20"
                    >
                      <ShoppingCart size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[60px] border border-dashed border-[#6E8B3D] p-20 text-center">
            <div className="w-24 h-24 bg-[#F7F6F2] rounded-full flex items-center justify-center mx-auto mb-8 text-[#2F6F4E]/10">
              <Heart size={48} />
            </div>
            <h3 className="h-serif text-3xl font-black text-[#1E3D2B] mb-4">Your collection is empty</h3>
            <p className="text-[#6B4F3F] font-medium max-w-sm mx-auto mb-12">
              Explore our organic catalog and save your favorites for later.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-3 bg-[#6E8B3D] text-white px-10 py-5 rounded-3xl font-black hover:bg-[#1E3D2B] transition-all shadow-xl shadow-[#6E8B3D]/20"
            >
              Start Exploring
              <ArrowLeft size={20} className="rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
