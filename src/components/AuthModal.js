import React, { useState } from "react";
import { X, User, Mail, Lock } from "lucide-react";

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock login/register handler
    const user = {
      name: formData.name || "John Doe",
      email: formData.email,
      joinDate: "Oct 2025",
      location: "Kenya",
      stats: { soilScans: 12, weatherChecks: 8, resourcesRead: 5 },
      recentScans: [
        { location: "Nairobi", date: "Oct 10, 2025", type: "Loamy", score: 82 },
        { location: "Kisumu", date: "Oct 8, 2025", type: "Clay", score: 65 },
      ],
    };

    onLogin(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <div className="flex items-center bg-gray-50 rounded-xl px-3 border border-gray-200 focus-within:border-emerald-400">
                <User className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-transparent px-2 py-3 focus:outline-none text-gray-700"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <div className="flex items-center bg-gray-50 rounded-xl px-3 border border-gray-200 focus-within:border-emerald-400">
              <Mail className="w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full bg-transparent px-2 py-3 focus:outline-none text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="flex items-center bg-gray-50 rounded-xl px-3 border border-gray-200 focus-within:border-emerald-400">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-transparent px-2 py-3 focus:outline-none text-gray-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle between Login/Register */}
        <div className="text-center mt-6 text-sm text-gray-600">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-emerald-600 font-medium hover:underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-emerald-600 font-medium hover:underline"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
