import React, { useState } from 'react';
import { ArrowRight, Sun, ShieldCheck } from 'lucide-react';

const PremiumPromoBanner = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 15;
    const y = ((clientY - top) / height - 0.5) * 15;
    setMousePosition({ x, y });
  };

  return (
    <section className="py-12 md:py-16 bg-[#FDFCFB] px-4 md:px-8">
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        className="max-w-[1300px] mx-auto bg-[#15291E] rounded-[2rem] md:rounded-[4rem] overflow-hidden relative group shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] transition-all duration-700 ease-out"
      >
        {/* Animated Grain & Gradient Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent z-10" />

        <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[600px]">
          
          {/* Content Side */}
          <div className="lg:col-span-7 p-8 md:p-16 lg:p-24 flex flex-col justify-center space-y-10 relative z-30">
            <div className="space-y-4">
              <div className="flex items-center gap-3 animate-fade-in">
                <span className="h-[1px] w-8 bg-[#8B9D77]" />
                <span className="text-[11px] font-medium uppercase tracking-[0.5em] text-[#8B9D77]">
                  Freshly Crafted Daily
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#FDFCFB] leading-[1.1] tracking-tight">
                Pure <span className="italic font-serif text-[#A3B882]">Vitality</span>, <br />
                <span className="opacity-90">Naturally Made.</span>
              </h2>
            </div>

            <p className="max-w-md text-[#FDFCFB]/70 text-lg font-light leading-relaxed">
              Experience real nutrition the way it’s meant to be. We source fresh ingredients from local mandis, 
              gently dry them using solar heat, and turn them into clean, powerful powders — without chemicals, fillers, or shortcuts.
            </p>

            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
                <button className="group relative flex items-center gap-12 bg-[#FDFCFB] text-[#15291E] pl-8 pr-4 py-4 rounded-full transition-all duration-500 hover:pr-8 hover:bg-[#A3B882] hover:text-white">
                  <span className="text-xs font-bold uppercase tracking-widest">Shop Pure Products</span>
                  <div className="w-10 h-10 rounded-full bg-[#15291E] text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#15291E] transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </button>
                
                <div className="flex flex-col gap-1 border-l border-white/10 pl-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B9D77]">Get 15% Off Your First Order</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-light text-white tracking-tighter">15% OFF</span>
                    <span className="px-2 py-0.5 rounded border border-white/20 text-[9px] text-white/40 uppercase tracking-widest font-medium">
                      CODE: LEAF15
                    </span>
                  </div>
                </div>
              </div>
              {/* Premium Micro Detail */}
              <p className="pl-8 text-[10px] text-[#8B9D77] font-medium uppercase tracking-[0.2em]">
                “Sourced fresh. Dried with care. Delivered pure.”
              </p>
            </div>
          </div>

          {/* Image Side - Editorial Style */}
          <div className="lg:col-span-5 relative h-[450px] lg:h-auto overflow-hidden bg-[#1E3326]">
            <div 
              className="absolute inset-0 transition-transform duration-1000 ease-out scale-105"
              style={{
                transform: `scale(1.1) translate(${mousePosition.x}px, ${mousePosition.y}px)`
              }}
            >
              <img 
                src="img/a (5).jpeg" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                alt="Organic Ritual"
              />
            </div>

            {/* Floating Trust Badge */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              style={{
                transform: `translate(calc(-50% + ${-mousePosition.x * 0.5}px), calc(-50% + ${-mousePosition.y * 0.5}px))`
              }}
            >
              <div className="w-44 h-44 rounded-full border border-white/20 backdrop-blur-xl bg-black/10 flex flex-col items-center justify-center text-center p-4">
                <Sun size={24} className="text-[#A3B882] mb-2" />
                <span className="text-white text-[11px] font-bold uppercase tracking-[0.3em] leading-tight">
                  Solar Dried <br /> No Preservatives
                </span>
                <div className="mt-2 w-8 h-[1px] bg-white/30" />
                <span className="mt-2 text-[8px] text-white/50 uppercase tracking-widest font-medium">Chemical-Free</span>
              </div>
            </div>

            {/* Bottom Gradient for Mobile Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#15291E] via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumPromoBanner;