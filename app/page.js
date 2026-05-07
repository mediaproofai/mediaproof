"use client";

import { useState } from "react";
import { analyzeContent } from "../lib/analyze";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [webResults, setWebResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);
    setWebResults([]);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();

      const analysis = analyzeContent(input, data.results);

      setWebResults(data.results);
      setResult(analysis);

    } catch {
      const analysis = analyzeContent(input, []);
      setResult(analysis);
    }

    setLoading(false);
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
          Trace origin, analyze spread, and verify claims across the web
        </p>
      </div>

      <div className="w-full max-w-3xl mt-12">
        <div className="bg-[#111] border border-[#222] rounded-2xl p-6">

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a claim, URL, or describe media..."
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
          Analyzing + searching web...
        </div>
      )}

      {result && !loading && (
        <div className="w-full max-w-5xl mt-16 space-y-6">

          <div className="bg-[#111] border border-[#222] rounded-2xl p-8 text-center">
            <p className="text-xs text-gray-400">TRUST SCORE</p>
            <p className={`text-6xl font-semibold ${getScoreColor(result.trustScore)}`}>
              {result.trustScore}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#111] border border-[#222] rounded-xl p-5">
              <p className="text-xs text-gray-400">ORIGIN</p>
              <p>{result.originConfidence}</p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-xl p-5">
              <p className="text-xs text-gray-400">SPREAD</p>
              <p>{result.spreadPattern}</p>
            </div>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <p className="text-xs text-gray-400">WEB SIGNAL</p>
            <p>{result.webSignal}</p>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <p className="text-xs text-gray-400 mb-3">WEB RESULTS</p>

            {webResults.length === 0 ? (
              <p className="text-sm text-gray-500">No matches found</p>
            ) : (
              webResults.map((item, i) => (
                <div key={i} className="mb-3 border border-[#222] p-3 rounded">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.snippet}</p>
                </div>
              ))
            )}
          </div>

          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <p className="text-xs text-gray-400">SUMMARY</p>
            <p>{result.summary}</p>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <p className="text-xs text-gray-400">WHY THIS</p>
            <p>{result.explanation}</p>
          </div>

        </div>
      )}

    </main>
  );
}
