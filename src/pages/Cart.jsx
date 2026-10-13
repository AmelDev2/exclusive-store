import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const getCleanPrice = (price) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    const cleaned = Number(price.toString().replace(/[^0-9.]/g, ""));
    return isNaN(cleaned) ? 0 : cleaned;
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + getCleanPrice(item.price) * item.quantity;
  }, 0);

  const handleUpdateCart = () => {
    alert("Cart updated successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-sm text-gray-500 mb-10">
        <Link to="/" className="hover:underline">Home</Link> / <span className="text-black font-medium">Cart</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Your cart is currently empty.</h2>
          <Link to="/" className="bg-red-500 text-white px-6 py-3 rounded font-medium hover:bg-red-600 transition-colors">
          Back to Shop
          </Link>
        </div>
      ) : (
        <div>
          <div className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden mb-6">
          
            <div className="hidden md:grid grid-cols-4 p-6 border-b border-gray-200 font-semibold text-gray-700">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div className="text-right">Subtotal</div>
            </div>

            {cartItems.map((item) => {
              const itemPrice = getCleanPrice(item.price);
              const itemSubtotal = itemPrice * item.quantity;
              const productImg = item.image || item.thumbnail || (item.images && item.images[0]);

              return (
                <div
                  key={item.id}
                  data-testid="cart-item"
                  className="flex flex-col md:grid md:grid-cols-4 p-4 md:p-6 items-start md:items-center border-b border-gray-100 last:border-none gap-4 md:gap-0"
                >
                  {/* قسم المنتج والاسم */}
                  <div className="flex items-center gap-3 relative w-full md:w-auto">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      data-testid="remove-from-cart"
                      className="absolute -top-2 -left-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center hover:bg-red-600 z-10 cursor-pointer"
                    >
                      ✕
                    </button>
                    
                    {productImg ? (
                      <img
                        src={productImg}
                        alt={item.name || item.title}
                        className="w-14 h-14 md:w-16 md:h-16 object-contain bg-gray-100 rounded p-1 shrink-0"
                      />
                    ) : (
                      <div className="bg-gray-100 p-3 rounded text-2xl shrink-0">🎮</div>
                    )}
                    
                    <span className="font-semibold text-sm sm:text-base text-gray-900 leading-snug">
                      {item.name || item.title}
                    </span>
                  </div>
                  
                  
                  <div className="flex justify-between items-center w-full md:contents">
                    <div className="text-gray-600 text-sm md:text-base">
                      <span className="md:hidden text-xs text-gray-400 mr-1">Price: </span>
                      ${itemPrice.toFixed(2)}
                    </div>
                    
                    <div>
                      <div className="flex items-center border border-gray-300 rounded w-16 px-2 py-1 justify-between">
                        <span className="text-sm">{item.quantity < 10 ? `0${item.quantity}` : item.quantity}</span>
                        <div className="flex flex-col text-[10px] text-gray-500 cursor-pointer select-none">
                          <span onClick={() => updateQuantity(item.id, item.quantity + 1)}>▲</span>
                          <span onClick={() => updateQuantity(item.id, item.quantity - 1)}>▼</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-bold text-black text-sm md:text-base">
                      <span className="md:hidden text-xs text-gray-400 mr-1">Subtotal: </span>
                      ${itemSubtotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
            <Link to="/" className="border border-gray-400 px-6 md:px-8 py-3 rounded font-medium hover:bg-gray-50 w-full sm:w-auto text-center">
              Return To Shop
            </Link>
            <button
              onClick={handleUpdateCart}
              className="border border-gray-400 px-6 md:px-8 py-3 rounded font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Update Cart
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="Coupon Code"
                className="border border-gray-400 px-4 py-3 rounded w-full sm:w-60 focus:outline-none"
              />
              <button className="bg-red-500 text-white px-8 py-3 rounded font-medium hover:bg-red-600 transition-colors w-full sm:w-auto">
                Apply Coupon
              </button>
            </div>

            <div className="w-full md:w-96 border border-black p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Cart Total</h3>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between py-3 font-bold text-lg">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="block text-center bg-red-500 text-white w-full py-3 rounded mt-6 font-medium hover:bg-red-600 transition-colors">
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;