import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../components/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import SEO from "../../components/SEO";

export default function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Immediately overwrite the Firestore document with the 'superadmin' role
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "superadmin",
        createdAt: serverTimestamp(),
      });
      
      alert("Success! Super Admin account created. Redirecting to login...");
      navigate("/admin/login", { replace: true });
    } catch (err) {
      alert("Error creating admin: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900">
      <SEO title="Setup Admin" noindex={true} />
      <form onSubmit={handleSignup} className="bg-white p-8 border border-slate-200 shadow-xl rounded-2xl max-w-sm w-full space-y-5">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold tracking-tight">Setup Initial Admin</h2>
          <p className="text-xs text-slate-500 mt-1">Temporary page to bootstrap your admin account.</p>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email</label>
          <input 
            type="email" 
            placeholder="admin@leafburst.com" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 text-sm" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 text-sm" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Admin Account"}
        </button>
      </form>
    </div>
  );
}
