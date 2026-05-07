export async function POST(req) {
  const { query } = await req.json();

  try {
    const res = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`
    );

    const data = await res.json();

    const results = [];

    if (data.AbstractText) {
      results.push({
        title: "Summary",
        snippet: data.AbstractText
      });
    }

    if (data.RelatedTopics) {
      data.RelatedTopics.slice(0, 6).forEach((item) => {
        if (item.Text) {
          results.push({
            title: item.FirstURL || "Related",
            snippet: item.Text
          });
        }
      });
    }

    return Response.json({ results });

  } catch {
    return Response.json({ results: [] });
  }
}
