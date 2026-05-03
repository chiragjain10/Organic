import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShopData } from "../components/ShopDataProvider";
import { useAuth } from "../components/useAuth";
import { ShieldCheck, Truck, MapPin, Phone, User, ArrowRight, Lock } from "lucide-react";
import SEO from "../components/SEO";

const loadScript = (src) =>
  new Promise((resolve) => {
    // Avoid loading the same script twice
    if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
    const script = document.createElement("script");
    script.src = src;
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Field = ({ label, name, type = "text", placeholder, value, onChange, error }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B4F3F]">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-5 py-4 rounded-2xl bg-white border text-[#1E3D2B] font-medium text-sm outline-none transition-all focus:ring-2 focus:ring-[#6E8B3D]/30 ${
        error
          ? "border-red-400 focus:border-red-400"
          : "border-[#6E8B3D]/20 focus:border-[#6E8B3D]/60"
      }`}
    />
    {error && (
      <p className="text-[10px] text-red-500 font-bold">{error}</p>
    )}
  </div>
);

const Checkout = () => {
  const navigate  = useNavigate();
  const { user }  = useAuth();
  const shop      = useShopData();
  const items     = shop?.cartItems || [];
  const total     = items.reduce((sum, i) => sum + Number(i.price || 0), 0);

  const [form, setForm] = useState({
    name   : user?.displayName || "",
    phone  : "",
    address: "",
    city   : "",
    state  : "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())              e.name    = "Name is required";
    if (!/^\d{10}$/.test(form.phone))   e.phone   = "Valid 10-digit phone required";
    if (!form.address.trim())           e.address = "Address is required";
    if (!form.city.trim())              e.city    = "City is required";
    if (!form.state.trim())             e.state   = "State is required";
    if (!/^\d{6}$/.test(form.pincode))  e.pincode = "Valid 6-digit PIN required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handlePay = async () => {
    if (!validate()) return;
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create order on backend
      const resp = await fetch("/api/create-order", {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({
          amount: String(total.toFixed(2)),
          phone : form.phone,
        }),
      });

      const order = await resp.json();
      if (!resp.ok || !order?.txnToken) {
        throw new Error(order?.error || "Order creation failed");
      }

      // Step 2: Load Paytm CheckoutJS from correct gateway
      const host       = order.paytmHost || "securegw.paytm.in";
      const merchantId = order.mid       || "YTxVaZ24286063946762";
      const ok = await loadScript(
        `https://${host}/merchantpgpui/checkoutjs/merchants/${merchantId}.js`
      );
      if (!ok) throw new Error("Failed to load payment gateway");

      // Step 3: Open Paytm checkout
      const config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId  : order.orderId,
          token    : order.txnToken,
          tokenType: "TXN_TOKEN",
          amount   : String(total.toFixed(2)),
        },
        handler: {
          notifyMerchant(eventName, data) {
            console.log("[Paytm] notify:", eventName, data);
          },
          async transactionStatus(data) {
            window.Paytm?.CheckoutJS?.close();
            console.log("[Paytm] status:", data);
            if (data.STATUS === "TXN_SUCCESS") {
              alert("🎉 Payment successful! Your order has been placed.");
              navigate("/orders");
            } else {
              alert("Payment was not completed. Status: " + (data.STATUS || "Unknown"));
              setLoading(false);
            }
          },
        },
      };

      if (window.Paytm?.CheckoutJS) {
        window.Paytm.CheckoutJS.init(config)
          .then(() => window.Paytm.CheckoutJS.invoke())
          .catch((err) => {
            console.error("[Paytm] init error:", err);
            alert("Payment gateway error. Please try again.");
            setLoading(false);
          });
      } else {
        throw new Error("Payment gateway not loaded. Please refresh and retry.");
      }

    } catch (err) {
      console.error("[Checkout] Pay error:", err.message);
      alert("Payment failed: " + err.message);
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] pt-36 pb-20 flex flex-col items-center justify-center gap-6">
        <p className="text-2xl font-black text-[#1E3D2B]">Your cart is empty.</p>
        <button
          onClick={() => navigate("/shop")}
          className="px-10 py-4 bg-[#6E8B3D] text-white rounded-2xl font-black hover:bg-[#1E3D2B] transition-all"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-20">
      <SEO
        title="Checkout | Leaf Burst"
        description="Secure checkout for your Leaf Burst organic products."
        noindex={true}
      />
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6E8B3D] mb-3">
            Secure Checkout
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-[#1E3D2B] tracking-tighter leading-none">
            Almost <span className="text-[#6E8B3D]">There</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">
          {/* Left — Delivery Form */}
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] border border-[#6E8B3D]/20 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#F7F6F2] border border-[#6E8B3D]/20 flex items-center justify-center text-[#2F6F4E]">
                  <MapPin size={18} />
                </div>
                <p className="font-black text-[#1E3D2B] text-sm uppercase tracking-widest">Delivery Address</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <Field 
                    label="Full Name" 
                    name="name" 
                    placeholder="Your full name" 
                    value={form.name} 
                    onChange={handleChange} 
                    error={errors.name} 
                  />
                </div>
                <div className="sm:col-span-2">
                  <Field 
                    label="Phone Number" 
                    name="phone" 
                    type="tel" 
                    placeholder="10-digit mobile number" 
                    value={form.phone} 
                    onChange={handleChange} 
                    error={errors.phone} 
                  />
                </div>
                <div className="sm:col-span-2">
                  <Field 
                    label="Street Address" 
                    name="address" 
                    placeholder="House no., street, area" 
                    value={form.address} 
                    onChange={handleChange} 
                    error={errors.address} 
                  />
                </div>
                <Field 
                  label="City" 
                  name="city" 
                  placeholder="City" 
                  value={form.city} 
                  onChange={handleChange} 
                  error={errors.city} 
                />
                <Field 
                  label="State" 
                  name="state" 
                  placeholder="State" 
                  value={form.state} 
                  onChange={handleChange} 
                  error={errors.state} 
                />
                <div className="sm:col-span-2">
                  <Field 
                    label="PIN Code" 
                    name="pincode" 
                    placeholder="6-digit PIN" 
                    value={form.pincode} 
                    onChange={handleChange} 
                    error={errors.pincode} 
                  />
                </div>
              </div>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, label: "100% Secure" },
                { icon: Lock,        label: "Encrypted" },
                { icon: Truck,       label: "Fast Delivery" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-[24px] bg-white border border-[#6E8B3D]/20 text-center">
                  <Icon size={20} className="text-[#2F6F4E]" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#6B4F3F]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Order Summary */}
          <aside className="sticky top-32">
            <div className="bg-white rounded-[40px] border border-[#6E8B3D]/20 shadow-sm p-8 space-y-6">
              <p className="font-black text-[#1E3D2B] text-sm uppercase tracking-widest">Order Summary</p>

              {/* Items */}
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F7F6F2] border border-[#6E8B3D]/20 flex-shrink-0">
                      <img
                        src={item.image || item.images?.[0]}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1E3D2B] text-sm truncate">{item.title || item.name}</p>
                      <p className="text-[10px] text-[#6B4F3F] font-bold">Qty: {item.quantity || 1}</p>
                    </div>
                    <span className="font-black text-[#1E3D2B] text-sm">₹{Number(item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-dashed border-[#6E8B3D]/30 pt-5 space-y-3">
                <div className="flex justify-between text-sm text-[#6B4F3F] font-medium">
                  <span>Subtotal</span>
                  <span className="text-[#1E3D2B] font-bold">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6B4F3F] font-medium">
                  <span>Shipping</span>
                  <span className="text-[#2F6F4E] font-bold">Free</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#6E8B3D]/20">
                  <span className="font-black text-[#1E3D2B] uppercase tracking-widest text-xs">Total</span>
                  <span className="text-3xl font-black text-[#2F6F4E]">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-[#1E3D2B] text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-[#6E8B3D] transition-all shadow-xl shadow-[#1E3D2B]/20 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Pay ₹{total.toFixed(2)} via Paytm
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-[#6B4F3F]/60 font-medium">
                🔒 Payments secured by Paytm. We never store your card details.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
