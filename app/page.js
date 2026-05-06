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
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4">

      <div className="w-full max-w-4xl mt-24 text-center">
        <h1 className="text-5xl font-semibold">Mediaproof</h1>
        <p className="text-gray-400 mt-4 text-sm">
          Trace origin, detect spread patterns, and evaluate credibility signals
        </p>
      </div>

      <div className="w-full max-w-3xl mt-12">
        <div className="bg-[#111] border border-[#222] rounded-2xl p-6">

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a claim, URL, or describe the media..."
            className="w-full h-32 bg-transparent border border-[#222] rounded-xl p-4 text-sm outline-none"
          />

          <button
            onClick={handleAnalyze}
            className="mt-4 w-full bg-white text-black py-3 rounded-xl font-medium"
          >
            Analyze
          </button>

        </div>
      </div>

      {loading && (
        <div className="mt-10 text-gray-400 text-sm animate-pulse">
          Mapping origin and spread patterns...
        </div>
      )}

      {result && !loading && (
        <div className="w-full max-w-5xl mt-16 space-y-6">

          {/* Score */}
          <div className="bg-[#111] border border-[#222] rounded-2xl p-8 text-center">
            <p className="text-gray-400 text-xs">TRUST SCORE</p>
            <p className={`text-6xl font-semibold ${getScoreColor(result.trustScore)}`}>
              {result.trustScore}
            </p>
          </div>

          {/* Origin + Spread */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#111] border border-[#222] rounded-xl p-5">
              <p className="text-gray-400 text-xs mb-2">ORIGIN CONFIDENCE</p>
              <p>{result.originConfidence}</p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-5">
              <p className="text-gray-400 text-xs mb-2">SPREAD PATTERN</p>
              <p>{result.spreadPattern}</p>
            </div>
          </div>

          {/* Source */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <p className="text-gray-400 text-xs mb-2">SOURCE RELIABILITY</p>
            <p>{result.sourceReliability}</p>
          </div>

          {/* Summary */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <p className="text-gray-400 text-xs mb-2">SUMMARY</p>
            <p>{result.summary}</p>
          </div>

          {/* Explanation */}
          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <p className="text-gray-400 text-xs mb-2">WHY THIS ANALYSIS</p>
            <p>{result.explanation}</p>
          </div>

        </div>
      )}

    </main>
  );
}
