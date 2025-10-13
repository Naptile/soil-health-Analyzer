import React, { useState, useEffect } from "react";
import { BookOpen, Video, Leaf, Search, ExternalLink } from "lucide-react";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Simulated dynamic data fetch
  useEffect(() => {
    const sampleResources = [
      {
        title: "Soil Health Improvement Tips",
        link: "https://www.fao.org/soils-portal/soil-management/en/",
        category: "Guides",
        icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      },
      {
        title: "Water Conservation in Agriculture",
        link: "https://www.un.org/waterforlifedecade/",
        category: "Articles",
        icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      },
      {
        title: "Understanding Climate-Resilient Crops",
        link: "https://www.cgiar.org/research/research-topics/climate-resilience/",
        category: "Research",
        icon: <BookOpen className="w-5 h-5 text-amber-600" />,
      },
      {
        title: "Video: Sustainable Farming Practices",
        link: "https://www.youtube.com/watch?v=hFZ2qhkTuvk",
        category: "Videos",
        icon: <Video className="w-5 h-5 text-rose-600" />,
      },
      {
        title: "Soil Carbon Management Explained",
        link: "https://www.nature.com/articles/d41586-022-00119-x",
        category: "Research",
        icon: <Leaf className="w-5 h-5 text-green-600" />,
      },
    ];

    setResources(sampleResources);
    setFiltered(sampleResources);
  }, []);

  // Search filter
  useEffect(() => {
    const result = resources.filter((r) =>
      r.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }, [query, resources]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-800">Learning Resources</h2>
      </div>

      {/* Search bar */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search topics (e.g., soil, crops, water)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          className="bg-emerald-500 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition"
        >
          <Search className="w-4 h-4" /> Search
        </button>
      </div>

      {/* Resource cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((res, idx) => (
          <a
            key={idx}
            href={res.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl transition-all border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              {res.icon}
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition">
                {res.title}
              </h3>
            </div>
            <div className="text-sm text-gray-500 flex justify-between items-center">
              <span>{res.category}</span>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-500" />
            </div>
          </a>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-gray-500 text-center">
          No resources found for “{query}”. Try another keyword.
        </p>
      )}
    </div>
  );
}
