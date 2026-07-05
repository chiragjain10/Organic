import React, { useState } from 'react';
import { ArrowRight, Sun, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <section className="py-8 md:py-12 bg-[#FDFCFB] px-4 md:px-8">
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        className="max-w-[1200px] mx-auto bg-[#15291E] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-700 ease-out"
      >
        {/* Animated Grain & Gradient Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-transparent z-10" />

        <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[480px] lg:min-h-[500px]">
          
          {/* Content Side */}
          <div className="lg:col-span-7 p-6 md:p-12 lg:p-16 flex flex-col justify-center space-y-6 relative z-30">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="h-[1px] w-6 bg-[#8B9D77]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#8B9D77]">
                  Freshly Crafted Daily
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#FDFCFB] leading-[1.1] tracking-tight">
                Pure <span className="italic font-serif text-[#A3B882]">Vitality</span>, <br />
                <span className="opacity-90">Naturally Made.</span>
              </h2>
            </div>

            <p className="max-w-md text-[#FDFCFB]/70 text-sm md:text-base font-light leading-relaxed">
              Experience real nutrition the way it’s meant to be. We source fresh ingredients from local mandis, 
              gently dry them using solar heat, and turn them into clean, powerful powders — without chemicals, fillers, or shortcuts.
            </p>

            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2 w-full sm:w-auto">
                <Link to="/shop" className="w-full sm:w-auto">
                  <button className="w-full group relative flex items-center justify-between sm:justify-start gap-8 bg-[#FDFCFB] text-[#15291E] pl-6 pr-3 py-3 rounded-full transition-all duration-500 hover:bg-[#A3B882] hover:text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Shop Pure Products</span>
                    <div className="w-8 h-8 rounded-full bg-[#15291E] text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#15291E] transition-colors">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                </Link>
                
                <div className="flex flex-col gap-0.5 border-l border-white/10 pl-5 w-full sm:w-auto">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B9D77]">First Order Discount</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-light text-white tracking-tight">15% OFF</span>
                    <span className="px-1.5 py-0.5 rounded border border-white/20 text-[8px] text-white/40 uppercase tracking-widest font-mono">
                      LEAF15
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side - Editorial Style */}
          <div className="lg:col-span-5 relative h-[280px] lg:h-auto overflow-hidden bg-[#1E3326]">
            <div 
              className="absolute inset-0 transition-transform duration-1000 ease-out scale-100"
              style={{
                transform: `scale(1.05) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
              }}
            >
              <img 
                src="img/a (5).jpeg" 
                loading="lazy"
                className="w-full h-full object-cover opacity-75 mix-blend-luminosity grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                alt="Organic Ritual"
              />
            </div>

            {/* Floating Trust Badge */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              style={{
                transform: `translate(calc(-50% + ${-mousePosition.x * 0.2}px), calc(-50% + ${-mousePosition.y * 0.2}px))`
              }}
            >
              <div className="w-36 h-36 rounded-full border border-white/15 backdrop-blur-xl bg-black/10 flex flex-col items-center justify-center text-center p-3">
                <Sun size={20} className="text-[#A3B882] mb-1.5" />
                <span className="text-white text-[9px] font-bold uppercase tracking-[0.25em] leading-tight">
                  Solar Dried <br /> No Additives
                </span>
                <div className="mt-1.5 w-6 h-[1px] bg-white/20" />
                <span className="mt-1.5 text-[7px] text-white/40 uppercase tracking-widest font-medium">Chemical-Free</span>
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