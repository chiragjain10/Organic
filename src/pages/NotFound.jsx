import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Ghost } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="relative min-h-[70vh] flex items-center justify-center bg-cream px-6 py-20 overflow-hidden">
            {/* Background Decorative elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-olive/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <motion.div
                                animate={{ 
                                    y: [0, -15, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                    repeat: Infinity, 
                                    duration: 4, 
                                    ease: "easeInOut" 
                                }}
                            >
                                <Ghost size={80} className="text-gold" />
                            </motion.div>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-forest/10 rounded-full blur-sm"></div>
                        </div>
                    </div>

                    <h1 className="text-8xl md:text-[180px] font-bold h-serif text-forest/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">
                        404
                    </h1>

                    <h2 className="text-4xl md:text-5xl font-bold h-serif text-forest mb-4 relative z-10">
                        A Curious Path...
                    </h2>
                    
                    <p className="text-earth text-lg md:text-xl mb-12 max-w-md mx-auto relative z-10">
                        It seems you've wandered into an uncharted garden. This page hasn't bloomed yet or has since withered away.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            to="/" 
                            className="group flex items-center gap-2 px-8 py-4 bg-forest text-cream font-semibold rounded-full hover:bg-herbal transition-all duration-300 shadow-xl hover:-translate-y-1 active:translate-y-0"
                        >
                            <Home size={20} className="group-hover:scale-110 transition-transform" />
                            Return Home
                        </Link>
                        
                        <button 
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 px-8 py-4 bg-white/50 backdrop-blur-sm text-forest border border-forest/10 font-semibold rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:-translate-y-1 active:translate-y-0"
                        >
                            <ArrowLeft size={20} />
                            Go Back
                        </button>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
                >
                    <div className="p-4 border border-forest/5 rounded-2xl flex flex-col items-center">
                        <span className="text-xs uppercase tracking-widest text-forest/60">Product</span>
                    </div>
                    <div className="p-4 border border-forest/5 rounded-2xl flex flex-col items-center">
                        <span className="text-xs uppercase tracking-widest text-forest/60">Story</span>
                    </div>
                    <div className="p-4 border border-forest/5 rounded-2xl flex flex-col items-center">
                        <span className="text-xs uppercase tracking-widest text-forest/60">Gallery</span>
                    </div>
                    <div className="p-4 border border-forest/5 rounded-2xl flex flex-col items-center">
                        <span className="text-xs uppercase tracking-widest text-forest/60">Nature</span>
                    </div>
                </motion.div>
            </div>

            {/* Decorative leaf SVGs or shapes */}
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute pointer-events-none text-olive/10"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        rotate: Math.random() * 360
                    }}
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L9.21,15.5C9.21,15.5 11,19 15,19C19,19 21,15 21,15C21,15 22,13 22,11C22,9 21,2 21,2C21,2 14,2 12,2C10,2 8,3 8,3C8,3 11.5,4.5 13.5,6C15.5,7.5 17,8 17,8Z" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

export default NotFound;
