import React from 'react';
import { 
  Leaf, 
  BadgeCheck, 
  Factory, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  FlaskConical, 
  Zap, 
  ShieldOff, 
  Microscope 
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <div className="max-w-[1300px] mx-auto space-y-12">
        
        {/* --- 01. HERO SECTION --- */}
        <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-sm border border-[#1E3D2B]/5 relative">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="grid lg:grid-cols-2 min-h-[700px]">
            <div className="p-10 md:p-20 flex flex-col justify-center space-y-8 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#6E8B3D]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6E8B3D]">Welcome to Leaf Burst</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-light text-[#1E3D2B] leading-[0.9] tracking-tighter">
                  Rooted in Nature. <br />
                  <span className="font-black italic text-[#6E8B3D]">Backed by Science.</span>
                </h1>
              </div>

              <p className="max-w-md text-base text-[#6B4F3F] leading-relaxed opacity-80">
                We don’t just sell organic products — we craft powerful wellness solutions inspired by Ayurveda and refined through modern science.
              </p>

              <div className="flex gap-4 pt-6">
                 <button className="px-8 py-4 bg-[#1E3D2B] text-white rounded-full text-sm font-bold hover:bg-[#6E8B3D] transition-colors flex items-center gap-2 group">
                    Shop Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button className="px-8 py-4 border border-[#1E3D2B]/10 rounded-full text-sm font-bold text-[#1E3D2B] hover:bg-[#1E3D2B]/5 transition-colors">
                    Explore Products
                 </button>
              </div>
            </div>

            <div className="relative bg-[#E5E3DB] overflow-hidden group">
              <img 
                src="img/a1.jpeg" 
                alt="Science and Nature" 
                className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl">
                <p className="text-white text-xs font-black uppercase tracking-widest mb-2">The Standard</p>
                <p className="text-white/90 text-sm italic leading-relaxed">
                  "Authentic Ayurvedic wellness accessible to everyone — without confusion, without compromise."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- 02. OUR STORY --- */}
        <div className="grid lg:grid-cols-12 gap-12 items-center py-12 px-10">
           <div className="lg:col-span-5">
              <h2 className="text-4xl font-light text-[#1E3D2B] tracking-tighter mb-6">Why We <span className="font-black italic">Started</span></h2>
              <p className="text-[#6B4F3F] leading-relaxed mb-6">
                In a world full of chemicals, shortcuts, and fake “organic” claims — we wanted to create something real. 
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-[#6E8B3D] rounded-full p-1 text-white">
                    <Leaf size={12} />
                  </div>
                  <p className="text-sm font-bold text-[#1E3D2B]">Nature already has the answers. We just need to extract them the right way.</p>
                </div>
              </div>
           </div>
           <div className="lg:col-span-7 bg-white p-10 rounded-[2.5rem] border border-[#1E3D2B]/5">
              <p className="text-lg text-[#6B4F3F] leading-relaxed italic">
                "Leaf Burst was born from a simple idea: From sourcing raw herbs to cold-processing and lab testing — every step is intentional. We don't follow trends; we follow results."
              </p>
           </div>
        </div>

        {/* --- 03. WHAT MAKES US DIFFERENT (GRID) --- */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-light text-[#1E3D2B] tracking-tighter">Not Just Organic. <span className="font-black italic text-[#6E8B3D]">Engineered for Results.</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Microscope,
                title: "Cold-Pressed",
                desc: "Specialized extraction that preserves maximum nutrients and molecular integrity."
              },
              {
                icon: ShieldCheck,
                title: "Lab-Tested",
                desc: "Rigorous testing for purity—zero contamination, zero compromises in every batch."
              },
              {
                icon: Zap,
                title: "Bioavailability",
                desc: "Formulated so your body actually absorbs the nutrients, ensuring real impact."
              },
              {
                icon: ShieldOff,
                title: "No Chemicals",
                desc: "Pure formulations with absolutely zero artificial additives or synthetic fillers."
              }
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] p-10 border border-[#1E3D2B]/5 hover:border-[#6E8B3D]/20 transition-all duration-500 group text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#6E8B3D] mb-8 group-hover:bg-[#6E8B3D] group-hover:text-white transition-colors">
                  <value.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D2B] mb-4 tracking-tight">{value.title}</h3>
                <p className="text-xs text-[#6B4F3F] leading-relaxed opacity-70">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- 04. TRUST & MISSION (DARK POD) --- */}
        <div className="bg-[#1E3D2B] rounded-[3.5rem] p-10 md:p-24 relative overflow-hidden shadow-2xl">
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-[#6E8B3D]/10 skew-x-12 translate-x-32" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-10">
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-[#6E8B3D]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6E8B3D]">Built on Trust, Not Trends</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-light text-white leading-[1.1] tracking-tighter">
                "We don’t follow trends — we follow <span className="italic font-black text-[#6E8B3D]">science and tradition</span>."
              </h2>

              <p className="text-white/60 max-w-xl leading-relaxed">
                Every product goes through strict quality checks so you get safe, effective, and consistent results. Every single time.
              </p>

              <div className="flex flex-wrap gap-8 pt-6">
                 {['Safe', 'Effective', 'Consistent'].map((item) => (
                   <div key={item} className="flex items-center gap-2">
                      <BadgeCheck size={16} className="text-[#6E8B3D]" />
                      <span className="text-white text-[10px] font-black uppercase tracking-widest">{item}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-end">
                <button className="w-48 h-48 rounded-full border border-white/10 flex flex-col items-center justify-center text-white hover:bg-white hover:text-[#1E3D2B] transition-all duration-500 group p-6 text-center">
                   <span className="text-[9px] font-black uppercase tracking-widest mb-2">Start Your Ritual</span>
                   <span className="text-xl font-bold italic">LeafBurst</span>
                   <ArrowRight size={18} className="mt-4 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
          </div>
        </div>

        {/* --- 05. MISSION FOOTER --- */}
        <div className="bg-[#E5E3DB]/30 rounded-[2.5rem] p-12 text-center border border-[#1E3D2B]/5">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1E3D2B]/40 mb-4">Our Mission</p>
            <h3 className="text-2xl font-light text-[#1E3D2B] max-w-2xl mx-auto leading-relaxed">
              To make authentic, high-quality <span className="font-bold">Ayurvedic wellness</span> accessible to everyone — without confusion, without compromise.
            </h3>
        </div>

      </div>
    </div>
  );
};

export default About;