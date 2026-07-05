import React, { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, ShieldCheck, Mail, ArrowRight, Leaf, CheckCircle2 } from 'lucide-react';

const Newsletter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribing:", email);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-18 bg-[#F7F6F2] overflow-hidden relative px-4 md:px-8"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1600px] pointer-events-none">
        <div className="absolute top-6 left-10 text-[15vw] font-serif italic text-[#1E3D2B]/[0.015] leading-none">Nature</div>
        <div className="absolute bottom-6 right-10 text-[15vw] font-serif italic text-[#1E3D2B]/[0.015] leading-none">Science</div>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-[1.5s] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          
          {/* LEFT: Editorial Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <span className="w-8 h-[1px] bg-[#6E8B3D]/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#6E8B3D]">The Inner Circle</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-[#1E3D2B] leading-[1.1] tracking-tight">
              Start Your Daily <br />
              <span className="italic font-light">Wellness Ritual.</span>
            </h2>

            <p className="text-sm md:text-base text-[#6B4F3F]/80 font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
              Get simple health tips, <span className="text-[#1E3D2B] font-medium">real Ayurveda insights</span>, and exclusive offers on our natural powders — straight to your inbox.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-2">
               <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#6E8B3D]" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#1E3D2B]">100% Natural</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#6E8B3D]" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#1E3D2B]">Trusted by 5,000+ users</span>
               </div>
            </div>
          </div>

          {/* RIGHT: The Floating Interaction Card */}
          <div className="lg:col-span-6 relative w-full max-w-md mx-auto lg:max-w-none">
            <div className="absolute -inset-2 bg-[#6E8B3D]/5 rounded-[2rem] rotate-2 scale-102" />
            
            <div className="relative bg-[#1E3D2B] rounded-[2rem] p-6 sm:p-10 shadow-xl overflow-hidden border border-white/5">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="space-y-1.5">
                  <h3 className="text-white font-serif text-xl italic">Get Wellness Tips & Offers</h3>
                  <div className="h-[1px] w-8 bg-[#6E8B3D]" />
                </div>

                <div className="relative group">
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="leafburst99@gmail.com"
                    className="w-full bg-transparent border-b border-white/20 py-2.5 text-base text-white font-light placeholder:text-white/20 focus:outline-none focus:border-[#6E8B3D] transition-all duration-500"
                    required
                  />
                  <div className={`absolute bottom-0 left-0 h-[1px] bg-[#6E8B3D] transition-all duration-700 ${isFocused ? 'w-full' : 'w-0'}`} />
                </div>

                <div className="space-y-3">
                  <button 
                    type="submit"
                    className="w-full group bg-[#F7F6F2] py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#6E8B3D] hover:text-white"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1E3D2B] group-hover:text-white transition-colors">
                      Join Now
                    </span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5 text-[#1E3D2B] group-hover:text-white" />
                  </button>
                  <p className="text-center text-[8px] text-white/40 uppercase tracking-widest leading-none">
                    Unsubscribe anytime
                  </p>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <div className="relative flex items-center justify-center pt-0.5">
                    <input 
                      type="checkbox" 
                      id="newsletter-terms" 
                      className="peer appearance-none w-3.5 h-3.5 border border-white/20 rounded checked:bg-[#6E8B3D] checked:border-[#6E8B3D] transition-all cursor-pointer"
                      required 
                    />
                    <Leaf size={8} className="absolute text-[#1E3D2B] opacity-0 peer-checked:opacity-100 pointer-events-none" />
                  </div>
                  <label htmlFor="newsletter-terms" className="text-[8px] text-white/40 uppercase tracking-wider leading-relaxed cursor-pointer select-none">
                    I consent to receive offers and agree to the <a href="#" className="text-white/60 underline hover:text-[#6E8B3D]">Privacy Terms</a>.
                  </label>
                </div>
              </form>

              {/* Decorative Corner Icon */}
              <div className="absolute -bottom-6 -right-6 text-white/[0.02] rotate-12">
                <Leaf size={140} strokeWidth={0.5} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;