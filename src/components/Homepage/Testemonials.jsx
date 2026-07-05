import React from 'react';
import { Star, CheckCircle2, Quote, ArrowRight } from 'lucide-react';

const TestimonialCard = ({ quote, author, product, rating }) => (
  <div className="bg-white rounded-[2rem] p-6 border border-[#1E3D2B]/6 flex flex-col h-full hover:border-[#6E8B3D]/25 hover:shadow-lg hover:shadow-[#1E3D2B]/2 transition-all duration-500 group">
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={8} fill={i < rating ? "#6E8B3D" : "none"} className={i < rating ? "text-[#6E8B3D]" : "text-[#1E3D2B]/10"} />
      ))}
    </div>

    <p className="text-sm md:text-base font-serif italic text-[#1E3D2B] leading-relaxed mb-6 flex-grow">
      "{quote}"
    </p>

    <div className="pt-4 border-t border-[#1E3D2B]/5 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#F7F6F2] text-[#1E3D2B] flex items-center justify-center font-serif italic font-extrabold text-xs">
          {author[0]}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#1E3D2B]">{author}</span>
            <CheckCircle2 size={10} className="text-[#6E8B3D]" />
          </div>
          <p className="text-[7px] font-bold text-[#1E3D2B]/40 uppercase tracking-widest leading-none">Verified Buyer</p>
        </div>
      </div>
      <span className="text-[8px] font-bold uppercase tracking-wider text-[#1E3D2B]/20 group-hover:text-[#6E8B3D] transition-colors">
        {product}
      </span>
    </div>
  </div>
);

const TestimonialSection = () => {
  const reviews = [
    { quote: "The Turmeric Blend transformed my morning ritual. I feel more balanced.", author: "Elena V.", product: "Turmeric Ritual", rating: 5 },
    { quote: "Pure, potent, and effective. The Ashwagandha has improved my sleep immensely.", author: "Marcus K.", product: "Ashwagandha", rating: 5 },
    { quote: "Incredible freshness. You can taste the quality in every spoonful.", author: "Sophia R.", product: "Moringa Powder", rating: 5 }
  ];

  return (
    <section className="py-12 md:py-16 bg-[#F7F6F2] px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.4em] text-[#6E8B3D]">Real Results</span>
            <h2 className="text-3xl md:text-5xl font-light text-[#1E3D2B] leading-none tracking-tight">
              The <span className="font-extrabold italic">Journal</span> <br />
              Of Wellness.
            </h2>
          </div>

          <div className="flex items-center justify-center gap-6 bg-white p-4 px-6 rounded-2xl border border-[#1E3D2B]/5 shadow-sm self-center md:self-auto">
            <div className="text-center">
              <p className="text-xl font-extrabold text-[#1E3D2B]">4.9</p>
              <p className="text-[8px] font-bold uppercase tracking-widest text-[#6E8B3D]">Avg Rating</p>
            </div>
            <div className="w-px h-8 bg-[#1E3D2B]/10" />
            <div className="text-center">
              <p className="text-xl font-extrabold text-[#1E3D2B]">15k</p>
              <p className="text-[8px] font-bold uppercase tracking-widest text-[#6E8B3D]">Reviews</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => <TestimonialCard key={i} {...r} />)}
        </div>

        {/* Minimal Press Bar */}
       <div className="mt-14 pt-8 border-t border-[#1E3D2B]/5">

  <p className="text-center text-xs font-bold uppercase tracking-[0.4em] text-[#1E3D2B]/60 mb-8">
    Also Available On
  </p>

  <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-8">

    <a
      href="https://www.blinkit.com"
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300"
    >
      <img src="/img/logo/b.png" alt="Blinkit" className="h-12 object-contain" />
    </a>

    <a
      href="https://www.amazon.in/s?me=A3PZ6U2Q6KHZM4&marketplaceID=A21TJRUUN4KGV"
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300"
    >
      <img src="/img/logo/a.png" alt="Amazon" className="h-12 object-contain" />
    </a>

    <a
      href="https://www.indiamart.com"
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300"
    >
      <img src="/img/logo/i.png" alt="Indiamart" className="h-12 object-contain" />
    </a>

    <a
      href="https://www.flipkart.com"
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300"
    >
      <img src="/img/logo/f.png" alt="Flipkart" className="h-12 object-contain" />
    </a>

    <a
      href="https://www.zepto.com"
      target="_blank"
      rel="noopener noreferrer"
      className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300"
    >
      <img src="/img/logo/z.png" alt="Zepto" className="h-12 object-contain" />
    </a>

  </div>

</div>
      </div>
    </section>
  );
};
export default TestimonialSection;