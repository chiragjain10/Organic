import React from 'react';
import { ArrowUpRight, Leaf } from 'lucide-react';
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Moringa Powder",
    subtitle: "From Leaf to Powder",
    image: "img/m.jpeg", // Moringa/Green Leaf look
    gridClass: "md:col-span-7 lg:col-span-8",
    tag: "Most Popular"
  },
  
  {
    title: "Garlic Powder",
    subtitle: "Raw Power, Refined",
    image: "img/a (2).jpeg", // Garlic/Spice look
    gridClass: "md:col-span-5 lg:col-span-4",
  },
  {
    title: "Rosemary Dry Leaves",
    subtitle: "Aromatic & Pure",
    image: "img/r.jpeg", // Herb/Rosemary look
    gridClass: "md:col-span-5 lg:col-span-4",
  },
  {
    title: "Beetroot Powder",
    subtitle: "Color of Real Nutrition",
    image: "img/a (6).jpeg", // Deep Red/Beetroot look
    
     gridClass: "md:col-span-7 lg:col-span-8",
  }
];

const CategoryCard = ({ category }) => (
  <div className={`${category.gridClass} group relative overflow-hidden rounded-[2rem] bg-[#F2F0EA] min-h-[340px] md:min-h-[400px] flex flex-col border border-[#1E3D2B]/5 shadow-sm`}>
    
    {/* Background Image with Ken Burns Effect */}
    <div className="absolute inset-0 transition-transform duration-[4s] ease-out group-hover:scale-108">
      <img
        src={category.image}
        alt={category.title}
        loading="lazy"
        className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#1E3D2B]/50 opacity-70 group-hover:opacity-85 transition-opacity duration-700" />
    </div>

    {/* Top Bar: Tag */}
    <div className="relative z-10 p-4 md:p-6 flex justify-between items-start">
      {category.tag ? (
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[8px] font-bold uppercase tracking-[0.2em]">
          {category.tag}
        </span>
      ) : <div />}
      
      <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-[#1E3D2B]">
        <ArrowUpRight size={16} />
      </div>
    </div>

    {/* Bottom Content: The Glass Card */}
    <div className="mt-auto relative z-10 p-3">
      <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-[1.25rem] p-4 md:p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-[8px] font-extrabold uppercase tracking-[0.3em] text-[#6E8B3D] mb-1.5">
          {category.subtitle}
        </p>
        
        <h3 className="text-xl md:text-2xl font-serif italic text-white leading-tight">
          {category.title}
        </h3>

        <div className="max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-500 ease-in-out">
          <div className="pt-2 flex items-center gap-1.5 text-white/70 text-[9px] uppercase tracking-wider font-semibold">
            <span>View Collection</span>
            <div className="w-4 h-[1px] bg-[#6E8B3D]" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CategorySection = () => {
  return (
    <section className="py-12 md:py-20 bg-[#F7F6F2] px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* --- MAGAZINE HEADER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 md:mb-14 items-end">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <div className="w-6 h-[1px] bg-[#6E8B3D]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#6E8B3D]">From Our Harvests</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-[#1E3D2B] leading-[0.9] tracking-tighter">
              The Real <br className="hidden sm:block" /> 
              <span className="relative inline-block">
                  Harvests
                  <Leaf className="absolute -right-10 top-0 text-[#6E8B3D]/10 rotate-12 hidden lg:block" size={60} />
              </span>
            </h2>
          </div>
          
          <div className="lg:col-span-5 pb-2 text-center lg:text-left lg:border-l lg:border-[#1E3D2B]/10 lg:pl-8">
            <p className="text-sm md:text-base text-[#6B4F3F]/80 leading-relaxed font-light">
              We don’t chase mass production. We work closely with nature — sourcing fresh, drying gently under the sun, and delivering ingredients in their most honest form.
            </p>
          </div>
        </div>

        {/* --- RESPONSIVE ASYMMETRIC GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} category={cat} />
          ))}
        </div>

        {/* --- CENTERED FOOTER ACTION --- */}
        <div className="mt-8 md:mt-14 flex flex-col items-center gap-4">
          <div className="h-12 w-[1px] bg-gradient-to-b from-[#1E3D2B]/20 to-transparent" />
          <Link 
            to="/shop" 
            className="group relative px-8 py-3.5 overflow-hidden rounded-full border border-[#1E3D2B]/10 transition-all hover:border-[#6E8B3D]"
          >
            <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1E3D2B] group-hover:text-[#6E8B3D]">
              Explore Full Collection
            </span>
            <div className="absolute inset-0 bg-[#6E8B3D]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;