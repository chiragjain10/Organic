import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import SEO from "../components/SEO";

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "cart"),
      (snap) => {
        const list = snap.docs.map((d) => ({
          ...d.data(),
          id: d.id,
        }));
        setItems(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading cart:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const removeItem = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "cart", id));
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
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
        <div className="bg-[#F7F6F2] p-12 rounded-[40px] border border-[#6E8B3D]/20 shadow-[0_20px_50px_rgba(197,168,128,0.08)] max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#F7F6F2] border border-[#6E8B3D]/20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#1E3D2B]/20">
            <ShoppingBag size={40} />
          </div>
          <h2 className="h-serif text-2xl font-black text-[#1E3D2B] mb-4 text-center">Your Organic Cart</h2>
          <p className="text-[#6B4F3F] font-medium mb-8">
            Sign in to view your superfood selection and proceed to checkout.
          </p>
          <Link 
            to="/login" 
            className="block w-full py-4 bg-[#6E8B3D] text-white rounded-2xl font-black hover:bg-[#1E3D2B] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#6E8B3D]/20"
          >
            Sign In to Cart
          </Link>
        </div>
      </div>
    );
  }

  const total = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-20 px-6">
      <SEO
        title="Cart | Leaf Burst"
        description="Review items in your Leaf Burst cart and proceed to checkout."
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/cart` : undefined}
        noindex={true}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ShoppingCartPage",
          "name": "Leaf Burst Cart",
          "url": typeof window !== 'undefined' ? `${window.location.origin}/cart` : "https://example.com/cart"
        }}
      />
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Cart Area */}
          <div className="flex-1">
            <div className="mb-12">
              <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#6B4F3F] hover:text-[#2F6F4E] transition-colors mb-8">
                <ArrowLeft size={14} />
                Continue Shopping
              </Link>
              <h1 className="h-serif text-5xl md:text-7xl font-black text-[#1E3D2B] tracking-tighter leading-none mb-4">
                The <span className="text-[#6E8B3D]">Cart</span>
              </h1>
              <p className="text-[#6B4F3F] font-medium">You have {items.length} organic items in your selection.</p>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="group relative bg-[#F7F6F2] rounded-[32px] p-6 flex flex-col sm:flex-row items-center gap-8 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(197,168,128,0.08)] border border-[#6E8B3D]/20"
                >
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-[#F7F6F2] border border-[#6E8B3D]/20 flex-shrink-0">
                    <img src={item.image || item.images?.[0]} alt={item.title || item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="h-serif text-xl font-black text-[#1E3D2B] mb-1">{item.title || item.name}</h3>
                    <p className="text-sm text-[#6B4F3F] font-bold uppercase tracking-widest">Organic Superfood</p>
                    <div className="mt-4 flex items-center justify-center sm:justify-start gap-4">
                      <span className="text-2xl font-black text-[#1E3D2B]">₹{Number(item.price).toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-4 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all transform active:scale-95"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              {items.length === 0 && (
                <div className="bg-[#F7F6F2] rounded-[40px] border border-dashed border-[#6E8B3D]/30 p-20 text-center">
                  <ShoppingBag size={48} className="mx-auto text-[#1E3D2B]/10 mb-6" />
                  <p className="text-[#6B4F3F] font-bold italic">Your cart is currently empty.</p>
                  <Link to="/shop" className="inline-block mt-8 px-10 py-4 bg-[#6E8B3D] text-white rounded-2xl font-black hover:bg-[#1E3D2B] transition-all shadow-lg shadow-[#6E8B3D]/20">
                    Discover Collection
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Summary Sidebar */}
          <aside className="w-full lg:w-[400px] shrink-0">
            <div className="bg-[#F7F6F2] rounded-[40px] border border-[#6E8B3D]/20 shadow-[0_30px_100px_rgba(197,168,128,0.08)] p-8 sticky top-32">
              <h2 className="h-serif text-2xl font-black text-[#1E3D2B] mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[#6B4F3F] font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1E3D2B]">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6B4F3F] font-medium">
                  <span>Shipping</span>
                  <span className="text-[#2F6F4E] font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#6B4F3F] font-medium">
                  <span>Tax</span>
                  <span className="font-bold text-[#1E3D2B]">₹0.00</span>
                </div>
                <div className="pt-4 border-t border-dashed border-[#6E8B3D]/30 flex justify-between items-end">
                  <span className="text-sm font-black text-[#1E3D2B] uppercase tracking-widest">Total Amount</span>
                  <span className="text-4xl font-black text-[#2F6F4E] tracking-tighter">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                disabled={items.length === 0}
                onClick={() => navigate('/checkout')}
                className="w-full py-5 rounded-2xl bg-[#6E8B3D] text-white font-black text-lg hover:bg-[#1E3D2B] transition-all transform active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none shadow-xl shadow-[#6E8B3D]/20 mb-8"
              >
                Complete Checkout
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 gap-4 pt-8 border-t border-[#6E8B3D]/20">
                {[
                  { icon: ShieldCheck, text: "Secure Checkout", sub: "PCI DSS Compliant" },
                  { icon: Truck, text: "Global Delivery", sub: "2-4 Business Days" },
                  { icon: RotateCcw, text: "Easy Returns", sub: "30-Day Guarantee" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F6F2] border border-[#6E8B3D]/20 flex items-center justify-center text-[#1E3D2B]">
                      <badge.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#1E3D2B] leading-none">{badge.text}</p>
                      <p className="text-[10px] font-bold text-[#6B4F3F] uppercase tracking-widest mt-1">{badge.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default Cart;
