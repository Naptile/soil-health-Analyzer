import React, { useState } from "react";
import { Phone, Mail, Loader2, Search } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [city, setCity] = useState("Nairobi");
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState([-1.286389, 36.817223]); // Nairobi default
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_API;

  // Submit contact form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://soil-health-analyzer-8-du5m.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, city }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || "Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setError(data.error || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  // Search city for map
  const handleCitySearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        setError("City not found");
        return;
      }

      const { lat, lon, name } = geoData[0];
      setPosition([lat, lon]);
      setCity(name);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch city coordinates");
    }
  };

  return (
    <div className="flex justify-center mt-12 px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Left Panel: Contact Info + Map */}
        <div className="md:w-1/3 bg-emerald-500 p-6 flex flex-col justify-between text-white">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Phone className="w-8 h-8" /> Contact Info
            </h2>
            <p className="text-gray-100">
              Reach out to us and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col gap-3 text-gray-100">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" /> +254 712 345 678
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" /> naptilepeterson71@gmail.com
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-6 h-64 w-full rounded-2xl overflow-hidden shadow-inner">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={position}>
                <Popup>{city}</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* City Search */}
          <form onSubmit={handleCitySearch} className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Search city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow p-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white text-black"
            />
            <button
              type="submit"
              className="bg-white text-emerald-500 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-100 transition"
            >
              <Search className="w-4 h-4" /> Go
            </button>
          </form>
        </div>

        {/* Right Panel: Form */}
        <div className="md:w-2/3 p-8 space-y-6">
          {success && (
            <div className="p-4 bg-green-100 text-green-700 rounded-xl border border-green-200 shadow-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-xl border border-red-200 shadow-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
              required
            />
            <textarea
              placeholder={`Your Message (City: ${city})`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm resize-none"
              rows={5}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-white rounded-2xl px-6 py-3 font-medium hover:bg-emerald-600 hover:shadow-lg transition-all flex justify-center items-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
