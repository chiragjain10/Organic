import React from 'react';
import { ArrowRight, Sparkles, Leaf, ShieldCheck, Star, Sun } from 'lucide-react';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-26 pb-8 md:pt-30 md:pb-14 px-4 md:px-8 bg-[#F7F6F2] overflow-hidden border-b border-[#1E3D2B]/5">
      {/* Editorial Decorative Grid lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#1E3D2B_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-[#E5E3DB]/30 -skew-x-12 translate-x-20 z-0 hidden lg:block" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">

          {/* --- LEFT: Content Block (Col 1-7) --- */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 lg:pr-6 text-center lg:text-left flex flex-col items-center lg:items-start">

            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-[#1E3D2B]/5 shadow-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#6E8B3D] animate-pulse" />
              <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#1E3D2B]/75">
                FRESH BATCH • DIRECT FROM FARMS
              </span>
            </div>

            <div className="space-y-4 w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95] text-[#1E3D2B]">
                Nature’s <br className="hidden sm:block" />
                <span className="relative inline-block">
                  <span className="font-serif italic font-normal text-[#6E8B3D]">Purest</span>
                  <svg className="absolute -bottom-1 left-0 w-full h-[6px] text-[#6E8B3D]/30" viewBox="0 0 300 12" fill="none">
                    <path d="M1 11C50 3 150 3 299 11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                <br /> Form, Perfected.
              </h1>

              <p className="max-w-md mx-auto lg:mx-0 text-sm md:text-base text-[#6B4F3F] leading-relaxed opacity-95">
                From fresh mandi-sourced ingredients to carefully solar-dried perfection,
                we craft 100% chemical-free superfoods that your body truly recognizes.
                <span className="text-[#1E3D2B] font-bold block mt-1.5 md:mt-2"> Clean. Potent. Honest.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link to="/shop" className="w-full sm:w-auto">
                <button className="w-full sm:px-8 h-12 md:h-14 flex items-center justify-center gap-2 group relative rounded-full bg-[#1E3D2B] text-[#F7F6F2] font-semibold text-[10px] uppercase tracking-[0.2em] overflow-hidden transition-all active:scale-95 shadow-lg shadow-[#1E3D2B]/15 hover:bg-[#6E8B3D]">
                  <span>Shop Pure Products</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <Link to="/about" className="w-full sm:w-auto">
                <button className="w-full sm:px-8 h-12 md:h-14 flex items-center justify-center rounded-full border border-[#1E3D2B]/15 text-[#1E3D2B] font-semibold text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:border-[#1E3D2B]/35 transition-all shadow-sm">
                  Our Process
                </button>
              </Link>
            </div>

            {/* Trust Line */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-4 border-t border-[#1E3D2B]/5 w-full items-center">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-[#6E8B3D] text-[#6E8B3D]" />
                  ))}
                </div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#1E3D2B]/60">
                  Trusted by 2,000+ customers
                </p>
              </div>

              <div className="h-6 w-px bg-[#1E3D2B]/10 hidden sm:block" />

              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#6E8B3D]" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#1E3D2B]/60">100% Chemical-Free</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sun size={16} className="text-[#6E8B3D]" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#1E3D2B]/60">Solar Dried</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Visual Presentation (Col 8-12) --- */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 max-w-sm mx-auto lg:max-w-none w-full">
            {/* Decorative background glows */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#6E8B3D]/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-44 h-44 bg-[#1E3D2B]/80 rounded-full blur-3xl opacity-5 -z-10" />

            {/* Main Image Card */}
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#1E3D2B]/5 shadow-[0_20px_40px_rgba(30,61,43,0.1)] group bg-white">
              <img
                src="img/hero .jpeg" 
                alt="Organic Superfood"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />

              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3D2B]/50 via-transparent to-transparent opacity-80" />

              {/* Tag overlay */}
              <div className="absolute bottom-4 right-4 left-4 p-4 backdrop-blur-md bg-white/90 rounded-xl border border-white/40 shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Leaf className="text-[#6E8B3D]" size={14} />
                  <p className="text-[#1E3D2B] font-extrabold text-[8px] uppercase tracking-widest">Purity Guarantee</p>
                </div>
                <p className="text-[#1E3D2B] font-serif text-lg italic leading-none">100% Pure & Organic</p>
              </div>
            </div>

            {/* Floating Price Tag */}
            <Link to="/shop" className="absolute -bottom-4 -left-4 block">
              <div className="bg-white px-4 py-2.5 rounded-2xl shadow-[0_12px_24px_rgba(30,61,43,0.12)] border border-[#1E3D2B]/5 flex items-center gap-2.5 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-[#1E3D2B] flex items-center justify-center text-white shadow-md">
                  <ArrowRight size={14} className="hover:translate-x-0.5 transition-transform" />
                </div>
                <div>
                  <p className="text-[8px] font-bold uppercase text-[#1E3D2B]/40 tracking-wider">Starting at</p>
                  <p className="text-sm font-bold text-[#1E3D2B] leading-tight">₹199/-</p>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Modern Scroll Component */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none hidden md:flex">
        <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#1E3D2B]/20">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#1E3D2B]/20 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;