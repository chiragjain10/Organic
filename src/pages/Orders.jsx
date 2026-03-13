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
            <div key={o.id} className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
              <div className="flex justify-between">
                <div>
                  <p className="font-black">Order #{o.id}</p>
                  <p className="text-sm text-[#6B4F3F]">Status: {o.status}</p>
                </div>
                <p className="font-black">₹{o.total}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
