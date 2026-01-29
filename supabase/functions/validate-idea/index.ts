import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Multi-Agent Neuro-Validation Protocol with Real-World Factors
const agentPrompts = {
  dopamineDetective: `You are the "Dopamine Detective" - an expert in demand psychology and buying motivation. Analyze:
1. Emotional drivers that create buying urgency
2. Dopamine triggers (anticipation, novelty, reward patterns)
3. Apply "The Mom Test" - would strangers pay before seeing it built?
4. Identify if this solves a "bleeding neck" problem or a "nice-to-have"
5. Customer urgency - how soon do they need a solution?
6. Existing alternatives and why they're failing

Return ONLY a JSON object with these fields:
{
  "demand_analysis": "3-4 sentence analysis of emotional drivers",
  "mom_test_pass": boolean,
  "dopamine_triggers": ["trigger1", "trigger2", "trigger3"],
  "pain_type": "painkiller" | "vitamin",
  "pain_frequency": "daily" | "weekly" | "monthly" | "rarely",
  "pain_score": number 1-10,
  "urgency": "high" | "medium" | "low",
  "existing_alternatives": ["alternative1", "alternative2"],
  "why_alternatives_fail": "Brief explanation"
}`,

  moneyTrail: `You are "Money Trail" - an expert in market dynamics, competitor analysis, pricing psychology, and unit economics. Analyze:
1. Total Addressable Market (TAM) with realistic estimates
2. Top 3-5 competitors and their specific exploitable weaknesses
3. Pricing psychology and willingness-to-pay
4. Price anchoring strategies
5. Market timing and trends
6. Unit Economics: CAC (Customer Acquisition Cost), LTV (Lifetime Value), margins
7. Revenue model sustainability

Return ONLY a JSON object:
{
  "tam_estimate": "$X-Y billion/million",
  "tam_reasoning": "Brief justification",
  "competitors": [
    {"name": "competitor", "weakness": "exploitable weakness", "market_share": "estimate", "pricing": "their pricing"}
  ],
  "your_edge": "2-3 sentence competitive advantage",
  "suggested_price": "$X-Y range",
  "price_reasoning": "Why this price works",
  "anchor_strategy": "How to use price anchoring",
  "market_timing": "good" | "moderate" | "risky",
  "timing_reason": "Brief explanation",
  "unit_economics": {
    "estimated_cac": "$X estimate",
    "estimated_ltv": "$X estimate",
    "ltv_cac_ratio": "X:1 (healthy is >3:1)",
    "estimated_margin": "X% gross margin",
    "payback_period": "X months",
    "sustainability": "good" | "moderate" | "concerning"
  },
  "revenue_model": "subscription" | "one-time" | "freemium" | "marketplace" | "other"
}`,

  amygdalaAudit: `You are "Amygdala Audit" - an expert in risk assessment, fear/trust triggers, buying friction, and real-world execution challenges. Analyze:
1. Cognitive barriers to purchase (objections, fears, doubts)
2. Trust deficit - what needs to be proven
3. Switching cost considerations
4. Cortisol triggers (urgency, FOMO, loss aversion)
5. Oxytocin factors (social proof, community, testimonials needed)
6. Regulatory/legal risks specific to the industry
7. Execution risks - team, technology, capital requirements
8. Time-to-market pressures

Return ONLY a JSON object:
{
  "buying_friction": ["friction point 1", "friction point 2", "friction point 3"],
  "trust_barriers": ["barrier1", "barrier2"],
  "trust_difficulty": "low" | "medium" | "high",
  "risk_level": "low" | "medium" | "high",
  "risk_factors": ["risk1", "risk2"],
  "cortisol_urgency": ["urgency factor 1", "urgency factor 2"],
  "oxytocin_factors": ["trust factor 1", "trust factor 2"],
  "regulatory_concerns": ["concern1"] | null,
  "objection_handling": [{"objection": "common objection", "counter": "how to handle"}],
  "execution_risks": {
    "team_requirements": ["skill/role needed 1", "skill/role needed 2"],
    "capital_needed": "$X estimate to reach MVP/traction",
    "tech_complexity": "low" | "medium" | "high",
    "tech_challenges": ["challenge1", "challenge2"],
    "time_to_mvp": "X weeks/months",
    "critical_hires": ["role1", "role2"],
    "moat_difficulty": "easy" | "medium" | "hard"
  },
  "legal_considerations": ["legal item 1"] | null,
  "industry_barriers": ["barrier1"] | null
}`,

  verdictSynthesizer: `You are the "Verdict Synthesizer" - the final arbiter who synthesizes all agent analyses into a verdict. Given the analyses from our specialist agents:

DOPAMINE DETECTIVE FINDINGS: {dopamineAnalysis}
MONEY TRAIL FINDINGS: {moneyAnalysis}
AMYGDALA AUDIT FINDINGS: {amygdalaAnalysis}

Synthesize a final verdict. Be BRUTALLY HONEST like a top-tier VC who has seen 10,000 pitches. Consider:
- Does the pain justify the price?
- Is the market timing right?
- Can the founder realistically execute given the challenges?
- What's the probability of success?
- Is the unit economics viable?
- Are execution requirements realistic?

Provide an 8-year-old summary - explain the verdict so simply that a child would understand.

Return ONLY a JSON object:
{
  "confidence_score": number 0-100,
  "verdict": "GO" | "PIVOT" | "KILL",
  "verdict_reasoning": "2-3 sentence brutal honest summary",
  "eli8_summary": "Explain to an 8-year-old why this will/won't work in 2 sentences",
  "immediate_plan": ["Day 1: action", "Day 3: action", "Week 1: action", "Week 2: action", "Month 1: action"],
  "pivot_suggestions": ["suggestion 1", "suggestion 2"] | null,
  "key_assumptions": ["assumption to validate 1", "assumption 2", "assumption 3"],
  "dealbreakers": ["what could kill this"],
  "unfair_advantages_needed": ["what would make this unstoppable"],
  "success_probability": "X% chance of reaching $10k MRR",
  "timeline_to_revenue": {
    "mvp_weeks": number,
    "first_customer_weeks": number,
    "ten_customers_weeks": number,
    "profitability_months": number
  },
  "founder_fit_questions": ["Question to ask yourself 1", "Question 2"]
}`,
};

