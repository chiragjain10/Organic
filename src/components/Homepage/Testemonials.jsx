import React from 'react';
import { Star, CheckCircle2, Quote, ArrowRight } from 'lucide-react';

const TestimonialCard = ({ quote, author, product, rating }) => (
  <div className="bg-white rounded-[2.5rem] p-8 border border-[#1E3D2B]/5 flex flex-col h-full hover:shadow-xl hover:shadow-[#1E3D2B]/5 transition-all duration-500 group">
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={10} fill={i < rating ? "#6E8B3D" : "none"} className={i < rating ? "text-[#6E8B3D]" : "text-[#1E3D2B]/10"} />
      ))}
    </div>

    <p className="text-lg md:text-xl font-serif italic text-[#1E3D2B] leading-snug mb-8 flex-grow">
      "{quote}"
    </p>

    <div className="pt-6 border-t border-[#1E3D2B]/5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#F7F6F2] text-[#1E3D2B] flex items-center justify-center font-serif italic font-bold">
          {author[0]}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1E3D2B]">{author}</span>
            <CheckCircle2 size={12} className="text-[#6E8B3D]" />
          </div>
          <p className="text-[8px] font-bold text-[#1E3D2B]/40 uppercase tracking-widest">Verified Buyer</p>
        </div>
      </div>
      <span className="text-[9px] font-black uppercase tracking-tighter text-[#1E3D2B]/20 group-hover:text-[#6E8B3D] transition-colors">
        {product}
      </span>
    </div>
  </div>
);

const TestimonialSection = () => {
  const reviews = [
    { quote: "The Turmeric Blend transformed my morning ritual. I feel more balanced.", author: "Elena V.", product: "Turmeric Ritual", rating: 5 },
    { quote: "Pure, potent, and effective. The Ashwagandha has improved my sleep immensLeaf.", author: "Marcus K.", product: "Ashwagandha", rating: 5 },
    { quote: "Incredible freshness. You can taste the quality in every spoonful.", author: "Sophia R.", product: "Moringa Powder", rating: 5 }
  ];

  return (
    <section className="py-24 bg-[#F7F6F2] px-6">
      <div className="max-w-[1300px] mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6E8B3D]">Real Results</span>
            <h2 className="text-5xl md:text-7xl font-light text-[#1E3D2B] leading-[0.9] tracking-tighter">
              The <span className="font-black italic">Journal</span> <br />
              Of Wellness.
            </h2>
          </div>

          <div className="flex items-center gap-8 bg-white p-6 rounded-[2rem] border border-[#1E3D2B]/5 shadow-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#1E3D2B]">4.9</p>
              <p className="text-[8px] font-black uppercase tracking-widest text-[#6E8B3D]">Avg Rating</p>
            </div>
            <div className="w-px h-10 bg-[#1E3D2B]/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-[#1E3D2B]">15k</p>
              <p className="text-[8px] font-black uppercase tracking-widest text-[#6E8B3D]">Reviews</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => <TestimonialCard key={i} {...r} />)}
        </div>

        {/* Minimal Press Bar */}
        <div className="mt-20 pt-10 border-t border-[#1E3D2B]/5">

  <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-[#1E3D2B]/30 mb-12">
    Also Available On
  </p>

  <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-10">

    <a
      href="https://www.blinkit.com"
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500"
    >
      <img src="/img/logo/b.png" alt="Blinkit" className="h-14 object-contain" />
    </a>

    <a
      href="https://www.amazon.in"
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500"
    >
      <img src="/img/logo/a.png" alt="Amazon" className="h-14 object-contain" />
    </a>

    <a
      href="https://www.indiamart.com"
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500"
    >
      <img src="/img/logo/i.png" alt="Indiamart" className="h-14 object-contain" />
    </a>

    <a
      href="https://www.flipkart.com"
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500"
    >
      <img src="/img/logo/f.png" alt="Flipkart" className="h-14 object-contain" />
    </a>

    <a
      href="https://www.zepto.com"
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500"
    >
      <img src="/img/logo/z.png" alt="Zepto" className="h-14 object-contain" />
    </a>

  </div>

</div>
      </div>
    </section>
  );
};
export default TestimonialSection;