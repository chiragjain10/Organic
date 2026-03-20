import React from 'react';
import { Scale, FileText, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <SEO
        title="Terms & Conditions | Leaf Burst"
        description="Terms and conditions for using Leaf Burst services."
      />
      <div className="max-w-[1300px] mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#6E8B3D]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6E8B3D]">Legal Information</span>
            <span className="w-8 h-[1px] bg-[#6E8B3D]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#1E3D2B] tracking-tighter">
            Terms & <span className="font-black italic text-[#6E8B3D]">Conditions</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm text-[#6B4F3F] leading-relaxed opacity-80 pt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-[#1E3D2B]/5 shadow-sm space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <FileText size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
            </div>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              By accessing our website, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <Scale size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">2. Use License</h2>
            </div>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              Permission is granted to temporarily download one copy of the materials on Leaf Burst's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, use the materials for any commercial purpose, or remove any copyright or other proprietary notations.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <AlertCircle size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">3. Limitations & Liability</h2>
            </div>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              Leaf Burst or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Leaf Burst's Website, even if Leaf Burst or an authorized representative of this Website has been notified, orally or written, of the possibility of such damage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E3D2B]">4. Revisions and Errata</h2>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              The materials appearing on Leaf Burst's Website may include technical, typographical, or photographic errors. Leaf Burst will not promise that any of the materials in this Website are accurate, complete, or current. Leaf Burst may change the materials contained on its Website at any time without notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
