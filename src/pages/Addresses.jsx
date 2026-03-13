import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Addresses() {
  const { user } = useAuth();
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name:"", line1:"", line2:"", city:"", state:"", zip:"" });

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const snap = await getDocs(collection(db, "users", user.uid, "addresses"));
      setList(snap.docs.map((d)=>({ id:d.id, ...d.data() })));
    };
    load();
  }, [user]);

  const add = async () => {
    await addDoc(collection(db, "users", user.uid, "addresses"), form);
    setForm({ name:"", line1:"", line2:"", city:"", state:"", zip:"" });
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <div className="max-w-[800px] mx-auto space-y-6">
        <h1 className="text-3xl font-black text-[#1E3D2B]">Saved Addresses</h1>
        <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6 space-y-3">
          <input className="border p-3 rounded-xl w-full" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
          <input className="border p-3 rounded-xl w-full" placeholder="Address line 1" value={form.line1} onChange={(e)=>setForm({...form,line1:e.target.value})}/>
          <input className="border p-3 rounded-xl w-full" placeholder="Address line 2" value={form.line2} onChange={(e)=>setForm({...form,line2:e.target.value})}/>
          <div className="grid grid-cols-3 gap-3">
            <input className="border p-3 rounded-xl" placeholder="City" value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})}/>
            <input className="border p-3 rounded-xl" placeholder="State" value={form.state} onChange={(e)=>setForm({...form,state:e.target.value})}/>
            <input className="border p-3 rounded-xl" placeholder="ZIP" value={form.zip} onChange={(e)=>setForm({...form,zip:e.target.value})}/>
          </div>
          <button onClick={add} className="px-6 py-3 rounded-2xl bg-[#1E3D2B] text-white font-black">Add Address</button>
        </div>
        {list.map((a)=>(
          <div key={a.id} className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6">
            <p className="font-black">{a.name}</p>
            <p className="text-sm text-[#6B4F3F]">{a.line1}, {a.city} {a.zip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
