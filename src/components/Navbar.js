import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Leaf,
  Cloud,
  BarChart3,
  BookOpen,
  Phone,
  User,
  Menu,
  X,
  Home,
  MessageSquare,
} from "lucide-react";

export default function Navbar({ isAuthenticated, user, onLogout, onLoginClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = [
    { name: "Soil Analyzer", path: "/", icon: Leaf },
    { name: "Weather Forecast", path: "/weather", icon: Cloud },
    { name: "Climate Trends", path: "/climate", icon: BarChart3 },
    { name: "Resources", path: "/resources", icon: BookOpen },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  // Authenticated users see Dashboard
  if (isAuthenticated) navItems.push({ name: "Dashboard", path: "/dashboard", icon: Home });

  // Admin users see Admin Messages
  if (user?.role === "admin") navItems.push({ name: "Admin Messages", path: "/admin/messages", icon: MessageSquare });

  return (
    <nav className="relative z-20 backdrop-blur-lg bg-white/70 border-b border-emerald-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              LandReGen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    active
                      ? "bg-emerald-100 text-emerald-700 font-medium"
                      : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="ml-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <button
                  onClick={onLogout}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="ml-4 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-emerald-100 text-emerald-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-emerald-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                    active
                      ? "bg-emerald-100 text-emerald-700 font-medium"
                      : "text-gray-600 hover:bg-emerald-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Auth Section - Mobile */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all mt-2"
              >
                <X className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
