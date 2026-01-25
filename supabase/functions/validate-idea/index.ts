import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are an AI Business Idea Validator. Your role is to provide brutally honest, psychology and neuroscience-based analysis of business ideas. You use behavioral economics principles to assess whether an idea is worth pursuing.

ANALYSIS FRAMEWORK:
1. Demand Psychology - Analyze if there's genuine emotional pain that creates buying motivation
2. Pain Realism - Score 1-10 how urgent and real the problem is based on evidence
3. Buying Friction - Identify top 3 cognitive barriers to purchase
4. Pricing Psychology - Assess if price anchoring and framing will work
5. Neuroscience - Identify dopamine triggers, risk perception, and trust signals
6. Verdict - GO (strong fundamentals), PIVOT (adjust needed), or KILL (not viable)

RULES:
- Be brutally honest like a ruthless venture capitalist
- Never hype or sugarcoat
- Focus on evidence of real pain and willingness to pay
- Consider the founder's experience level in recommendations
- Provide actionable first steps

OUTPUT FORMAT (JSON only):
{
  "demand_psychology": "2-3 sentence analysis of the emotional drivers and buying motivation",
  "pain_realism": {
    "score": number 1-10,
    "urgency": "high" | "medium" | "low"
  },
  "buying_friction": ["friction point 1", "friction point 2", "friction point 3"],
  "pricing_psychology": {
    "fair": boolean,
    "suggested": "price range string",
    "reason": "explanation of pricing strategy"
  },
  "neuroscience": {
    "value_triggers": ["trigger1", "trigger2", "trigger3"],
    "risk": "low" | "medium" | "high",
    "trust_difficulty": "low" | "medium" | "high"
  },
  "verdict": "GO" | "PIVOT" | "KILL",
  "immediate_plan": ["Day 1: action", "Day 3: action", "Week 1: action"]
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { idea, targetCustomer, price, experience } = await req.json();

    if (!idea || !targetCustomer || !price) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = `Analyze this business idea:

IDEA: ${idea}

TARGET CUSTOMER: ${targetCustomer}

PLANNED PRICE: $${price}

FOUNDER EXPERIENCE: ${experience}

Provide your analysis in the exact JSON format specified. Be brutally honest.`;

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
          { role: "user", content: userPrompt },
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
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
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

    // Parse the JSON from the AI response
    let result;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      result = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      // Return a fallback structure
      result = {
        demand_psychology: "Unable to fully analyze. Please provide more details about the problem you're solving.",
        pain_realism: { score: 5, urgency: "medium" },
        buying_friction: [
          "Unclear value proposition",
          "Need more specific target customer",
          "Pricing needs validation"
        ],
        pricing_psychology: {
          fair: true,
          suggested: `$${Math.floor(Number(price) * 0.8)}-$${Math.floor(Number(price) * 1.2)}`,
          reason: "Unable to determine optimal pricing without clearer positioning"
        },
        neuroscience: {
          value_triggers: ["Problem relief", "Convenience", "Status"],
          risk: "medium",
          trust_difficulty: "medium"
        },
        verdict: "PIVOT",
        immediate_plan: [
          "Day 1: Create a simple landing page",
          "Day 3: Talk to 10 potential customers",
          "Week 1: Get 5 pre-orders"
        ]
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Validation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