async function callAgent(
  agentName: string,
  prompt: string,
  userContext: string,
  apiKey: string
): Promise<any> {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: userContext },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const status = response.status;
    if (status === 429) throw new Error("429");
    if (status === 402) throw new Error("402");
    throw new Error(`Agent ${agentName} failed: ${status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";
  
  try {
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
    return JSON.parse(jsonStr);
  } catch {
    console.error(`Failed to parse ${agentName} response:`, content);
    return null;
  }
}

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

    const userContext = `
BUSINESS IDEA: ${idea}

TARGET CUSTOMER: ${targetCustomer}

PLANNED PRICE: $${price}

FOUNDER EXPERIENCE: ${experience || "Not specified"}

PLATFORM/DELIVERY: ${platform || "Not specified"}

CURRENT STAGE: ${stage || "Just an idea"}

Analyze with brutal honesty. The founder's success depends on hearing the truth. Consider all real-world factors: execution difficulty, capital requirements, regulatory hurdles, and realistic timelines.`;

    // Run all three specialist agents in PARALLEL
    console.log("🧠 Starting multi-agent analysis with real-world factors...");
    
    const [dopamineResult, moneyResult, amygdalaResult] = await Promise.all([
      callAgent("DopamineDetective", agentPrompts.dopamineDetective, userContext, LOVABLE_API_KEY),
      callAgent("MoneyTrail", agentPrompts.moneyTrail, userContext, LOVABLE_API_KEY),
      callAgent("AmygdalaAudit", agentPrompts.amygdalaAudit, userContext, LOVABLE_API_KEY),
    ]);

    console.log("✅ All agents completed, synthesizing verdict...");

    // Now synthesize the verdict with all agent findings
    const synthesisPrompt = agentPrompts.verdictSynthesizer
      .replace("{dopamineAnalysis}", JSON.stringify(dopamineResult || {}))
      .replace("{moneyAnalysis}", JSON.stringify(moneyResult || {}))
      .replace("{amygdalaAnalysis}", JSON.stringify(amygdalaResult || {}));

    const verdictResult = await callAgent("VerdictSynthesizer", synthesisPrompt, userContext, LOVABLE_API_KEY);

    // Combine all results into the final response
    const finalResult = {
      // Demand Psychology (from Dopamine Detective)
      demand_psychology: dopamineResult?.demand_analysis || "Analysis pending",
      pain_realism: {
        score: dopamineResult?.pain_score || 5,
        urgency: dopamineResult?.urgency || "medium",
        type: dopamineResult?.pain_type || "vitamin",
        frequency: dopamineResult?.pain_frequency || "monthly",
      },
      mom_test_pass: dopamineResult?.mom_test_pass ?? false,
      existing_alternatives: dopamineResult?.existing_alternatives || [],
      why_alternatives_fail: dopamineResult?.why_alternatives_fail || "",

      // Market Analysis (from Money Trail)
      market_analysis: {
        tam_estimate: moneyResult?.tam_estimate || "Requires research",
        tam_reasoning: moneyResult?.tam_reasoning || "",
        competitors: moneyResult?.competitors || [],
        competitive_advantage: moneyResult?.your_edge || "Not assessed",
        market_timing: moneyResult?.market_timing || "moderate",
        timing_reason: moneyResult?.timing_reason || "",
      },

      // Unit Economics (from Money Trail)
      unit_economics: moneyResult?.unit_economics || null,
      revenue_model: moneyResult?.revenue_model || "subscription",

      // Pricing (from Money Trail)
      pricing_psychology: {
        fair: true,
        suggested: moneyResult?.suggested_price || `$${price}`,
        reason: moneyResult?.price_reasoning || "Based on market analysis",
        anchor_strategy: moneyResult?.anchor_strategy || "Consider tiered pricing",
      },

      // Friction & Risk (from Amygdala Audit)
      buying_friction: amygdalaResult?.buying_friction || ["Needs validation"],
      trust_barriers: amygdalaResult?.trust_barriers || [],
      objection_handling: amygdalaResult?.objection_handling || [],
      regulatory_concerns: amygdalaResult?.regulatory_concerns || null,
      legal_considerations: amygdalaResult?.legal_considerations || null,
      industry_barriers: amygdalaResult?.industry_barriers || null,

      // Execution Risks (from Amygdala Audit)
      execution_risks: amygdalaResult?.execution_risks || null,

      // Neuroscience Layer
      neuroscience: {
        dopamine_triggers: dopamineResult?.dopamine_triggers || [],
        oxytocin_factors: amygdalaResult?.oxytocin_factors || [],
        cortisol_urgency: amygdalaResult?.cortisol_urgency || [],
        risk: amygdalaResult?.risk_level || "medium",
        trust_difficulty: amygdalaResult?.trust_difficulty || "medium",
      },

      // Verdict (from Synthesizer)
      confidence_score: verdictResult?.confidence_score || 50,
      verdict: verdictResult?.verdict || "PIVOT",
      verdict_reasoning: verdictResult?.verdict_reasoning || "Further validation needed",
      eli8_summary: verdictResult?.eli8_summary || "",
      success_probability: verdictResult?.success_probability || "Unknown",
      timeline_to_revenue: verdictResult?.timeline_to_revenue || null,
      founder_fit_questions: verdictResult?.founder_fit_questions || [],
      immediate_plan: verdictResult?.immediate_plan || [
        "Day 1: Talk to 5 potential customers",
        "Day 3: Create landing page",
        "Week 1: Get 10 email signups",
        "Week 2: Conduct pre-sales",
        "Month 1: Build MVP if validated",
      ],
      pivot_suggestions: verdictResult?.pivot_suggestions || null,
      key_assumptions: verdictResult?.key_assumptions || [],
      dealbreakers: verdictResult?.dealbreakers || [],
      unfair_advantages_needed: verdictResult?.unfair_advantages_needed || [],

      // Meta info
      analysis_agents: ["Dopamine Detective", "Money Trail", "Amygdala Audit", "Verdict Synthesizer"],
    };

    return new Response(JSON.stringify(finalResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Validation error:", error);
    
    if (error instanceof Error) {
      if (error.message === "429") {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (error.message === "402") {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }
    
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});