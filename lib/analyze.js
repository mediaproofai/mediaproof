export function analyzeContent(input) {
  const text = input.toLowerCase();

  // 🔍 Detect patterns
  const emotionalWords = ["shocking", "breaking", "urgent", "unbelievable"];
  const biasWords = ["they don't want you to know", "hidden truth", "exposed"];
  const uncertaintyWords = ["reportedly", "allegedly", "sources say"];

  const hasEmotional = emotionalWords.some(w => text.includes(w));
  const hasBias = biasWords.some(w => text.includes(w));
  const hasUncertainty = uncertaintyWords.some(w => text.includes(w));
  const isLong = input.length > 200;

  // 🌐 Detect if input is a URL
  const isURL = input.startsWith("http");
  let domain = null;

  if (isURL) {
    try {
      domain = new URL(input).hostname.replace("www.", "");
    } catch {
      domain = "Invalid URL";
    }
  }

  // 🧠 Domain credibility simulation (you can expand later)
  const trustedDomains = ["bbc.com", "reuters.com", "nytimes.com"];
  const suspiciousDomains = ["unknownsource.xyz", "viralnews99.com"];

  let sourceScore = 0;
  let sourceLabel = "Unknown source";

  if (domain) {
    if (trustedDomains.includes(domain)) {
      sourceScore = +15;
      sourceLabel = "Recognized credible news source";
    } else if (suspiciousDomains.includes(domain)) {
      sourceScore = -20;
      sourceLabel = "Low credibility or suspicious source";
    } else {
      sourceLabel = "Unverified or lesser-known source";
    }
  }

  // 📊 Score calculation
  let score = 65;

  if (hasEmotional) score -= 15;
  if (hasBias) score -= 20;
  if (hasUncertainty) score -= 5;
  if (!isLong) score -= 5;

  score += sourceScore;

  score = Math.max(20, Math.min(95, score));

  // 🎲 Variation
  const summaries = [
    "This content presents a claim with mixed credibility signals and limited external verification.",
    "The material includes indicators that require cautious interpretation due to incomplete context.",
    "The claim appears structured but lacks strong independent validation."
  ];

  const explanations = [
    "The score reflects tone, source credibility, and structural signals within the content.",
    "Assessment is based on linguistic patterns, source indicators, and contextual completeness.",
    "This evaluation considers emotional language, sourcing clarity, and verification signals."
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    summary: pick(summaries),

    trustScore: score,

    emotionalTone: hasEmotional
      ? "Elevated emotional or attention-driven language detected"
      : "Mostly neutral informational tone",

    aiLikelihood: hasBias
      ? "Moderate stylistic or synthetic phrasing patterns"
      : "Low indication of synthetic language patterns",

    sourceReliability: sourceLabel,

    supporting: [
      isLong ? "Content includes some descriptive detail" : "Concise structure observed",
      domain ? `Source domain identified: ${domain}` : "No source domain detected"
    ],

    contradicting: [
      hasBias ? "Narrative framing or persuasion cues detected" : "No strong contradiction signals detected",
      hasEmotional ? "Language may influence perception" : "Tone remains relatively neutral"
    ],

    contextWarnings: [
      !isLong ? "Limited contextual depth" : "Context present but not fully verifiable",
      hasUncertainty ? "Indirect or unverified claims present" : "No explicit sourcing references"
    ],

    explanation: pick(explanations)
  };
}
