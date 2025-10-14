import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";

export default function ClimateTrends() {
  const [city, setCity] = useState("Nairobi");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = "https://soil-health-analyzer-8-du5m.onrender.com";

  const fetchClimateData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/climate?city=${city}`);
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to load climate data.");
      setData(result.trends);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl mt-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-emerald-600">🌦 Climate Trends</h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter city (e.g., Nairobi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-400 w-full md:w-1/2"
        />
        <button
          onClick={fetchClimateData}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
        >
          {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          Fetch Data
        </button>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {data.length > 0 && (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rainfall" stroke="#10B981" name="Rainfall (mm)" />
              <Line type="monotone" dataKey="temp" stroke="#2563EB" name="Temperature (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
