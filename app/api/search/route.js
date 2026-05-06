export async function POST(req) {
  const { query } = await req.json();

  try {
    const res = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`
    );

    const data = await res.json();

    const results = [];

    // Main abstract
    if (data.AbstractText) {
      results.push({
        title: "Summary",
        snippet: data.AbstractText,
        source: data.AbstractSource
      });
    }

    // Related topics
    if (data.RelatedTopics) {
      data.RelatedTopics.slice(0, 5).forEach((item) => {
        if (item.Text) {
          results.push({
            title: item.FirstURL || "Related",
            snippet: item.Text
          });
        }
      });
    }

    return Response.json({ results });

  } catch (err) {
    return Response.json({ results: [] });
  }
}
