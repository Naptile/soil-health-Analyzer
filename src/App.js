import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import AnimatedBackground from "./components/AnimatedBackground";

// Pages
import SoilAnalyzer from "./pages/SoilAnalyzer";
import WeatherForecast from "./pages/WeatherForecast";
import ClimateTrends from "./pages/ClimateTrends";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AdminMessages from "./pages/AdminMessages"; 

export default function App() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;

  const [user, setUser] = useState(storedUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedUser);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) {
      setUser(stored);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative">
        <AnimatedBackground />

        <Navbar
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
          onLoginClick={() => {
            setShowAuthModal(true);
            setAuthMode("login");
          }}
        />

        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            mode={authMode}
            setMode={setAuthMode}
            onClose={() => setShowAuthModal(false)}
            onLogin={handleLogin}
          />
        )}

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
          <Routes>
            <Route path="/" element={<SoilAnalyzer user={user} />} />
            <Route path="/weather" element={<WeatherForecast />} />
            <Route path="/climate" element={<ClimateTrends />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />

            {/* Profile */}
            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile user={user} />
                ) : (
                  <div className="text-center py-16">
                    <p className="text-lg text-gray-700 mb-4">
                      Please log in to view your profile.
                    </p>
                    <button
                      onClick={() => {
                        setShowAuthModal(true);
                        setAuthMode("login");
                      }}
                      className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600"
                    >
                      Login
                    </button>
                  </div>
                )
              }
            />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard user={user} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* Admin Messages */}
            <Route
              path="/admin/messages"
              element={
                isAuthenticated && isAdmin ? (
                  <AdminMessages />
                ) : (
                  <div className="text-center py-16">
                    <p className="text-lg text-red-600 mb-4">
                      Access denied. Admins only.
                    </p>
                    {!isAuthenticated && (
                      <button
                        onClick={() => {
                          setShowAuthModal(true);
                          setAuthMode("login");
                        }}
                        className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600"
                      >
                        Login
                      </button>
                    )}
                  </div>
                )
              }
            />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
