"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4">

      {/* Header */}
      <div className="w-full max-w-3xl mt-20 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Mediaproof
        </h1>
        <p className="text-gray-400 mt-3 text-sm">
          Analyze credibility, context, and manipulation signals in online content
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-3xl mt-10">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste a news article, tweet, or claim..."
          className="w-full h-32 bg-[#111] border border-[#222] rounded-xl p-4 text-sm outline-none focus:border-gray-500 transition"
        />

        <button className="mt-4 w-full bg-white text-black py-3 rounded-xl font-medium hover:opacity-90 transition">
          Analyze
        </button>
      </div>

      {/* Placeholder for results */}
      <div className="w-full max-w-3xl mt-16 text-center text-gray-500 text-sm">
        Analysis will appear here
      </div>

    </main>
  );
}
