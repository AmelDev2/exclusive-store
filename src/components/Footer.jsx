import { Link } from "react-router-dom";
import { Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 mt-20">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
        
        <div>
          <h2 className="text-xl font-bold mb-4">
            <Link to="/" className="hover:underline">
              Exclusive
            </Link>
          </h2>
          <p className="font-medium mb-3">Subscribe</p>
          <p className="text-gray-400 mb-4 text-xs">
            Get 10% off your first order
          </p>
          <div className="border border-white rounded flex items-center px-3 py-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-white focus:outline-none text-xs w-full"
            />
            <button type="button" className="text-white hover:text-gray-300">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        
        <div>
          <h3 className="font-bold mb-4 text-base">Support</h3>
          <p className="text-gray-400 mb-2">
            Jeddah, Saudi Arabia.
          </p>
          <p className="text-gray-400 mb-2">support@exclusive.com</p>
          <p className="text-gray-400">+966 50 000 0000</p>
        </div>

        
        <div>
          <h3 className="font-bold mb-4 text-base">Account</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <Link to="/account" className="hover:text-white transition-colors">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                Login / Register
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition-colors">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-white transition-colors">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Shop
              </Link>
            </li>
          </ul>
        </div>

      
        <div>
          <h3 className="font-bold mb-4 text-base">Quick Link</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms Of Use
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-bold mb-4 text-base">Download App</h3>
          <p className="text-gray-400 text-xs mb-3">
            Save $3 with App New User Only
          </p>
          <div className="flex gap-2">
            <div className="bg-gray-800 w-20 h-20 flex items-center justify-center text-xs text-gray-400 rounded">
              QR Code
            </div>
            <div className="flex flex-col justify-between">
              <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-700">
                Google Play
              </div>
              <div className="bg-gray-800 px-3 py-1 rounded text-xs text-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-700">
                App Store
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600 text-xs mt-12 border-t border-gray-800 pt-6">
        © Copyright Exclusive 2026. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;