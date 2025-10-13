import React from "react";
import { BookOpen } from "lucide-react";

export default function Resources() {
  const resources = [
    { title: "Soil Health Tips", link: "#" },
    { title: "Water Conservation Guide", link: "#" },
    { title: "Climate-Resilient Crops", link: "#" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Resources</h2>

      <div className="grid gap-4">
        {resources.map((res, idx) => (
          <a
            key={idx}
            href={res.link}
            className="p-4 rounded-xl bg-white/80 backdrop-blur-lg shadow hover:shadow-lg transition-all"
          >
            <BookOpen className="w-5 h-5 inline-block mr-2 text-emerald-600" />
            {res.title}
          </a>
        ))}
      </div>
    </div>
  );
}
