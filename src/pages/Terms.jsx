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
          <h1 className="text-4xl md:text-6xl font-light text-[#1E3D2B] tracking-tighter">
            Terms & <span className="font-black italic text-[#6E8B3D]">Conditions</span>
          </h1>
          <p className="text-sm text-[#6B4F3F] opacity-80">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-[3.5rem] p-10 md:p-16 space-y-10">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">1. Agreement to Terms</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              By accessing and using the Leaf Burst website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our website.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">2. Products & Usage</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              Leaf Burst provides natural and herbal products including powders and leaves. These products are intended for general consumption and wellness purposes only. We do not guarantee medical results.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">3. Payments</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              All payments on this website are securely processed through third-party payment gateways including Paytm. By making a purchase, you agree to provide accurate payment details. We are not responsible for any transaction failures due to bank or gateway issues.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">4. No Return & No Refund Policy</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              All purchases made on Leaf Burst are final. We do not offer returns, exchanges, or refunds once an order is placed and confirmed. Please ensure that you review your order carefully before making a purchase.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">5. Order Acceptance & Cancellation</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              We reserve the right to refuse or cancel any order at our discretion due to product availability, pricing errors, or suspected fraudulent activity.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">6. Limitation of Liability</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              Leaf Burst shall not be held liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products or services.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">7. Changes to Terms</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              We may update these Terms and Conditions at any time without prior notice. Continued use of the website constitutes acceptance of the updated terms.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;