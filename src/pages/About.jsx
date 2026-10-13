import {
  Truck,
  Headphones,
  ShieldCheck,
  Store,
  CircleDollarSign,
  Users,
  ShoppingBag,
} from "lucide-react";

import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import ImageTC from "../assets/image.png";
import ImageEW from "../assets/image2.png"

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-20">
      <div className="text-sm text-gray-500">
        <span>Home</span> /{" "}
        <span className="text-black font-medium">About</span>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider">
            Our Story
          </h1>
          <p className="text-gray-600 leading-relaxed text-sm">
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sellers and 300 brands and serves 3 millions customers
            across the region.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="bg-[#DB4444]/10 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
          
          <div className="bg-[#EB7EA8] w-full h-full flex items-center justify-center text-white text-2xl font-bold">
            [Story Image / Illustration]
          </div>
        </div>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* البطاقة 1 */}
        <div className="border border-gray-200 rounded p-8 text-center hover:bg-[#DB4444] hover:text-white transition-colors group">
          <div className="w-12 h-12 bg-black text-white group-hover:bg-white group-hover:text-black rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
            <Store className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold mb-1">10.5k</div>
          <p className="text-sm text-gray-600 group-hover:text-white">
            Sellers active on our site
          </p>
        </div>

        {/* البطاقة 2 (محددة باللون الأحمر كافتراضي) */}
        <div className="border border-gray-200 rounded p-8 text-center bg-[#DB4444] text-white shadow-md">
          <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4">
            <CircleDollarSign className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold mb-1">33k</div>
          <p className="text-sm">Monthly Product Sale</p>
        </div>

        {/* البطاقة 3 */}
        <div className="border border-gray-200 rounded p-8 text-center hover:bg-[#DB4444] hover:text-white transition-colors group">
          <div className="w-12 h-12 bg-black text-white group-hover:bg-white group-hover:text-black rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
            <Users className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold mb-1">45.5k</div>
          <p className="text-sm text-gray-600 group-hover:text-white">
            Customer active in our site
          </p>
        </div>

        {/* البطاقة 4 */}
        <div className="border border-gray-200 rounded p-8 text-center hover:bg-[#DB4444] hover:text-white transition-colors group">
          <div className="w-12 h-12 bg-black text-white group-hover:bg-white group-hover:text-black rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="text-3xl font-bold mb-1">25k</div>
          <p className="text-sm text-gray-600 group-hover:text-white">
            Annual gross sale in our site
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center overflow-hidden">
            <img
              className="w-full h-full object-contain"
              src={ImageTC}
              alt="Tom Cruise"
            />
          </div>

        
          <div>
            <h3 className="text-2xl font-bold">Tom Cruise</h3>
            <p className="text-sm text-gray-600 mb-3">Founder & Chairman</p>
            <div className="flex gap-4 text-black">
              <FaTwitter className="w-5 h-5 cursor-pointer hover:text-[#DB4444]" />
              <FaInstagram className="w-5 h-5 cursor-pointer hover:text-[#DB4444]" />
              <FaLinkedinIn className="w-5 h-5 cursor-pointer hover:text-[#DB4444]" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg h-80 flex items-end justify-center overflow-hidden">
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center overflow-hidden">
              <img className=" w-full h-full object-contain" src={ImageEW} alt="" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Emma Watson</h3>
            <p className="text-sm text-gray-600 mb-3">Managing Director</p>
            <div className="flex gap-4 text-black">
              <FaTwitter className="w-5 h-5 cursor-pointer hover:text-[#DB4444]" />
              <FaInstagram className="w-5 h-5 cursor-pointer hover:text-[#DB4444]" />
              <FaLinkedinIn className="w-5 h-5 cursor-pointer hover:text-[#DB4444]" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg h-80 flex items-end justify-center overflow-hidden">
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center overflow-hidden">
              <img className=" w-full h-full object-contain" src={ImageEW} alt="" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Will Smith</h3>
            <p className="text-sm text-gray-600 mb-3">Product Designer</p>
            <div className="flex gap-4 text-black">
              <FaTwitter className="w-5 h-5 cursor-pointer hover:text-[#DB4444]" />
              <FaInstagram className="w-5 h-5 cursor-pointer hover:text-[#DB4444]" />
              <FaLinkedinIn className="w-5 h-5 cursor-pointer hover:text-[#DB4444]" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 pt-4">
        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
        <span className="w-3 h-3 rounded-full bg-[#DB4444]"></span>
        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
      </div>

      {/* قسم مميزات المتجر (Service Features) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 text-center">
        <div className="space-y-3 flex flex-col items-center">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center border-8 border-gray-200">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">FREE AND FAST DELIVERY</h3>
          <p className="text-xs text-gray-600">
            Free delivery for all orders over $140
          </p>
        </div>
        <div className="space-y-3 flex flex-col items-center">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center border-8 border-gray-200">
            <Headphones className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">24/7 CUSTOMER SERVICE</h3>
          <p className="text-xs text-gray-600">
            Friendly 24/7 customer support
          </p>
        </div>
        <div className="space-y-3 flex flex-col items-center">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center border-8 border-gray-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">MONEY BACK GUARANTEE</h3>
          <p className="text-xs text-gray-600">
            We return money within 30 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
