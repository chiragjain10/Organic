import React, { useState, useEffect } from 'react';

const OrganicPreloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 400);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Mimicking natural growth: fast starts, slow finishes
        const increment = prev > 70 ? Math.random() * 2 : Math.random() * 12;
        return    Math.min(prev + increment, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsExpanding(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1000);
      }, 600);
    }
  }, [progress, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#FCFAF5] overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
        isExpanding ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Organic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#E8F0E6] rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#F2EDE4] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative flex flex-col items-center">
        
        {/* Growing Leaf Icon */}
        <div className={`mb-8 transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="relative">
            {/* Background Leaf Shape */}
            <path 
              d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" 
              className="stroke-[#1E3D2B]/10" 
              strokeWidth="1.5"
            />
            {/* Growth Fill Leaf */}
            <path 
              d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" 
              className="stroke-[#6E8B3D] transition-all duration-300" 
              strokeWidth="1.5"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="2" className="fill-[#2F6F4E] animate-ping" style={{ opacity: progress === 100 ? 0 : 0.4 }} />
          </svg>
        </div>

        {/* Brand Typography */}
        <div className="text-center">
          <h2 className={`text-xs font-bold uppercase tracking-[0.6em] text-[#6B4F3F]/60 mb-3 transition-all duration-700 delay-100 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            Your wellness, loading naturally…
          </h2>
          <h1 className={`text-5xl md:text-6xl font-serif italic text-[#1E3D2B] mb-6 transition-all duration-700 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Leaf <span className="not-italic font-light text-[#6E8B3D]">Burst</span>
          </h1>
        </div>

        {/* Dynamic Progress Text */}
        <div className="relative h-8 flex items-center justify-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#2F6F4E]">
            {progress < 30 && "Sowing Seeds..."}
            {progress >= 30 && progress < 70 && "Nurturing Growth..."}
            {progress >= 70 && progress < 100 && "Final Ripening..."}
            {progress === 100 && "Ready to Bloom"}
          </p>
          
          {/* Subtle Progress Counter */}
          <span className="absolute -bottom-4 text-[8px] font-mono text-[#6B4F3F]/40">
            {Math.floor(progress)}%
          </span>
        </div>
      </div>

      {/* Textured Overlay (Grain) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      <style>{`
        @font-face {
          font-family: 'serif';
          src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&display=swap');
        }
      `}</style>
    </div>
  );
};

export default OrganicPreloader;
