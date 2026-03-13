import React from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <SEO
        title="Contact | Leaf Burst"
        description="Get in touch with Leaf Burst. Questions on products, orders, or wholesale? We respond within 24 hours."
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/contact` : undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Leaf Burst",
          "url": typeof window !== 'undefined' ? `${window.location.origin}/contact` : "https://example.com/contact"
        }}
      />
      <div className="max-w-[1300px] mx-auto space-y-8">
        
        {/* --- HEADER POD --- */}
        <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-sm border border-[#1E3D2B]/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#6E8B3D]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6E8B3D]">Connect With Us</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-light text-[#1E3D2B] leading-[0.85] tracking-tighter mb-8">
              Let’s Start <br />
              <span className="font-black italic text-[#6E8B3D]">The Ritual.</span>
            </h1>
            <p className="text-lg text-[#6B4F3F] leading-relaxed opacity-70">
              Have a question or need guidance? Our team is here to help you navigate your wellness journey with expert care and transparency.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* --- LEFT: CONCIERGE INFO POD --- */}
          <div className="lg:col-span-4 space-y-8">
            {/* Contact Details Card */}
            <div className="bg-[#1E3D2B] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6E8B3D]/20 rounded-full blur-3xl" />
              
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6E8B3D] mb-12">Concierge Details</h3>
              
              <div className="space-y-10">
                {[
                  { icon: Mail, label: "Correspondence", val: "leafburst99@gmail.com", link: "mailto:leafburst99@gmail.com" },
                  { icon: Phone, label: "Direct Line", val: "+91 9343173959", link: "tel:+919343173959" },
                  { icon: MessageCircle, label: "WhatsApp", val: "+91 9343173959", link: "https://wa.me/919343173959" }
                ].map((item, i) => (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="group block">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">{item.label}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium tracking-tight group-hover:text-[#6E8B3D] transition-colors">{item.val}</p>
                      <item.icon size={18} className="text-[#6E8B3D] opacity-40 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40">Response Time</p>
                  <p className="text-sm font-medium mt-1">Within 24 Hours</p>
                </div>
                <Clock size={20} className="text-[#6E8B3D]" />
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-[#1E3D2B]/5 flex items-center gap-6 group hover:border-[#6E8B3D]/30 transition-all duration-500 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#1E3D2B] group-hover:bg-[#6E8B3D] group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#6B4F3F]">Main Facility</p>
                <p className="text-lg font-bold text-[#1E3D2B]">Ratlam (M.P.), India</p>
              </div>
            </div>
          </div>

          {/* --- RIGHT: THE INQUIRY FORM POD --- */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-[#1E3D2B]/5 shadow-sm relative">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-[#1E3D2B] tracking-tight">Send an Inquiry</h2>
                <p className="text-sm text-[#6B4F3F] mt-2 opacity-60">Reach out to us for product advice or order support.</p>
              </div>

              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="relative">
                    <input type="text" className="peer w-full bg-transparent border-b border-[#1E3D2B]/10 py-3 text-[#1E3D2B] focus:border-[#6E8B3D] outline-none transition-all placeholder-transparent" placeholder="Name" id="name" />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-[#6B4F3F] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B4F3F]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#6E8B3D]">Full Name *</label>
                  </div>
                  <div className="relative">
                    <input type="email" className="peer w-full bg-transparent border-b border-[#1E3D2B]/10 py-3 text-[#1E3D2B] focus:border-[#6E8B3D] outline-none transition-all placeholder-transparent" placeholder="Email" id="email" />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-[#6B4F3F] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B4F3F]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#6E8B3D]">Email Address *</label>
                  </div>
                </div>

                <div className="relative">
                  <select className="peer w-full bg-transparent border-b border-[#1E3D2B]/10 py-3 text-[#1E3D2B] focus:border-[#6E8B3D] outline-none transition-all appearance-none cursor-pointer">
                    <option>Product Guidance</option>
                    <option>Order Assistance</option>
                    <option>Wholesale Inquiry</option>
                    <option>Feedback</option>
                  </select>
                  <label className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-[#6B4F3F]">Nature of Inquiry</label>
                </div>

                <div className="relative">
                  <textarea rows="4" className="peer w-full bg-transparent border-b border-[#1E3D2B]/10 py-3 text-[#1E3D2B] focus:border-[#6E8B3D] outline-none transition-all resize-none placeholder-transparent" placeholder="Message" id="message" />
                  <label htmlFor="message" className="absolute left-0 -top-3.5 text-[10px] font-black uppercase tracking-widest text-[#6B4F3F] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#6B4F3F]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#6E8B3D]">Message *</label>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6">
                  <div className="flex gap-6">
                    {[Instagram, Twitter, ArrowRight].map((Icon, i) => (
                      <button key={i} className="text-[#1E3D2B]/40 hover:text-[#6E8B3D] transition-colors">
                        {i === 2 ? <span className="text-[10px] font-black uppercase tracking-widest">Follow Us</span> : <Icon size={18} />}
                      </button>
                    ))}
                  </div>

                  <button className="group relative bg-[#6E8B3D] hover:bg-[#1E3D2B] text-white px-12 py-5 rounded-2xl transition-all duration-500 overflow-hidden shadow-xl shadow-[#6E8B3D]/20">
                    <div className="relative z-10 flex items-center gap-3">
                      <span className="text-[11px] font-black uppercase tracking-widest">Send Message</span>
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* --- BOTTOM: THE TRUST BAR --- */}
        <div className="bg-[#E5E3DB]/30 rounded-[2.5rem] p-10 flex flex-wrap justify-center items-center gap-x-20 gap-y-6">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1E3D2B]/30 w-full text-center lg:w-auto">Purity Standards</p>
           {['ISO CERTIFIED', 'GMP COMPLIANT', 'AYUSH VERIFIED', 'LAB TESTED'].map((brand) => (
             <span key={brand} className="text-[#1E3D2B]/20 font-serif text-2xl font-bold grayscale hover:grayscale-0 hover:text-[#6E8B3D] transition-all cursor-default">
               {brand}
             </span>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
