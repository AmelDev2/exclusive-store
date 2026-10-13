import { Link } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import { Trash2, ShoppingCart } from "lucide-react";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  // نقل كل منتجات المفضلة إلى السلة
  const handleMoveAllToCart = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach((item) => {
      addToCart({ ...item, quantity: 1 });
    });
    clearWishlist();
    alert("All wishlist products have been added to your cart!");
  };

  // نقل منتج واحد للسلة وإزالته من المفضلة
  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    removeFromWishlist(product.id);
    alert(`Added ${product.name || product.title} to your cart!!`);
  };

  const justForYouProducts = [
    {
      id: 201,
      name: "ASUS FHD Gaming Laptop",
      title: "ASUS FHD Gaming Laptop",
      price: 960,
      originalPrice: 1160,
      reviews: 65,
      discount: "-35%",
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 202,
      name: "IPS LCD Gaming Monitor",
      title: "IPS LCD Gaming Monitor",
      price: 1160,
      reviews: 65,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 203,
      name: "HAVIT HV-G92 Gamepad",
      title: "HAVIT HV-G92 Gamepad",
      price: 560,
      reviews: 65,
      discount: "NEW",
      image:
        "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 204,
      name: "AK-900 Wired Keyboard",
      title: "AK-900 Wired Keyboard",
      price: 200,
      reviews: 65,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-normal">
          Wishlist ({wishlistItems.length})
        </h2>
        {wishlistItems.length > 0 && (
          <button
            onClick={handleMoveAllToCart}
            data-testid="move-all-to-cart"
            className="border border-gray-400 px-8 py-3 rounded font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Move All To Bag
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Your wishlist is empty.
          </h2>
          <Link
            to="/"
            className="bg-red-500 text-white px-6 py-3 rounded font-medium hover:bg-red-600 transition-colors inline-block"
          >
          Back to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              data-testid="wishlist-item"
              className="bg-white group relative flex flex-col justify-between"
            >
              
              <div className="bg-gray-100 h-60 rounded flex items-center justify-center relative p-4 mb-4">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors z-10"
                >
                  <Trash2 className="w-4 h-4 text-black" />
                </button>
                <img
                  src={product.image}
                  alt={product.name || product.title}
                  className="max-h-full object-contain"
                />

              
                <button
                  onClick={() => handleAddToCart(product)}
                  data-testid="add-to-cart-btn"
                  className="absolute bottom-0 left-0 right-0 bg-black text-white py-2.5 flex items-center justify-center gap-2 font-medium text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add To Cart
                </button>
              </div>

              
              <div>
                <h3 className="font-medium text-black mb-2 truncate">
                  {product.name || product.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-red-500 font-medium">
                    ${product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Just For You قسم ال  */}
      <div className="mt-20">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="w-4 h-8 bg-red-500 rounded-sm"></span>
            <h2 className="text-xl font-normal">Just For You</h2>
          </div>
          <button className="border border-gray-400 px-8 py-3 rounded font-medium text-sm hover:bg-gray-50 transition-colors">
            See All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {justForYouProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
