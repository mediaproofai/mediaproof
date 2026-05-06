"use client";

import { useState } from "react";
import { analyzeContent } from "../lib/analyze";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const analysis = analyzeContent(input);
      setResult(analysis);
      setLoading(false);
    }, 1200);
  };

  const getScoreColor = (score) => {
    if (score > 75) return "text-green-400";
    if (score > 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4 relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[120px] bottom-[-100px] right-[-100px]" />

      <div className="w-full max-w-4xl mt-24 text-center relative z-10">
        <h1 className="text-5xl font-semibold">Mediaproof</h1>
        <p className="text-gray-400 mt-4 text-sm">
          Signal-based media credibility analysis with transparent reasoning
        </p>
      </div>

      <div className="w-full max-w-3xl mt-12 relative z-10">
        <div className="bg-[#111]/80 border border-[#222] rounded-2xl p-6 backdrop-blur-xl">

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a claim, article, or URL..."
            className="w-full h-32 bg-transparent border border-[#222] rounded-xl p-4 text-sm outline-none focus:border-gray-500"
          />

          <button
            onClick={handleAnalyze}
            className="mt-4 w-full bg-gradient-to-r from-white to-gray-300 text-black py-3 rounded-xl font-medium"
          >
            Analyze
          </button>

        </div>
      </div>

      {loading && (
        <div className="mt-10 text-gray-400 text-sm animate-pulse">
          Analyzing signals...
        </div>
      )}

      {result && !loading && (
        <div className="w-full max-w-5xl mt-16 space-y-6">

          <div className="bg-[#111]/70 border border-[#222] rounded-2xl p-8 text-center">
            <p className="text-gray-400 text-xs mb-2">TRUST SCORE</p>
            <p className={`text-6xl font-semibold ${getScoreColor(result.trustScore)}`}>
              {result.trustScore}
            </p>
          </div>

          <div className="bg-[#111]/60 border border-[#222] rounded-xl p-5">
            <p className="text-gray-400 text-xs mb-2">SUMMARY</p>
            <p className="text-sm">{result.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#111]/60 border border-[#222] rounded-xl p-4">
              <p className="text-gray-400 text-xs">EMOTIONAL TONE</p>
              <p>{result.emotionalTone}</p>
            </div>

            <div className="bg-[#111]/60 border border-[#222] rounded-xl p-4">
              <p className="text-gray-400 text-xs">AI SIGNAL</p>
              <p>{result.aiLikelihood}</p>
            </div>

            <div className="bg-[#111]/60 border border-[#222] rounded-xl p-4">
              <p className="text-gray-400 text-xs">SOURCE</p>
              <p>{result.sourceReliability}</p>
            </div>
          </div>

        </div>
      )}

    </main>
  );
}
