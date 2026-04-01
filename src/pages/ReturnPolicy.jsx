
import React from 'react';
import { AlertCircle, Box, CreditCard } from 'lucide-react';
import SEO from '../components/SEO';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <SEO
        title="Return & Refund Policy | Leaf Burst"
        description="Return and refund policy for Leaf Burst products."
      />
      <div className="max-w-[1300px] mx-auto space-y-12">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-light text-[#1E3D2B] tracking-tighter">
            Return & <span className="font-black italic text-[#6E8B3D]">Refund Policy</span>
          </h1>
          <p className="text-sm text-[#6B4F3F] opacity-80">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-[3.5rem] p-10 md:p-16 space-y-10">

          {/* 1 */}
          <section>
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <AlertCircle size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">1. No Return Policy</h2>
            </div>
            <p className="text-sm text-[#6B4F3F] mt-3">
              All products sold on Leaf Burst are non-returnable. Due to the nature of our products (herbal and consumable items), we do not accept returns once the order has been delivered.
            </p>
          </section>

          {/* 2 */}
          <section>
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <Box size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">2. No Refund Policy</h2>
            </div>
            <p className="text-sm text-[#6B4F3F] mt-3">
              All purchases made on our website are final. We do not provide refunds, cancellations, or exchanges once an order is successfully placed and processed.
            </p>
          </section>

          {/* 3 */}
          <section>
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <CreditCard size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">3. Exceptions (Damaged or Wrong Product)</h2>
            </div>
            <p className="text-sm text-[#6B4F3F] mt-3">
              In case you receive a damaged or incorrect product, you must notify us within 24 hours of delivery with proper proof (photos/videos). We will review the issue and may offer a replacement at our sole discretion.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">4. Contact Us</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              For any issues regarding your order, please contact our support team at leafburst99@gmail.com.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
