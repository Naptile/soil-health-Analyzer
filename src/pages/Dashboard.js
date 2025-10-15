import React, { useState, useEffect } from "react";
import { Leaf } from "lucide-react";

export default function Dashboard({ user }) {
  const [soilUploads, setSoilUploads] = useState([]);
  const [newSoil, setNewSoil] = useState({
    location: "",
    type: "",
    score: 0,
    date: new Date().toLocaleDateString(),
  });

  // --- Fetch user's soil uploads from backend
  useEffect(() => {
    if (!user) return;
    const fetchSoils = async () => {
      try {
        const res = await fetch(`https://soil-health-analyzer-8-du5m.onrender.com/api/soil?userId=${user._id}`);
        const data = await res.json();
        if (res.ok) setSoilUploads(data.soils || []);
      } catch (err) {
        console.error("Failed to fetch soil uploads:", err);
      }
    };
    fetchSoils();
  }, [user]);

  // --- Handle new soil upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newSoil.location || !newSoil.type) return;

    const upload = {
      ...newSoil,
      score: Math.floor(Math.random() * 101), // Demo score
      userId: user._id,
    };

    try {
      const res = await fetch(`https://soil-health-analyzer-8-du5m.onrender.com/api/soil`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(upload),
      });
      const data = await res.json();
      if (res.ok) {
        setSoilUploads([data.soil, ...soilUploads]);
        setNewSoil({ location: "", type: "", score: 0, date: new Date().toLocaleDateString() });
      } else {
        console.error(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="text-center p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h2>
        <p>Here's your farm dashboard.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-emerald-50 rounded-xl">
          <div className="text-3xl font-bold text-emerald-600 mb-1">{user?.stats?.soilScans || 0}</div>
          <div className="text-sm text-gray-600">Soil Scans</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-3xl font-bold text-blue-600 mb-1">{user?.stats?.weatherChecks || 0}</div>
          <div className="text-sm text-gray-600">Weather Checks</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <div className="text-3xl font-bold text-purple-600 mb-1">{user?.stats?.resourcesRead || 0}</div>
          <div className="text-sm text-gray-600">Resources Read</div>
        </div>
      </div>

      {/* Soil Upload */}
      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Soil Data</h3>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Location"
            value={newSoil.location}
            onChange={(e) => setNewSoil({ ...newSoil, location: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-400"
          />
          <input
            type="text"
            placeholder="Soil Type"
            value={newSoil.type}
            onChange={(e) => setNewSoil({ ...newSoil, type: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="bg-emerald-500 text-white rounded-xl px-6 py-3 font-medium hover:shadow-lg transition-all"
          >
            Upload
          </button>
        </form>
      </div>

      {/* Recent Scans */}
      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Soil Scans</h3>
        {soilUploads.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Leaf className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No soil scans yet. Start uploading your soil data!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {soilUploads.map((scan, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-4 rounded-xl ${
                  scan.score >= 75
                    ? "bg-emerald-50 text-emerald-600"
                    : scan.score >= 50
                    ? "bg-yellow-50 text-yellow-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                <div>
                  <div className="font-semibold">{scan.location}</div>
                  <div className="text-sm text-gray-600">{scan.date} • {scan.type} Soil</div>
                </div>
                <div className="text-2xl font-bold">{scan.score}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
