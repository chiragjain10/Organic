import React, { useState } from "react";
import { X, ShoppingBag, Heart } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useShopData } from "./ShopDataProvider";
import { useAuth } from "./useAuth";

const QuickView = ({ product, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const shop = useShopData();
  const { user } = useAuth();

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose?.(), 300);
  };

  const handleAddToCart = async () => {
    try {
      await shop.addToCart({ ...product, quantity });
      alert("Added to cart!");
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      if (shop.isInWishlist(product.id)) {
        await shop.removeFromWishlist(product.id);
        alert("Removed from wishlist");
      } else {
        await shop.addToWishlist(product);
        alert("Added to wishlist");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen || !product) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[999] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={handleClose}
      />

      <div className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none mt-10`}>
        <div
          className={`bg-[#F7F6F2] rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden pointer-events-auto transform transition-all duration-300 ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="flex justify-between items-center px-8 py-6 border-b border-[#C5A880]/20 bg-gradient-to-r from-[#C5A880]/5 to-[#1E3D2B]/5">
            <h2 className="text-lg font-serif text-[#1E3D2B] uppercase tracking-tight">
              Quick View
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-[#C5A880]/10 transition-colors text-[#1E3D2B]"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-[#F7F6F2] to-[#C5A880]/20 rounded-3xl flex items-center justify-center w-full aspect-square relative overflow-hidden group">
                <img
                  src={product.image || product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-300"
                />
                {product.original_price && product.original_price > product.price && (
                  <div className="absolute top-4 right-4 bg-[#C5A880] text-[#1E3D2B] px-4 py-2 rounded-full text-xs font-black">
                    SALE
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-serif text-[#1E3D2B] leading-tight">
                  {product.title || product.name}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="text-[#C5A880] text-lg">★</div>
                      ))}
                    </div>
                    <span className="text-sm text-[#1E3D2B]/50 font-medium">(128 reviews)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-[#C5A880]">
                      ₹{product.price}.00
                    </span>
                    {(product.mrp || product.original_price) && (Number(product.mrp || product.original_price) > Number(product.price || 0)) && (
                      <span className="text-lg font-bold text-[#1E3D2B]/30 line-through">
                        ₹{Number(product.mrp || product.original_price)}.00
                      </span>
                    )}
                  </div>
                </div>

                {product.description && (
                  <p className="text-sm text-[#1E3D2B]/70 leading-relaxed font-sans">
                    {product.description}
                  </p>
                )}

                {(product.weight || product.suitable_for) && (
                  <div className="bg-[#F7F6F2] rounded-xl p-4 border border-[#C5A880]/30">
                    <p className="text-xs font-black text-[#1E3D2B]/40 uppercase tracking-wider mb-1">
                      {product.weight ? "Weight" : "Benefits"}
                    </p>
                    <p className="text-sm font-semibold text-[#1E3D2B]">
                      {product.weight || product.suitable_for}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-[#1E3D2B]/60 uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center border border-[#C5A880]/30 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-[#1E3D2B] hover:bg-[#C5A880]/10 transition-colors font-black"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-black text-[#1E3D2B] border-l border-r border-[#C5A880]/30">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-[#1E3D2B] hover:bg-[#C5A880]/10 transition-colors font-black"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="flex-1 px-6 py-4 rounded-2xl bg-[#1E3D2B] text-[#F7F6F2] font-black uppercase tracking-wider hover:bg-[#152C1F] transition-all transform active:scale-95 shadow-lg shadow-[#1E3D2B]/20"
                  >
                    View Full Details
                  </button>
                  <button
                    onClick={handleWishlist}
                    className={`px-6 py-4 rounded-2xl bg-[#F7F6F2] border border-[#C5A880] font-black transition-colors ${shop.isInWishlist(product.id) ? 'bg-[#C5A880] text-white' : 'text-[#C5A880] hover:bg-[#C5A880]/10'}`}
                  >
                    <Heart size={20} fill={shop.isInWishlist(product.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="w-full px-6 py-4 rounded-2xl bg-[#C5A880] text-[#1E3D2B] font-black uppercase tracking-wider hover:bg-[#B59553] transition-all transform active:scale-95 shadow-lg shadow-[#C5A880]/20 flex items-center justify-center gap-2">
                  <ShoppingBag size={20} />
                  {shop.isInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default QuickView;


