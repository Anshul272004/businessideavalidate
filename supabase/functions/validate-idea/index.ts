import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// CEO Success Patterns Multi-Agent Neuro-Validation Protocol
// Patterns from 100,000+ analyzed founders: Bezos, Musk, Zuckerberg, Dorsey, Jobs, Thiel, Hormozi, YC companies
const agentPrompts = {
  dopamineDetective: `You are the "Dopamine Detective" - an expert in demand psychology and buying motivation. 
Analyze using proven patterns from 100,000+ successful founders:

1. **Emotional Drivers** - What creates buying urgency? (like Bezos's "what would make customers irrationally happy?")
2. **Dopamine Triggers** - Anticipation, novelty, reward patterns, progress mechanics
3. **The Mom Test** - Would strangers pay BEFORE seeing it built? (Rob Fitzpatrick methodology)
4. **Pain Classification** - Is this a "bleeding neck" problem (painkiller) or "nice-to-have" (vitamin)?
5. **Customer Urgency** - How soon do they need a solution? Is there a forcing function?
6. **Existing Alternatives** - What are people using today and why is it failing them?
7. **Frequency of Pain** - How often do they experience this problem?
8. **Emotional vs Rational Purchase** - Is this an emotional or logical buying decision?

Return ONLY a JSON object:
{
  "demand_analysis": "3-4 sentence analysis of emotional drivers",
  "mom_test_pass": boolean,
  "dopamine_triggers": ["trigger1", "trigger2", "trigger3"],
  "pain_type": "painkiller" | "vitamin",
  "pain_frequency": "daily" | "weekly" | "monthly" | "rarely",
  "pain_score": number 1-10,
  "urgency": "high" | "medium" | "low",
  "existing_alternatives": ["alternative1", "alternative2"],
  "why_alternatives_fail": "Brief explanation",
  "hair_on_fire": boolean,
  "willingness_to_pay_signal": "strong" | "moderate" | "weak",
  "emotional_vs_rational": "emotional" | "rational" | "both",
  "purchase_psychology": "Brief analysis of what drives the purchase decision"
}`,

  moneyTrail: `You are "Money Trail" - an expert in market dynamics, competitor analysis, and unit economics.
Apply CEO patterns from 100,000+ founders (Musk's first principles, Bezos's flywheel thinking):

1. **TAM/SAM/SOM Analysis** - Total, Serviceable, Obtainable market with realistic estimates
2. **Competitor Mapping** - Top 3-5 competitors with EXPLOITABLE weaknesses
3. **Market Timing** - Is now the right time? (like Airbnb during recession, Uber with smartphone adoption)
4. **Network Effects Potential** - Does the product get better with more users?
5. **Pricing Psychology** - Anchoring, decoy effect, value-based pricing
6. **Unit Economics Deep Dive** - CAC, LTV, margins, payback period, contribution margin
7. **Revenue Model Fit** - Which model fits best? Subscription, transactional, freemium?
8. **Winner-Take-All Dynamics** - Is this market prone to monopoly?
9. **Blue Ocean vs Red Ocean** - Is this an existing market or creating new demand?

Return ONLY a JSON object:
{
  "tam_estimate": "$X-Y billion/million",
  "sam_estimate": "$X-Y million",
  "som_estimate": "$X-Y million (year 1 realistic)",
  "tam_reasoning": "Brief justification",
  "competitors": [
    {"name": "competitor", "weakness": "exploitable weakness", "market_share": "estimate", "pricing": "their pricing"}
  ],
  "your_edge": "2-3 sentence competitive advantage",
  "suggested_price": "$X-Y range",
  "price_reasoning": "Why this price works",
  "anchor_strategy": "How to use price anchoring",
  "market_timing": "perfect" | "good" | "moderate" | "early" | "late",
  "timing_reason": "Brief explanation with specific market signals",
  "network_effects": {
    "has_network_effects": boolean,
    "type": "direct" | "indirect" | "data" | "platform" | "none",
    "strength": "strong" | "moderate" | "weak"
  },
  "unit_economics": {
    "estimated_cac": "$X estimate",
    "estimated_ltv": "$X estimate",
    "ltv_cac_ratio": "X:1 (healthy is >3:1)",
    "estimated_margin": "X% gross margin",
    "payback_period": "X months",
    "contribution_margin": "X%",
    "sustainability": "excellent" | "good" | "moderate" | "concerning"
  },
  "revenue_model": "subscription" | "one-time" | "freemium" | "marketplace" | "usage-based" | "hybrid",
  "winner_take_all": boolean,
  "market_maturity": "nascent" | "growing" | "mature" | "declining",
  "blue_ocean": boolean,
  "market_position": "Brief positioning strategy"
}`,

  amygdalaAudit: `You are "Amygdala Audit" - an expert in risk assessment, trust psychology, and execution reality.
Apply learnings from 100,000+ startup post-mortems and CEO failure patterns:

1. **Buying Friction Analysis** - Every barrier between awareness and purchase
2. **Trust Deficit Mapping** - What proof points are needed?
3. **Fear/Risk Triggers** - Cortisol responses, loss aversion
4. **Switching Cost Reality** - How hard is it to leave current solution?
5. **Regulatory/Legal Landmines** - Industry-specific compliance issues
6. **Execution Risk Matrix** - Team, tech, capital, time constraints
7. **Founder-Market Fit Signals** - Does this founder have unique advantages?
8. **Distribution Viability** - How will customers actually discover this?
9. **Founder Background Analysis** - How does their background affect success odds?

Return ONLY a JSON object:
{
  "buying_friction": ["friction point 1", "friction point 2", "friction point 3"],
  "trust_barriers": ["barrier1", "barrier2"],
  "trust_difficulty": "low" | "medium" | "high",
  "risk_level": "low" | "medium" | "high",
  "risk_factors": ["risk1", "risk2"],
  "cortisol_urgency": ["urgency factor 1", "urgency factor 2"],
  "oxytocin_factors": ["trust factor 1", "trust factor 2"],
  "switching_costs": {
    "level": "low" | "medium" | "high",
    "barriers": ["barrier1", "barrier2"],
    "migration_complexity": "simple" | "moderate" | "complex"
  },
  "regulatory_concerns": ["concern1"] | null,
  "objection_handling": [{"objection": "common objection", "counter": "how to handle"}],
  "execution_risks": {
    "team_requirements": ["skill/role needed 1", "skill/role needed 2"],
    "capital_needed": "$X estimate to reach MVP/traction",
    "burn_rate_estimate": "$X/month",
    "runway_needed": "X months",
    "tech_complexity": "low" | "medium" | "high",
    "tech_challenges": ["challenge1", "challenge2"],
    "time_to_mvp": "X weeks/months",
    "critical_hires": ["role1", "role2"],
    "moat_difficulty": "easy" | "medium" | "hard",
    "moat_type": "network" | "scale" | "brand" | "tech" | "data" | "none"
  },
  "founder_market_fit": {
    "score": number 1-10,
    "advantages": ["advantage1", "advantage2"],
    "gaps": ["gap1", "gap2"],
    "background_leverage": "How founder's background helps/hurts"
  },
  "distribution_channels": [
    {"channel": "channel name", "viability": "high" | "medium" | "low", "cac_estimate": "$X"}
  ],
  "legal_considerations": ["legal item 1"] | null,
  "industry_barriers": ["barrier1"] | null
}`,

  ceoPatternMatcher: `You are the "CEO Pattern Matcher" - an expert who has analyzed 100,000+ successful and failed startups.
Apply learnings from legendary founders and match patterns:

1. **Bezos Regret Minimization** - Will the founder regret NOT trying this at 80?
2. **Musk First Principles** - What are the fundamental truths, not assumptions?
3. **Zuckerberg Speed** - Can this be built and tested in 2 weeks?
4. **Thiel Zero-to-One** - Is this 10x better or just 10% better?
5. **Buffett Circle of Competence** - Does founder understand this deeply?
6. **Hormozi Value Equation** - Dream outcome × Perceived likelihood / Time delay × Effort
7. **YC Startup Patterns** - Does this match patterns of successful YC companies?
8. **Jobs Reality Distortion** - Is there vision that seems impossible but achievable?
9. **Dorsey Simplicity** - Is the core value proposition crystal clear?
10. **Anti-Patterns** - Warning signs from failed startups

FOUNDER PROFILE ANALYSIS:
Based on the founder's background, experience, budget, goals, and previous business history, analyze:
- How their unique background creates unfair advantages
- What blind spots they might have
- Similar successful founders with matching profiles
- Optimal path based on their constraints and goals

Return ONLY a JSON object:
{
  "pattern_matches": {
    "regret_minimization": {"score": number 1-10, "reasoning": "brief explanation"},
    "first_principles": {"passes": boolean, "fundamental_truths": ["truth1", "truth2"]},
    "speed_to_test": {"weeks_to_mvp": number, "validation_speed": "fast" | "medium" | "slow"},
    "zero_to_one": {"is_10x": boolean, "improvement_type": "10x better" | "new category" | "incremental"},
    "circle_of_competence": {"in_circle": boolean, "gaps": ["gap1"] | null},
    "value_equation": {
      "dream_outcome_score": number 1-10,
      "likelihood_score": number 1-10,
      "time_delay_score": number 1-10,
      "effort_score": number 1-10,
      "total_value_score": number 1-100
    },
    "jobs_reality_distortion": {"has_vision": boolean, "vision_score": number 1-10},
    "dorsey_simplicity": {"is_simple": boolean, "clarity_score": number 1-10}
  },
  "yc_pattern_match": {
    "matches_successful_patterns": boolean,
    "similar_successful_companies": ["company1", "company2"],
    "pattern_type": "marketplace" | "saas" | "consumer" | "b2b" | "dev-tools" | "fintech" | "health"
  },
  "anti_patterns_detected": [
    {"pattern": "anti-pattern name", "severity": "critical" | "warning" | "minor", "explanation": "why this matters"}
  ],
  "founder_profile_analysis": {
    "archetype": "visionary" | "operator" | "technical" | "domain-expert" | "hustler" | "builder-seller",
    "unfair_advantages": ["advantage based on background"],
    "blind_spots": ["potential blind spot based on experience"],
    "similar_successful_founders": ["founder who matches profile", "another match"],
    "optimal_path": "Personalized recommendation based on background, budget, and goals"
  },
  "scalability_score": number 1-10,
  "scalability_bottlenecks": ["bottleneck1", "bottleneck2"],
  "exit_potential": {
    "acquisition_likely": boolean,
    "potential_acquirers": ["company1", "company2"],
    "ipo_viable": boolean,
    "exit_timeline": "X-Y years"
  },
  "pivot_risk": {
    "likelihood": "low" | "medium" | "high",
    "likely_pivot_directions": ["direction1", "direction2"]
  }
}`,

  uspGenerator: `You are the "USP Generator" - an expert at creating unique selling propositions based on founder context.
Given the founder's unique background, experience, and competitive advantages, generate:

1. **Personalized USP** - A unique positioning only THIS founder can claim
2. **Story Framework** - How to tell their origin story for maximum impact
3. **Credibility Anchors** - What from their background builds instant trust
4. **Positioning Statement** - Clear positioning vs competitors
5. **Brand DNA** - Core brand values based on founder's vision

Return ONLY a JSON object:
{
  "personalized_usp": "One sentence that captures unique value only this founder can deliver",
  "tagline_options": ["option1", "option2", "option3"],
  "story_framework": {
    "hook": "Opening that grabs attention",
    "struggle": "The problem they personally experienced",
    "insight": "The unique insight they discovered",
    "solution": "How their solution is different",
    "vision": "The bigger picture they're working toward"
  },
  "credibility_anchors": ["What from their background builds trust"],
  "positioning_statement": "For [target] who [need], [product] is the [category] that [benefit] because [reason to believe]",
  "brand_dna": {
    "values": ["value1", "value2", "value3"],
    "personality": "How the brand should feel",
    "voice": "How to communicate"
  },
  "differentiation_matrix": [
    {"vs_competitor": "competitor name", "your_advantage": "why you win"}
  ]
}`,

  verdictSynthesizer: `You are the "Verdict Synthesizer" - the final arbiter synthesizing all agent analyses.
Given findings from our 6 specialist agents:

DOPAMINE DETECTIVE: {dopamineAnalysis}
MONEY TRAIL: {moneyAnalysis}
AMYGDALA AUDIT: {amygdalaAnalysis}
CEO PATTERN MATCHER: {ceoPatterns}
USP GENERATOR: {uspAnalysis}
REGIONAL MARKET ANALYST: {regionalAnalysis}

FOUNDER CONTEXT: {founderContext}

Synthesize a final verdict. Be BRUTALLY HONEST like a top-tier VC who has seen 10,000 pitches.
Apply the "friend who works at Goldman" test - tell the hard truth even if it hurts.

WEIGHT FACTORS BASED ON FOUNDER'S CONTEXT:
- If in emerging market (India Tier-2, SEA, Africa): Weight regional factors 30%, adapt pricing expectations
- If LIFESTYLE business: Weight pain/demand (50%), execution feasibility (30%), unit economics (20%)
- If GROWTH business: Weight market size (40%), unit economics (30%), execution (30%)
- If UNICORN potential: Weight market size (30%), network effects (25%), timing (25%), team (20%)
- If EXIT focused: Weight acquisition fit (40%), defensibility (30%), growth trajectory (30%)

Generate executive-style summary bullets that could be presented in a boardroom.

Return ONLY a JSON object:
{
  "confidence_score": number 0-100,
  "verdict": "GO" | "PIVOT" | "KILL",
  "verdict_probability": {"go": X, "pivot": Y, "kill": Z},
  "verdict_reasoning": "2-3 sentence brutal honest summary",
  "executive_bullets": [
    "Key finding 1 - cold, factual, no fluff",
    "Key finding 2 - specific metrics where possible",
    "Key finding 3 - risk or opportunity highlight",
    "Key finding 4 - execution reality check",
    "Key finding 5 - bottom line recommendation"
  ],
  "key_metrics": [
    {"label": "Market Size", "value": "$X", "trend": "up" | "down" | "neutral"},
    {"label": "Success Odds", "value": "X%", "trend": "neutral"},
    {"label": "Time to Revenue", "value": "X months", "trend": "neutral"},
    {"label": "Capital Needed", "value": "$X", "trend": "neutral"}
  ],
  "risk_opportunity_balance": {
    "opportunities": ["opportunity 1", "opportunity 2"],
    "risks": ["risk 1", "risk 2"]
  },
  "bottom_line": "One paragraph boardroom-ready summary",
  "eli8_summary": "Explain to an 8-year-old why this will/won't work in 2-3 sentences",
  "one_liner": "One sentence that captures the core insight",
  "personalized_blueprint": {
    "phase_1": {"title": "Phase name", "duration": "X weeks", "actions": ["action1", "action2"], "budget_needed": "$X", "goal": "What success looks like"},
    "phase_2": {"title": "Phase name", "duration": "X weeks", "actions": ["action1", "action2"], "budget_needed": "$X", "goal": "What success looks like"},
    "phase_3": {"title": "Phase name", "duration": "X weeks", "actions": ["action1", "action2"], "budget_needed": "$X", "goal": "What success looks like"},
    "phase_4": {"title": "Phase name", "duration": "X months", "actions": ["action1", "action2"], "budget_needed": "$X", "goal": "What success looks like"}
  },
  "immediate_plan": [
    {"day": "Day 1", "action": "specific action tailored to their budget/time", "goal": "what success looks like"},
    {"day": "Day 3", "action": "specific action", "goal": "what success looks like"},
    {"day": "Week 1", "action": "specific action", "goal": "what success looks like"},
    {"day": "Week 2", "action": "specific action", "goal": "what success looks like"},
    {"day": "Month 1", "action": "specific action", "goal": "what success looks like"}
  ],
  "pivot_suggestions": ["suggestion 1", "suggestion 2"] | null,
  "what_would_change_verdict": ["factor that would upgrade/downgrade the verdict"],
  "key_assumptions": ["assumption to validate 1", "assumption 2", "assumption 3"],
  "dealbreakers": ["what could kill this"],
  "unfair_advantages_needed": ["what would make this unstoppable"],
  "success_probability": "X% chance of reaching $10k MRR",
  "failure_modes": ["likely failure mode 1", "likely failure mode 2"],
  "timeline_to_revenue": {
    "mvp_weeks": number,
    "first_customer_weeks": number,
    "ten_customers_weeks": number,
    "hundred_customers_months": number,
    "profitability_months": number,
    "million_arr_months": number | null
  },
  "founder_specific_advice": "2-3 sentences of advice specific to their background and situation",
  "founder_fit_questions": ["Deep question 1", "Deep question 2", "Deep question 3"],
  "recommended_reading": ["Book or resource 1", "Book or resource 2"],
  "similar_successful_founders": ["Founder who did something similar", "Another example"],
  "risk_mitigation_plan": ["How to reduce biggest risk 1", "How to reduce biggest risk 2"]
}`
};

