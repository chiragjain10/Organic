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
      className="py-24 md:py-32 bg-[#F7F6F2] overflow-hidden relative"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1600px] pointer-events-none">
        <div className="absolute top-10 left-10 text-[20vw] font-serif italic text-[#1E3D2B]/[0.02] leading-none">Nature</div>
        <div className="absolute bottom-10 right-10 text-[20vw] font-serif italic text-[#1E3D2B]/[0.02] leading-none">Science</div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className={`grid lg:grid-cols-12 gap-12 items-center transition-all duration-[1.5s] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          
          {/* LEFT: Editorial Content */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="w-12 h-[1px] bg-[#6E8B3D]/40" />
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#6E8B3D]">The Inner Circle</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif text-[#1E3D2B] leading-[1.1] tracking-tighter">
              Start Your Daily <br />
              <span className="italic font-light">Wellness Ritual.</span>
            </h2>

            <p className="text-lg text-[#6B4F3F]/80 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              Get simple health tips, <span className="text-[#1E3D2B] font-medium">real Ayurveda insights</span>, and exclusive offers on our natural powders — straight to your inbox. No spam, just value.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
               <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-[#6E8B3D]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3D2B]">100% Natural</span>
               </div>
               <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-[#6E8B3D]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3D2B]">Trusted by 5,000+ users</span>
               </div>
            </div>
          </div>

          {/* RIGHT: The Floating Interaction Card */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-[#6E8B3D]/5 rounded-[3rem] rotate-3 scale-105" />
            
            <div className="relative bg-[#1E3D2B] rounded-[2.5rem] p-8 md:p-14 shadow-2xl overflow-hidden border border-white/5">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
                <div className="space-y-2">
                  <h3 className="text-white font-serif text-2xl italic">Get Wellness Tips & Offers</h3>
                  <div className="h-[1px] w-12 bg-[#6E8B3D]" />
                </div>

                <div className="relative group">
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="leafburst99@gmail.com"
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white font-light placeholder:text-white/20 focus:outline-none focus:border-[#6E8B3D] transition-all duration-500"
                    required
                  />
                  <div className={`absolute bottom-0 left-0 h-[1px] bg-[#6E8B3D] transition-all duration-700 ${isFocused ? 'w-full' : 'w-0'}`} />
                </div>

                <div className="space-y-4">
                  <button 
                    type="submit"
                    className="w-full group bg-[#F7F6F2] py-5 rounded-xl flex items-center justify-center gap-4 transition-all duration-500 hover:bg-[#6E8B3D] hover:text-white"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#1E3D2B] group-hover:text-white transition-colors">
                      Join Now
                    </span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                  </button>
                  <p className="text-center text-[10px] text-white/40 uppercase tracking-widest">
                    No spam | Unsubscribe anytime
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      id="newsletter-terms" 
                      className="peer appearance-none w-4 h-4 border border-white/20 rounded checked:bg-[#6E8B3D] checked:border-[#6E8B3D] transition-all cursor-pointer"
                      required 
                    />
                    <Leaf size={10} className="absolute text-[#1E3D2B] opacity-0 peer-checked:opacity-100 pointer-events-none" />
                  </div>
                  <label htmlFor="newsletter-terms" className="text-[9px] text-white/40 uppercase tracking-widest leading-relaxed cursor-pointer select-none">
                    I consent to receive digital correspondence and agree to the <a href="#" className="text-white/60 underline hover:text-[#6E8B3D]">Privacy Terms</a>.
                  </label>
                </div>
              </form>

              {/* Decorative Corner Icon */}
              <div className="absolute -bottom-6 -right-6 text-white/[0.03] rotate-12">
                <Leaf size={180} strokeWidth={0.5} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;