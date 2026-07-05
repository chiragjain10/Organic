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
  { id: 'All', label: 'All' },
  { id: 'Powders', label: 'Powders' },
  { id: 'Superfoods', label: 'Superfoods' },
  { id: 'Blends', label: 'Blends' },
  { id: 'Kits', label: 'Kits' }
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative bg-white rounded-[2rem] p-4 border border-[#1E3D2B]/8 hover:border-[#6E8B3D]/30 transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#1E3D2B]/3"
    >
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="relative aspect-square bg-[#F7F6F2] rounded-2xl overflow-hidden mb-4 flex items-center justify-center">
        <img 
          src={product.image || product.images?.[0]} 
          loading="lazy"
          className="w-[80%] h-[80%] object-contain mix-blend-multiply transform transition-all duration-700 group-hover:scale-105 group-hover:-rotate-2"
        />
        
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1 bg-white/40 backdrop-blur-md rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
           <button 
             onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
             className="w-8 h-8 rounded-full bg-white text-[#1E3D2B] flex items-center justify-center hover:bg-[#1E3D2B] hover:text-white transition-all shadow-sm"
           >
             <Eye size={13} strokeWidth={1.5} />
           </button>
           <button 
             onClick={toggleWishlist}
             className="w-8 h-8 rounded-full bg-white text-[#1E3D2B] flex items-center justify-center hover:bg-[#6E8B3D] hover:text-white transition-all shadow-sm"
           >
             <Heart size={13} strokeWidth={1.5} fill={shop?.isInWishlist(product.id) ? "currentColor" : "none"} />
           </button>
        </div>

        {product.isNew && (
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#1E3D2B] rounded-full">
                <p className="text-[7px] font-bold uppercase tracking-wider text-[#F7F6F2]">New</p>
            </div>
        )}
      </div>

      <div className="space-y-2.5 px-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-[1px] bg-[#6E8B3D]/30" />
            <span className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#6E8B3D]">
              {product.category || 'Pure Organic'}
            </span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#F7F6F2]">
            <Star size={7} fill="#6E8B3D" className="text-[#6E8B3D]" /> 
            <span className="text-[9px] font-bold text-[#1E3D2B]">{product.rating || '4.9'}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-light text-[#1E3D2B] leading-tight tracking-tight">
            {(() => {
              const t = (product.title || product.name || '').trim();
              const parts = t.split(' ');
              const first = parts[0] || '';
              return first;
            })()}
            {(() => {
              const t = (product.title || product.name || '').trim();
              const rest = t.split(' ').slice(1).join(' ');
              return rest ? <span className="font-bold italic ml-1">{rest}</span> : null;
            })()}
          </h3>
          <p className="text-[9px] text-[#6B4F3F]/60 font-medium">Lab-Tested • Preservative Free</p>
        </div>

        <div className="flex items-end justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold uppercase tracking-widest text-[#1E3D2B]/30">Price</span>
            <span className="text-xl font-extrabold text-[#1E3D2B]">₹{product.price}</span>
          </div>
          
          <button 
            disabled={loadingType === 'cart'}
            onClick={toggleCart}
            className="relative flex items-center justify-center w-11 h-11 bg-[#1E3D2B] text-white rounded-xl hover:bg-[#6E8B3D] transition-all duration-300 group/btn"
          >
            {loadingType === 'cart' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <div className="relative">
                {shop?.isInCart(product.id) ? <span className="text-[10px] font-extrabold">–</span> : <Plus size={18} className="group-hover/btn:rotate-180 transition-transform duration-300" />}
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
    <section className="py-12 md:py-20 bg-[#F7F6F2] px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Pod */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-14 gap-6 border-b border-[#1E3D2B]/5 pb-6">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <Sparkles size={14} className="text-[#6E8B3D]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#6E8B3D]">Fresh from Nature</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-[#1E3D2B] leading-[0.95] tracking-tighter">
              Simple Ingredients. <br />
              <span className="font-extrabold italic">Powerful Impact.</span>
            </h2>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
            <div className="flex bg-white rounded-full border border-[#1E3D2B]/5 p-1 items-center shadow-sm overflow-x-auto max-w-full scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat.id 
                    ? 'bg-[#1E3D2B] text-white shadow-md shadow-[#1E3D2B]/10' 
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl italic text-[#1E3D2B]/35">Restocking the harvest...</p>
          </div>
        )}

        {/* Footer Action */}
        <div className="mt-8 md:mt-16 flex flex-col items-center gap-4">
          <div className="h-12 w-[1px] bg-gradient-to-b from-[#1E3D2B]/20 to-transparent" />
          <Link 
            to="/shop" 
            className="group relative px-10 py-4 overflow-hidden rounded-full border border-[#1E3D2B]/10 transition-all hover:border-[#6E8B3D]"
          >
            <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1E3D2B] group-hover:text-[#6E8B3D]">
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
