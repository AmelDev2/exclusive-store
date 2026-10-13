import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [orderSuccess, setOrderSuccess] = useState(false);

  // حالة لتخزين بيانات الشحن وتحديثها تلقائياً عند جلب المستخدم
  const [formData, setFormData] = useState({
    firstName: "John",
    companyName: "",
    streetAddress: "Main Street",
    apartment: "",
    city: "Jeddah",
    phone: "0500000000",
    email: "test@gmail.com",
  });

  // جلب بيانات المستخدم المسجل حالياً لتعبئة الحقول
  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const userFullName =
          user.user_metadata?.full_name || user.email?.split("@")[0] || "John";
        setFormData((prev) => ({
          ...prev,
          firstName: userFullName,
          email: user.email || prev.email,
        }));
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + (Number(item.price) || 0) * item.quantity,
    0
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // تفعيل حالة النجاح وتفريغ السلة  وبقاء المستخدم في الصفحة
    setOrderSuccess(true);
    if (clearCart) clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-sm text-gray-500 mb-10">
        <Link to="/" className="hover:underline">
          Account
        </Link>{" "}
        /{" "}
        <Link to="/cart" className="hover:underline">
          My Cart
        </Link>{" "}
        / <span className="text-black font-medium">CheckOut</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Billing Details</h1>

      {orderSuccess ? (
        <div className="bg-white border border-gray-200 p-12 rounded-lg text-center my-12 shadow-sm max-w-xl mx-auto">
          <div data-testid="order-success" className="text-green-600 font-bold text-2xl mb-4">
            Your order has been received successfully! Thank you for shopping with us.
          </div>
          <p className="text-gray-500 text-sm mb-8">
            We have received your order and it is now being processed. You can return to the store whenever you like.
          </p>
          <Link
            to="/"
            className="bg-red-500 text-white px-8 py-3 rounded font-medium hover:bg-red-600 transition-colors inline-block"
          >
            Return To Shop
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handlePlaceOrder}
          data-testid="checkout-form"
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        >
          {/* نموذج إدخال بيانات الشحن */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-500 text-sm mb-2">
                First Name*
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-2">
                Street Address*
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-2">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-2">
                Town/City*
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-2">
                Phone Number*
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-2">
                Email Address*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* ملخص الطلب وخيارات الدفع */}
          <div className="bg-white p-8 border border-gray-200 rounded-lg">
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl bg-gray-100 p-2 rounded">🛒</span>
                    <span className="text-sm font-medium">
                      {item.name || item.title} (x{item.quantity})
                    </span>
                  </div>
                  <span className="font-semibold">
                    ${(Number(item.price) || 0) * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-gray-200 pb-3">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* خيارات الدفع */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="accent-black"
                  />
                  <span className="font-medium">Bank (Test Data)</span>
                </label>
                <div className="flex gap-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Visa
                  </span>
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Mastercard
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="accent-black" />
                  <span className="font-medium">Cash on delivery</span>
                </label>
              </div>
            </div>

            {/* كوبون خصم */}
            <div className="mt-8 flex gap-4">
              <input
                type="text"
                placeholder="Coupon Code"
                className="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none"
              />
              <button
                type="button"
                className="bg-red-500 text-white px-6 py-2 rounded font-medium hover:bg-red-600 transition-colors whitespace-nowrap"
              >
                Apply Coupon
              </button>
            </div>

            {/* زر إتمام الطلب */}
            <button
              type="submit"
              data-testid="place-order"
              className="w-full bg-red-500 text-white py-4 rounded font-medium mt-8 hover:bg-red-600 transition-colors"
            >
              Place Order
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;