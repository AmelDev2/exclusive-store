import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Account = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "Jeddah, Saudi Arabia",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        const fullName = user.user_metadata?.full_name || "";
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setFormData((prev) => ({
          ...prev,
          firstName: firstName,
          lastName: lastName,
          email: user.email || "",
        }));
      }
      if (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert("The passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const updateData = {
        data: { full_name: `${formData.firstName} ${formData.lastName}`.trim() },
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      const { error } = await supabase.auth.updateUser(updateData);

      if (error) {
        alert(`An error occurred during the update: ${error.message}`);
      } else {
        alert("Account details have been successfully updated!");
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center text-sm mb-16">
        <div className="text-gray-500">
          <span>Home</span> /{" "}
          <span className="text-black font-medium">My Account</span>
        </div>
        <div className="text-gray-600">
          Welcome!{" "}
          <span className="text-[#DB4444] font-medium">
            {formData.firstName} {formData.lastName}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-base mb-4">Manage My Account</h3>
            <ul className="space-y-3 ps-6 text-sm">
              <li>
                <span className="text-[#DB4444] font-medium cursor-pointer">
                  My Profile
                </span>
              </li>
              <li>
                <span className="text-gray-500 hover:text-black cursor-pointer">
                  Address Book
                </span>
              </li>
              <li>
                <span className="text-gray-500 hover:text-black cursor-pointer">
                  My Payment Options
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">My Orders</h3>
            <ul className="space-y-3 ps-6 text-sm">
              <li>
                <span className="text-gray-500 hover:text-black cursor-pointer">
                  My Returns
                </span>
              </li>
              <li>
                <span className="text-gray-500 hover:text-black cursor-pointer">
                  My Cancellations
                </span>
              </li>
            </ul>
          </div>

          <div>
            <Link
              to="/wishlist"
              className="font-bold text-base block hover:text-[#DB4444] transition-colors"
            >
              My WishList
            </Link>
          </div>
        </div>

        {/* نموذج تعديل الملف الشخصي */}
        <div className="md:col-span-3 bg-white p-8 rounded border border-gray-100 shadow-sm">
          <h2 className="text-[#DB4444] font-bold text-xl mb-6">
            Edit Your Profile
          </h2>

          
          <form onSubmit={handleSubmit} data-testid="account-form" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-[#F5F5F5] border border-transparent rounded p-3 text-sm focus:outline-none focus:border-black"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-[#F5F5F5] border border-transparent rounded p-3 text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-gray-200 text-gray-500 border border-transparent rounded p-3 text-sm cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-[#F5F5F5] border border-transparent rounded p-3 text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <label className="text-sm text-gray-700 block">
                Password Changes
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password (leave blank if not changing)"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full bg-[#F5F5F5] border border-transparent rounded p-3 text-sm focus:outline-none focus:border-black"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#F5F5F5] border border-transparent rounded p-3 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div className="flex justify-end items-center gap-6 pt-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="text-sm text-black hover:text-[#DB4444] transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                data-testid="save-profile"
                className="bg-[#DB4444] text-white px-8 py-4 rounded text-sm font-medium hover:bg-[#c53b3b] transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;