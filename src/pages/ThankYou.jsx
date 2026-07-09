import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Copy, Receipt } from "lucide-react";
import SEO from "../components/SEO";

export default function ThankYou() {
  const { state } = useLocation();
  const navigate  = useNavigate();

  // If someone lands here without coming from checkout, redirect to orders
  useEffect(() => {
    if (!state?.orderId) {
      navigate("/orders", { replace: true });
    }
  }, [state, navigate]);

  if (!state?.orderId) return null;

  const {
    orderId,
    txnId,
    total,
    items = [],
    customerName,
    address,
  } = state;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-28 pb-20 px-4">
      <SEO
        title="Order Confirmed | Leaf Burst"
        description="Your order has been placed successfully."
        noindex={true}
      />

      <div className="max-w-[680px] mx-auto">

        {/* ── Success Banner ─────────────────────────────────────────── */}
        <div className="bg-[#1E3D2B] rounded-[48px] p-10 md:p-14 text-center mb-8 relative overflow-hidden shadow-2xl shadow-[#1E3D2B]/30">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6E8B3D]/10 rounded-full blur-[100px]" />
          </div>

          {/* Animated checkmark */}
          <div className="relative z-10 flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-[#6E8B3D]/20 border-2 border-[#6E8B3D]/40 flex items-center justify-center animate-[scale-in_0.4s_ease-out]">
              <CheckCircle size={48} className="text-[#6E8B3D]" strokeWidth={1.5} />
            </div>
          </div>

          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[#6E8B3D] mb-3 relative z-10">
            Payment Successful
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-4 relative z-10">
            Thank You,<br />
            <span className="text-[#6E8B3D]">{customerName?.split(" ")[0] || "Friend"}!</span>
          </h1>
          <p className="text-white/60 text-sm font-medium relative z-10">
            Your order has been placed and a confirmation email has been sent to you.
          </p>
        </div>

        {/* ── Order & Transaction IDs ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Order ID */}
          <div className="bg-white rounded-3xl border border-[#6E8B3D]/20 p-6 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B4F3F] mb-2">
              Order ID
            </p>
            <div className="flex items-center justify-between gap-2">
              <p className="font-black text-[#1E3D2B] text-sm truncate">{orderId}</p>
              <button
                onClick={() => copyToClipboard(orderId)}
                className="p-2 rounded-xl hover:bg-[#F7F6F2] text-[#6B4F3F] hover:text-[#1E3D2B] transition-colors flex-shrink-0"
                title="Copy Order ID"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="bg-white rounded-3xl border border-[#6E8B3D]/20 p-6 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B4F3F] mb-2">
              Transaction ID (Paytm)
            </p>
            <div className="flex items-center justify-between gap-2">
              <p className="font-black text-[#1E3D2B] text-sm truncate">
                {txnId || "—"}
              </p>
              {txnId && (
                <button
                  onClick={() => copyToClipboard(txnId)}
                  className="p-2 rounded-xl hover:bg-[#F7F6F2] text-[#6B4F3F] hover:text-[#1E3D2B] transition-colors flex-shrink-0"
                  title="Copy Transaction ID"
                >
                  <Copy size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Order Summary ───────────────────────────────────────────── */}
        <div className="bg-white rounded-[40px] border border-[#6E8B3D]/20 shadow-sm p-8 mb-6">

          {/* Items */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#F7F6F2] border border-[#6E8B3D]/20 flex items-center justify-center text-[#2F6F4E]">
              <Package size={16} />
            </div>
            <p className="font-black text-[#1E3D2B] text-sm uppercase tracking-widest">
              Items Ordered
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border border-[#6E8B3D]/10 flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-[#F7F6F2] border border-[#6E8B3D]/10 flex items-center justify-center text-xl flex-shrink-0">
                    🛍
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1E3D2B] text-sm truncate">{item.name}</p>
                  <p className="text-[11px] text-[#6B4F3F] font-bold">
                    Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)}
                  </p>
                </div>
                <span className="font-black text-[#1E3D2B] text-sm flex-shrink-0">
                  ₹{((item.quantity || 1) * Number(item.price || 0)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Delivery address */}
          {address && (
            <div className="bg-[#F7F6F2] rounded-2xl p-5 mb-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B4F3F] mb-2">
                Delivering To
              </p>
              <p className="text-sm font-bold text-[#1E3D2B]">{address.firstName}</p>
              <p className="text-sm text-[#6B4F3F] mt-0.5">{address.line1}</p>
              <p className="text-sm text-[#6B4F3F]">
                {address.city}, {address.state} — {address.zip}
              </p>
              {address.phone && (
                <p className="text-sm text-[#6B4F3F] mt-1">📞 {address.phone}</p>
              )}
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center pt-5 border-t border-dashed border-[#6E8B3D]/30">
            <div className="flex items-center gap-2 text-[#6B4F3F]">
              <Receipt size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Total Paid</span>
            </div>
            <span className="text-3xl font-black text-[#2F6F4E]">₹{total}</span>
          </div>
        </div>

        {/* ── CTA Buttons ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/orders"
            className="flex-1 flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-[#1E3D2B] text-white font-black text-sm uppercase tracking-[0.15em] hover:bg-[#6E8B3D] transition-all shadow-xl shadow-[#1E3D2B]/20"
          >
            <Package size={16} />
            View My Orders
          </Link>
          <Link
            to="/shop"
            className="flex-1 flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-white border border-[#6E8B3D]/30 text-[#1E3D2B] font-black text-sm uppercase tracking-[0.15em] hover:border-[#1E3D2B] transition-all"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
