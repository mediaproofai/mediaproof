export function analyzeContent(input) {
  const text = input.toLowerCase();

  // 🔍 Signal detection
  const emotionalWords = ["shocking", "breaking", "urgent", "unbelievable", "must see"];
  const biasWords = ["they don't want you to know", "hidden truth", "exposed", "secret"];
  const uncertaintyWords = ["reportedly", "allegedly", "sources say"];

  const hasEmotional = emotionalWords.some(w => text.includes(w));
  const hasBias = biasWords.some(w => text.includes(w));
  const hasUncertainty = uncertaintyWords.some(w => text.includes(w));
  const isLong = input.length > 200;

  // 🧠 Score calculation (more layered)
  let score = 70;

  if (hasEmotional) score -= 15;
  if (hasBias) score -= 20;
  if (hasUncertainty) score -= 5;
  if (!isLong) score -= 5;

  score = Math.max(25, Math.min(95, score));

  // 🎲 Dynamic phrasing (feels less robotic)
  const summaries = [
    "This content presents a claim with limited external validation and mixed credibility indicators.",
    "The material includes signals that require cautious interpretation due to incomplete context.",
    "The claim appears structured but lacks strong independent verification."
  ];

  const explanations = [
    "The score reflects detected emotional framing, source ambiguity, and limited corroboration.",
    "Assessment is based on tone, structural cues, and absence of strong verification signals.",
    "This evaluation considers linguistic signals and contextual completeness."
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // 📊 Output
  return {
    summary: pick(summaries),

    trustScore: score,

    emotionalTone: hasEmotional
      ? "Elevated emotional or attention-grabbing language detected"
      : "Mostly neutral informational tone",

    aiLikelihood: hasBias
      ? "Moderate likelihood of stylized or AI-assisted phrasing"
      : "Low to moderate likelihood of AI involvement",

    sourceReliability: hasUncertainty
      ? "Claims rely on indirect or unverified sourcing"
      : "No clear indication of strong or weak source credibility",

    supporting: [
      isLong ? "Content provides some level of detail" : "Concise structure observed",
      "Readable and structured format"
    ],

    contradicting: [
      hasBias ? "Potential narrative framing or persuasion cues detected" : "No strong contradiction signals detected",
      hasEmotional ? "Language may influence perception rather than inform" : "Tone remains relatively balanced"
    ],

    contextWarnings: [
      !isLong ? "Limited contextual depth" : "Context present but not fully verifiable",
      hasUncertainty ? "Use of indirect claims reduces reliability" : "No explicit sourcing references"
    ],

    explanation: pick(explanations)
  };
}
