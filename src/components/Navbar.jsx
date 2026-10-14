import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import GoogleTranslate from "./GoogleTranslate";
import { supabase } from "../supabaseClient"; 
import {
  Heart,
  ShoppingCart,
  Search,
  User,
  ShoppingBag,
  XCircle,
  Star,
  LogOut,
  Menu,
  X,
  LogIn,
  UserPlus,
} from "lucide-react";

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); 
  const navigate = useNavigate();

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const dropdownRef = useRef(null);

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // دالة تسجيل الخروج
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAccountOpen(false);
    setIsMobileMenuOpen(false);
    alert("Logged out successfully");
    navigate("/login");
  };

  // جلب المنتجات للبحث الفوري
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) =>
        console.error("Error fetching products for search:", err),
      );
  }, []);

  // فلترة المنتجات بناءً على ما يكتبه المستخدم في خانة البحث
  const filteredProducts =
    searchQuery.trim() === ""
      ? []
      : products.filter((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  // إغلاق القائمة عند النقر في أي مكان خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  const navLinkStyle = ({ isActive }) =>
    `pb-1 transition-all duration-300 ease-in-out transform hover:scale-105 shrink-0 ${
      isActive
        ? "text-black border-b-2 border-black font-semibold"
        : "text-gray-600 hover:text-black"
    }`;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setTimeout(() => {
        const searchSection = document.getElementById("search-results-section");
        if (searchSection) {
          searchSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  
  const displayName = currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0];

  return (
    <nav className="border-b border-gray-200 py-4 px-4 md:px-8 bg-white sticky top-0 z-50 transition-all duration-500 ease-in-out shadow-sm">
      <div className="container mx-auto flex justify-between items-center gap-4">
        {/* اسم المتجر */}
        <div className="text-xl md:text-2xl font-bold tracking-wider transition-transform duration-300 hover:scale-105 shrink-0">
          <Link to="/">Exclusive</Link>
        </div>

        
        <div className="hidden md:flex gap-6 lg:gap-8 font-medium shrink-0 items-center">
          <NavLink to="/" className={navLinkStyle} end>
            Home
          </NavLink>
          <NavLink to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>
          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>
          {!currentUser && (
            <NavLink to="/signup" className={navLinkStyle}>
              Sign Up
            </NavLink>
          )}
        </div>

        
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-gray-100 rounded-md px-3 py-1.5 w-48 lg:w-64 transition-all duration-300 focus-within:ring-2 focus-within:ring-black/20 hover:bg-gray-200/70"
          >
            <input
              type="text"
              data-testid="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="bg-transparent text-xs lg:text-sm outline-none w-full text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              data-testid="search-button"
              className="focus:outline-none flex items-center justify-center"
            >
              <Search className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </button>

            {searchQuery.trim() !== "" && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-2xl z-50 max-h-72 overflow-y-auto py-2 transition-all duration-300">
                {products.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-gray-500 text-center">
                    Loading products...
                  </div>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setSearchQuery("");
                        navigate(`/product/${product.id}`);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-50 last:border-none"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 object-contain rounded bg-white p-1"
                      />
                      <div className="flex flex-col overflow-hidden text-left">
                        <span className="text-xs font-semibold text-gray-800 truncate">
                          {product.title}
                        </span>
                        <span className="text-xs text-red-500 font-bold">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="px-4 py-3 text-xs text-gray-500 text-center"
                    data-testid="no-results-message"
                  >
                    No matching products found
                  </div>
                )}
              </div>
            )}
          </form>

          {/* تحويل اللغات */}
          <div
            data-testid="lang-switch"
            className="px-2 py-1 text-xs lg:text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <GoogleTranslate />
          </div>
        </div>

        {/* الأيقونات  (مفضلة، سلة، حساب، زر القائمة للموبايل) */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <Link
            to="/wishlist"
            className="relative text-gray-700 hover:text-red-500 flex items-center transition-all duration-300 transform hover:scale-110"
          >
            <Heart className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold shadow-md animate-bounce">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            data-testid="cart-count"
            className="relative text-gray-700 hover:text-red-500 flex items-center transition-all duration-300 transform hover:scale-110"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold shadow-md animate-bounce">
                {totalItemsCount}
              </span>
            )}
          </Link>

          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className={`p-1.5 md:p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-sm flex items-center gap-1 ${
                isAccountOpen
                  ? "bg-red-500 text-white rotate-90"
                  : "hover:text-red-500 text-black bg-gray-100"
              }`}
            >
              <User className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div
              className={`absolute right-0 mt-3 w-60 bg-white/95 backdrop-blur-md rounded-md shadow-2xl py-3 z-50 text-gray-800 flex flex-col gap-1 border border-gray-200 transition-all duration-300 ease-out origin-top-right ${
                isAccountOpen
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {currentUser && (
                <div className="px-4 py-2 border-b border-gray-100 text-xs font-semibold text-gray-600 truncate">
                  Hello, <span className="text-black">{displayName}</span>
                </div>
              )}
              <Link
                to="/account"
                onClick={() => setIsAccountOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-all"
              >
                <User className="w-4 h-4 text-gray-600" />
                <span>Manage My Account</span>
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsAccountOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-gray-600" />
                <span>My Order</span>
              </Link>
              <Link
                to="/cancellations"
                onClick={() => setIsAccountOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-all"
              >
                <XCircle className="w-4 h-4 text-gray-600" />
                <span>My Cancellations</span>
              </Link>
              <Link
                to="/reviews"
                onClick={() => setIsAccountOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-all"
              >
                <Star className="w-4 h-4 text-gray-600" />
                <span>My Reviews</span>
              </Link>

              {currentUser ? (
                <button
                  onClick={handleLogout}
                  data-testid="logout"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-red-50 text-red-500 transition-all w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-all"
                  >
                    <LogIn className="w-4 h-4 text-gray-600" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-all text-red-500 font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* زر القائمة للموبايل */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-700 focus:outline-none bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

    
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-5 px-6 flex flex-col gap-4 md:hidden z-50 transition-all">
          {currentUser && (
            <div className="text-sm font-semibold text-gray-700 pb-2 border-b border-gray-100">
              Welcome, <span className="text-black">{displayName}</span>
            </div>
          )}

          
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-gray-100 rounded-md px-3 py-2 w-full"
          >
            <input
              type="text"
              data-testid="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-400"
            />
            <button type="submit" data-testid="search-button">
              <Search className="w-4 h-4 text-gray-500 cursor-pointer" />
            </button>
          </form>

        
          <div
            data-testid="language-toggle"
            className="flex justify-center py-2 border-t border-gray-100"
          >
            <GoogleTranslate />
          </div>

          {/* روابط التنقل في الموبايل */}
          <div className="flex flex-col gap-3 font-medium border-t border-gray-100 pt-3">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={(props) => `${navLinkStyle(props)} w-fit`}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={(props) => `${navLinkStyle(props)} w-fit`}
            >
              Contact
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={(props) => `${navLinkStyle(props)} w-fit`}
            >
              About
            </NavLink>
            
            {!currentUser ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={(props) => `${navLinkStyle(props)} w-fit`}
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={(props) => `${navLinkStyle(props)} w-fit text-red-500`}
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-left text-red-500 font-medium py-1 w-fit"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;