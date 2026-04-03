import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Ghost, Search, Map } from 'lucide-react';

const NotFound = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-[#F7F6F2] py-20 px-6 overflow-hidden">
            {/* Decorative Grainy Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Background Archival Numbering */}
            <span className="absolute top-[10%] left-[5%] text-[15rem] md:text-[25rem] font-serif italic text-[#1E3D2B]/5 select-none pointer-events-none">
                404
            </span>

            <div className="relative z-10 max-w-4xl w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center text-center">
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="p-8 md:p-16 rounded-[3rem] bg-white/40 backdrop-blur-sm border border-white/20 shadow-[0_30px_60px_-15px_rgba(30,61,43,0.05)] transition-all duration-700 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(30,61,43,0.1)]"
                    >
                        <div className="mb-10 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white border border-[#1E3D2B]/5 shadow-sm transition-all duration-500 hover:rotate-12 hover:bg-[#1E3D2B] group">
                            <Ghost 
                                strokeWidth={1.5} 
                                size={40} 
                                className="text-[#6E8B3D] group-hover:text-[#F7F6F2] transition-colors duration-500" 
                            />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-light text-[#1E3D2B] tracking-tight mb-6">
                            Lost in the <span className="font-serif italic text-[#6E8B3D]">Wilderness</span>
                        </h2>
                        
                        <p className="text-lg md:text-xl leading-[1.8] text-[#6B4F3F] opacity-80 max-w-2xl mx-auto mb-12">
                            It seems you've wandered into an uncharted path of our garden. The organic experience you're looking for hasn't sprouted here yet.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/" className="w-full sm:w-auto">
                                <button className="group relative w-full sm:w-auto flex items-center justify-center gap-8 bg-[#1E3D2B] text-[#F7F6F2] pl-8 pr-6 py-5 rounded-full transition-all duration-500 hover:pr-8 hover:bg-[#6E8B3D] hover:shadow-xl">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Return to Home</span>
                                    <div className="w-8 h-8 rounded-full bg-white text-[#1E3D2B] flex items-center justify-center group-hover:bg-[#F7F6F2] transition-colors">
                                        <Home size={16} />
                                    </div>
                                </button>
                            </Link>
                            
                            <button 
                                onClick={() => window.history.back()}
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-[#1E3D2B]/10 font-bold text-xs uppercase tracking-[0.2em] text-[#1E3D2B] hover:bg-[#1E3D2B]/5 transition-all duration-300"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Go Back
                            </button>
                        </div>

                        {/* Quick Links Grid */}
                        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 border-t border-[#1E3D2B]/5">
                            <Link to="/shop" className="group text-center">
                                <h4 className="text-sm font-bold text-[#1E3D2B] mb-1 group-hover:text-[#6E8B3D] transition-colors">Shop All</h4>
                                <p className="text-[10px] uppercase tracking-widest text-[#6B4F3F] opacity-60">Pure Powders</p>
                            </Link>
                            <Link to="/about" className="group text-center">
                                <h4 className="text-sm font-bold text-[#1E3D2B] mb-1 group-hover:text-[#6E8B3D] transition-colors">Our Story</h4>
                                <p className="text-[10px] uppercase tracking-widest text-[#6B4F3F] opacity-60">Sun-Dried Bliss</p>
                            </Link>
                            <Link to="/contact" className="group text-center">
                                <h4 className="text-sm font-bold text-[#1E3D2B] mb-1 group-hover:text-[#6E8B3D] transition-colors">Support</h4>
                                <p className="text-[10px] uppercase tracking-widest text-[#6B4F3F] opacity-60">Speak to Nature</p>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Floating Elements consistent with Science/About sections */}
            <motion.div 
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[15%] left-[10%] opacity-20 hidden md:block"
            >
                <div className="w-20 h-20 rounded-full border border-[#6E8B3D]/30 border-dashed" />
            </motion.div>
            <motion.div 
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] right-[12%] opacity-20 hidden md:block"
            >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6E8B3D]/10 to-transparent" />
            </motion.div>
        </section>
    );
};

export default NotFound;
