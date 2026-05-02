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
    }, 1500);
  };

  const getScoreColor = (score) => {
    if (score > 75) return "text-green-400";
    if (score > 50) return "text-yellow-400";
    return "text-red-400";
  };

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
          Analyze credibility, detect manipulation signals, and evaluate context — without false certainty
        </p>
      </div>

      {/* Input */}
      <div className="w-full max-w-3xl mt-12 relative z-10">
        <div className="bg-[#111]/80 backdrop-blur-xl border border-[#222] rounded-2xl p-6 shadow-lg">

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a claim, article, post, or describe the media content..."
            className="w-full h-32 bg-transparent border border-[#222] rounded-xl p-4 text-sm outline-none focus:border-gray-500 transition resize-none"
          />

          <button
            onClick={handleAnalyze}
            className="mt-4 w-full bg-gradient-to-r from-white to-gray-300 text-black py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Analyze
          </button>

        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-10 text-gray-400 text-sm animate-pulse">
          Running multi-layer analysis...
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="w-full max-w-5xl mt-16 space-y-6 relative z-10">

          {/* Trust Score Panel */}
          <div className="bg-[#111]/70 border border-[#222] rounded-2xl p-8 text-center">
            <p className="text-gray-400 text-xs mb-2">TRUST SCORE</p>
            <p className={`text-6xl font-semibold ${getScoreColor(result.trustScore)}`}>
              {result.trustScore}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Probabilistic credibility estimate
            </p>
          </div>

          {/* Summary */}
          <div className="bg-[#111]/60 border border-[#222] rounded-xl p-5">
            <p className="text-gray-400 text-xs mb-2">SUMMARY</p>
            <p className="text-sm text-gray-200">{result.summary}</p>
          </div>

          {/* Signals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-[#111]/60 border border-[#222] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">EMOTIONAL TONE</p>
              <p className="text-sm">{result.emotionalTone}</p>
            </div>

            <div className="bg-[#111]/60 border border-[#222] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">AI INVOLVEMENT</p>
              <p className="text-sm">{result.aiLikelihood}</p>
            </div>

            <div className="bg-[#111]/60 border border-[#222] rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">SOURCE RELIABILITY</p>
              <p className="text-sm">{result.sourceReliability}</p>
            </div>

          </div>

          {/* Supporting vs Contradicting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-[#111]/60 border border-[#222] rounded-xl p-5">
              <p className="text-gray-400 text-xs mb-2">SUPPORTING SIGNALS</p>
              <ul className="text-sm list-disc ml-4 space-y-1">
                {result.supporting.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#111]/60 border border-[#222] rounded-xl p-5">
              <p className="text-gray-400 text-xs mb-2">CONTRADICTING SIGNALS</p>
              <ul className="text-sm list-disc ml-4 space-y-1">
                {result.contradicting.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Context + Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-[#111]/60 border border-[#222] rounded-xl p-5">
              <p className="text-gray-400 text-xs mb-2">CONTEXT WARNINGS</p>
              <ul className="text-sm list-disc ml-4 space-y-1">
                {result.contextWarnings.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#111]/60 border border-[#222] rounded-xl p-5">
              <p className="text-gray-400 text-xs mb-2">WHY THIS SCORE</p>
              <p className="text-sm text-gray-300">{result.explanation}</p>
            </div>

          </div>

        </div>
      )}

    </main>
  );
}
