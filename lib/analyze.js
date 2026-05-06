export function analyzeContent(input) {
  const text = input.toLowerCase();

  // 🔍 Pattern signals
  const emotionalWords = ["shocking", "breaking", "urgent", "unbelievable"];
  const viralPhrases = [
    "they don't want you to know",
    "this is being hidden",
    "must share",
    "before it gets deleted"
  ];
  const uncertaintyWords = ["reportedly", "allegedly", "sources say"];

  const hasEmotional = emotionalWords.some(w => text.includes(w));
  const hasViral = viralPhrases.some(w => text.includes(w));
  const hasUncertainty = uncertaintyWords.some(w => text.includes(w));
  const isShort = input.length < 120;

  // 🌐 URL + domain extraction
  let domain = null;
  let isURL = input.startsWith("http");

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
  let sourceLabel = "No clear source identified";

  if (domain) {
    if (trustedDomains.includes(domain)) {
      sourceScore = +15;
      sourceLabel = "Recognized established news source";
    } else if (suspiciousDomains.includes(domain)) {
      sourceScore = -20;
      sourceLabel = "Low credibility or suspicious domain";
    } else {
      sourceLabel = "Unverified or lesser-known source";
    }
  }

  // 🔁 Spread detection
  let spreadPattern = "No strong replication signals detected";

  if (hasViral && isShort) {
    spreadPattern = "Highly replicable viral phrasing detected";
  } else if (hasViral) {
    spreadPattern = "Viral narrative pattern present";
  } else if (isShort) {
    spreadPattern = "Concise claim — potentially easy to repost";
  }

  // 🧭 Origin estimation
  let originConfidence = "Unclear origin";

  if (domain && trustedDomains.includes(domain)) {
    originConfidence = "Likely tied to a primary reporting source";
  } else if (hasViral) {
    originConfidence = "Likely reposted or mass-circulated content";
  } else if (!domain) {
    originConfidence = "No identifiable origin source";
  }

  // 📊 Score
  let score = 65;

  if (hasEmotional) score -= 10;
  if (hasViral) score -= 20;
  if (hasUncertainty) score -= 5;
  if (isShort) score -= 5;

  score += sourceScore;

  score = Math.max(20, Math.min(95, score));

  // 🎲 Variation
  const summaries = [
    "This content shows mixed credibility signals with indicators of potential mass circulation.",
    "The claim includes patterns commonly associated with reposted or weakly sourced information.",
    "The material presents limited origin clarity and possible viral spread characteristics."
  ];

  const explanations = [
    "Evaluation is based on spread patterns, source identification, and linguistic signals.",
    "This assessment considers how the claim is structured and how easily it can propagate.",
    "The score reflects origin clarity, replication likelihood, and tone indicators."
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    summary: pick(summaries),

    trustScore: score,

    emotionalTone: hasEmotional
      ? "Emotionally charged or attention-driven language"
      : "Mostly neutral tone",

    sourceReliability: sourceLabel,

    spreadPattern,

    originConfidence,

    supporting: [
      domain ? `Source domain detected: ${domain}` : "No source link provided",
      "Readable and structured format"
    ],

    contradicting: [
      hasViral ? "Viral phrasing suggests mass reposting" : "No major manipulation signals",
      hasEmotional ? "Language may influence perception" : "Tone remains balanced"
    ],

    contextWarnings: [
      hasUncertainty ? "Indirect or unverified claims present" : "No explicit sourcing",
      isShort ? "Limited detail reduces verifiability" : "Moderate contextual detail"
    ],

    explanation: pick(explanations)
  };
}
