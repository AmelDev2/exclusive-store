import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, ShoppingBag, XCircle, Star, LogOut } from "lucide-react";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // إغلاق القائمة عند النقر في أي مكان خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/*  أيقونة اليوزر اللي تفتح القائمة */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full transition-colors ${
          isOpen ? "bg-red-500 text-white" : "hover:text-red-500 text-black"
        }`}
      >
        <User className="w-6 h-6" />
      </button>

      {/* القائمة المنسدلة */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-md border border-gray-100 rounded-md shadow-xl py-3 z-50 text-gray-800 flex flex-col gap-1">
          <Link
            to="/account"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors"
          >
            <User className="w-4 h-4 text-gray-600" />
            <span>Manage My Account</span>
          </Link>

          <Link
            to="/orders"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-gray-600" />
            <span>My Order</span>
          </Link>

          <Link
            to="/cancellations"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors"
          >
            <XCircle className="w-4 h-4 text-gray-600" />
            <span>My Cancellations</span>
          </Link>

          <Link
            to="/reviews"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors"
          >
            <Star className="w-4 h-4 text-gray-600" />
            <span>My Reviews</span>
          </Link>

          <button
            onClick={() => {
              setIsOpen(false);
              alert("Logged out successfully.");
            }}
            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-red-50 text-red-500 transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
