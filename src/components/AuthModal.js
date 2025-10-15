import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose, mode, setMode, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Hooks always run at top level ---
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      onLogin(JSON.parse(savedUser));
    }
  }, [onLogin]);

  // Auto-detect backend URL
  const API_BASE =
    process.env.NODE_ENV === "production"
      ? "https://soil-health-analyzer-8-du5m.onrender.com"
      : "http://localhost:5000";

  // --- Handle Login ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin(data.user);
        onClose();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Registration ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please log in.");
        setMode("login");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // --- Logout helper ---
  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogin(null);
  };

  // --- Conditional render after hooks ---
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <form
          onSubmit={mode === "login" ? handleLogin : handleRegister}
          className="space-y-4"
        >
          {mode === "register" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 text-white px-5 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-all"
          >
            {loading
              ? mode === "login"
                ? "Logging in..."
                : "Registering..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-emerald-600 font-medium hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-emerald-600 font-medium hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
