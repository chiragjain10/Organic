import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Heart, X, Menu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShopData } from './ShopDataProvider';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shop = useShopData();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Shop', to: '/shop' },
    { name: 'Contact', to: '/contact' },
  ];

  const iconClass = `p-2.5 rounded-full transition-all duration-300 hover:bg-[#6E8B3D]/10 active:scale-90 ${
    isScrolled ? 'text-[#F7F6F2] hover:text-[#6E8B3D]' : 'text-[#1E3D2B] hover:text-[#6E8B3D]'
  }`;

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className={`flex items-center justify-between transition-all duration-700 ease-in-out ${
            isScrolled ? 'px-8 py-3 rounded-full bg-[#1E3D2B]/95 backdrop-blur-md border border-white/10 shadow-xl' : 'bg-transparent'
          }`}>

            {/* --- BRAND LOGO --- */}
            <Link to="/" onClick={closeMenu} className="flex-shrink-0">
              <img 
                src="img/logo1.png" 
                alt="Leaf Burst Logo" 
                className={`transition-all duration-500 object-contain ${isScrolled ? 'h-10 brightness-0 invert' : 'h-14'}`}
              />
            </Link>

            {/* --- DESKTOP NAVIGATION --- */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-300 relative group
                    ${isScrolled ? 'text-[#F7F6F2]/70 hover:text-[#F7F6F2]' : 'text-[#1E3D2B]/60 hover:text-[#1E3D2B]'}`}
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#6E8B3D] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* --- DESKTOP ACTION ICONS --- */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Link to="/account" className={iconClass}><User size={20} strokeWidth={1.5} /></Link>
                <Link to="/wishlist" className="relative p-2.5 group">
                  <Heart size={20} strokeWidth={1.5} className={`transition-all ${isScrolled ? 'text-[#F7F6F2]' : 'text-[#1E3D2B]'}`} />
                  <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#6E8B3D] text-[9px] font-bold text-white border border-white">{shop?.wishlistCount || 0}</span>
                </Link>
              </div>
              
              <Link to="/cart" className="relative p-2.5 group">
                <ShoppingBag size={20} strokeWidth={1.5} className={`transition-all ${isScrolled ? 'text-[#F7F6F2]' : 'text-[#1E3D2B]'}`} />
                <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#6E8B3D] text-[9px] font-bold text-white border border-white">{shop?.cartCount || 0}</span>
              </Link>

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 lg:hidden ml-2 ${isScrolled ? 'text-[#F7F6F2]' : 'text-[#1E3D2B]'}`}>
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- PREMIUM MOBILE OVERLAY --- */}
      <div className={`fixed inset-0 z-[90] bg-[#F7F6F2] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col justify-between px-10 py-24">
          
          {/* Main Links */}
          <nav className="flex flex-col space-y-6">
            <p className="text-[#6E8B3D] text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Menu</p>
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={closeMenu}
                className="group flex items-center justify-between border-b border-[#1E3D2B]/5 pb-4"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="text-xl font-medium text-[#1E3D2B] tracking-wide transition-all group-hover:pl-2">
                  {link.name}
                </span>
                <ArrowRight size={16} className="text-[#6E8B3D] opacity-40" />
              </Link>
            ))}
          </nav>

          {/* Premium Actions Grid */}
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-4 border-t border-[#1E3D2B]/10 pt-10">
              <Link to="/account" onClick={closeMenu} className="flex flex-col items-center gap-2 group">
                <div className="p-4 rounded-full bg-[#1E3D2B]/5 group-active:bg-[#6E8B3D]/10 transition-colors">
                  <User size={20} className="text-[#1E3D2B]" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3D2B]/60">Account</span>
              </Link>

              <Link to="/wishlist" onClick={closeMenu} className="flex flex-col items-center gap-2 group">
                <div className="p-4 rounded-full bg-[#1E3D2B]/5 group-active:bg-[#6E8B3D]/10 transition-colors">
                  <Heart size={20} className="text-[#1E3D2B]" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3D2B]/60">Wishlist</span>
              </Link>

              <Link to="/cart" onClick={closeMenu} className="flex flex-col items-center gap-2 group">
                <div className="p-4 rounded-full bg-[#1E3D2B]/5 group-active:bg-[#6E8B3D]/10 transition-colors relative">
                  <ShoppingBag size={20} className="text-[#1E3D2B]" strokeWidth={1.5} />
                  <span className="absolute top-3 right-3 w-2 h-2 bg-[#6E8B3D] rounded-full border border-[#F7F6F2]"></span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1E3D2B]/60">Cart</span>
              </Link>
            </div>

            <p className="text-[#1E3D2B]/30 text-[9px] text-center font-medium uppercase tracking-[0.3em]">
              Leaf Burst Ayurveda &bull; Est. 2024
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;
