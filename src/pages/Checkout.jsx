import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, getDocs, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

import { useShopData } from "../components/ShopDataProvider";

export default function Checkout() {
  const { user } = useAuth();
  const shop = useShopData();
  const items = shop?.cartItems || [];
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ firstName: "", lastName: "", line1: "", line2: "", zip: "", city: "", state: "" });
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("paytm");
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

  const placeOrderDoc = async (status, paymentInfo = {}) => {
    const order = {
      userId: user.uid,
      items,
      address,
      shipping,
      subtotal,
      shippingFee,
      total,
      status,
      payment: paymentInfo,
      createdAt: serverTimestamp(),
    };
    const ordersCol = collection(db, "users", user.uid, "orders");
    const ref = await addDoc(ordersCol, order);
    try {
      await setDoc(doc(db, "orders", ref.id), { ...order, customerName: `${address.firstName} ${address.lastName}` });
    } catch {}
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `New Order ${ref.id}`,
          text: `Order ${ref.id}\nTotal: ₹${total}\nShipping: ${shipping}\nAddress: ${address.firstName} ${address.lastName}, ${address.line1}, ${address.city} ${address.zip}`,
        }),
      });
    } catch {}
    return ref.id;
  };

  const payWithPaytm = async () => {
    if (!address.firstName || !address.lastName || !address.line1 || !address.city || !address.zip || !address.state) {
      alert("Please fill all shipping address fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total.toFixed(2),
          userId: user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const html = await response.text();
      
      // Create a temporary container to hold the form
      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div);
      
      // Find the form and submit it
      const form = div.querySelector("form");
      if (form) {
        form.submit();
      } else {
        throw new Error("Payment form not found in response");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error: " + error.message);
      setLoading(false);
    }
  };

  const placeCodOrder = async () => {
    await placeOrderDoc("cod_pending", { provider: "cod" });
    navigate("/orders");
  };

  if (loading) return <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Address */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Shipping address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="border p-3 rounded-xl" placeholder="First name" value={address.firstName} onChange={(e)=>setAddress({...address, firstName:e.target.value})}/>
              <input className="border p-3 rounded-xl" placeholder="Last name" value={address.lastName} onChange={(e)=>setAddress({...address, lastName:e.target.value})}/>
              <input className="md:col-span-2 border p-3 rounded-xl" placeholder="Address line 1" value={address.line1} onChange={(e)=>setAddress({...address, line1:e.target.value})}/>
              <input className="md:col-span-2 border p-3 rounded-xl" placeholder="Address line 2 (optional)" value={address.line2} onChange={(e)=>setAddress({...address, line2:e.target.value})}/>
              <input className="border p-3 rounded-xl" placeholder="ZIP" value={address.zip} onChange={(e)=>setAddress({...address, zip:e.target.value})}/>
              <input className="border p-3 rounded-xl" placeholder="City" value={address.city} onChange={(e)=>setAddress({...address, city:e.target.value})}/>
              <input className="border p-3 rounded-xl" placeholder="State" value={address.state} onChange={(e)=>setAddress({...address, state:e.target.value})}/>
            </div>
          </div>
          {/* Step 2: Shipping */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Shipping method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="radio" name="ship" checked={shipping==="standard"} onChange={()=>setShipping("standard")} />
                <span>Standard (Free)</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="ship" checked={shipping==="express"} onChange={()=>setShipping("express")} />
                <span>Express (+₹80)</span>
              </label>
            </div>
          </div>
          {/* Step 3: Payment */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Payment</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="radio" name="pay" checked={payment==="paytm"} onChange={()=>setPayment("paytm")} />
                <span>Paytm (UPI, Cards, NetBanking)</span>
              </label>
              
            </div>
          </div>
          {/* Step 4: Review */}
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <h3 className="text-xl font-black text-[#1E3D2B] mb-4">Review & place order</h3>
            <button
              disabled={items.length===0}
              onClick={payment==="paytm" ? payWithPaytm : placeCodOrder}
              className="px-8 py-4 rounded-2xl bg-[#1E3D2B] text-white font-black w-full"
            >
              {payment==="paytm" ? "Pay with Paytm" : "Place COD Order"}
            </button>
            <div className="mt-8 pt-6 border-t border-[#1E3D2B]/5 space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B] mb-1">Intellectual Property Rights</p>
                <p className="text-[10px] leading-relaxed text-[#6B4F3F]/60">
                  All content, artwork, and designs on this platform are the exclusive property of <strong>Leaf Burst</strong>. 
                  Unauthorized reproduction or use is strictly prohibited and protected by applicable copyright laws.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B] mb-1">Jurisdiction Clause</p>
                <p className="text-[10px] leading-relaxed text-[#6B4F3F]/60">
                  All disputes and legal matters arising from transactions on this site are subject to the 
                  exclusive jurisdiction of the courts in <strong>Indore, Madhya Pradesh</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Summary */}
        <aside>
          <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6 space-y-4">
            <p className="text-sm text-[#6B4F3F]">Subtotal</p>
            <p className="text-xl font-black text-[#1E3D2B]">₹{subtotal}</p>
            <p className="text-sm text-[#6B4F3F]">Shipping</p>
            <p className="text-xl font-black text-[#1E3D2B]">{shippingFee ? `₹${shippingFee}` : "FREE"}</p>
            <p className="text-sm text-[#6B4F3F]">Total</p>
            <p className="text-3xl font-black text-[#1E3D2B]">₹{total}</p>
            <div className="space-y-2">
              {items.map((i)=>(
                <div key={i.id} className="flex justify-between text-sm">
                  <span>{i.name} × {i.quantity||1}</span>
                  <span>₹{Number(i.price||0)*Number(i.quantity||1)}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
