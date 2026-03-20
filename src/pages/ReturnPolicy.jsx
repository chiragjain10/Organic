import React from 'react';
import { RotateCcw, Box, CreditCard } from 'lucide-react';
import SEO from '../components/SEO';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <SEO
        title="Return Policy | Leaf Burst"
        description="Return and refund policy for Leaf Burst products."
      />
      <div className="max-w-[1300px] mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#6E8B3D]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6E8B3D]">Customer Satisfaction</span>
            <span className="w-8 h-[1px] bg-[#6E8B3D]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#1E3D2B] tracking-tighter">
            Return <span className="font-black italic text-[#6E8B3D]">Policy</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm text-[#6B4F3F] leading-relaxed opacity-80 pt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-[#1E3D2B]/5 shadow-sm space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <RotateCcw size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">1. 30-Day Return Window</h2>
            </div>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              We stand behind our products. If you are not completely satisfied with your purchase, you may return the item within 30 days of delivery for a full refund. The item must be unused, in its original packaging, and in the same condition that you received it.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <Box size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">2. How to Initiate a Return</h2>
            </div>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              To start a return, please contact our support team with your order number and the reason for your return. We will provide you with a return authorization label and instructions on how to send your package back to us.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <CreditCard size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">3. Refund Processing</h2>
            </div>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If approved, your refund will be processed and applied to your original method of payment within 5-7 business days.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E3D2B]">4. Non-Returnable Items</h2>
            <p className="text-[#6B4F3F] leading-relaxed text-sm">
              Certain types of items cannot be returned, like perishable goods, custom products, and personal care goods. Please get in touch if you have questions or concerns about your specific item. Unfortunately, we cannot accept returns on sale items or gift cards.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
