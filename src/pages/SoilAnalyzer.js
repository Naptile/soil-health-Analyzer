// src/pages/SoilAnalyzer.js
import React, { useState } from "react";
import {
  Leaf,
  Camera,
  Upload,
  Droplets,
  Wind,
  Sparkles,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export default function SoilAnalyzer() {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAnalyzing(true);
    setResults(null);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        "https://soil-health-analyzer-8-du5m.onrender.com/api/analyze-soil",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Soil analysis failed");
        setImage(null);
      } else {
        setResults(data.results);
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to server");
      setImage(null);
    } finally {
      setAnalyzing(false);
    }

    // Show preview of uploaded image
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const getHealthColor = (score) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthBg = (score) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Leaf className="w-12 h-12 text-emerald-600 animate-bounce" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Soil Health Analyzer
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          AI-Powered Land Regeneration for a Greener Planet 🌱
        </p>
      </div>

      {/* Upload */}
      {!image && (
        <div className="max-w-2xl mx-auto">
          <label className="group relative block cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="backdrop-blur-lg bg-white/70 border-3 border-dashed border-emerald-300 rounded-3xl p-16 text-center transition-all duration-300 hover:border-emerald-500 hover:bg-white/90 hover:shadow-2xl hover:scale-105">
              <Camera className="w-20 h-20 mx-auto mb-6 text-emerald-500 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Upload Soil Image
              </h3>
              <p className="text-gray-600 mb-4">
                Drop your soil photo here or click to browse
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium group-hover:shadow-lg transition-all">
                <Upload className="w-5 h-5" />
                Choose File
              </div>
            </div>
          </label>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-100 text-red-700 rounded-xl border border-red-200 shadow-sm text-center">
          {error}
        </div>
      )}

      {/* Analysis */}
      {image && (
        <div className="space-y-6">
          <div className="backdrop-blur-lg bg-white/80 rounded-3xl p-6 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6">
              {/* === Image Section with Loader Overlay === */}
              <div className="relative group">
                <img
                  src={image}
                  alt="Soil sample"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />

                {/* Loader overlay */}
                {analyzing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md rounded-2xl z-10">
                    <div className="w-14 h-14 border-8 border-emerald-300 border-t-emerald-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-semibold text-gray-700">
                      Scanning Soil...
                    </p>
                    <p className="text-gray-500 text-sm">AI is analyzing your soil</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setImage(null);
                    setResults(null);
                    setError("");
                  }}
                  className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>

              {/* Right panel — Results */}
              {results && !analyzing && (
                <div className="space-y-4">
                  <div className="text-center bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6">
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      Overall Health Score
                    </div>
                    <div
                      className={`text-6xl font-bold ${getHealthColor(
                        results.healthScore
                      )} mb-2`}
                    >
                      {results.healthScore}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full ${getHealthBg(
                          results.healthScore
                        )} transition-all duration-1000 rounded-full`}
                        style={{ width: `${results.healthScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <div className="text-sm text-gray-600">Moisture</div>
                      <div className="text-xl font-bold text-blue-600">
                        {results.moisture}%
                      </div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <Wind className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                      <div className="text-sm text-gray-600">pH Level</div>
                      <div className="text-xl font-bold text-amber-600">
                        {results.ph}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Results */}
          {results && (
            <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
              {/* Soil Analysis */}
              <div className="backdrop-blur-lg bg-white/80 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Leaf className="text-emerald-500" />
                  Soil Analysis
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Soil Type</div>
                    <div className="text-lg font-semibold text-emerald-600">
                      {results.soilType}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      Degradation Level
                    </div>
                    <div
                      className={`text-lg font-semibold ${
                        results.degradationLevel === "Low"
                          ? "text-green-600"
                          : results.degradationLevel === "Moderate"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {results.degradationLevel}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">
                      Nutrients (NPK)
                    </div>
                    <div className="space-y-2">
                      {["nitrogen", "phosphorus", "potassium"].map(
                        (nutrient) => (
                          <div key={nutrient}>
                            <div className="flex justify-between text-xs mb-1">
                              <span>
                                {nutrient.charAt(0).toUpperCase() +
                                  nutrient.slice(1)}
                              </span>
                              <span>{results.nutrients[nutrient]}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  nutrient === "nitrogen"
                                    ? "bg-green-500"
                                    : nutrient === "phosphorus"
                                    ? "bg-blue-500"
                                    : "bg-purple-500"
                                }`}
                                style={{
                                  width: `${results.nutrients[nutrient]}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="backdrop-blur-lg bg-white/80 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  Recommendations
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {results.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>

              {/* Suitable Crops */}
              <div className="backdrop-blur-lg bg-white/80 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="text-teal-500" />
                  Suitable Crops
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results.suitableCrops?.map((crop, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
