import React from 'react';
import { ShieldCheck, Leaf, FlaskConical, Sun } from 'lucide-react';

const TrustItem = ({ Icon, title, description, index }) => (
  <div className="relative group p-8 rounded-[2rem] transition-all duration-500 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(30,61,43,0.08)]">
    {/* Background numbering (Archival look) */}
    <span className="absolute top-6 right-8 text-5xl font-serif italic text-[#1E3D2B]/5 group-hover:text-[#6E8B3D]/10 transition-colors duration-500">
      0{index + 1}
    </span>
    
    <div className="relative z-10">
      <div className="mb-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-[#1E3D2B]/5 shadow-sm group-hover:scale-110 group-hover:bg-[#1E3D2B] transition-all duration-500">
        <Icon 
          strokeWidth={1.5} 
          size={28} 
          className="text-[#6E8B3D] group-hover:text-[#F7F6F2] transition-colors duration-500" 
        />
      </div>
      
      <h3 className="text-lg font-bold text-[#1E3D2B] mb-3 flex items-center gap-2">
        {title}
        <div className="h-px w-0 group-hover:w-8 bg-[#6E8B3D] transition-all duration-500" />
      </h3>
      
      <p className="text-sm leading-[1.8] text-[#6B4F3F] opacity-80 group-hover:opacity-100 transition-opacity">
        {description}
      </p>
    </div>
  </div>
);

const BrandTrust = () => {
  const trustPoints = [
    {
      Icon: Leaf,
      title: "100% Pure. Nothing Added.",
      description: "Made from fresh, mandi-sourced ingredients, our powders contain no fillers, no preservatives, no shortcuts — just nature in its real form."
    },
    {
      Icon: ShieldCheck,
      title: "Clean From Start to Finish",
      description: "No chemicals. No artificial colors or flavors. Every batch is crafted to stay as clean as what nature intended."
    },
    {
      Icon: FlaskConical,
      title: "Small Batch. Carefully Crafted.",
      description: "We don’t mass-produce. Each batch is processed with care to preserve natural nutrients, aroma, and real potency."
    },
    {
      Icon: Sun,
      title: "Sun-Dried. Nutrient Locked.",
      description: "Our solar drying method gently removes moisture while retaining maximum nutrition — the way nature meant it."
    }
  ];

  return (
    <section className="relative py-32 bg-[#F7F6F2] overflow-hidden">
      {/* Decorative Grainy Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-[#1E3D2B] tracking-tight">
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

        {/* Bottom Detail - High Contrast */}
        
      </div>
    </section>
  );
};

export default BrandTrust;