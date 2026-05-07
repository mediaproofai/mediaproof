export function analyzeContent(input, webResults = []) {
  const text = input.toLowerCase();

  // 🔍 Patterns
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

  // 🧠 Source credibility
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

  // 🌐 Web signal analysis
  let agreement = 0;
  let contradiction = 0;

  webResults.forEach(item => {
    const snippet = item.snippet?.toLowerCase() || "";

    if (snippet.includes("not") || snippet.includes("false")) {
      contradiction++;
    } else {
      agreement++;
    }
  });

  let webSignal = "No strong web presence detected";

  if (agreement > 2 && contradiction === 0) {
    webSignal = "Multiple sources show similar information";
  } else if (contradiction > 1) {
    webSignal = "Conflicting information detected across sources";
  } else if (agreement > 0) {
    webSignal = "Some related mentions found online";
  }

  // 🧭 Origin
  let originConfidence = "Unclear origin";

  if (domain && trustedDomains.includes(domain)) {
    originConfidence = "Likely primary reporting source";
  } else if (hasViral) {
    originConfidence = "Likely reposted or recycled content";
  } else if (!domain) {
    originConfidence = "No identifiable origin";
  }

  // 🔁 Spread
  let spreadPattern = "No strong spread pattern";

  if (hasViral && isShort) {
    spreadPattern = "Highly replicable viral phrasing";
  } else if (hasViral) {
    spreadPattern = "Viral narrative pattern detected";
  } else if (isShort) {
    spreadPattern = "Short-form content — easy to spread";
  }

  // 📊 Score
  let score = 70;

  if (hasEmotional) score -= 10;
  if (hasViral) score -= 20;
  if (hasUncertainty) score -= 5;
  if (isShort) score -= 5;

  score += sourceScore;

  if (contradiction > 1) score -= 10;
  if (agreement > 2) score += 5;

  score = Math.max(20, Math.min(95, score));

  // 🎲 Variation
  const summaries = [
    "This content shows mixed credibility signals with indicators of online spread.",
    "The claim includes patterns suggesting replication and unclear sourcing.",
    "The material reflects both credibility signals and potential misinformation risks."
  ];

  const explanations = [
    "Based on tone, source, spread patterns, and web cross-check signals.",
    "Evaluation considers replication likelihood, source credibility, and external mentions.",
    "Score reflects linguistic patterns and web-based signal comparison."
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    summary: pick(summaries),
    trustScore: score,
    originConfidence,
    spreadPattern,
    webSignal,
    sourceReliability: sourceLabel,
    emotionalTone: hasEmotional
      ? "Emotionally charged language"
      : "Neutral tone",
    contextWarnings: [
      hasUncertainty ? "Indirect sourcing language detected" : "No explicit sources",
      isShort ? "Limited detail reduces verifiability" : "Moderate detail present"
    ],
    explanation: pick(explanations)
  };
}
