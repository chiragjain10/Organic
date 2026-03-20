import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../components/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../components/useAuth";
import { useShopData } from "../components/ShopDataProvider";
import { Star, ShieldCheck, BadgeCheck, Heart, ShoppingBag, ArrowLeft, Share2, Info, Leaf, FlaskConical, Wheat } from 'lucide-react';
import SEO from "../components/SEO";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const shop = useShopData();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const toggleCart = async () => {
    if (!product) return;
    try {
      if (shop?.isInCart(product.id)) {
        await shop.removeFromCart(product.id);
        alert("Removed from cart");
      } else {
        await shop.addToCart({ ...product, quantity });
        alert("Added to cart!");
      }
    } catch (error) {
      console.error("Cart action failed", error);
    }
  };

  const toggleWishlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!product) return;
    try {
      if (shop?.isInWishlist(product.id)) {
        await shop.removeFromWishlist(product.id);
        alert("Removed from wishlist");
      } else {
        await shop.addToWishlist(product);
        alert("Added to wishlist");
      }
    } catch (error) {
      console.error("Wishlist action failed", error);
    }
  };

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const buyNow = async () => {
    if (!product) return;
    const ok = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!ok) return;
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!key) {
      alert("Razorpay key missing");
      return;
    }
    const amount = Number(product.price || 0) * Number(quantity || 1);
    const options = {
      key,
      amount: Math.round(amount * 100),
      currency: "INR",
      name: "Leaf Burst",
      description: "Buy Now",
      handler: function () {
        alert("Payment successful");
        navigate("/account");
      },
      prefill: {},
      theme: { color: "#1E3D2B" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#C6A664]/20 border-t-[#C6A664] rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4A4A4A]/40">Gathering ingredients...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center gap-6">
        <p className="text-xl font-black text-[#4A4A4A]">Product disappeared into thin air.</p>
        <button onClick={() => navigate('/')} className="px-8 py-3 rounded-2xl bg-[#4A4A4A] text-white font-black text-xs uppercase tracking-widest hover:bg-[#C6A664] transition-colors">
          Return to Shop
        </button>
      </div>
    );
  }

  // build an array of available pictures and make sure the currently selected
  // front image (`product.image`) is at the beginning so the gallery opens on it.
  let images = [];
  if (Array.isArray(product?.images) && product.images.length > 0) {
    images = [...product.images];
    if (product.image) {
      const idx = images.indexOf(product.image);
      if (idx > 0) {
        images.splice(idx, 1);
        images.unshift(product.image);
      }
    }
  } else if (product?.image) {
    images = [product.image];
  }
  images = images.filter(Boolean);

  const mainImage = images[activeImage] || images[0] || "";

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-20">
      {product && (
        <SEO
          title={`${product.title || product.name} | Leaf Burst`}
          description={`${product.title || product.name} – Organic ${product.category || "Product"} by Leaf Burst. Explore clean, lab-tested wellness.`}
          canonical={typeof window !== 'undefined' ? window.location.href : undefined}
          image={mainImage}
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.title || product.name,
            "image": images,
            "brand": {
              "@type": "Brand",
              "name": "Leaf Burst"
            },
            "offers": product.price ? {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": String(product.price),
              "availability": "https://schema.org/InStock",
              "url": typeof window !== 'undefined' ? window.location.href : "https://example.com/product"
            } : undefined
          }}
        />
      )}
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        {/* Breadcrumbs & Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#6B4F3F] hover:text-[#2F6F4E] transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-[#6E8B3D]/20 flex items-center justify-center group-hover:border-[#2F6F4E]/20 transition-all">
              <ArrowLeft size={14} />
            </div>
            Back to Catalog
          </button>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-[#6E8B3D]/20 flex items-center justify-center text-[#6B4F3F] hover:text-[#2F6F4E] hover:border-[#2F6F4E]/20 transition-all">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left: Visuals */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] bg-[#F7F6F2] rounded-[48px] overflow-hidden border border-[#6E8B3D]/20 group">
              <img
                src={mainImage}
                alt={product.title || product.name}
                className="w-full h-full object-contain p-12 transform transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute top-8 left-8">
                <span className="px-4 py-2 rounded-2xl bg-[#F7F6F2]/90 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] text-[#1E3D2B] shadow-sm border border-[#6E8B3D]/20">
                  {product.category || 'Organic Superfood'}
                </span>
              </div>
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((src, i) => (
                  <button
                    type="button"
                    key={`${src}-${i}`}
                    onClick={() => setActiveImage(i)}
                    className={`relative rounded-2xl overflow-hidden border transition-all ${
                      i === activeImage
                        ? "border-[#2F6F4E] ring-2 ring-[#2F6F4E]/30"
                        : "border-[#6E8B3D]/20 hover:border-[#2F6F4E]/30"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`thumbnail-${i + 1}`}
                      className="w-full h-20 object-cover bg-[#F7F6F2]"
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <ShieldCheck size={20} />, text: '100% Natural' },
                { icon: <FlaskConical size={20} />, text: 'Lab Tested' },
                { icon: <BadgeCheck size={20} />, text: 'GMP Certified' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-[32px] bg-[#F7F6F2] border border-[#6E8B3D]/20 space-y-3 shadow-sm hover:border-[#2F6F4E]/20 transition-all">
                  <div className="text-[#2F6F4E]">{item.icon}</div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#6B4F3F] leading-tight">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < 4 ? "#2F6F4E" : "none"} className={i < 4 ? "text-[#2F6F4E]" : "text-[#6B4F3F]/20"} />
                  ))}
                </div>
                <span className="text-[10px] font-black text-[#6B4F3F] uppercase tracking-widest">(124 Reviews)</span>
              </div>
              
              <h1 className="h-serif text-5xl md:text-7xl font-black text-[#1E3D2B] leading-[0.9] tracking-tighter">
                {product.title || product.name}
              </h1>
              
              <div className="flex items-center gap-6">
                <span className="text-4xl font-black text-[#2F6F4E]">
                  ₹{product.price}.00
                </span>
                {(product.mrp || product.original_price) && (Number(product.mrp || product.original_price) > Number(product.price || 0)) && (
                  <span className="text-xl font-bold text-[#6B4F3F]/40 line-through">
                    ₹{Number(product.mrp || product.original_price)}.00
                  </span>
                )}
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${Number(product.stock || 0) > 0 ? 'bg-[#2F6F4E]/10 text-[#2F6F4E]' : 'bg-red-100 text-red-600'}`}>
                  {Number(product.stock || 0) > 0 ? 'Available' : 'Out of Stock'}
                </div>
              </div>
              <p className="text-sm text-[#6B4F3F] font-medium">Pure Organic Superfood</p>
            </div>

            {/* Selection Controls */}
            <div className="space-y-6 pt-6 border-t border-[#E6CCB2]/20">
              <div className="flex items-center gap-8">
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#6B4F3F]">Quantity</p>
                  <div className="flex items-center bg-[#F7F6F2] rounded-2xl p-1 border border-[#6E8B3D]/20">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center font-black text-[#1E3D2B] hover:text-[#2F6F4E] transition-colors"
                    >-</button>
                    <span className="w-12 text-center font-black text-[#1E3D2B]">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center font-black text-[#1E3D2B] hover:text-[#2F6F4E] transition-colors"
                    >+</button>
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#6B4F3F]">Weight</p>
                  <div className="flex gap-2">
                    <span className="px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-[#F7F6F2] text-[#1E3D2B] border border-[#6E8B3D]/20">
                      {product.weight || product.net_quantity || '—'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={toggleCart}
                  className="flex-1 h-16 rounded-[24px] bg-[#6E8B3D] text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#6E8B3D]/20 hover:bg-[#1E3D2B] transition-all transform active:scale-95 flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={18} />
                  {shop?.isInCart(product.id) ? "Remove from Cart" : "Add to Shopping Bag"}
                </button>
                <button
                  onClick={toggleWishlist}
                  className="w-16 h-16 rounded-[24px] bg-[#F7F6F2] border-2 border-[#6E8B3D]/20 flex items-center justify-center text-[#1E3D2B] hover:text-[#2F6F4E] hover:border-[#2F6F4E]/20 transition-all"
                >
                  <Heart size={20} />
                </button>
              </div>
              <div className="flex gap-4 pt-2">
                <button onClick={buyNow} className="flex-1 h-12 rounded-[24px] bg-[#1E3D2B] text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-[#6E8B3D] transition-all">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Info Tabs */}
            <div className="space-y-6 pt-10 border-t border-[#E6CCB2]/20">
              <div className="flex gap-8 border-b border-[#E6CCB2]/20 pb-4">
                {['description', 'ingredients', 'usage'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all relative ${activeTab === tab ? 'text-[#4A4A4A]' : 'text-[#4A4A4A]/30 hover:text-[#4A4A4A]/60'}`}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute -bottom-[17px] left-0 right-0 h-1 bg-[#C6A664] rounded-full" />}
                  </button>
                ))}
              </div>
              
              <div className="min-h-[120px] animate-fadeIn">
                {activeTab === 'description' && (
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-[#6B4F3F] font-medium">
                      {product.description || "Pure organic superfood powder crafted to support daily wellness and natural vitality."}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-[#1E3D2B]"><Leaf size={16} /><span className="text-sm font-medium">Supports Immunity</span></div>
                      <div className="flex items-center gap-2 text-[#1E3D2B]"><Wheat size={16} /><span className="text-sm font-medium">Rich in Antioxidants</span></div>
                      <div className="flex items-center gap-2 text-[#1E3D2B]"><FlaskConical size={16} /><span className="text-sm font-medium">Lab Tested Quality</span></div>
                      <div className="flex items-center gap-2 text-[#1E3D2B]"><BadgeCheck size={16} /><span className="text-sm font-medium">GMP Certified</span></div>
                    </div>
                  </div>
                )}
                {activeTab === 'ingredients' && (
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#2F6F4E]">Ingredients</p>
                    <p className="text-sm leading-relaxed text-[#6B4F3F] font-medium">
                      {product.ingredients || "100% natural powder from farm-sourced ingredients. No preservatives, no artificial colors."}
                    </p>
                  </div>
                )}
                {activeTab === 'usage' && (
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#2F6F4E]">How to Use</p>
                    <p className="text-sm leading-relaxed text-[#6B4F3F] font-medium">
                      {product.how_to_use || "Mix 1–2 teaspoons with warm water, smoothies, or juice. Consume daily for best results."}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#2F6F4E]">Storage</p>
                    <p className="text-sm leading-relaxed text-[#6B4F3F] font-medium">
                      Store in a cool, dry place. Keep the container tightly sealed. Avoid direct sunlight.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="p-6 rounded-[32px] bg-[#F7F6F2] border border-[#6E8B3D]/20 flex gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F7F6F2] border border-[#6E8B3D]/20 flex items-center justify-center text-[#2F6F4E] flex-shrink-0 shadow-sm">
                <Info size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B]">Wellness Tip</p>
                <p className="text-xs text-[#6B4F3F] font-medium leading-relaxed">Add to smoothies with honey and lemon for a refreshing daily boost.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
