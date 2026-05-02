export function analyzeContent(input) {
  const lengthScore = input.length > 200 ? 10 : 5;

  const emotionalWords = ["shocking", "breaking", "unbelievable", "urgent"];
  const hasEmotional = emotionalWords.some(word =>
    input.toLowerCase().includes(word)
  );

  return {
    summary: "This content presents a claim with limited contextual verification.",
    
    trustScore: 60 - (hasEmotional ? 10 : 0) + lengthScore,

    emotionalTone: hasEmotional
      ? "Elevated emotional language detected"
      : "Neutral tone",

    aiLikelihood: "Low (no strong synthetic patterns detected)",

    sourceReliability: "Unknown source or not verified",

    supporting: [
      "No strong external confirmations found"
    ],

    contradicting: [
      "No direct contradictions detected"
    ],

    contextWarnings: [
      "Limited context provided"
    ],

    explanation:
      "Score is based on tone, structure, and lack of verifiable context."
  };
}
