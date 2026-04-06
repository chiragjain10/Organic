import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useShopData } from "../components/ShopDataProvider";

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
    state: ""
  });
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("cod");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=checkout");
      return;
    }
  }, [user, navigate]);

  const subtotal = items.reduce((s, i) => s + Number(i.price || 0) * Number(i.quantity || 1), 0);
  const shippingFee = shipping === "express" ? 80 : 0;
  const total = subtotal + shippingFee;

  const validateForm = () => {
    if (!address.firstName || !address.lastName || !address.line1 || !address.city || !address.zip || !address.state) {
      alert("Please fill all required shipping address fields.");
      return false;
    }
    if (items.length === 0) {
      alert("Your cart is empty.");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const orderData = {
        userId: user.uid,
        customerEmail: user.email,
        customerName: `${address.firstName} ${address.lastName}`,
        items,
        address,
        shipping,
        paymentMethod: payment,
        subtotal,
        shippingFee,
        total,
        status: "pending", // Default status
        createdAt: serverTimestamp(),
      };

      // 1. Save to user's private orders collection
      const userOrdersCol = collection(db, "users", user.uid, "orders");
      const userOrderRef = await addDoc(userOrdersCol, orderData);

      // 2. Save to global orders collection (for admin view)
      await setDoc(doc(db, "orders", userOrderRef.id), orderData);

      // 3. Optional: Send notification email (via existing API if it works without Paytm)
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
        console.error("Email notification failed", e);
      }

      console.log("Order placed successfully:", userOrderRef.id);
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center font-black text-[#1E3D2B]">Processing your order...</div>;

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Address */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Shipping address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none" placeholder="First name" value={address.firstName} onChange={(e) => setAddress({ ...address, firstName: e.target.value })} />
              <input className="border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none" placeholder="Last name" value={address.lastName} onChange={(e) => setAddress({ ...address, lastName: e.target.value })} />
              <input className="md:col-span-2 border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none" placeholder="Address line 1" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
              <input className="md:col-span-2 border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none" placeholder="Address line 2 (optional)" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} />
              <input className="border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none" placeholder="ZIP / Postal Code" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
              <input className="border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
              <input className="border p-3 rounded-xl focus:ring-2 focus:ring-[#1E3D2B] outline-none md:col-span-2" placeholder="State / Province" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
            </div>
          </div>

          {/* Step 2: Shipping */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Shipping method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="ship" checked={shipping === "standard"} onChange={() => setShipping("standard")} className="accent-[#1E3D2B]" />
                <span className="flex-1 font-medium">Standard Shipping</span>
                <span className="text-[#1E3D2B] font-black">Free</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="ship" checked={shipping === "express"} onChange={() => setShipping("express")} className="accent-[#1E3D2B]" />
                <span className="flex-1 font-medium">Express Shipping (Next Day)</span>
                <span className="text-[#1E3D2B] font-black">₹80</span>
              </label>
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Payment method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer bg-gray-50 border-[#1E3D2B]/20">
                <input type="radio" name="pay" checked={payment === "cod"} readOnly className="accent-[#1E3D2B]" />
                <span className="flex-1 font-medium">Cash on Delivery (COD)</span>
                <span className="text-[10px] bg-[#1E3D2B] text-white px-2 py-1 rounded-full uppercase font-black">Available</span>
              </label>
              <p className="text-xs text-[#6B4F3F]/60 ml-8">Pay securely in cash or via UPI when your package arrives at your doorstep.</p>
            </div>
          </div>

          {/* Step 4: Review & Place */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Review & place order</h3>
            <button
              disabled={items.length === 0}
              onClick={handlePlaceOrder}
              className="px-8 py-4 rounded-2xl bg-[#1E3D2B] text-white font-black w-full hover:bg-[#1E3D2B]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
            >
              Place Order (₹{total})
            </button>
            
            <div className="mt-8 pt-6 border-t border-[#1E3D2B]/5 space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B] mb-1">Intellectual Property Rights</p>
                <p className="text-[10px] leading-relaxed text-[#6B4F3F]/60">
                  All content, artwork, and designs on this platform are the exclusive property of <strong>Leaf Burst</strong>. 
                  Unauthorized reproduction or use is strictly prohibited.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B] mb-1">Jurisdiction Clause</p>
                <p className="text-[10px] leading-relaxed text-[#6B4F3F]/60">
                  All disputes and legal matters are subject to the exclusive jurisdiction of the courts in <strong>Indore, Madhya Pradesh</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
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
                <span className="font-black text-[#1E3D2B]">{shippingFee ? `₹${shippingFee}` : "FREE"}</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="text-base font-black text-[#1E3D2B]">Total Amount</span>
                <span className="text-2xl font-black text-[#1E3D2B]">₹{total}</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B]/40 mb-2">Items in Cart</p>
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-xs py-2 border-b border-gray-50 last:border-0">
                  <span className="text-[#6B4F3F]">{i.name} <span className="text-[10px] font-black ml-1">×{i.quantity || 1}</span></span>
                  <span className="font-black text-[#1E3D2B]">₹{Number(i.price || 0) * Number(i.quantity || 1)}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
