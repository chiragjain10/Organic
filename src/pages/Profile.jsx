import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ displayName: "", phone: "" });

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const d = snap.data();
        setProfile({ displayName: d.displayName || "", phone: d.phone || "" });
      }
    };
    load();
  }, [user]);

  const save = async () => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    await setDoc(ref, { displayName: profile.displayName, phone: profile.phone }, { merge: true });
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] pt-32 pb-24 px-6">
      <div className="max-w-[800px] mx-auto space-y-6">
        <h1 className="text-3xl font-black text-[#1E3D2B]">Profile Settings</h1>
        <div className="bg-white rounded-2xl border border-[#1E3D2B]/10 p-6 space-y-3">
          <input className="border p-3 rounded-xl w-full" placeholder="Display name" value={profile.displayName} onChange={(e)=>setProfile({...profile,displayName:e.target.value})}/>
          <input className="border p-3 rounded-xl w-full" placeholder="Phone" value={profile.phone} onChange={(e)=>setProfile({...profile,phone:e.target.value})}/>
          <button onClick={save} className="px-6 py-3 rounded-2xl bg-[#1E3D2B] text-white font-black">Save Profile</button>
        </div>
      </div>
    </div>
  );
}
