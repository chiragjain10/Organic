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
  <div className={`${category.gridClass} group relative overflow-hidden rounded-[2rem] bg-[#F2F0EA] min-h-[450px] md:min-h-[500px] flex flex-col`}>
    
    {/* Background Image with Ken Burns Effect */}
    <div className="absolute inset-0 transition-transform duration-[4s] ease-out group-hover:scale-110">
      <img
        src={category.image}
        alt={category.title}
        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#1E3D2B]/60 opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
    </div>

    {/* Top Bar: Tag */}
    <div className="relative z-10 p-6 md:p-10 flex justify-between items-start">
      {category.tag ? (
        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold uppercase tracking-[0.2em]">
          {category.tag}
        </span>
      ) : <div />}
      
      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-white hover:text-[#1E3D2B]">
        <ArrowUpRight size={20} />
      </div>
    </div>

    {/* Bottom Content: The Glass Card */}
    <div className="mt-auto relative z-10 p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#6E8B3D] mb-3">
          {category.subtitle}
        </p>
        
        <h3 className="text-3xl md:text-4xl font-serif italic text-white leading-tight">
          {category.title}
        </h3>

        <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-700 ease-in-out">
          <div className="pt-4 flex items-center gap-2 text-white/60 text-[10px] uppercase tracking-widest font-medium">
            <span>View Details</span>
            <div className="w-6 h-[1px] bg-[#6E8B3D]" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CategorySection = () => {
  return (
    <section className="py-32 bg-[#F7F6F2] px-6 lg:px-12">
      <div className="max-w-[1300px] mx-auto">
        
        {/* --- MAGAZINE HEADER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-end">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[#6E8B3D]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#6E8B3D]">From Our Harvests</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-serif text-[#1E3D2B] leading-[0.8] tracking-tighter">
              The Real <br /> 
              <span className="relative">
                  Harvests
                  <Leaf className="absolute -right-12 top-0 text-[#6E8B3D]/20 rotate-12 hidden md:block" size={80} />
              </span>
            </h2>
          </div>
          
          <div className="lg:col-span-4 pb-4">
            <p className="text-lg text-[#6B4F3F]/70 leading-relaxed font-light border-l border-[#1E3D2B]/10 pl-8">
              We don’t chase mass production. We work closely with nature — sourcing fresh, drying gently under the sun, and delivering ingredients in their most honest form.
            </p>
          </div>
        </div>

        {/* --- RESPONSIVE ASYMMETRIC GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} category={cat} />
          ))}
        </div>

        {/* --- CENTERED FOOTER ACTION --- */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="h-20 w-[1px] bg-gradient-to-b from-[#1E3D2B]/20 to-transparent" />
          <Link 
            to="/shop" 
            className="group relative px-10 py-4 overflow-hidden rounded-full border border-[#1E3D2B]/10 transition-all hover:border-[#6E8B3D]"
          >
            <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em] text-[#1E3D2B] group-hover:text-[#6E8B3D]">
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