import React from "react";
import { BarChart3 } from "lucide-react";

export default function ClimateTrends() {
  // This can later integrate with charts like recharts
  const trends = [
    { month: "Jan", rainfall: 50 },
    { month: "Feb", rainfall: 40 },
    { month: "Mar", rainfall: 70 },
    { month: "Apr", rainfall: 60 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Climate Trends</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trends.map((t) => (
          <div key={t.month} className="p-4 rounded-xl bg-blue-50 text-gray-700 text-center">
            <div className="text-xl font-bold">{t.rainfall} mm</div>
            <div>{t.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
