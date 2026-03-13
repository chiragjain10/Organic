import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Mail, Lock, User, ArrowRight, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(email, password, displayName);
      navigate("/");
    } catch {
      setError("We couldn't create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center px-6 py-32 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#2F6F4E]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#6B4F3F]/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-xl bg-[#F7F6F2] rounded-[48px] border border-[#6E8B3D]/20 shadow-[0_40px_100px_rgba(197,168,128,0.08)] p-8 md:p-16 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1E3D2B] rounded-2xl text-white mb-8 shadow-xl shadow-[#1E3D2B]/20">
            <Sparkles size={32} />
          </div>
          <h2 className="h-serif text-4xl md:text-5xl font-black text-[#1E3D2B] tracking-tighter mb-4">
            Join <span className="text-[#6E8B3D]">Leaf Burst</span>
          </h2>
          <p className="text-[#6B4F3F] font-medium">Create your account for organic wellness and trusted quality.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#6B4F3F] ml-4">Full Name</label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6B4F3F]" size={20} />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F7F6F2] border border-[#6E8B3D]/20 focus:bg-white focus:border-[#2F6F4E]/30 outline-none transition-all font-bold text-[#1E3D2B] placeholder:text-[#6B4F3F] shadow-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#6B4F3F] ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6B4F3F]" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F7F6F2] border border-[#6E8B3D]/20 focus:bg-white focus:border-[#2F6F4E]/30 outline-none transition-all font-bold text-[#1E3D2B] placeholder:text-[#6B4F3F] shadow-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#6B4F3F] ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6B4F3F]" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#F7F6F2] border border-[#6E8B3D]/20 focus:bg-white focus:border-[#2F6F4E]/30 outline-none transition-all font-bold text-[#1E3D2B] placeholder:text-[#6B4F3F] shadow-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-3 px-2 py-4">
            <ShieldCheck size={18} className="text-[#2F6F4E] flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#6B4F3F] font-bold leading-relaxed">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full py-5 rounded-2xl bg-[#6E8B3D] text-white font-black text-lg hover:bg-[#1E3D2B] transition-all transform active:scale-[0.98] shadow-xl shadow-[#6E8B3D]/20 flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-sm text-[#6B4F3F] font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-[#2F6F4E] font-black hover:underline ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
