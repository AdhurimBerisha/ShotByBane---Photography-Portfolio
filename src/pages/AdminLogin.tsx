import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { transition1 } from "../transition";
import { signInAdmin } from "../services/apiAuth";
import { CursorContext } from "../context/CursorContext";

const AdminLogin = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const { user, error: loginError } = await signInAdmin(email, password);

    if (loginError) {
      setError(loginError);
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition1}
        className="w-full max-w-md"
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <div className="text-center mb-8">
          <img
            src="/images/header/logo.svg"
            alt="Logo"
            className="h-12 w-auto mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default AdminLogin;
