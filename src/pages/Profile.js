import React from "react";
import { Leaf, User, AlertCircle } from "lucide-react";

export default function Profile({ user }) {
  if (!user) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-700 mb-4">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Info Header */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Joined: {user.joinDate}</p>
            <p className="text-sm text-gray-500">Location: {user.location}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="backdrop-blur-lg bg-white/80 rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Your Activity</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-xl">
            <div className="text-3xl font-bold text-emerald-600 mb-1">
              {user.stats?.soilScans || 0}
            </div>
            <div className="text-sm text-gray-600">Soil Scans</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {user.stats?.weatherChecks || 0}
            </div>
            <div className="text-sm text-gray-600">Weather Checks</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {user.stats?.resourcesRead || 0}
            </div>
            <div className="text-sm text-gray-600">Resources Read</div>
          </div>
        </div>
      </div>

      {/* Recent Scans Section */}
      <div className="backdrop-blur-lg bg-white/80 rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Scans</h3>
        {user.recentScans && user.recentScans.length > 0 ? (
          <div className="space-y-4">
            {user.recentScans.map((scan, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl"
              >
                <div>
                  <div className="font-semibold text-gray-800">{scan.location}</div>
                  <div className="text-sm text-gray-600">
                    {scan.date} • {scan.type} Soil
                  </div>
                </div>
                <div
                  className={`text-2xl font-bold ${
                    scan.score >= 75
                      ? "text-green-600"
                      : scan.score >= 50
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {scan.score}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Leaf className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No soil scans yet. Start analyzing your soil!</p>
          </div>
        )}
      </div>

      {/* Account Settings */}
      <div className="backdrop-blur-lg bg-white/80 rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl cursor-pointer transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="font-medium text-gray-700">Personal Information</span>
            </div>
            <span className="text-gray-400">→</span>
          </div>
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl cursor-pointer transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium text-gray-700">Notifications</span>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
