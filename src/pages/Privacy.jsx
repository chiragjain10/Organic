
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
          <h1 className="text-4xl md:text-6xl font-light text-[#1E3D2B] tracking-tighter">
            Privacy <span className="font-black italic text-[#6E8B3D]">Policy</span>
          </h1>
          <p className="text-sm text-[#6B4F3F] opacity-80">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-[3.5rem] p-10 md:p-16 space-y-10">

          {/* 1 */}
          <section>
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <Eye size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">1. Information We Collect</h2>
            </div>
            <p className="text-sm text-[#6B4F3F] mt-3">
              We collect personal information such as your name, email address, phone number, shipping address, and order details when you make a purchase or contact us. We may also collect device and browsing information automatically through cookies and analytics tools.
            </p>
          </section>

          {/* 2 */}
          <section>
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <Lock size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
            </div>
            <p className="text-sm text-[#6B4F3F] mt-3">
              Your information is used to process orders, provide customer support, improve our services, and communicate important updates. We may also send promotional messages if you have opted in.
            </p>
          </section>

          {/* 3 */}
          <section>
            <div className="flex items-center gap-3 text-[#1E3D2B]">
              <ShieldCheck size={24} className="text-[#6E8B3D]" />
              <h2 className="text-2xl font-bold">3. Payment Information</h2>
            </div>
            <p className="text-sm text-[#6B4F3F] mt-3">
              All payments are processed securely through trusted third-party payment gateways such as Paytm. We do not store or have access to your card details, UPI credentials, or banking information. Payment data is handled directly by the payment provider.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">4. Data Sharing</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              We do not sell your personal information. However, we may share necessary data with third-party services such as payment gateways, delivery partners, and analytics providers to complete transactions and improve our services.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">5. Cookies & Tracking</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and understand user behavior. You can disable cookies in your browser settings if you prefer.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">6. Data Security</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              We take reasonable measures to protect your personal information using secure technologies such as SSL encryption. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">7. User Rights</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              You have the right to access, update, or delete your personal information. You may contact us for any data-related requests.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-bold text-[#1E3D2B]">8. Contact Us</h2>
            <p className="text-sm text-[#6B4F3F] mt-3">
              If you have any questions regarding this Privacy Policy, you can contact us at leafburst99@gmail.com.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Privacy;
