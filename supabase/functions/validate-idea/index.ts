import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `You are an elite AI Business Idea Validator with expertise in behavioral psychology, neuroscience, and venture capital. Your analysis is brutally honest, data-driven, and actionable.

ANALYSIS FRAMEWORK:

1. DEMAND PSYCHOLOGY
- Analyze genuine emotional pain that creates buying motivation
- Apply "The Mom Test" principles: Would strangers pay before seeing the product?
- Identify dopamine triggers (anticipation, reward, novelty)

2. PAIN REALISM (Score 1-10)
- Is this a "painkiller" (urgent, must-have) or "vitamin" (nice-to-have)?
- Cortisol triggers: fear, urgency, loss aversion
- Frequency: How often does the pain occur?

3. MARKET ANALYSIS
- Estimate total addressable market (TAM)
- Identify 3 potential competitors or alternatives
- Competitive advantage assessment

4. BUYING FRICTION
- Cognitive barriers to purchase
- Trust deficit analysis
- Switching cost considerations

5. PRICING PSYCHOLOGY
- Price anchoring potential
- Value perception analysis
- Willingness-to-pay assessment

6. NEUROSCIENCE LAYER
- Dopamine triggers (anticipation, variable rewards)
- Oxytocin factors (trust, social proof, community)
- Cortisol/urgency factors (FOMO, scarcity)

7. CONFIDENCE SCORE (0-100)
- Overall viability confidence percentage

8. VERDICT: GO / PIVOT / KILL

RULES:
- Be brutally honest like a ruthless top-tier VC
- Never sugarcoat - founders need truth
- Focus on evidence of real pain and willingness to pay
- Consider founder experience in recommendations
- Provide specific, actionable next steps
- Include realistic market estimates

OUTPUT FORMAT (JSON only):
{
  "demand_psychology": "3-4 sentence analysis of emotional drivers, The Mom Test assessment, and buying motivation",
  "pain_realism": {
    "score": number 1-10,
    "urgency": "high" | "medium" | "low",
    "type": "painkiller" | "vitamin",
    "frequency": "daily" | "weekly" | "monthly" | "rarely"
  },
  "market_analysis": {
    "tam_estimate": "estimated market size string (e.g., '$2B-5B')",
    "competitors": [
      {"name": "competitor1", "weakness": "their weakness you can exploit"},
      {"name": "competitor2", "weakness": "their weakness you can exploit"},
      {"name": "competitor3", "weakness": "their weakness you can exploit"}
    ],
    "competitive_advantage": "your potential edge in 1-2 sentences"
  },
  "buying_friction": ["friction point 1", "friction point 2", "friction point 3"],
  "pricing_psychology": {
    "fair": boolean,
    "suggested": "price range string",
    "reason": "explanation of pricing strategy",
    "anchor_strategy": "how to use price anchoring"
  },
  "neuroscience": {
    "dopamine_triggers": ["trigger1", "trigger2"],
    "oxytocin_factors": ["trust factor 1", "trust factor 2"],
    "cortisol_urgency": ["urgency factor 1", "urgency factor 2"],
    "risk": "low" | "medium" | "high",
    "trust_difficulty": "low" | "medium" | "high"
  },
  "confidence_score": number 0-100,
  "verdict": "GO" | "PIVOT" | "KILL",
  "verdict_reasoning": "2-3 sentence explanation of the verdict",
  "immediate_plan": ["Day 1: specific action", "Day 3: specific action", "Week 1: specific action", "Week 2: specific action", "Month 1: specific action"],
  "pivot_suggestions": ["alternative approach 1", "alternative approach 2"] // only if verdict is PIVOT
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { idea, targetCustomer, price, experience, platform, stage } = await req.json();

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

    const userPrompt = `Analyze this business idea with brutal honesty:

IDEA: ${idea}

TARGET CUSTOMER: ${targetCustomer}

PLANNED PRICE: $${price}

FOUNDER EXPERIENCE: ${experience || "Not specified"}

PLATFORM/DELIVERY: ${platform || "Not specified"}

CURRENT STAGE: ${stage || "Just an idea"}

Apply The Mom Test principles. Would real strangers actually pay for this before seeing it built? Is this a painkiller or vitamin?

Provide your analysis in the exact JSON format specified. Be brutally honest - the founder's success depends on hearing the truth.`;

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
      // Return a fallback structure with enhanced fields
      result = {
        demand_psychology: "Unable to fully analyze. Please provide more details about the problem you're solving.",
        pain_realism: { 
          score: 5, 
          urgency: "medium",
          type: "vitamin",
          frequency: "monthly"
        },
        market_analysis: {
          tam_estimate: "Unable to estimate",
          competitors: [
            { name: "Unknown", weakness: "Requires more research" }
          ],
          competitive_advantage: "Needs clearer positioning"
        },
        buying_friction: [
          "Unclear value proposition",
          "Need more specific target customer",
          "Pricing needs validation"
        ],
        pricing_psychology: {
          fair: true,
          suggested: `$${Math.floor(Number(price) * 0.8)}-$${Math.floor(Number(price) * 1.2)}`,
          reason: "Unable to determine optimal pricing without clearer positioning",
          anchor_strategy: "Consider offering tiered pricing"
        },
        neuroscience: {
          dopamine_triggers: ["Problem relief", "Convenience"],
          oxytocin_factors: ["Social proof needed", "Trust building required"],
          cortisol_urgency: ["Create deadline", "Show cost of inaction"],
          risk: "medium",
          trust_difficulty: "medium"
        },
        confidence_score: 40,
        verdict: "PIVOT",
        verdict_reasoning: "The idea needs more refinement. Focus on validating the core problem with real customers before building.",
        immediate_plan: [
          "Day 1: Create a simple landing page",
          "Day 3: Talk to 10 potential customers",
          "Week 1: Get 5 pre-orders",
          "Week 2: Analyze feedback patterns",
          "Month 1: Build MVP if validated"
        ],
        pivot_suggestions: [
          "Consider narrowing your target audience",
          "Explore adjacent problems your customers face"
        ]
      };
    }

    // Ensure backward compatibility - add missing fields with defaults
    if (!result.pain_realism.type) result.pain_realism.type = "vitamin";
    if (!result.pain_realism.frequency) result.pain_realism.frequency = "monthly";
    if (!result.market_analysis) {
      result.market_analysis = {
        tam_estimate: "Requires research",
        competitors: [],
        competitive_advantage: "Not assessed"
      };
    }
    if (!result.confidence_score) {
      result.confidence_score = result.verdict === "GO" ? 75 : result.verdict === "PIVOT" ? 50 : 25;
    }
    if (!result.verdict_reasoning) {
      result.verdict_reasoning = `Based on the analysis, the recommendation is to ${result.verdict}.`;
    }
    if (!result.neuroscience.dopamine_triggers) {
      result.neuroscience.dopamine_triggers = result.neuroscience.value_triggers || [];
    }
    if (!result.neuroscience.oxytocin_factors) {
      result.neuroscience.oxytocin_factors = ["Build social proof", "Gather testimonials"];
    }
    if (!result.neuroscience.cortisol_urgency) {
      result.neuroscience.cortisol_urgency = ["Show cost of waiting", "Create scarcity"];
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
