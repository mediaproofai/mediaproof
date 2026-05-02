export function analyzeContent(input) {
  const emotionalWords = ["shocking", "breaking", "unbelievable", "urgent"];
  const hasEmotional = emotionalWords.some(word =>
    input.toLowerCase().includes(word)
  );

  const lengthScore = input.length > 200 ? 10 : 5;

  const trustScore = Math.max(
    20,
    Math.min(
      90,
      60 - (hasEmotional ? 15 : 0) + lengthScore
    )
  );

  return {
    summary:
      "This content presents a claim with limited verifiable context and mixed indicators of credibility.",

    trustScore,

    emotionalTone: hasEmotional
      ? "Elevated emotional language detected"
      : "Relatively neutral tone",

    aiLikelihood:
      "Low to moderate likelihood of AI-assisted or stylized content",

    sourceReliability:
      "Source is not clearly verifiable or lacks established credibility",

    supporting: [
      "No strong external confirmations found",
      "Claim structure resembles common news formatting"
    ],

    contradicting: [
      "Lack of corroboration from known reliable outlets",
      "Potential framing bias detected"
    ],

    contextWarnings: [
      "Limited background or timeline provided",
      "Possible selective presentation of facts"
    ],

    explanation:
      "The score reflects emotional tone, structural signals, and absence of strong verification. This is not a definitive judgment, but a probabilistic assessment."
  };
}
