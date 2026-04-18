import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { inputs } = await req.json();

    const prompt = `You are an expert brand strategist. Generate a comprehensive Brand Positioning Framework for:

Brand: ${inputs.brand_name || "Not specified"}
Target Market: ${inputs.target_market || "Not specified"}
Competitors: ${inputs.competitors || "Not specified"}
Unique Value Proposition: ${inputs.unique_value || "Not specified"}
Brand Personality: ${inputs.brand_personality || "Not specified"}
Key Benefits: ${inputs.key_benefits || "Not specified"}

Please generate a complete brand positioning package including:
1. Brand Positioning Statement (classic "For [target market], [brand] is the [category] that [key benefit], because [reason to believe]")
2. Brand Promise — one sentence commitment to customers
3. Brand Purpose — why does this brand exist beyond profit?
4. Brand Mission — what does the brand aim to achieve?
5. Brand Values — 3-5 core values with descriptions
6. Key Brand Messages — 3 distinct messages for different audiences
7. Competitive Differentiation — how this brand wins vs competitors
8. Brand Mantra / Tagline options — 5 creative variations

Be compelling, specific, and actionable. Format professionally.`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "API key not configured" }, { status: 500 });

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], temperature: 0.8, max_tokens: 2500 }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `API error: ${response.status} - ${err}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ result: data.choices?.[0]?.message?.content || "No output generated." });
  } catch (err: unknown) {
    console.error("Brand positioning error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
