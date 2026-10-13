import { useState } from "react";
import { Phone, Mail } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent successfully! We’ll be in touch soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      
      <div className="text-sm text-gray-500 mb-12">
        <span>Home</span> / <span className="text-black font-medium">Contact</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* معلومات الاتصال */}
        <div className="bg-white p-8 rounded border border-gray-200 shadow-sm space-y-8">
          {/* قسم الجوال */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-500 text-white p-3 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">Call To Us</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-sm font-medium text-gray-800">
              Phone: +8801611112222
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* قسم الايميل */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-500 text-white p-3 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">Write To US</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-sm font-medium text-gray-800 mb-2">
              Emails: customer@exclusive.com
            </p>
            <p className="text-sm font-medium text-gray-800">
              Emails: support@exclusive.com
            </p>
          </div>
        </div>

        {/* نموذج إرسال الرسالة */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white p-8 rounded border border-gray-200 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Your Name *"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-black"
            />
            <input
              type="email"
              placeholder="Your Email *"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-black"
            />
            <input
              type="text"
              placeholder="Your Phone *"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <textarea
            rows="6"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-black resize-none"
          ></textarea>

          <div className="text-right">
            <button
              type="submit"
              className="bg-red-500 text-white px-8 py-4 rounded font-medium hover:bg-red-600 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;