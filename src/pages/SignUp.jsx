import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import loginImage from "../assets/75f394c0a1c7dc5b68a42239311e510f54d8cd59.jpg";
import { supabase } from "../supabaseClient";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      alert("Account created successfully! You can now log in.");
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-12 gap-12">
      {/* صورة جانبية */}
      <div className="w-full md:w-1/2 bg-[#CBE1EF] flex items-center justify-center py-20 rounded-r-lg">
        <div className="text-6xl">
          <img src={loginImage} alt="loginImage" />
        </div>
      </div>

      {/* نموذج إنشاء الحساب */}
      <div className="w-full md:w-1/2 max-w-md px-6">
        <h2 className="text-3xl font-bold tracking-wider mb-2">
          Create an account
        </h2>
        <p className="text-gray-600 mb-8 text-sm">Enter your details below</p>

        {errorMessage && (
          <p className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleRegister} data-testid="signup-form" className="space-y-6">
          {/* حقل الاسم */}
          <div className="relative flex items-center">
            <User className="w-5 h-5 text-gray-400 absolute left-0" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-gray-400 py-2 pl-8 focus:outline-none focus:border-black text-sm"
              required
            />
          </div>

          {/* حقل الايميل */}
          <div className="relative flex items-center">
            <Mail className="w-5 h-5 text-gray-400 absolute left-0" />
            <input
              type="email"
              placeholder="Email or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-400 py-2 pl-8 focus:outline-none focus:border-black text-sm"
              required
            />
          </div>

          {/* حقل الباسورد */}
          <div className="relative flex items-center">
            <Lock className="w-5 h-5 text-gray-400 absolute left-0" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-400 py-2 pl-8 focus:outline-none focus:border-black text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-3 rounded font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have account?{" "}
            <Link to="/login" className="font-bold underline text-black">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;