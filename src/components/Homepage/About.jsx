import React from 'react';
import { ShieldCheck, Leaf, FlaskConical, Sun } from 'lucide-react';

const TrustItem = ({ Icon, title, description, index }) => (
  <div className="relative group p-6 md:p-8 rounded-[2rem] bg-white/40 border border-[#1E3D2B]/5 transition-all duration-500 hover:bg-white hover:border-[#6E8B3D]/10 hover:shadow-[0_20px_40px_-15px_rgba(30,61,43,0.06)]">
    {/* Monospaced numbering */}
    <span className="absolute top-6 right-6 font-mono text-xs tracking-wider text-[#1E3D2B]/20 group-hover:text-[#6E8B3D]/40 transition-colors duration-500">
      [ 0{index + 1} ]
    </span>
    
    <div className="relative z-10">
      <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#1E3D2B]/5 shadow-sm group-hover:scale-105 group-hover:bg-[#1E3D2B] transition-all duration-500">
        <Icon 
          strokeWidth={1.5} 
          size={22} 
          className="text-[#6E8B3D] group-hover:text-[#F7F6F2] transition-colors duration-500" 
        />
      </div>
      
      <h3 className="text-base font-bold text-[#1E3D2B] mb-2 flex items-center gap-2">
        {title}
        <div className="h-px w-0 group-hover:w-6 bg-[#6E8B3D] transition-all duration-500" />
      </h3>
      
      <p className="text-xs leading-relaxed text-[#6B4F3F] opacity-80 group-hover:opacity-95 transition-opacity">
        {description}
      </p>
    </div>
  </div>
);

const BrandTrust = () => {
  const trustPoints = [
    {
      Icon: Leaf,
      title: "100% Pure. Zero Fillers.",
      description: "Sourced fresh from mandis. Our powders contain no fillers, no artificial coloring, and no short-cuts. Real nutrition."
    },
    {
      Icon: ShieldCheck,
      title: "Clean Processing",
      description: "Free from any form of chemical intervention. Every jar is processed to stay clean, organic, and highly potent."
    },
    {
      Icon: FlaskConical,
      title: "Small-Batch Care",
      description: "Made in limited batches. We focus on lock-in nutrition, vibrant natural aroma, and preserving raw minerals."
    },
    {
      Icon: Sun,
      title: "Solar Dried Perfection",
      description: "Dried naturally under solar collectors, preserving heat-sensitive micronutrients that traditional machinery destroys."
    }
  ];

  return (
    <section className="relative py-12 md:py-20 bg-[#F7F6F2] overflow-hidden">
      {/* Decorative Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-6 h-[1px] bg-[#6E8B3D]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6E8B3D]">Our Philosophy</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-[#1E3D2B] tracking-tight">
            Why <span className="font-serif italic text-[#6E8B3D]">LEAFBURST</span> <br />
            Feels Different
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPoints.map((point, index) => (
            <TrustItem 
              key={index}
              index={index}
              {...point}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BrandTrust;