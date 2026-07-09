import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Copy, Receipt } from "lucide-react";
import SEO from "../components/SEO";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID        = "service_leafburst";
const EMAILJS_TEMPLATE_ID       = "template_crc6imx";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_b5v8smy";
const EMAILJS_PUBLIC_KEY        = "Gpcqfih8IqMB4QUzb";
const ADMIN_EMAIL               = "sales@leafburst.in";

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const navigate  = useNavigate();
  const { user }  = useAuth();
  
  const orderId = searchParams.get("orderId");
  const txnId   = searchParams.get("txnId");
  const amount  = searchParams.get("amount");
  
  const [orderDetails, setOrderDetails] = useState(null);

  // Process sessionStorage and save to Firestore, or fetch if already processed
  useEffect(() => {
    if (!orderId) {
      navigate("/orders", { replace: true });
      return;
    }
    
    if (!user) return; // wait for auth

    const processOrder = async () => {
      const sessionKey = "pendingOrder_" + orderId;
      const pendingDataStr = sessionStorage.getItem(sessionKey);
      
      if (pendingDataStr) {
        try {
          const pendingData = JSON.parse(pendingDataStr);
          
          // 1. Save to Firestore
          const orderRef = doc(db, "users", user.uid, "orders", orderId);
          await setDoc(orderRef, {
            orderId   : orderId,
            status    : "paid",
            total     : pendingData.total || (amount ? String(Number(amount).toFixed(2)) : "0"),
            subtotal  : pendingData.total || (amount ? String(Number(amount).toFixed(2)) : "0"),
            shipping  : "Free",
            shippingFee: 0,
            payment   : { provider: "paytm", txnId: txnId || "", status: "TXN_SUCCESS" },
            address   : pendingData.address,
            items     : pendingData.items,
            createdAt : serverTimestamp(),
          });
          console.log("[Firestore] Order saved from ThankYou pass-through:", orderId);

          // 2. Send Emails
          try {
            const orderItemsList = pendingData.items
              .map((item) => `${item.title || item.name} (Qty: ${item.quantity || 1}) — ₹${Number(item.price).toFixed(2)}`)
              .join("\n");

            const emailPayload = {
              to_name         : pendingData.customerName || "Customer",
              to_email        : pendingData.customerEmail || "",
              order_id        : orderId,
              order_amount    : `₹${pendingData.total}`,
              order_items     : orderItemsList,
              delivery_address: `${pendingData.address.line1}, ${pendingData.address.city}, ${pendingData.address.state} — ${pendingData.address.zip}`,
              phone           : pendingData.address.phone,
              customer_email  : pendingData.customerEmail || "N/A",
            };

            const [custResult, adminResult] = await Promise.allSettled([
              emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailPayload, EMAILJS_PUBLIC_KEY),
              emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID, { ...emailPayload, to_email: ADMIN_EMAIL }, EMAILJS_PUBLIC_KEY),
            ]);
            if (custResult.status === "fulfilled") console.log("[EmailJS] Customer email sent.");
            if (adminResult.status === "fulfilled") console.log("[EmailJS] Admin email sent.");
          } catch (e) {
            console.error("[EmailJS] Failed", e);
          }

          // 3. Clean up and set local state
          sessionStorage.removeItem(sessionKey);
          setOrderDetails({
            orderId,
            txnId,
            total: pendingData.total,
            items: pendingData.items,
            customerName: pendingData.customerName,
            address: pendingData.address
          });

        } catch (e) {
          console.error("Failed to process order from sessionStorage:", e);
        }
      } else {
        // Already processed (refresh), just fetch from DB
        try {
          const docSnap = await getDoc(doc(db, "users", user.uid, "orders", orderId));
          if (docSnap.exists()) {
            const d = docSnap.data();
            setOrderDetails({
              orderId,
              txnId: d.payment?.txnId || txnId,
              total: d.total,
              items: d.items,
              customerName: d.address?.firstName,
              address: d.address
            });
          }
        } catch (e) {
           console.error("Failed to fetch order details from Firestore:", e);
        }
      }
    };
    
    processOrder();
  }, [orderId, txnId, amount, user, navigate]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] pt-36 pb-20 flex flex-col items-center justify-center gap-6">
        <div className="w-8 h-8 border-4 border-[#6E8B3D]/20 border-t-[#6E8B3D] rounded-full animate-spin" />
        <p className="text-sm font-bold text-[#6B4F3F]">Finalising your order...</p>
      </div>
    );
  }

  const {
    total,
    items = [],
    customerName,
    address,
  } = orderDetails;

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
