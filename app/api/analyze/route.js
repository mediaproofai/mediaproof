export async function POST(req) {
  const { input } = await req.json();

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: `
You are a media analysis assistant.

IMPORTANT:
- Do NOT declare content true or false
- Provide probabilistic reasoning
- Highlight uncertainty
- Focus on credibility signals, tone, and context

Return JSON in this format:
{
  "summary": "...",
  "insights": "...",
  "riskFactors": ["..."]
}
`
          },
          {
            role: "user",
            content: input
          }
        ]
      })
    });

    const data = await response.json();
    const text = data.choices[0].message.content;

    return Response.json({ result: text });

  } catch (err) {
    return Response.json({ error: "AI request failed" });
  }
}
