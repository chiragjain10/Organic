import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../components/useAuth";
import SEO from "../../components/SEO";
import { ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingLocal, setLoadingLocal] = useState(false);
  
  const { login, role, user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && role) {
      if (role === 'admin' || role === 'superadmin') {
         const from = location.state?.from?.pathname || (role === 'superadmin' ? '/super' : '/admin');
         navigate(from, { replace: true });
      } else {
         setErrorMsg("Access Denied: You must be an administrator to log into this portal.");
         logout();
      }
    }
  }, [user, role, navigate, location, logout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoadingLocal(true);
    try {
      await login(email, password);
      // useEffect watches user/role and handles redirection gracefully.
    } catch (err) {
      setErrorMsg("Invalid credentials. Please attempt again.");
      setLoadingLocal(false);
    }
  };

  if (loading) {
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm font-medium">Verifying Session...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <SEO title="Admin Login | Leaf Burst" noindex={true} />
      <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#1E3D2B]/5 text-[#1E3D2B] rounded-2xl flex items-center justify-center mb-5 border border-[#1E3D2B]/10">
            <ShieldAlert size={28} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Access</h1>
          <p className="text-xs font-semibold text-slate-500 mt-2 uppercase tracking-widest">Administrative Portal</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50/80 border border-red-100 text-red-600 p-4 rounded-xl text-xs font-bold leading-relaxed mb-6 text-center animate-in fade-in zoom-in-95">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E3D2B] focus:ring-1 focus:ring-[#1E3D2B] outline-none transition-all text-sm font-medium bg-slate-50/50 focus:bg-white"
              placeholder="admin@leafburst.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#1E3D2B] focus:ring-1 focus:ring-[#1E3D2B] outline-none transition-all text-sm font-medium bg-slate-50/50 focus:bg-white"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loadingLocal}
            className="w-full py-4 mt-2 rounded-xl bg-[#1E3D2B] text-white text-xs font-black uppercase tracking-widest hover:bg-[#2F6F4E] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#1E3D2B]/10 disabled:opacity-50 disabled:translate-y-0"
          >
            {loadingLocal ? "Authenticating..." : "Authorize Access"}
          </button>
        </form>
      </div>
    </div>
  );
}
