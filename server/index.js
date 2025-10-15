// src/pages/Contact.js
import React, { useState } from "react";
import { Mail, User, MapPin, MessageSquare, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("https://soil-health-analyzer-8-du5m.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: "✅ Message sent successfully!" });
        setFormData({ name: "", email: "", city: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.error || "❌ Failed to send message." });
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus({ type: "error", message: "⚠️ Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl w-full max-w-lg space-y-5"
      >
        <div className="flex items-center gap-3 border-b border-white/20 pb-2">
          <User className="text-blue-400" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 border-b border-white/20 pb-2">
          <Mail className="text-blue-400" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 border-b border-white/20 pb-2">
          <MapPin className="text-blue-400" />
          <input
            type="text"
            name="city"
            placeholder="Your City (optional)"
            value={formData.city}
            onChange={handleChange}
            className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
          />
        </div>

        <div className="flex items-start gap-3 border-b border-white/20 pb-2">
          <MessageSquare className="text-blue-400 mt-1" />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="bg-transparent flex-1 outline-none text-white placeholder-gray-400 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-2 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold mt-4"
        >
          <Send size={18} />
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p
            className={`text-center mt-3 ${
              status.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </section>
  );
}
