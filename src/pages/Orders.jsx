import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const q = query(collection(db, "users", user.uid, "orders"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setOrders(snap.docs.map((d)=>({ id: d.id, ...d.data() })));
    };
    load();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <div className="max-w-[1100px] mx-auto space-y-6">
        <h1 className="text-3xl font-black text-[#1E3D2B]">Order History</h1>
        {orders.length === 0 ? (
          <p className="text-[#6B4F3F]">No orders yet.</p>
        ) : (
          orders.map((o)=>(
            <div key={o.id} className="bg-white rounded-[2rem] border border-[#1E3D2B]/10 p-6 md:p-8">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b border-[#1E3D2B]/10 pb-6 gap-4">
                  <div>
                    <p className="font-black text-xl text-[#1E3D2B]">Order #{o.id}</p>
                    <p className="text-sm text-[#6B4F3F] mt-1">Placed on: {o.createdAt?.toDate ? o.createdAt.toDate().toLocaleDateString() : 'Recent'}</p>
                    <p className="text-sm font-medium mt-2 flex items-center gap-2">
                      Status: 
                      <span className="uppercase text-[10px] font-bold tracking-widest text-[#1E3D2B] bg-[#6E8B3D]/10 px-3 py-1 rounded-full">
                        {o.status?.replace('_', ' ')}
                      </span>
                    </p>
                  </div>
                  <div className="md:text-right">
                    <p className="font-black text-2xl text-[#1E3D2B]">₹{o.total}</p>
                    <p className="text-xs text-[#6B4F3F] mt-1 uppercase tracking-wider font-bold">{o.items?.length || 0} items • {o.payment?.provider?.toUpperCase() || 'Payment'}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 pt-2">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B4F3F] mb-4">Items</h4>
                    <div className="space-y-4">
                      {o.items?.map((item, i) => (
                        <div key={i} className="flex gap-4 items-center">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-[#1E3D2B]/5" />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-slate-100 border border-[#1E3D2B]/5 flex items-center justify-center text-xs text-slate-400">img</div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-bold text-[#1E3D2B] line-clamp-1">{item.name || item.title}</p>
                            <p className="text-xs text-[#6B4F3F]">Qty: {item.quantity || 1} × ₹{item.price}</p>
                          </div>
                          <p className="text-sm font-black text-[#1E3D2B]">₹{(item.quantity || 1) * item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B4F3F] mb-4">Shipping Details</h4>
                    <div className="bg-[#F7F6F2] p-5 rounded-2xl">
                      <p className="text-sm font-bold text-[#1E3D2B]">{o.address?.firstName} {o.address?.lastName}</p>
                      <p className="text-sm text-[#6B4F3F] mt-1">{o.address?.line1} {o.address?.line2 && `, ${o.address.line2}`}</p>
                      <p className="text-sm text-[#6B4F3F]">{o.address?.city}, {o.address?.state} {o.address?.zip}</p>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-[#1E3D2B]/10">
                      <div className="flex justify-between text-sm mb-2 text-[#6B4F3F]">
                        <span>Subtotal</span>
                        <span>₹{o.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2 text-[#6B4F3F]">
                        <span>Shipping ({o.shipping})</span>
                        <span>₹{o.shippingFee}</span>
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
          ))
        )}
      </div>
    </div>
  );
}
