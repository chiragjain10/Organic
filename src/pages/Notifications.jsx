import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Notifications() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState({ email: true, sms: false, promos: false });

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const ref = doc(db, "users", user.uid, "settings", "notifications");
      const snap = await getDoc(ref);
      if (snap.exists()) setPrefs(snap.data());
    };
    load();
  }, [user]);

  const save = async () => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "settings", "notifications");
    await setDoc(ref, prefs);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <div className="max-w-[800px] mx-auto space-y-6">
        <h1 className="text-3xl font-black text-[#1E3D2B]">Notifications</h1>
        <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6 space-y-3">
          {["email","sms","promos"].map((k)=>(
            <label key={k} className="flex items-center gap-3">
              <input type="checkbox" checked={!!prefs[k]} onChange={(e)=>setPrefs({...prefs,[k]:e.target.checked})}/>
              <span className="capitalize">{k}</span>
            </label>
          ))}
          <button onClick={save} className="px-6 py-3 rounded-2xl bg-[#1E3D2B] text-white font-black">Save</button>
        </div>
      </div>
    </div>
  );
}
