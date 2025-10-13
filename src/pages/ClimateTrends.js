import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
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

  const API_KEY = process.env.REACT_APP_WEATHER_API;

  const fetchClimate = async (city) => {
    try {
      setLoading(true);
      setError("");

      // Step 1: Get coordinates
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();
      if (!geoData || geoData.length === 0)
        throw new Error("Location not found");

      const { lat, lon, name, country } = geoData[0];
      setLocation(`${name}, ${country}`);

      // Step 2: Get 24-hour forecast (unchanged)
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();

      const forecastChart = forecastData.list.slice(0, 8).map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit" }),
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed,
      }));
      setForecastData(forecastChart);

      // ✅ Step 3: Simulated 5-day history (natural-looking)
      const currentTemp = forecastData.list[0]?.main?.temp || 25;

      // Create a trend that gently rises or falls based on region
      const variation = (Math.random() - 0.5) * 2; // random ±1 influence
      const trend = currentTemp > 25 ? -1 : 1; // hot cities cool slightly, cold cities warm slightly

      const simulatedHistory = Array.from({ length: 5 }, (_, i) => {
        const dailyShift =
          trend * (Math.random() * 1.5) + variation * (Math.random() * 0.5);
        return {
          day: `-${5 - i}d`,
          temp: Number((currentTemp + dailyShift - (5 - i) * 0.5).toFixed(1)),
        };
      });

      setHistoryData(simulatedHistory);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
      setError("Failed to load climate data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 10 minutes
  useEffect(() => {
    fetchClimate("Nairobi");

    const interval = setInterval(() => {
      fetchClimate(location.split(",")[0] || "Nairobi");
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

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
          {/* Forecast Chart (unchanged) */}
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
                  dataKey="humidity"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Humidity (%)"
                />
                <Line
                  type="monotone"
                  dataKey="wind"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Wind (m/s)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Historical Chart (realistic trend simulation) */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-6 h-6 text-emerald-600" />
              <h3 className="text-lg font-semibold text-gray-700">
                Past 5 Days Temperature Trend (Realistic Simulation)
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
