"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[120px] bottom-[-100px] right-[-100px]" />

      {/* Header */}
      <div className="w-full max-w-4xl mt-24 text-center relative z-10">
        <h1 className="text-5xl font-semibold tracking-tight">
          Mediaproof
        </h1>
        <p className="text-gray-400 mt-4 text-sm">
          Investigate credibility, detect manipulation signals, and understand context — without false certainty
        </p>
      </div>

      {/* Input Card */}
      <div className="w-full max-w-3xl mt-12 relative z-10">
        <div className="bg-[#111]/80 backdrop-blur-xl border border-[#222] rounded-2xl p-6 shadow-lg">

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a claim, URL, or headline..."
            className="w-full h-32 bg-transparent border border-[#222] rounded-xl p-4 text-sm outline-none focus:border-gray-500 transition resize-none"
          />

          <button className="mt-4 w-full bg-gradient-to-r from-white to-gray-300 text-black py-3 rounded-xl font-medium hover:opacity-90 transition">
            Analyze
          </button>

        </div>
      </div>

      {/* System Hint */}
      <div className="mt-6 text-xs text-gray-500 relative z-10">
        Mediaproof provides probabilistic analysis — not absolute truth
      </div>

      {/* Placeholder Results */}
      <div className="w-full max-w-4xl mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">

        <div className="border border-[#222] rounded-xl p-5 bg-[#111]/60">
          <p className="text-gray-400 text-xs mb-2">SUMMARY</p>
          <p className="text-sm text-gray-200">
            Analysis results will appear here after processing input.
          </p>
        </div>

        <div className="border border-[#222] rounded-xl p-5 bg-[#111]/60">
          <p className="text-gray-400 text-xs mb-2">TRUST SCORE</p>
          <p className="text-3xl font-semibold">--</p>
        </div>

      </div>

    </main>
  );
}
