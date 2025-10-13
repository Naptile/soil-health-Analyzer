import React, { useState } from "react";
import { Phone } from "lucide-react";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    setSubmitted(true);
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Contact</h2>

      {submitted && <div className="p-4 bg-green-100 text-green-700 rounded-xl">Message sent!</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-400"
          rows={5}
        />
        <button
          type="submit"
          className="bg-emerald-500 text-white rounded-xl px-6 py-3 font-medium hover:shadow-lg transition-all"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
