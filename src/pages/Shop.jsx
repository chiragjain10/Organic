import React, { useState, useEffect } from 'react';
import { db } from '../components/Firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Search, SlidersHorizontal, Heart, Eye, Plus, Sparkles, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import QuickView from '../components/QuickView';
import SEO from '../components/SEO';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', 'Powders', 'Superfoods', 'Blends', 'Kits'];
  
  const filteredProducts = products.filter(p => {
    const title = (p.title || p.name || '').toLowerCase();
    const brand = (p.brand || '').toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchesSearch = title.includes(term) || brand.includes(term);
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <SEO
        title="Shop | Leaf Burst Organic Formulations"
        description="Browse organic powders, superfoods, and herbal blends. Clean, lab-tested, and crafted for real bioavailability."
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/shop` : undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Leaf Burst Shop",
          "url": typeof window !== 'undefined' ? `${window.location.origin}/shop` : "https://example.com/shop"
        }}
      />
      <AnimatePresence>
        {selectedProduct && (
          <QuickView 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1300px] mx-auto">
        
        {/* --- DYNAMIC HEADER POD --- */}
        <div className="bg-white rounded-[3.5rem] p-10 md:p-20 shadow-sm border border-[#1E3D2B]/5 relative overflow-hidden mb-8">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles size={18} className="text-[#6E8B3D]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6E8B3D]">Botanical Dispensary</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-light text-[#1E3D2B] leading-[0.8] tracking-tighter">
                The <br />
                <span className="font-black italic text-[#6E8B3D]">Formulations.</span>
              </h1>
            </div>
            
            <div className="flex flex-col items-start md:items-end">
              <p className="text-4xl font-light text-[#1E3D2B]/20 tracking-tighter mb-2">
                {String(filteredProducts.length).padStart(2, '0')}
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6B4F3F]">Available Blends</p>
            </div>
          </div>
        </div>

        {/* --- CURATOR'S CONTROL PANEL --- */}
        <div className="grid lg:grid-cols-12 gap-6 mb-16">
          {/* Search Pod */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
              <Search size={18} className="text-[#1E3D2B]/30 group-focus-within:text-[#6E8B3D] transition-colors" />
            </div>
            <input 
              type="text"
              placeholder="Search by ingredient or benefit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#1E3D2B]/5 rounded-full py-6 pl-16 pr-8 text-sm font-bold text-[#1E3D2B] outline-none focus:ring-4 focus:ring-[#6E8B3D]/5 transition-all shadow-sm"
            />
          </div>

          {/* Category Filter Pod */}
          <div className="lg:col-span-7 bg-white rounded-full border border-[#1E3D2B]/5 p-2 flex items-center shadow-sm overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                  selectedCategory === cat 
                  ? 'bg-[#1E3D2B] text-white shadow-lg shadow-[#1E3D2B]/20' 
                  : 'bg-transparent text-[#1E3D2B]/40 hover:text-[#1E3D2B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- THE APOTHECARY GALLERY --- */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-[3rem] bg-white animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group cursor-pointer"
                >
                  {/* Image Podium */}
                  <div className="relative aspect-[4/5] bg-white rounded-[3rem] p-8 border border-[#1E3D2B]/5 overflow-hidden mb-6 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-[#1E3D2B]/5 group-hover:-translate-y-2">
                    <img 
                      src={product.image || product.images?.[0]} 
                      alt={product.title || product.name}
                      className="w-full h-full object-contain transform transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    />
                    
                    {/* Glassmorphic Overlay Actions */}
                    <div className="absolute inset-x-0 bottom-6 px-6 flex justify-center gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                        className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1E3D2B] hover:bg-[#1E3D2B] hover:text-white transition-all shadow-sm"
                      >
                        <Eye size={18} strokeWidth={1.5} />
                      </button>
                      <button className="flex-1 bg-white/80 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#1E3D2B] hover:bg-[#6E8B3D] hover:text-white transition-all shadow-sm">
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="px-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6E8B3D]">
                        {product.category}
                      </span>
                      <div className="h-[1px] flex-1 mx-4 bg-[#1E3D2B]/5" />
                      <span className="text-[10px] font-bold text-[#1E3D2B]">★ {product.rating || '4.9'}</span>
                    </div>
                    
                    <h3 className="text-2xl font-light text-[#1E3D2B] tracking-tighter leading-none">
                      {(() => {
                        const t = (product.title || product.name || '').trim();
                        const parts = t.split(' ');
                        const first = parts[0] || '';
                        const rest = parts.slice(1).join(' ');
                        return (
                          <>
                            {first} {rest ? <span className="font-black italic">{rest}</span> : null}
                          </>
                        );
                      })()}
                    </h3>

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xl font-black text-[#1E3D2B]">₹{product.price}</p>
                      <div className="flex items-center gap-2 group/link">
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">View Details</span>
                        <div className="w-8 h-8 rounded-full border border-[#1E3D2B]/10 flex items-center justify-center group-hover:bg-[#1E3D2B] group-hover:text-white transition-all">
                          <Plus size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* --- EMPTY STATE POD --- */}
        {!loading && filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 bg-white rounded-[3.5rem] border border-dashed border-[#1E3D2B]/10 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-[#F7F6F2] rounded-full flex items-center justify-center mx-auto">
              <X size={30} className="text-[#1E3D2B]/20" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-light text-[#1E3D2B]">No formulations match <span className="italic font-black">"{searchTerm}"</span></h3>
              <p className="text-sm text-[#6B4F3F] opacity-60">Try exploring our core categories or reset your search.</p>
            </div>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6E8B3D] border-b border-[#6E8B3D] pb-1"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Shop;
