import React from 'react';
import { Link } from 'react-router-dom';
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
import SEO from '../components/SEO';

const About = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-26 pb-16 px-4 md:px-8">
      <SEO
        title="About | Leaf Burst"
        description="Leaf Burst crafts Ayurvedic-inspired, lab-tested wellness formulations. Learn our mission and standards."
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/about` : undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Leaf Burst",
          "url": typeof window !== 'undefined' ? `${window.location.origin}/about` : "https://example.com/about"
        }}
      />
      <div className="max-w-[1200px] mx-auto space-y-8">
        
        {/* --- 01. HERO SECTION --- */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-[#1E3D2B]/5 relative">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="grid lg:grid-cols-2 min-h-[420px] lg:min-h-[460px]">
            <div className="p-6 md:p-12 flex flex-col justify-center space-y-6 relative z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[1px] bg-[#6E8B3D]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#6E8B3D]">Welcome to Leaf Burst</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-light text-[#1E3D2B] leading-[1.0] tracking-tighter">
                  Rooted in Nature. <br />
                  <span className="font-extrabold italic text-[#6E8B3D]">Backed by Science.</span>
                </h1>
              </div>

              <p className="max-w-md text-sm md:text-base text-[#6B4F3F] leading-relaxed opacity-85 font-light">
                We don’t just sell organic products — we craft powerful wellness solutions inspired by Ayurveda and refined through modern science.
              </p>

              <div className="flex gap-3 pt-2">
                <Link to="/shop">
                  <button className="px-6 py-3 bg-[#1E3D2B] text-white rounded-full text-xs font-bold hover:bg-[#6E8B3D] transition-colors flex items-center gap-2 group">
                    Shop Now
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/shop">
                  <button className="px-6 py-3 border border-[#1E3D2B]/10 rounded-full text-xs font-bold text-[#1E3D2B] hover:bg-[#1E3D2B]/5 transition-colors">
                    Explore Products
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative bg-[#E5E3DB] overflow-hidden group min-h-[250px] lg:min-h-auto">
              <img 
                src="img/a1.jpeg" 
                alt="Science and Nature" 
                className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 group-hover:scale-103"
              />
              <div className="absolute bottom-4 left-4 right-4 p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <p className="text-white text-[9px] font-bold uppercase tracking-widest mb-1">The Standard</p>
                <p className="text-white/90 text-xs italic leading-relaxed">
                  "Authentic Ayurvedic wellness accessible to everyone — without confusion, without compromise."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- 02. OUR STORY --- */}
        <div className="grid lg:grid-cols-12 gap-6 items-center py-6 px-4">
           <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl md:text-3xl font-light text-[#1E3D2B] tracking-tight">Why We <span className="font-extrabold italic">Started</span></h2>
              <p className="text-sm text-[#6B4F3F] leading-relaxed">
                In a world full of chemicals, shortcuts, and fake “organic” claims — we wanted to create something real. 
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-[#6E8B3D] rounded-full p-1 text-white flex-shrink-0">
                    <Leaf size={10} />
                  </div>
                  <p className="text-xs font-bold text-[#1E3D2B]">Nature already has the answers. We just need to extract them the right way.</p>
                </div>
              </div>
           </div>
           <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[1.8rem] border border-[#1E3D2B]/5">
              <p className="text-base text-[#6B4F3F] leading-relaxed italic">
                "Leaf Burst was born from a simple idea: From sourcing raw herbs to cold-processing and lab testing — every step is intentional. We don't follow trends; we follow results."
              </p>
           </div>
        </div>

        {/* --- 03. WHAT MAKES US DIFFERENT (GRID) --- */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-light text-[#1E3D2B] tracking-tight">Not Just Organic. <span className="font-extrabold italic text-[#6E8B3D]">Engineered for Results.</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-[#1E3D2B]/8 hover:border-[#6E8B3D]/25 transition-all duration-500 group text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#F7F6F2] flex items-center justify-center text-[#6E8B3D] mb-5 group-hover:bg-[#6E8B3D] group-hover:text-white transition-colors">
                  <value.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-[#1E3D2B] mb-2 tracking-tight">{value.title}</h3>
                <p className="text-xs text-[#6B4F3F] leading-relaxed opacity-70">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- 04. TRUST & MISSION (DARK POD) --- */}
        <div className="bg-[#1E3D2B] rounded-[2rem] p-6 md:p-12 lg:p-14 relative overflow-hidden shadow-xl">
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-[#6E8B3D]/10 skew-x-12 translate-x-32" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#6E8B3D]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#6E8B3D]">Built on Trust, Not Trends</span>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-light text-white leading-tight tracking-tight">
                "We don’t follow trends — we follow <span className="italic font-extrabold text-[#6E8B3D]">science and tradition</span>."
              </h2>

              <p className="text-white/60 text-sm max-w-xl leading-relaxed">
                Every product goes through strict quality checks so you get safe, effective, and consistent results. Every single time.
              </p>

              <div className="flex flex-wrap gap-6 pt-2">
                 {['Safe', 'Effective', 'Consistent'].map((item) => (
                   <div key={item} className="flex items-center gap-1.5">
                      <BadgeCheck size={14} className="text-[#6E8B3D]" />
                      <span className="text-white text-[9px] font-bold uppercase tracking-wider">{item}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <button className="w-32 h-32 rounded-full border border-white/10 flex flex-col items-center justify-center text-white hover:bg-white hover:text-[#1E3D2B] transition-all duration-500 group p-4 text-center">
                   <span className="text-[8px] font-bold uppercase tracking-wider mb-1">Start Ritual</span>
                   <span className="text-lg font-bold italic">LeafBurst</span>
                   <ArrowRight size={14} className="mt-2 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>
        </div>

        {/* --- 05. MISSION FOOTER --- */}
        <div className="bg-[#E5E3DB]/30 rounded-2xl p-8 text-center border border-[#1E3D2B]/5">
            <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#1E3D2B]/40 mb-3">Our Mission</p>
            <h3 className="text-xl font-light text-[#1E3D2B] max-w-2xl mx-auto leading-relaxed">
              To make authentic, high-quality <span className="font-bold">Ayurvedic wellness</span> accessible to everyone — without confusion, without compromise.
            </h3>
        </div>

      </div>
    </div>
  );
};

export default About;
