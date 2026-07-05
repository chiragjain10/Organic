import React from 'react';
import { Sun, Shield, Leaf, Beaker, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
const ScienceSection = () => {
  const features = [
    { 
      icon: Leaf, 
      title: 'Nutrient-Rich Processing', 
      desc: 'We retain maximum natural nutrients with low-heat drying.',
      tag: 'Whole Food'
    },
    { 
      icon: Sparkles, 
      title: 'Easy to Absorb', 
      desc: 'Finely milled powders your body can actually use.',
      tag: 'Bio-Ready'
    },
    { 
      icon: Shield, 
      title: 'Tested for Purity', 
      desc: 'Every batch is checked for quality and safety.',
      tag: 'Safe & Pure'
    }
  ];

  return (
    <section className="py-10 md:py-16 bg-[#F7F6F2] px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative">
        
        {/* Main Dark Container */}
        <div className="bg-[#1E3D2B] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(30,61,43,0.2)]">
          
          {/* Decorative Technical Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `radial-gradient(#F7F6F2 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />

          <div className="grid lg:grid-cols-2">
            
            {/* --- LEFT: The Visual Specimen --- */}
            <div className="relative p-5 md:p-10 lg:p-12 flex items-center justify-center">
              <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square max-w-[420px] lg:max-w-none">
                {/* Decorative Tightly Nested Frame */}
                <div className="absolute -inset-2 border border-[#6E8B3D]/25 rounded-[1.8rem] -z-10" />
                
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl group relative">
                  <img 
                    src="https://images.unsplash.com/photo-1505577058444-a3dab90d4253?auto=format&fit=crop&q=80&w=1200" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    alt="Natural Process"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3D2B]/55 via-transparent to-transparent" />
                </div>

                {/* Floating "Digital" Data Point - Rebranded to Solar (Clean overlay) */}
                <div className="absolute top-4 right-4 backdrop-blur-md bg-white/10 border border-white/20 p-3 rounded-2xl shadow-lg">
                  <Sun className="text-[#6E8B3D]" size={18} />
                </div>

                {/* Bottom Stats Card */}
                <div className="absolute bottom-3 left-3 right-3 backdrop-blur-md bg-white/95 p-4 rounded-xl shadow-lg flex items-center justify-between border border-white/40">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1E3D2B] flex items-center justify-center text-[#6E8B3D]">
                      <Leaf size={16} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-[#1E3D2B]/40">Purity Guarantee</p>
                      <p className="text-xs sm:text-sm font-bold text-[#1E3D2B]">100% Natural Process</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex gap-1.5">
                     <Sun size={14} className="text-[#6E8B3D]" />
                     <Shield size={14} className="text-[#6E8B3D]" />
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT: The Narrative --- */}
            <div className="p-6 md:p-12 lg:p-14 flex flex-col justify-center relative">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-px w-6 bg-[#6E8B3D]" />
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.4em] text-[#6E8B3D]">
                      OUR PROCESS
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-light text-[#F7F6F2] leading-tight tracking-tight">
                    Modern Ayurveda, <br />
                    <span className="font-serif italic text-[#6E8B3D]">Made Pure.</span>
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-md">
                    We don’t over-process nature. Our ingredients are carefully sourced, gently dried using solar heat, and preserved in their most natural form — so you get real nutrition, just as it should be.
                  </p>
                </div>

                {/* Feature List */}
                <div className="space-y-0 border-t border-white/10 pt-4">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 group cursor-pointer">
                      <span className="font-mono text-[#6E8B3D] text-[10px] opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">{f.title}</h4>
                          <span className="text-[7px] font-bold bg-white/5 px-2 py-0.5 rounded text-[#6E8B3D] border border-white/5 group-hover:bg-[#6E8B3D] group-hover:text-[#1E3D2B] transition-all">
                            {f.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/40 group-hover:text-white/60 transition-colors">{f.desc}</p>
                      </div>
                      <f.icon size={16} className="text-[#6E8B3D] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <Link to="/about" className="inline-block w-full sm:w-auto">
                    <button className="w-full sm:px-8 py-3 rounded-full bg-white text-[#1E3D2B] font-bold text-[9px] uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-[#6E8B3D] hover:text-white flex items-center justify-center gap-2">
                      <span>See More Process</span>
                      <ArrowRight size={12} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ScienceSection;