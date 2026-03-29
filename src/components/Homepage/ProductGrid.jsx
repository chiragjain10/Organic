import React, { useState, useEffect } from 'react';
import { Plus, Heart, Eye, Loader2, Star, Sparkles } from 'lucide-react';
import { db } from '../../components/Firebase';
import { getDocs, collection, query, orderBy, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../components/useAuth';
import { useShopData } from '../../components/ShopDataProvider';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";

// Mapping to keep UI names separate from Database Category IDs
const CATEGORIES = [
  { id: 'All', label: 'All Products' },
  { id: 'Powders', label: 'Plant Powders' },
  { id: 'Superfoods', label: 'Daily Nutrition' },
  { id: 'Blends', label: 'Dry Leaves' }
];

const ProductCard = ({ product, showToast, setSelectedProduct }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const shop = useShopData();
  const [loadingType, setLoadingType] = useState(null);

  const toggleCart = async (e) => {
    e.stopPropagation();
    setLoadingType('cart');
    try {
      const inCart = shop?.isInCart(product.id);
      if (inCart) {
        await shop.removeFromCart(product.id);
        if (showToast) showToast("Removed from cart");
      } else {
        await shop.addToCart(product);
        if (showToast) showToast("Added to cart");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingType(null);
    }
  };

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    setLoadingType('wishlist');
    try {
      const inWish = shop?.isInWishlist(product.id);
      if (inWish) {
        await shop.removeFromWishlist(product.id);
        if (showToast) showToast("Removed from wishlist");
      } else {
        await shop.addToWishlist(product);
        if (showToast) showToast("Added to wishlist");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative bg-white rounded-[3rem] p-5 border border-[#1E3D2B]/5 hover:border-[#6E8B3D]/30 transition-all duration-700 cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#1E3D2B]/5"
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="relative aspect-square bg-[#F7F6F2] rounded-[2.5rem] overflow-hidden mb-6 flex items-center justify-center">
        <img 
          src={product.image || product.images?.[0]} 
          className="w-[85%] h-[85%] object-contain mix-blend-multiply transform transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-3"
        />
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 bg-white/40 backdrop-blur-md rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
           <button 
             onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
             className="w-10 h-10 rounded-full bg-white text-[#1E3D2B] flex items-center justify-center hover:bg-[#1E3D2B] hover:text-white transition-all shadow-sm"
           >
             <Eye size={15} strokeWidth={1.5} />
           </button>
           <button 
             onClick={toggleWishlist}
             className="w-10 h-10 rounded-full bg-white text-[#1E3D2B] flex items-center justify-center hover:bg-[#6E8B3D] hover:text-white transition-all shadow-sm"
           >
             <Heart size={15} strokeWidth={1.5} fill={shop?.isInWishlist(product.id) ? "currentColor" : "none"} />
           </button>
        </div>

        {product.isNew && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#1E3D2B] rounded-full">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#F7F6F2]">New Arrival</p>
            </div>
        )}
      </div>

      <div className="space-y-4 px-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-4 h-[1px] bg-[#6E8B3D]/30" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6E8B3D]">
              {product.category || 'Pure Organic'}
            </span>
          </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F7F6F2]">
          <Star size={8} fill="#6E8B3D" className="text-[#6E8B3D]" /> 
          <span className="text-[10px] font-bold text-[#1E3D2B]">{product.rating || '4.9'}</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-light text-[#1E3D2B] leading-none tracking-tighter mb-1">
            {(() => {
              const t = (product.title || product.name || '').trim();
              const parts = t.split(' ');
              const first = parts[0] || '';
              return first;
            })()}
            {(() => {
              const t = (product.title || product.name || '').trim();
              const rest = t.split(' ').slice(1).join(' ');
              return rest ? <span className="font-black italic ml-1">{rest}</span> : null;
            })()}
          </h3>
          <p className="text-[10px] text-[#6B4F3F]/60 font-medium">Lab-Tested • Preservative Free</p>
        </div>

        <div className="flex items-end justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#1E3D2B]/30">Price</span>
          <span className="text-2xl font-black text-[#1E3D2B]">₹{product.price}</span>
          </div>
          
          <button 
            disabled={loadingType === 'cart'}
            onClick={toggleCart}
            className="relative flex items-center justify-center w-14 h-14 bg-[#1E3D2B] text-white rounded-2xl hover:bg-[#6E8B3D] transition-all duration-500 group/btn"
          >
            {loadingType === 'cart' ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <div className="relative">
                {shop?.isInCart(product.id) ? <span className="text-[10px] font-black">–</span> : <Plus size={24} className="group-hover/btn:rotate-180 transition-transform duration-500" />}
              </div>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const load = async () => {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="py-16 md:py-32 bg-[#F7F6F2] px-6 min-h-screen">
      <div className="max-w-[1300px] mx-auto">
        
        {/* Header Pod */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-10 border-b border-[#1E3D2B]/5 pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-[#6E8B3D]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#6E8B3D]">Fresh from Nature</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-light text-[#1E3D2B] leading-[0.85] tracking-tighter">
              Simple Ingredients. <br />
              <span className="font-black italic">Powerful Impact.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6">
            <div className="flex p-1.5 bg-white rounded-2xl border border-[#1E3D2B]/5 shadow-sm overflow-x-auto max-w-full">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                    activeCategory === cat.id 
                    ? 'bg-[#1E3D2B] text-white shadow-xl' 
                    : 'bg-transparent text-[#1E3D2B]/40 hover:text-[#1E3D2B]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="font-serif text-3xl italic text-[#1E3D2B]/20">Restocking the harvest...</p>
          </div>
        )}

        {/* Footer Action */}
        <div className="mt-0 md:mt-32 flex flex-col items-center gap-6">
          <div className="h-20 w-[1px] bg-gradient-to-b from-[#1E3D2B]/20 to-transparent" />
          <Link 
            to="/shop" 
            className="group relative px-12 py-5 overflow-hidden rounded-full border border-[#1E3D2B]/10 transition-all hover:border-[#6E8B3D]"
          >
            <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em] text-[#1E3D2B] group-hover:text-[#6E8B3D]">
              Explore All Products
            </span>
            <div className="absolute inset-0 bg-[#6E8B3D]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