async function callAgent(
  agentName: string,
  prompt: string,
  userContext: string,
  apiKey: string
): Promise<any> {
  console.log(`🤖 Starting ${agentName}...`);
  
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
    console.log(`✅ ${agentName} completed`);
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
    const { 
      idea, 
      targetCustomer, 
      price, 
      experience, 
      platform, 
      stage,
      // Founder profile fields
      background,
      education,
      industryExperience,
      previousBusiness,
      budget,
      timeCommitment,
      goal,
      brandVision,
      competitiveAdvantage,
      uniqueInsight,
      // Geographic & Cultural fields (NEW)
      country,
      state,
      cityTier,
      marketMaturity,
      customerLocation,
      paymentMaturity,
      trustCulture,
      regulatoryEnvironment,
      infrastructure,
      investorAccess,
      customerAccess,
      age,
      coreSkill,
      industryYears,
      energyLevel,
      monthlyBurn,
      riskTolerance,
      hoursPerDay,
      deadline
    } = await req.json();

    if (!idea || !targetCustomer) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Default price if not provided
    const finalPrice = price || "Not specified";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build comprehensive founder context with geographic data
    const founderContext = `
FOUNDER PROFILE:
- Age Range: ${age || "Not specified"}
- Core Skill: ${coreSkill || "Not specified"}
- Industry Experience: ${industryYears || industryExperience || "Not specified"}
- Previous Business: ${previousBusiness || "None"}
- Energy Level: ${energyLevel || "Full-time"}
- Hours Per Day: ${hoursPerDay || "Not specified"}

CAPITAL & RISK:
- Available Budget: ${budget || "Not specified"}
- Monthly Burn Tolerance: ${monthlyBurn || "Not specified"}
- Risk Tolerance: ${riskTolerance || "Medium"}
- Timeline Expectation: ${deadline || "12 months"}

NETWORK:
- Investor Access: ${investorAccess || "None"}
- Customer Access: ${customerAccess || "Cold"}

GOAL & VISION:
- Ultimate Goal: ${goal || "Growth business"}
- Competitive Advantage: ${competitiveAdvantage || "Not specified"}
- Unique Insight: ${uniqueInsight || "Not specified"}
`;

    const geographicContext = `
GEOGRAPHIC & CULTURAL CONTEXT:
- Country: ${country || "Not specified"}
- State/Region: ${state || "Not specified"}
- City Tier: ${cityTier || "Not specified"}
- Market Maturity: ${marketMaturity || "Emerging"}
- Customer Location: ${customerLocation || "National"}
- Payment Infrastructure: ${paymentMaturity || "Digital-emerging"}
- Trust Culture: ${trustCulture || "Hybrid"}
- Regulatory Environment: ${regulatoryEnvironment || "Moderate"}
- Infrastructure Quality: ${infrastructure || "Good"}
`;

    const userContext = `
BUSINESS IDEA: ${idea}

TARGET CUSTOMER: ${targetCustomer}

PLANNED PRICE: ${finalPrice}

${founderContext}

${geographicContext}

PLATFORM/DELIVERY: ${platform || "Not specified"}

CURRENT STAGE: ${stage || "Just an idea"}

FOUNDER EXPERIENCE LEVEL: ${experience || "Not specified"}

Analyze with brutal honesty using patterns from 100,000+ successful and failed startups.
Apply the "friend who works at Goldman" test - tell the hard truth, not what they want to hear.
Consider all real-world factors including REGIONAL MARKET DYNAMICS, cultural trust patterns, 
local competition, payment behaviors, and infrastructure limitations.
Tailor your analysis and recommendations to this specific founder's background, budget, location, and goals.`;

    // Run all SIX specialist agents in PARALLEL
    console.log("🧠 Starting 100K CEO Pattern Multi-Agent Analysis with Regional Intelligence...");
    
    const [dopamineResult, moneyResult, amygdalaResult, ceoResult, uspResult, regionalResult] = await Promise.all([
      callAgent("DopamineDetective", agentPrompts.dopamineDetective, userContext, LOVABLE_API_KEY),
      callAgent("MoneyTrail", agentPrompts.moneyTrail, userContext, LOVABLE_API_KEY),
      callAgent("AmygdalaAudit", agentPrompts.amygdalaAudit, userContext, LOVABLE_API_KEY),
      callAgent("CEOPatternMatcher", agentPrompts.ceoPatternMatcher, userContext, LOVABLE_API_KEY),
      callAgent("USPGenerator", agentPrompts.uspGenerator, userContext, LOVABLE_API_KEY),
      callAgent("RegionalMarketAnalyst", agentPrompts.regionalMarketAnalyst, userContext, LOVABLE_API_KEY),
    ]);

    console.log("✅ All 6 agents completed, synthesizing verdict...");

    // Now synthesize the verdict with all agent findings including regional
    const synthesisPrompt = agentPrompts.verdictSynthesizer
      .replace("{dopamineAnalysis}", JSON.stringify(dopamineResult || {}))
      .replace("{moneyAnalysis}", JSON.stringify(moneyResult || {}))
      .replace("{amygdalaAnalysis}", JSON.stringify(amygdalaResult || {}))
      .replace("{ceoPatterns}", JSON.stringify(ceoResult || {}))
      .replace("{uspAnalysis}", JSON.stringify(uspResult || {}))
      .replace("{regionalAnalysis}", JSON.stringify(regionalResult || {}))
      .replace("{founderContext}", founderContext + geographicContext);

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
      hair_on_fire: dopamineResult?.hair_on_fire ?? false,
      willingness_to_pay: dopamineResult?.willingness_to_pay_signal || "moderate",
      existing_alternatives: dopamineResult?.existing_alternatives || [],
      why_alternatives_fail: dopamineResult?.why_alternatives_fail || "",
      emotional_vs_rational: dopamineResult?.emotional_vs_rational || "both",
      purchase_psychology: dopamineResult?.purchase_psychology || "",

      // Market Analysis (from Money Trail)
      market_analysis: {
        tam_estimate: moneyResult?.tam_estimate || "Requires research",
        sam_estimate: moneyResult?.sam_estimate || "",
        som_estimate: moneyResult?.som_estimate || "",
        tam_reasoning: moneyResult?.tam_reasoning || "",
        competitors: moneyResult?.competitors || [],
        competitive_advantage: moneyResult?.your_edge || "Not assessed",
        market_timing: moneyResult?.market_timing || "moderate",
        timing_reason: moneyResult?.timing_reason || "",
        market_maturity: moneyResult?.market_maturity || "growing",
        winner_take_all: moneyResult?.winner_take_all ?? false,
        blue_ocean: moneyResult?.blue_ocean ?? false,
        market_position: moneyResult?.market_position || "",
      },

      // Network Effects (from Money Trail)
      network_effects: moneyResult?.network_effects || null,

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
      switching_costs: amygdalaResult?.switching_costs || null,
      regulatory_concerns: amygdalaResult?.regulatory_concerns || null,
      legal_considerations: amygdalaResult?.legal_considerations || null,
      industry_barriers: amygdalaResult?.industry_barriers || null,

      // Execution Risks (from Amygdala Audit)
      execution_risks: amygdalaResult?.execution_risks || null,
      
      // Founder-Market Fit (from Amygdala Audit)
      founder_market_fit: amygdalaResult?.founder_market_fit || null,
      
      // Distribution (from Amygdala Audit)
      distribution_channels: amygdalaResult?.distribution_channels || null,

      // Neuroscience Layer
      neuroscience: {
        dopamine_triggers: dopamineResult?.dopamine_triggers || [],
        oxytocin_factors: amygdalaResult?.oxytocin_factors || [],
        cortisol_urgency: amygdalaResult?.cortisol_urgency || [],
        risk: amygdalaResult?.risk_level || "medium",
        trust_difficulty: amygdalaResult?.trust_difficulty || "medium",
      },

      // CEO Pattern Analysis (from CEO Pattern Matcher)
      ceo_patterns: {
        pattern_matches: ceoResult?.pattern_matches || null,
        yc_pattern_match: ceoResult?.yc_pattern_match || null,
        anti_patterns: ceoResult?.anti_patterns_detected || [],
        founder_archetype: ceoResult?.founder_profile_analysis?.archetype || "operator",
        founder_profile_analysis: ceoResult?.founder_profile_analysis || null,
        scalability: {
          score: ceoResult?.scalability_score || 5,
          bottlenecks: ceoResult?.scalability_bottlenecks || [],
        },
        exit_potential: ceoResult?.exit_potential || null,
        pivot_risk: ceoResult?.pivot_risk || null,
      },

      // USP & Positioning (from USP Generator)
      usp_analysis: {
        personalized_usp: uspResult?.personalized_usp || null,
        tagline_options: uspResult?.tagline_options || [],
        story_framework: uspResult?.story_framework || null,
        credibility_anchors: uspResult?.credibility_anchors || [],
        positioning_statement: uspResult?.positioning_statement || null,
        brand_dna: uspResult?.brand_dna || null,
        differentiation_matrix: uspResult?.differentiation_matrix || [],
      },

      // Regional Analysis (from Regional Market Analyst - NEW)
      regional_analysis: {
        regional_viability_score: regionalResult?.regional_viability_score || 5,
        cultural_fit_analysis: regionalResult?.cultural_fit_analysis || null,
        local_market_psychology: regionalResult?.local_market_psychology || null,
        localization_requirements: regionalResult?.localization_requirements || [],
        pricing_recommendations: regionalResult?.pricing_recommendations || null,
        distribution_strategy: regionalResult?.distribution_strategy || null,
        regulatory_checklist: regionalResult?.regulatory_checklist || [],
        infrastructure_dependencies: regionalResult?.infrastructure_dependencies || [],
        local_competitor_map: regionalResult?.local_competitor_map || [],
        cultural_insights: regionalResult?.cultural_insights || [],
        trust_signals_needed: regionalResult?.trust_signals_needed || [],
        buying_behavior: regionalResult?.buying_behavior || null,
        local_market_timing: regionalResult?.local_market_timing || "moderate",
        expansion_path: regionalResult?.expansion_path || null,
        localization_cost_estimate: regionalResult?.localization_cost_estimate || "medium",
        local_success_factors: regionalResult?.local_success_factors || [],
      },
      
      // Founder's geographic context
      geographic_context: {
        country: country || null,
        state: state || null,
        cityTier: cityTier || null,
        marketMaturity: marketMaturity || null,
      },

      // Verdict (from Synthesizer)
      confidence_score: verdictResult?.confidence_score || 50,
      verdict: verdictResult?.verdict || "PIVOT",
      verdict_probability: verdictResult?.verdict_probability || null,
      verdict_reasoning: verdictResult?.verdict_reasoning || "Further validation needed",
      executive_bullets: verdictResult?.executive_bullets || [],
      key_metrics: verdictResult?.key_metrics || [],
      risk_opportunity_balance: verdictResult?.risk_opportunity_balance || null,
      bottom_line: verdictResult?.bottom_line || null,
      one_liner: verdictResult?.one_liner || "",
      eli8_summary: verdictResult?.eli8_summary || "",
      success_probability: verdictResult?.success_probability || "Unknown",
      failure_modes: verdictResult?.failure_modes || [],
      timeline_to_revenue: verdictResult?.timeline_to_revenue || null,
      founder_fit_questions: verdictResult?.founder_fit_questions || [],
      founder_specific_advice: verdictResult?.founder_specific_advice || "",
      what_would_change_verdict: verdictResult?.what_would_change_verdict || [],
      recommended_reading: verdictResult?.recommended_reading || [],
      similar_founders: verdictResult?.similar_successful_founders || [],
      risk_mitigation_plan: verdictResult?.risk_mitigation_plan || [],
      personalized_blueprint: verdictResult?.personalized_blueprint || null,
      immediate_plan: verdictResult?.immediate_plan || [
        { day: "Day 1", action: "Talk to 5 potential customers", goal: "Validate core pain point" },
        { day: "Day 3", action: "Create landing page", goal: "Test messaging and collect emails" },
        { day: "Week 1", action: "Get 10 email signups", goal: "Prove initial interest" },
        { day: "Week 2", action: "Conduct pre-sales", goal: "Get 3 paying customers" },
        { day: "Month 1", action: "Build MVP if validated", goal: "Launch to first cohort" },
      ],
      pivot_suggestions: verdictResult?.pivot_suggestions || null,
      key_assumptions: verdictResult?.key_assumptions || [],
      dealbreakers: verdictResult?.dealbreakers || [],
      unfair_advantages_needed: verdictResult?.unfair_advantages_needed || [],

      // Meta info
      analysis_agents: ["Dopamine Detective", "Money Trail", "Amygdala Audit", "CEO Pattern Matcher", "USP Generator", "Regional Market Analyst", "Verdict Synthesizer"],
      analysis_version: "4.0-regional-intelligence",
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
