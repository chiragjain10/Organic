import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useShopData } from "../components/ShopDataProvider";

// ─── Utility: dynamically load an external script ───────────────────────────
function loadScript(src) {
  return new Promise((resolve) => {
    // Avoid injecting the same script twice
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const { user } = useAuth();
  const shop = useShopData();
  const items = shop?.cartItems || [];
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    line1: "",
    line2: "",
    zip: "",
    city: "",
    state: "",
  });
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("paytm");
  const navigate = useNavigate();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=checkout");
    }
  }, [user, navigate]);

  // ─── Price calculations ────────────────────────────────────────────────────
  const subtotal = items.reduce(
    (s, i) => s + Number(i.price || 0) * Number(i.quantity || 1),
    0
  );
  const shippingFee = shipping === "express" ? 80 : 0;
  const total = subtotal + shippingFee;

  // ─── Form validation ──────────────────────────────────────────────────────
  const validateForm = () => {
    if (
      !address.firstName ||
      !address.lastName ||
      !address.line1 ||
      !address.city ||
      !address.zip ||
      !address.state
    ) {
      alert("Please fill all required shipping address fields.");
      return false;
    }
    if (items.length === 0) {
      alert("Your cart is empty.");
      return false;
    }
    return true;
  };

  // ─── Create order document in Firestore ───────────────────────────────────
  // Returns the newly created order ID so callers can update it later.
  const placeOrderDoc = async (status, paymentInfo = {}) => {
    const orderData = {
      userId: user.uid,
      customerEmail: user.email,
      customerName: `${address.firstName} ${address.lastName}`,
      items,
      address,
      shipping,
      paymentMethod: paymentInfo.provider || "paytm",
      subtotal,
      shippingFee,
      total,
      status,
      payment: paymentInfo,
      createdAt: serverTimestamp(),
    };

    // Write to the user's sub-collection and the top-level orders collection
    const userOrdersCol = collection(db, "users", user.uid, "orders");
    const userOrderRef = await addDoc(userOrdersCol, orderData);
    await setDoc(doc(db, "orders", userOrderRef.id), orderData);

    // Fire-and-forget notification email
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `New Order ${userOrderRef.id}`,
          text: `Order ${userOrderRef.id}\nTotal: ₹${total}\nShipping: ${shipping}\nCustomer: ${orderData.customerName}\nAddress: ${address.line1}, ${address.city} ${address.zip}`,
        }),
      });
    } catch (e) {
      console.warn("Email notification failed:", e.message);
    }

    return userOrderRef.id;
  };

  // ─── Update order status after payment resolves ───────────────────────────
  const updateOrderStatus = async (orderId, status, paymentInfo = {}) => {
    try {
      const updatePayload = { status, payment: paymentInfo, updatedAt: serverTimestamp() };
      // Update both copies
      await updateDoc(doc(db, "orders", orderId), updatePayload);
      await updateDoc(
        doc(db, "users", user.uid, "orders", orderId),
        updatePayload
      );
    } catch (e) {
      console.error("Failed to update order status:", e.message);
    }
  };

  // ─── Paytm payment flow ───────────────────────────────────────────────────
  const payWithPaytm = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      // 1. Request a transaction token from the backend
      const resp = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          email: user.email,
          phone: "9999999999",
        }),
      });

      const data = await resp.json();

      if (!resp.ok || !data.txnToken) {
        // Include Paytm resultCode in the message so we can diagnose from the browser
        const code = data.resultCode ? ` [Code: ${data.resultCode}]` : "";
        throw new Error((data.error || "Failed to initiate payment") + code);
      }

      // 2. Persist the order with "pending" status BEFORE opening the gateway
      //    Capture the orderId so we can update it after payment.
      const orderId = await placeOrderDoc("pending", {
        provider: "paytm",
        paytmOrderId: data.orderId,
      });

      // 3. Load Paytm Checkout JS from the SAME gateway that issued the token.
      // Staging tokens only work with the staging script and vice versa.
      // The backend returns which host was used via data.paytmHost.
      const paytmHost = data.paytmHost || "securegw.paytm.in";
      const scriptLoaded = await loadScript(
        `https://${paytmHost}/merchantpgpui/checkoutjs/merchants.js`
      );
      if (!scriptLoaded) {
        throw new Error("Failed to load Paytm Checkout script");
      }

      // 4. Configure and invoke the Paytm checkout
      const config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: data.orderId,
          token: data.txnToken,
          tokenType: "TXN_TOKEN",
          amount: String(data.amount),
        },
        handler: {
          notifyMerchant(eventName, eventData) {
            console.log("Paytm notifyMerchant =>", eventName, eventData);
            // Handle cases like PAYMENT_ABORTED
            if (eventName === "APP_CLOSED" || eventName === "PAYMENT_ABORTED") {
              setLoading(false);
            }
          },
          async transactionStatus(paymentStatus) {
            console.log("Paytm transactionStatus =>", paymentStatus);
            window.Paytm?.CheckoutJS?.close();

            const isSuccess = paymentStatus.STATUS === "TXN_SUCCESS";
            const newStatus = isSuccess ? "paid" : "failed";

            // 5. Update the Firestore order with the actual payment result
            await updateOrderStatus(orderId, newStatus, {
              provider: "paytm",
              paytmOrderId: data.orderId,
              txnId: paymentStatus.TXNID || "",
              bankTxnId: paymentStatus.BANKTXNID || "",
              status: paymentStatus.STATUS,
              responseCode: paymentStatus.RESPCODE || "",
              responseMsg: paymentStatus.RESPMSG || "",
            });

            setLoading(false);
            navigate(isSuccess ? "/orders?status=success" : "/orders?status=failed");
          },
        },
      };

      if (window.Paytm && window.Paytm.CheckoutJS) {
        window.Paytm.CheckoutJS.init(config)
          .then(() => window.Paytm.CheckoutJS.invoke())
          .catch((error) => {
            console.error("Paytm init error =>", error);
            alert("Payment gateway error. Please try again.");
            setLoading(false);
          });
      } else {
        throw new Error("Paytm CheckoutJS is not available.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert(err.message);
      setLoading(false);
    }
    // NOTE: We do NOT put setLoading(false) in a finally block here because the
    // Paytm gateway runs asynchronously via callbacks after this function returns.
    // Loading state is cleared inside each callback path above.
  };

  // ─── Main order handler ───────────────────────────────────────────────────
  const handlePlaceOrder = async () => {
    if (payment === "paytm") {
      await payWithPaytm();
    } else {
      // Cash on Delivery
      if (!validateForm()) return;
      setLoading(true);
      try {
        const orderId = await placeOrderDoc("pending", { provider: "cod" });
        console.log("COD order placed:", orderId);
        navigate("/orders");
      } catch (err) {
        console.error("COD order error:", err);
        alert("Failed to place order. Please try again.");
      } finally {
        // Always reset loading for COD, even on error
        setLoading(false);
      }
    }
  };

  // ─── Loading screen ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center font-black text-[#1E3D2B]">
        Processing your order…
      </div>
    );
  }

  // ─── Checkout UI ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">

          {/* Step 1: Shipping Address */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Shipping address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none"
                placeholder="First name *"
                value={address.firstName}
                onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
              />
              <input
                className="border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none"
                placeholder="Last name *"
                value={address.lastName}
                onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
              />
              <input
                className="md:col-span-2 border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none"
                placeholder="Address line 1 *"
                value={address.line1}
                onChange={(e) => setAddress({ ...address, line1: e.target.value })}
              />
              <input
                className="md:col-span-2 border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none"
                placeholder="Address line 2 (optional)"
                value={address.line2}
                onChange={(e) => setAddress({ ...address, line2: e.target.value })}
              />
              <input
                className="border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none"
                placeholder="ZIP / Postal Code *"
                value={address.zip}
                onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              />
              <input
                className="border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none"
                placeholder="City *"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
              <input
                className="border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none md:col-span-2"
                placeholder="State / Province *"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
              />
            </div>
          </div>

          {/* Step 2: Shipping Method */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Shipping method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="ship"
                  checked={shipping === "standard"}
                  onChange={() => setShipping("standard")}
                  className="accent-[#1E3D2B]"
                />
                <span className="flex-1 font-medium">Standard Shipping</span>
                <span className="text-[#1E3D2B] font-black">Free</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="ship"
                  checked={shipping === "express"}
                  onChange={() => setShipping("express")}
                  className="accent-[#1E3D2B]"
                />
                <span className="flex-1 font-medium">Express Shipping (Next Day)</span>
                <span className="text-[#1E3D2B] font-black">₹80</span>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Payment method</h3>
            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                  payment === "paytm" ? "bg-gray-50 border-[#1E3D2B]/20" : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="pay"
                  checked={payment === "paytm"}
                  onChange={() => setPayment("paytm")}
                  className="accent-[#1E3D2B]"
                />
                <span className="flex-1 font-medium">Pay with Paytm (Secure Gateway)</span>
                <span className="text-[10px] bg-[#1E3D2B] text-white px-2 py-1 rounded-full uppercase font-black">
                  Safe
                </span>
              </label>

              <label
                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                  payment === "cod" ? "bg-gray-50 border-[#1E3D2B]/20" : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="pay"
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                  className="accent-[#1E3D2B]"
                />
                <span className="flex-1 font-medium">Cash on Delivery (COD)</span>
                <span className="text-[10px] border border-[#1E3D2B] text-[#1E3D2B] px-2 py-1 rounded-full uppercase font-black">
                  Popular
                </span>
              </label>
              <p className="text-xs text-[#6B4F3F]/60 ml-8">
                Pay securely in cash or via UPI when your package arrives at your doorstep.
              </p>
            </div>
          </div>

          {/* Step 4: Review & Place */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Review &amp; place order</h3>
            <button
              disabled={items.length === 0}
              onClick={handlePlaceOrder}
              className="px-8 py-4 rounded-2xl bg-[#1E3D2B] text-white font-black w-full hover:bg-[#1E3D2B]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
            >
              Place Order (₹{total})
            </button>

            <div className="mt-8 pt-6 border-t border-[#1E3D2B]/5 space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B] mb-1">
                  Intellectual Property Rights
                </p>
                <p className="text-[10px] leading-relaxed text-[#6B4F3F]/60">
                  All content, artwork, and designs on this platform are the exclusive property of{" "}
                  <strong>Leaf Burst</strong>. Unauthorized reproduction or use is strictly prohibited.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B] mb-1">
                  Jurisdiction Clause
                </p>
                <p className="text-[10px] leading-relaxed text-[#6B4F3F]/60">
                  All disputes and legal matters are subject to the exclusive jurisdiction of the courts in{" "}
                  <strong>Indore, Madhya Pradesh</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6 sticky top-32">
            <h3 className="text-lg font-black text-[#1E3D2B] mb-6 border-b pb-4">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-[#6B4F3F]">
                <span>Subtotal</span>
                <span className="font-black text-[#1E3D2B]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-[#6B4F3F]">
                <span>Shipping ({shipping})</span>
                <span className="font-black text-[#1E3D2B]">
                  {shippingFee ? `₹${shippingFee}` : "FREE"}
                </span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="text-base font-black text-[#1E3D2B]">Total Amount</span>
                <span className="text-2xl font-black text-[#1E3D2B]">₹{total}</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B]/40 mb-2">
                Items in Cart
              </p>
              {items.map((i) => (
                <div
                  key={i.id}
                  className="flex justify-between text-xs py-2 border-b border-gray-50 last:border-0"
                >
                  <span className="text-[#6B4F3F]">
                    {i.name}{" "}
                    <span className="text-[10px] font-black ml-1">×{i.quantity || 1}</span>
                  </span>
                  <span className="font-black text-[#1E3D2B]">
                    ₹{Number(i.price || 0) * Number(i.quantity || 1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
