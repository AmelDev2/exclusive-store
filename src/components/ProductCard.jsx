import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, Star, X } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import { Dialog, DialogContent } from "@mui/material";

const ProductCard = ({ product }) => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  // مقارن لل ID
  const isWishlisted = wishlistItems.some(
    (item) => item.id.toString() === product.id.toString()
  );

  const clothingCategories = [
    "tops",
    "womens-dresses",
    "womens-shoes",
    "womens-bags",
    "womens-jewellery",
    "mens-shirts",
    "mens-shoes",
    "womens-fashion",
    "mens-fashion",
  ];

  const hasSizes =
    clothingCategories.includes(product.category) ||
    /shirt|dress|top|shoe|fashion|pant|jacket|skirt/i.test(
      `${product.category} ${product.name || product.title || ""}`
    );

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 400);

    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenModal(true);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsCartAnimating(true);
    setTimeout(() => setIsCartAnimating(false), 400);

    addToCart(product);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddToCartFromModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const productToAdd = hasSizes
      ? { ...product, quantity, size: selectedSize }
      : { ...product, quantity };

    addToCart(productToAdd);
    setOpenModal(false);
  };

  const rating = Number(product.rating) || 4.5;
  const reviewsCount = product.reviews || Math.floor(product.id * 17) % 150 + 10;

  return (
    <>
      <div className="bg-white group relative transition-all duration-300" data-testid="product-card">
        <div className="bg-gray-100 p-4 rounded-lg relative overflow-hidden h-60 flex items-center justify-center">
          {product.discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
              {product.discount}
            </span>
          )}

          <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
            <button
              type="button"
              onClick={handleWishlistClick}
              data-testid="add-to-wishlist"
              className={`bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-transform duration-300 cursor-pointer ${
                isHeartAnimating ? "scale-125 rotate-12" : "scale-100"
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-colors duration-300 ${
                  isWishlisted ? "text-red-500 fill-red-500" : "text-black hover:text-red-500"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <Eye className="w-5 h-5 text-black" />
            </button>
          </div>

          <Link
            to={`/product/${product.id}`}
            data-testid="product-link"
            className="w-full h-full flex items-center justify-center text-gray-400 z-10"
          >
            {product.image || product.thumbnail ? (
              <img
                src={product.image || product.thumbnail}
                alt={product.name || product.title}
                className="h-40 object-contain transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <span className="text-6xl">🎮</span>
            )}
          </Link>

          <button
            type="button"
            onClick={handleAddToCartClick}
            data-testid="add-to-cart"
            className={`absolute bottom-0 left-0 w-full bg-black text-white py-2.5 text-sm font-medium transition-all duration-300 z-20 cursor-pointer flex items-center justify-center gap-2 ${
              isCartAnimating ? "bg-red-600 scale-95" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {isCartAnimating ? "Added! ✓" : "Add To Cart"}
          </button>
        </div>

        <div className="mt-4">
          <Link to={`/product/${product.id}`}>
            <h4 className="font-semibold text-gray-800 truncate hover:text-red-500 transition-colors">
              {product.name || product.title}
            </h4>
          </Link>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-red-500 font-bold">{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                {product.originalPrice}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-gray-600">
              ({Array.isArray(product.reviews) ? product.reviews.length : product.reviews || 0})
            </span>
          </div>
        </div>
      </div>

      
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogContent className="relative p-6 md:p-8 bg-white">
          <button
            type="button"
            onClick={handleCloseModal}
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-black" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
            <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center h-80">
              {product.image || product.thumbnail ? (
                <img
                  src={product.image || product.thumbnail}
                  alt={product.name || product.title}
                  className="h-40 object-contain"
                />
              ) : (
                <span className="text-6xl">🎮</span>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name || product.title}</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">
                  ({reviewsCount} Reviews)
                </span>
                <span className="text-green-500 text-sm font-medium">
                  | In Stock
                </span>
              </div>

              <div className="text-2xl font-bold text-red-500 mb-4">
                {product.price}
              </div>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {product.description || "High quality product with exceptional features and reliable performance."}
              </p>

              {hasSizes && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-medium text-gray-700 text-sm">Size:</span>
                  <div className="flex gap-2">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-8 h-8 rounded border text-xs font-semibold transition-colors cursor-pointer ${
                          selectedSize === size
                            ? "bg-red-500 text-white border-red-500"
                            : "border-gray-300 text-gray-700 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 bg-red-500 text-white hover:bg-red-600 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCartFromModal}
                  className="bg-red-500 text-white flex-1 py-3 rounded font-medium hover:bg-red-600 transition-colors text-sm cursor-pointer"
                >
                  Add To Cart
                </button>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to={`/product/${product.id}`}
                  onClick={handleCloseModal}
                  className="text-xs text-gray-500 hover:underline"
                >
                  View Full Product Details →
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;