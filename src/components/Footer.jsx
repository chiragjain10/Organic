import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, ArrowRight, Youtube, ArrowUp, Leaf, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinks = [
    { name: 'Shop', to: '/shop' },
    { name: 'Best Sellers 🔥', to: '/best-sellers' },
    { name: 'Track Order', to: '/track-order' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <footer className="relative bg-[#F7F6F2] pt-24 pb-5 px-6 overflow-hidden">
      {/* Decorative Organic Shape */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#6E8B3D]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1300px] mx-auto relative z-10">

        {/* --- TRUST BOOSTERS ROW --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-16 border-b border-[#1E3D2B]/5">
          {[
            { icon: Leaf, text: "100% Natural" },
            { icon: CheckCircle2, text: "Lab Tested" },
            { icon: Truck, text: "Fast Delivery" },
            { icon: ShieldCheck, text: "Secure Payments" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-center md:justify-start gap-3 opacity-70">
              <item.icon size={16} className="text-[#6E8B3D]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3D2B]">{item.text}</span>
            </div>
          ))}
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 py-16">

          {/* Brand & Social Proof */}
          <div className="lg:col-span-4 space-y-8">
            {/* --- BRAND LOGO --- */}
            <Link to="/" className="inline-block group">
              <img 
                src="img/logo1.png" 
                alt="Leaf Burst Logo" 
                className="h-16 object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="space-y-4">
              <p className="text-sm text-[#6B4F3F]/80 leading-relaxed max-w-sm">
                Leaf Burst delivers 100% natural, lab-tested wellness products inspired by Ayurveda. No chemicals. No shortcuts. Just real results.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#6E8B3D]/5 px-4 py-2 rounded-full">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-[#6E8B3D]/20 border border-[#F7F6F2]" />)}
                </div>
                <span className="text-[10px] font-bold text-[#1E3D2B]/60 uppercase tracking-tighter">
                  Trusted by 5,000+ happy customers
                </span>
              </div>
            </div>
            
            <div className="flex gap-5">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="text-[#1E3D2B]/40 hover:text-[#6E8B3D] transition-colors duration-300">
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 lg:pl-12">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#6E8B3D] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm font-medium text-[#1E3D2B]/70 hover:text-[#1E3D2B] hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-5 bg-white/40 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/60">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#6E8B3D] mb-2">The Seed List</h4>
            <h3 className="text-2xl font-serif text-[#1E3D2B] mb-2">Get Health Tips & Exclusive Offers</h3>
            <p className="text-xs text-[#6B4F3F]/70 mb-8 leading-relaxed">
              Weekly Ayurveda tips, wellness routines, and special discounts — straight to your inbox.
            </p>

            <form className="relative space-y-4">
              <div className="relative flex items-center group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent w-full border-b border-[#1E3D2B]/10 outline-none text-sm py-3 focus:border-[#6E8B3D] transition-all"
                />
                <button type="button" className="absolute right-0 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1E3D2B] hover:text-[#6E8B3D] transition-all">
                  Get Started <ArrowRight size={14} />
                </button>
              </div>
              <div className="flex gap-4 opacity-50">
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={10} className="text-[#6E8B3D]" />
                  <span className="text-[9px] uppercase font-bold tracking-tighter">No spam</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={10} className="text-[#6E8B3D]" />
                  <span className="text-[9px] uppercase font-bold tracking-tighter">Unsubscribe anytime</span>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="pt-8 border-t border-[#1E3D2B]/10 flex flex-col md:flex-row justify-between items-center gap-10">
          
          <div className="order-3 md:order-1 flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1E3D2B]/40">
              © {currentYear} Leaf Burst Organics
            </span>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3D2B]/30 hover:text-[#1E3D2B] transition-colors">Privacy</Link>
              <Link to="/terms" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E3D2B]/30 hover:text-[#1E3D2B] transition-colors">Terms</Link>
            </div>
          </div>

          <div className="order-2 flex items-center gap-4">
            <div className="h-[1px] w-8 bg-[#1E3D2B]/10 hidden md:block"></div>
            <a href="https://letskillify.com" target="_blank" rel="noopener noreferrer" className="group relative py-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#6B4F3F]/60 font-medium">Digital Architecture by</span>
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-[#1E3D2B] group-hover:text-[#6E8B3D] transition-colors duration-500">
                  LetsKillify<span className="text-[#6E8B3D]">.</span>
                </span>
              </div>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#6E8B3D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
          </div>

          <div className="order-1 md:order-3">
            <button onClick={scrollToTop} className="group flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-[#1E3D2B]/10 flex items-center justify-center text-[#1E3D2B]/40 group-hover:border-[#6E8B3D] group-hover:text-[#6E8B3D] transition-all duration-500">
                <ArrowUp size={14} strokeWidth={2} className="group-hover:-translate-y-1 transition-transform" />
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#1E3D2B]/20 group-hover:text-[#6E8B3D] transition-colors">Top</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </footer>
  );
};

export default Footer;