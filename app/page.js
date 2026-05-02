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
          Analyzing content...
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="w-full max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">

          <div className="border border-[#222] rounded-xl p-5 bg-[#111]/60">
            <p className="text-gray-400 text-xs mb-2">SUMMARY</p>
            <p className="text-sm text-gray-200">{result.summary}</p>
          </div>

          <div className="border border-[#222] rounded-xl p-5 bg-[#111]/60">
            <p className="text-gray-400 text-xs mb-2">TRUST SCORE</p>
            <p className="text-3xl font-semibold">{result.trustScore}/100</p>
          </div>

          <div className="border border-[#222] rounded-xl p-5 bg-[#111]/60">
            <p className="text-gray-400 text-xs mb-2">EMOTIONAL TONE</p>
            <p className="text-sm">{result.emotionalTone}</p>
          </div>

          <div className="border border-[#222] rounded-xl p-5 bg-[#111]/60">
            <p className="text-gray-400 text-xs mb-2">AI LIKELIHOOD</p>
            <p className="text-sm">{result.aiLikelihood}</p>
          </div>

          <div className="border border-[#222] rounded-xl p-5 bg-[#111]/60">
            <p className="text-gray-400 text-xs mb-2">SOURCE RELIABILITY</p>
            <p className="text-sm">{result.sourceReliability}</p>
          </div>

          <div className="border border-[#222] rounded-xl p-5 bg-[#111]/60">
            <p className="text-gray-400 text-xs mb-2">CONTEXT WARNINGS</p>
            <ul className="text-sm list-disc ml-4">
              {result.contextWarnings.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="border border-[#222] rounded-xl p-5 bg-[#111]/60">
            <p className="text-gray-400 text-xs mb-2">SUPPORTING SIGNALS</p>
            <ul className="text-sm list-disc ml-4">
              {result.supporting.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="border border-[#222] rounded-xl p-5 bg-[#111]/60">
            <p className="text-gray-400 text-xs mb-2">CONTRADICTING SIGNALS</p>
            <ul className="text-sm list-disc ml-4">
              {result.contradicting.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="border border-[#222] rounded-xl p-5 bg-[#111]/60 md:col-span-2">
            <p className="text-gray-400 text-xs mb-2">WHY THIS SCORE</p>
            <p className="text-sm text-gray-300">{result.explanation}</p>
          </div>

        </div>
      )}

    </main>
  );
}
