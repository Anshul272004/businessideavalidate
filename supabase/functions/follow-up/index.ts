import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are an expert business advisor providing follow-up guidance based on a previous idea validation analysis. You have access to the original analysis and the user's question.

GUIDELINES:
- Be specific and actionable in your responses
- Reference the original analysis when relevant
- Provide practical, step-by-step guidance
- If asked about competitors, provide strategic differentiation advice
- If asked about pricing, give specific pricing psychology tactics
- If asked about marketing, suggest guerrilla and low-cost strategies
- Keep responses concise but comprehensive (2-4 paragraphs max)
- Use bullet points for lists
- Be encouraging but realistic

TONE: Mentor-like, direct, practical, no fluff.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, originalIdea, validationResult } = await req.json();

    if (!question) {
      return new Response(
        JSON.stringify({ error: "Question is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const contextPrompt = `CONTEXT - Original Business Idea:
${originalIdea || "Not provided"}

PREVIOUS VALIDATION ANALYSIS:
- Verdict: ${validationResult?.verdict || "Unknown"}
- Confidence Score: ${validationResult?.confidence_score || "N/A"}%
- Pain Score: ${validationResult?.pain_realism?.score || "N/A"}/10
- Pain Type: ${validationResult?.pain_realism?.type || "Unknown"}
- Market Size: ${validationResult?.market_analysis?.tam_estimate || "Unknown"}
- Key Competitors: ${validationResult?.market_analysis?.competitors?.map((c: any) => c.name).join(", ") || "None identified"}
- Buying Friction: ${validationResult?.buying_friction?.join("; ") || "None identified"}
- Recommended Price: ${validationResult?.pricing_psychology?.suggested || "Unknown"}

USER'S FOLLOW-UP QUESTION:
${question}

Provide a helpful, specific, and actionable response.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: contextPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    return new Response(
      JSON.stringify({ answer: content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Follow-up error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
