import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { CloudSun, Loader2, Search, History, RefreshCw } from "lucide-react";

export default function ClimateTrends() {
  const [forecastData, setForecastData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("Nairobi, Kenya");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [coords, setCoords] = useState({ lat: -1.286389, lon: 36.817223 }); // Nairobi default

  // Fetch climate data from your backend
  const fetchClimate = async (city, lat = null, lon = null) => {
    try {
      setLoading(true);
      setError("");

      let apiCoords = { lat, lon };

      // Step 1: Get coordinates if not provided
      if (!lat || !lon) {
        const geoRes = await fetch(
          `/api/weather?city=${encodeURIComponent(city)}`
        );
        const geoData = await geoRes.json();

        if (!geoData || !geoData.lat || !geoData.lon)
          throw new Error("Location not found");

        apiCoords = { lat: geoData.lat, lon: geoData.lon };
        setLocation(`${geoData.name}, ${geoData.country}`);
      }

      setCoords(apiCoords);

      // Step 2: Fetch climate trends from backend
      const res = await fetch(
        `/api/climate?lat=${apiCoords.lat}&lon=${apiCoords.lon}`
      );
      const data = await res.json();

      if (!data || !data.trends) throw new Error("No climate data returned");

      // Forecast: next 24 hours (first 8 items)
      const forecastChart = data.trends.slice(0, 8).map((item) => ({
        time: item.time || item.date || "", // fallback
        temp: item.temp,
        rainfall: item.rainfall || 0,
      }));
      setForecastData(forecastChart);

      // History: last 5 days
      const historyChart = data.trends.slice(-5).map((item, i) => ({
        day: `-${5 - i}d`,
        temp: item.temp,
        rainfall: item.rainfall || 0,
      }));
      setHistoryData(historyChart);

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
      setError("Failed to load climate data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchClimate("Nairobi");
  }, []);

  // Handle city search
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) fetchClimate(query);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CloudSun className="w-8 h-8 text-emerald-600" />
          <h2 className="text-2xl font-bold text-gray-800">Climate Trends</h2>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <RefreshCw className="w-4 h-4 animate-spin-slow text-emerald-500" />
          {lastUpdated && <span>Last updated: {lastUpdated}</span>}
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Search city (e.g., Nairobi, Tokyo)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          type="submit"
          className="bg-emerald-500 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition"
        >
          <Search className="w-4 h-4" /> Search
        </button>
      </form>

      {/* Loader / Error / Data */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          {/* Forecast Chart */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
              {location} — Next 24 Hours Forecast
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Temperature (°C)"
                />
                <Line
                  type="monotone"
                  dataKey="rainfall"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Rainfall (mm)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Historical Chart */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-6 h-6 text-emerald-600" />
              <h3 className="text-lg font-semibold text-gray-700">
                Past 5 Days Temperature Trend
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Avg Temp (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
