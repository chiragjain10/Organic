import React from 'react';
import { ArrowRight, Sparkles, Leaf, ShieldCheck, Star, Sun } from 'lucide-react';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-20 pb-12 md:pt-24 md:pb-20 px-4 md:px-10 bg-[#F7F6F2] overflow-hidden ">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E5E3DB]/40 -skew-x-12 translate-x-20 z-0" />

      <div className="max-w-[1300px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">

          {/* --- LEFT: Content Block (Col 1-7) --- */}
          <div className="lg:col-span-7 space-y-10 lg:pr-12">

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-[#1E3D2B]/5 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#6E8B3D] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1E3D2B]/60">
                FRESH BATCH • DIRECT FROM FARMS
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-light tracking-tight leading-[0.9] text-[#1E3D2B]">
                Nature’s <br />
                <span className="relative">
                  <span className="font-serif italic font-normal text-[#6E8B3D]">Purest</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#6E8B3D]/20" viewBox="0 0 300 12" fill="none">
                    <path d="M1 11C50 3 150 3 299 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <br /> Form, Perfected.
              </h1>

              <p className="max-w-md text-lg text-[#6B4F3F] leading-relaxed font-medium opacity-90">
                From fresh mandi-sourced ingredients to carefully solar-dried perfection, 
                we craft 100% chemical-free superfoods that your body truly recognizes.
                <span className="text-[#1E3D2B] font-bold block mt-2"> Clean. Potent. Honest.</span>
              </p>
            </div>

           <div className="flex flex-col sm:flex-row gap-5">
  <Link to="/shop" className="w-full sm:w-[260px]">
    <button className="w-full h-[60px] flex items-center justify-center gap-2 group relative rounded-full bg-[#1E3D2B] text-[#F7F6F2] font-bold text-xs uppercase tracking-[0.2em] overflow-hidden transition-all active:scale-95 shadow-2xl shadow-[#1E3D2B]/20">
      
      <span>Shop Pure Products</span>

      <ArrowRight
        className="opacity-0 group-hover:opacity-100 transition-all duration-300"
        size={18}
      />
    </button>
  </Link>

  <Link to="/process" className="w-full sm:w-[260px]">
    <button className="w-full h-[60px] flex items-center justify-center rounded-full border border-[#1E3D2B]/20 text-[#1E3D2B] font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-sm">
      Our Process
    </button>
  </Link>
</div>

            {/* Trust Line */}
            <div className="flex flex-wrap gap-10 pt-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#6E8B3D] text-[#6E8B3D]" />
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-tighter text-[#1E3D2B]">
                  Trusted by 2,000+ conscious customers
                </p>
              </div>

              <div className="h-10 w-px bg-[#1E3D2B]/10 hidden sm:block" />

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#6E8B3D]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3D2B]/50">100% Natural & Chemical-Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun size={20} className="text-[#6E8B3D]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3D2B]/50">Solar Dried Nutrition</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Visual Presentation (Col 8-12) --- */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(30,61,43,0.15)] group">
              <img
                src="img/hero .jpeg"
                alt="Organic Superfood"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3D2B]/40 to-transparent opacity-60" />

              {/* Overlay Label */}
              <div className="absolute top-8 left-8 p-6 backdrop-blur-md bg-white/80 rounded-2xl border border-white/20 shadow-xl">
                <Leaf className="text-[#6E8B3D] mb-2" size={24} />
                <p className="text-[#1E3D2B] font-black text-[10px] uppercase tracking-widest">Purity Guarantee</p>
                <p className="text-[#1E3D2B] font-serif text-2xl italic leading-none">100% Natural • No Chemicals</p>
              </div>
            </div>

            {/* Floating Price Tag */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 rounded-3xl shadow-2xl border border-[#1E3D2B]/5 flex flex-col items-center gap-1 group cursor-pointer hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-full bg-[#6E8B3D] flex items-center justify-center text-white mb-2 shadow-lg shadow-[#6E8B3D]/30">
                <ArrowRight size={20} />
              </div>
              <p className="text-[9px] font-black uppercase text-[#1E3D2B]/40 tracking-[0.2em]">Add to Cart</p>
              <p className="text-xl font-bold text-[#1E3D2B]">₹199/-</p>
            </div>

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#6E8B3D]/10 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>

      {/* Modern Scroll Component */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#1E3D2B]/30 rotate-90 mb-8">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#1E3D2B]/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;