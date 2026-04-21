import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useSearchParams, useNavigate } from "react-router-dom";

// ─── Status badge config ──────────────────────────────────────────────────────
const STATUS_STYLES = {
  paid:    { bg: "bg-emerald-100", text: "text-emerald-700", label: "Paid" },
  pending: { bg: "bg-amber-100",   text: "text-amber-700",   label: "Pending" },
  failed:  { bg: "bg-red-100",     text: "text-red-700",     label: "Failed" },
  cod:     { bg: "bg-blue-100",    text: "text-blue-700",    label: "COD" },
};
function StatusBadge({ status = "" }) {
  const s = STATUS_STYLES[status.toLowerCase()] || {
    bg: "bg-gray-100", text: "text-gray-600", label: status || "Unknown",
  };
  return (
    <span className={`uppercase text-[10px] font-bold tracking-widest ${s.bg} ${s.text} px-3 py-1 rounded-full`}>
      {s.label}
    </span>
  );
}

// ─── Payment result banner (shown right after checkout redirect) ───────────────
function PaymentBanner({ status, onDismiss }) {
  if (!status) return null;
  const isSuccess = status === "success";
  return (
    <div
      className={`rounded-2xl p-5 flex items-start gap-4 mb-8 ${
        isSuccess
          ? "bg-emerald-50 border border-emerald-200"
          : "bg-red-50 border border-red-200"
      }`}
    >
      <div className={`text-3xl ${isSuccess ? "text-emerald-500" : "text-red-500"}`}>
        {isSuccess ? "✅" : "❌"}
      </div>
      <div className="flex-1">
        <p className={`font-black text-base ${isSuccess ? "text-emerald-800" : "text-red-800"}`}>
          {isSuccess ? "Payment successful — your order is confirmed!" : "Payment failed or was cancelled."}
        </p>
        <p className={`text-sm mt-1 ${isSuccess ? "text-emerald-600" : "text-red-600"}`}>
          {isSuccess
            ? "We've received your order and will start packing it shortly."
            : "No amount has been charged. You can try placing the order again."}
        </p>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className={`text-xl leading-none ${isSuccess ? "text-emerald-400 hover:text-emerald-600" : "text-red-400 hover:text-red-600"} transition-colors`}
      >
        ×
      </button>
    </div>
  );
}

export default function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paymentStatus = searchParams.get("status"); // "success" | "failed" | null

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=orders");
    }
  }, [user, navigate]);

  // Fetch orders from Firestore
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const q = query(
          collection(db, "users", user.uid, "orders"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Failed to load orders:", e.message);
      } finally {
        setLoadingOrders(false);
      }
    };
    load();
  }, [user]);

  // Dismiss banner by removing the status query param
  const dismissBanner = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <div className="max-w-[1100px] mx-auto">

        <h1 className="text-3xl font-black text-[#1E3D2B] mb-8">Order History</h1>

        {/* Payment result banner */}
        <PaymentBanner status={paymentStatus} onDismiss={dismissBanner} />

        {/* Orders list */}
        {loadingOrders ? (
          <p className="text-[#6B4F3F]">Loading your orders…</p>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-12 text-center">
            <p className="text-4xl mb-4">📦</p>
            <p className="font-black text-[#1E3D2B] text-xl mb-2">No orders yet</p>
            <p className="text-[#6B4F3F] text-sm">
              Your placed orders will appear here.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="mt-6 px-6 py-3 rounded-xl bg-[#1E3D2B] text-white font-black hover:bg-[#1E3D2B]/90 transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((o) => (
              <div
                key={o.id}
                className="bg-white rounded-[2rem] border border-[#1E3D2B]/10 p-6 md:p-8"
              >
                <div className="space-y-6">
                  {/* Header row */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b border-[#1E3D2B]/10 pb-6 gap-4">
                    <div>
                      <p className="font-black text-xl text-[#1E3D2B]">Order #{o.id}</p>
                      <p className="text-sm text-[#6B4F3F] mt-1">
                        Placed on:{" "}
                        {o.createdAt?.toDate
                          ? o.createdAt.toDate().toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "Recent"}
                      </p>
                      <p className="text-sm font-medium mt-2 flex items-center gap-2">
                        Status: <StatusBadge status={o.status} />
                      </p>
                    </div>
                    <div className="md:text-right">
                      <p className="font-black text-2xl text-[#1E3D2B]">₹{o.total}</p>
                      <p className="text-xs text-[#6B4F3F] mt-1 uppercase tracking-wider font-bold">
                        {o.items?.length || 0} item{o.items?.length !== 1 ? "s" : ""} •{" "}
                        {o.payment?.provider?.toUpperCase() || "PAYTM"}
                      </p>
                    </div>
                  </div>

                  {/* Items + Shipping grid */}
                  <div className="grid md:grid-cols-2 gap-8 pt-2">
                    {/* Items */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B4F3F] mb-4">
                        Items
                      </h4>
                      <div className="space-y-4">
                        {o.items?.map((item, i) => (
                          <div key={i} className="flex gap-4 items-center">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-xl object-cover border border-[#1E3D2B]/5"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-xl bg-slate-100 border border-[#1E3D2B]/5 flex items-center justify-center text-lg">
                                🛍
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-bold text-[#1E3D2B] line-clamp-1">
                                {item.name || item.title}
                              </p>
                              <p className="text-xs text-[#6B4F3F]">
                                Qty: {item.quantity || 1} × ₹{item.price}
                              </p>
                            </div>
                            <p className="text-sm font-black text-[#1E3D2B]">
                              ₹{(item.quantity || 1) * Number(item.price || 0)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping + Totals */}
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B4F3F] mb-4">
                        Shipping Details
                      </h4>
                      <div className="bg-[#F7F6F2] p-5 rounded-2xl">
                        <p className="text-sm font-bold text-[#1E3D2B]">
                          {o.address?.firstName} {o.address?.lastName}
                        </p>
                        <p className="text-sm text-[#6B4F3F] mt-1">
                          {o.address?.line1}
                          {o.address?.line2 && `, ${o.address.line2}`}
                        </p>
                        <p className="text-sm text-[#6B4F3F]">
                          {o.address?.city}, {o.address?.state} {o.address?.zip}
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-[#1E3D2B]/10">
                        <div className="flex justify-between text-sm mb-2 text-[#6B4F3F]">
                          <span>Subtotal</span>
                          <span>₹{o.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2 text-[#6B4F3F]">
                          <span>Shipping ({o.shipping})</span>
                          <span>{o.shippingFee ? `₹${o.shippingFee}` : "FREE"}</span>
                        </div>
                        <div className="flex justify-between text-lg font-black text-[#1E3D2B] mt-4">
                          <span>Total</span>
                          <span>₹{o.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
