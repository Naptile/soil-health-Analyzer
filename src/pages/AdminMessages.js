import React, { useState, useEffect } from "react";
import {
  Loader2,
  Mail,
  User,
  MapPin,
  MessageSquare,
  Trash2,
  CheckCircle,
  Search as SearchIcon,
} from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/contact");
      const data = await res.json();
      if (res.ok) {
        setMessages(data);
        setFiltered(data);
      } else setError(data.error || "Failed to fetch messages");
    } catch (err) {
      console.error(err);
      setError("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) fetchMessages();
      else alert("Failed to delete message");
    } catch (err) {
      console.error(err);
      alert("Error deleting message");
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/contact/${id}/read`, { method: "PATCH" });
      if (res.ok) fetchMessages();
      else alert("Failed to mark as read");
    } catch (err) {
      console.error(err);
      alert("Error updating message");
    }
  };

  // Filter messages based on search
  useEffect(() => {
    const result = messages.filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.message.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setCurrentPage(1); // reset to first page
  }, [search, messages]);

  useEffect(() => {
    fetchMessages();
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="w-8 h-8 text-emerald-600" />
        <h2 className="text-2xl font-bold text-gray-800">Admin: Messages</h2>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by name, email, or message"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <SearchIcon className="w-5 h-5 text-gray-400" />
      </div>

      {/* Loader / Error / Messages */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-center">No messages found.</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((msg) => (
              <div
                key={msg._id}
                className={`p-5 rounded-2xl shadow-md border border-gray-100 bg-white/80 backdrop-blur-lg transition-all ${
                  msg.read ? "opacity-70" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">{msg.name}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">{msg.email}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">{msg.city || "N/A"}</span>
                </div>
                <p className="text-gray-700">{msg.message}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {!msg.read && (
                    <button
                      onClick={() => markAsRead(msg._id)}
                      className="flex items-center gap-1 px-3 py-1 text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="flex items-center gap-1 px-3 py-1 text-white bg-red-500 rounded-xl hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === i + 1
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
