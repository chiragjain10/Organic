import React from 'react';
import { Sun, Shield, Leaf, Beaker, ArrowRight, Sparkles } from 'lucide-react';

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
    <section className="py-16 md:py-24 bg-[#F7F6F2] px-4 md:px-10 overflow-hidden">
      <div className="max-w-[1300px] mx-auto relative">
        
        {/* Main Dark Container */}
        <div className="bg-[#1E3D2B] rounded-[4rem] overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(30,61,43,0.3)]">
          
          {/* Decorative Technical Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: `radial-gradient(#F7F6F2 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />

          <div className="grid lg:grid-cols-2">
            
            {/* --- LEFT: The Visual Specimen --- */}
            <div className="relative p-6 md:p-12 lg:p-16 flex items-center justify-center">
              <div className="relative w-full aspect-[4/5] lg:aspect-square">
                {/* Decorative Frame */}
                <div className="absolute -inset-4 border border-[#6E8B3D]/30 rounded-[3rem] -z-10 translate-x-4 translate-y-4" />
                
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1505577058444-a3dab90d4253?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt="Natural Process"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3D2B]/60 via-transparent to-transparent" />
                </div>

                {/* Floating "Digital" Data Point - Rebranded to Solar */}
                <div className="absolute top-10 -right-8 backdrop-blur-xl bg-white/10 border border-white/20 p-5 rounded-3xl shadow-2xl animate-pulse">
                  <Sun className="text-[#6E8B3D] mb-2" size={24} />
                  <div className="space-y-1">
                    <div className="h-1 w-12 bg-[#6E8B3D]/50 rounded-full" />
                    <div className="h-1 w-8 bg-[#6E8B3D]/30 rounded-full" />
                  </div>
                </div>

                {/* Bottom Stats Card */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] backdrop-blur-2xl bg-white/90 p-8 rounded-[2rem] shadow-2xl flex items-center justify-between border border-white/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1E3D2B] flex items-center justify-center text-[#6E8B3D]">
                      <Leaf size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B]/40">Product Quality</p>
                      <p className="text-xl font-bold text-[#1E3D2B]">100% Natural Ingredients</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex gap-2">
                     <Sun size={16} className="text-[#6E8B3D]" />
                     <Shield size={16} className="text-[#6E8B3D]" />
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT: The Narrative --- */}
            <div className="p-10 md:p-20 lg:p-24 flex flex-col justify-center relative">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3">
                    <span className="h-px w-8 bg-[#6E8B3D]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#6E8B3D]">
                      OUR PROCESS
                    </span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-light text-[#F7F6F2] leading-[0.95] tracking-tighter">
                    Modern Ayurveda, <br />
                    <span className="font-serif italic text-[#6E8B3D]">Made Pure.</span>
                  </h2>
                  <p className="text-white/50 text-base leading-relaxed max-w-md font-medium">
                    We don’t over-process nature. Our ingredients are carefully sourced, gently dried using solar heat, and preserved in their most natural form — so you get real nutrition, just as it should be.
                  </p>
                </div>

                {/* Feature List */}
                <div className="space-y-0 border-t border-white/10 pt-8">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-6 py-6 border-b border-white/5 group cursor-pointer">
                      <span className="font-mono text-[#6E8B3D] text-xs opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest">{f.title}</h4>
                          <span className="text-[9px] font-black bg-white/5 px-2 py-1 rounded text-[#6E8B3D] border border-white/5 group-hover:bg-[#6E8B3D] group-hover:text-[#1E3D2B] transition-all">
                            {f.tag}
                          </span>
                        </div>
                        <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">{f.desc}</p>
                      </div>
                      <f.icon size={20} className="text-[#6E8B3D] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-6">
                  <button className="group relative px-12 py-5 rounded-full bg-white text-[#1E3D2B] font-bold text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-[#6E8B3D] hover:text-white">
                    <span className="relative z-10 flex items-center gap-3">
                      See more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
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