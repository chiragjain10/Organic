import React from 'react';
import { Eye, Lock, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <SEO
        title="Privacy Policy | Leaf Burst"
        description="Privacy policy and data handling practices at Leaf Burst."
      />
      <div className="max-w-[1300px] mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#6E8B3D]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6E8B3D]">Data Security</span>
            <span className="w-8 h-[1px] bg-[#6E8B3D]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#1E3D2B] tracking-tighter">
            Privacy <span className="font-black italic text-[#6E8B3D]">Policy</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm text-[#6B4F3F] leading-relaxed opacity-80 pt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-[#1E3D2B]/5 shadow-sm space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <Eye size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">1. Information We Collect</h2>
            </div>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              We collect information you provide directly to us when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, shipping address, and payment information. We also automatically collect certain information about your device and how you interact with our website.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <Lock size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
            </div>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              We use the information we collect to process your orders, communicate with you about your purchases, improve our services, and send you marketing communications (if you have opted in). We do not sell your personal data to third parties. Your data is solely used to enhance your experience with Leaf Burst.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <ShieldCheck size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">3. Data Security & Protection</h2>
            </div>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              We implement a variety of security measures to maintain the safety of your personal information. Your transactions are processed through secure gateway providers and are not stored or processed on our servers. We use regular malware scanning and SSL technology to protect your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E3D2B]">4. Cookies and Tracking</h2>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              Our website uses cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
