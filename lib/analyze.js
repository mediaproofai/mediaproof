export function analyzeContent(input) {
  const text = input.toLowerCase();

  // 🔍 Signals
  const emotionalWords = ["shocking", "breaking", "urgent", "unbelievable"];
  const viralPhrases = [
    "they don't want you to know",
    "must share",
    "before it gets deleted",
    "this is being hidden"
  ];
  const uncertaintyWords = ["reportedly", "allegedly", "sources say"];

  const hasEmotional = emotionalWords.some(w => text.includes(w));
  const hasViral = viralPhrases.some(w => text.includes(w));
  const hasUncertainty = uncertaintyWords.some(w => text.includes(w));

  const wordCount = input.split(" ").length;
  const isShort = wordCount < 20;

  // 🌐 URL detection
  let domain = null;
  const isURL = input.startsWith("http");

  if (isURL) {
    try {
      domain = new URL(input).hostname.replace("www.", "");
    } catch {
      domain = "Invalid URL";
    }
  }

  // 🧠 Domain credibility
  const trustedDomains = ["bbc.com", "reuters.com", "nytimes.com"];
  const suspiciousDomains = ["viralnews99.com", "unknownsource.xyz"];

  let sourceScore = 0;
  let sourceLabel = "No clear source";

  if (domain) {
    if (trustedDomains.includes(domain)) {
      sourceScore += 15;
      sourceLabel = "Established news source";
    } else if (suspiciousDomains.includes(domain)) {
      sourceScore -= 20;
      sourceLabel = "Low credibility domain";
    } else {
      sourceLabel = "Unverified source";
    }
  }

  // 🌐 Cross-platform / spread simulation
  let crossCheckStatus = "";
  let repetitionRisk = "";
  let spreadScore = 0;

  if (hasViral && isShort) {
    crossCheckStatus = "Appears similar to widely reposted viral claims";
    repetitionRisk = "High likelihood of copy-paste spread across platforms";
    spreadScore -= 20;
  } else if (hasViral) {
    crossCheckStatus = "Matches patterns seen in viral narratives";
    repetitionRisk = "Moderate risk of repeated phrasing";
    spreadScore -= 10;
  } else if (hasUncertainty) {
    crossCheckStatus = "Language suggests indirect sourcing";
    repetitionRisk = "May rely on secondary reporting";
    spreadScore -= 5;
  } else {
    crossCheckStatus = "No strong indicators of mass replication";
    repetitionRisk = "Low repetition pattern detected";
  }

  // 🧭 Origin estimation
  let originConfidence = "Unclear origin";

  if (domain && trustedDomains.includes(domain)) {
    originConfidence = "Likely tied to primary reporting source";
  } else if (hasViral) {
    originConfidence = "Likely reposted or recycled content";
  } else if (!domain) {
    originConfidence = "No identifiable origin";
  }

  // 📊 Score
  let score = 70;

  if (hasEmotional) score -= 10;
  if (hasViral) score -= 20;
  if (hasUncertainty) score -= 5;
  if (isShort) score -= 5;

  score += sourceScore + spreadScore;

  score = Math.max(20, Math.min(95, score));

  // 🎲 Variation
  const summaries = [
    "This content shows patterns consistent with how information spreads across online platforms.",
    "The claim includes signals that may indicate replication and unclear sourcing.",
    "The material reflects a mix of credibility signals and possible cross-platform spread behavior."
  ];

  const explanations = [
    "Assessment is based on spread patterns, phrasing similarity, and source indicators.",
    "This evaluation considers how easily the content could propagate across platforms.",
    "The score reflects replication risk, tone, and source credibility signals."
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    summary: pick(summaries),

    trustScore: score,

    originConfidence,
    crossCheckStatus,
    repetitionRisk,

    emotionalTone: hasEmotional
      ? "Emotionally charged language detected"
      : "Mostly neutral tone",

    sourceReliability: sourceLabel,

    contextWarnings: [
      hasUncertainty ? "Indirect or weak sourcing language" : "No explicit sources",
      isShort ? "Limited detail reduces verifiability" : "Moderate contextual detail"
    ],

    explanation: pick(explanations)
  };
}
