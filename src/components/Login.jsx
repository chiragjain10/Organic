import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("The credentials provided do not match our records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center px-6 py-32 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#6E8B3D]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1E3D2B]/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-xl bg-[#F7F6F2] rounded-[48px] border border-[#6E8B3D]/20 shadow-[0_40px_100px_rgba(197,168,128,0.1)] p-8 md:p-16 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1E3D2B] rounded-2xl text-[#6E8B3D] mb-8 shadow-xl shadow-[#1E3D2B]/20">
            <Sparkles size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1E3D2B] tracking-tighter mb-4">
            Welcome <span className="text-[#6E8B3D] italic">Back</span>
          </h2>
          <p className="text-[#1E3D2B]/60 font-medium">Continue your wellness journey.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B]/40 ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1E3D2B]/20" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F7F6F2] border border-[#6E8B3D]/20 focus:bg-white focus:border-[#6E8B3D]/50 outline-none transition-all font-bold text-[#1E3D2B] placeholder:text-[#1E3D2B]/20 shadow-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B]/40">Password</label>
              <button type="button" className="text-[10px] font-black uppercase tracking-widest text-[#6E8B3D] hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1E3D2B]/20" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F7F6F2] border border-[#6E8B3D]/20 focus:bg-white focus:border-[#6E8B3D]/50 outline-none transition-all font-bold text-[#1E3D2B] placeholder:text-[#1E3D2B]/20 shadow-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full py-5 rounded-2xl bg-[#6E8B3D] text-[#1E3D2B] font-black text-lg hover:bg-[#1E3D2B] hover:text-[#6E8B3D] transition-all transform active:scale-[0.98] shadow-xl shadow-[#6E8B3D]/20 flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-[#1E3D2B]/30 border-t-[#1E3D2B] rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-sm text-[#1E3D2B]/60 font-medium">
            New to Leaf Burst?{" "}
            <Link to="/signup" className="text-[#6E8B3D] font-black hover:underline ml-1">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
