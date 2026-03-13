import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function PaymentMethods() {
  const { user } = useAuth();
  const [list, setList] = useState([]);
  const [upi, setUpi] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const snap = await getDocs(collection(db, "users", user.uid, "payment_methods"));
      setList(snap.docs.map((d)=>({ id:d.id, ...d.data() })));
    };
    load();
  }, [user]);

  const addUpi = async () => {
    if (!upi) return;
    await addDoc(collection(db, "users", user.uid, "payment_methods"), { type:"upi", upi });
    setUpi("");
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <div className="max-w-[800px] mx-auto space-y-6">
        <h1 className="text-3xl font-black text-[#1E3D2B]">Payment Methods</h1>
        <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6 space-y-3">
          <input className="border p-3 rounded-xl w-full" placeholder="UPI ID (e.g., name@bank)" value={upi} onChange={(e)=>setUpi(e.target.value)}/>
          <button onClick={addUpi} className="px-6 py-3 rounded-2xl bg-[#1E3D2B] text-white font-black">Save UPI</button>
        </div>
        {list.map((m)=>(
          <div key={m.id} className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <p className="font-black">UPI: {m.upi}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
