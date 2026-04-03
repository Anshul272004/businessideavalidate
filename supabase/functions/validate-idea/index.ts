import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ═══════ INPUT VALIDATION ═══════
function sanitizeInput(input: string, maxLength: number): string {
  if (!input || typeof input !== "string") return "";
  // Strip HTML tags and trim
  return input.replace(/<[^>]*>/g, "").trim().slice(0, maxLength);
}

const VALID_ENUMS: Record<string, string[]> = {
  platform: ["digital", "physical", "hybrid"],
  stage: ["concept", "validated", "mvp", "revenue"],
  cityTier: ["metro", "tier-1", "tier-2", "tier-3", "rural"],
  marketMaturity: ["nascent", "emerging", "developed", "saturated"],
  customerLocation: ["local", "national", "global"],
  paymentMaturity: ["cash-heavy", "digital-emerging", "digital-first"],
  trustCulture: ["relationship", "transaction", "hybrid"],
  regulatoryEnvironment: ["light", "moderate", "heavy", "uncertain"],
  infrastructure: ["excellent", "good", "developing", "challenging"],
  age: ["under-25", "25-35", "35-45", "45-plus"],
  coreSkill: ["technical", "sales", "operations", "content", "generalist"],
  industryYears: ["0-2", "2-5", "5-10", "10-plus"],
  energyLevel: ["side-project", "part-time", "full-time", "obsessed"],
  previousBusiness: ["none", "failed", "small-exit", "big-exit"],
  budget: ["zero", "under-50k", "50k-200k", "200k-plus"],
  monthlyBurn: ["under-5k", "5k-15k", "15k-50k", "50k-plus"],
  riskTolerance: ["low", "medium", "high"],
  hoursPerDay: ["1-2", "4-6", "8-plus", "all-waking"],
  deadline: ["fast-money", "12-months", "long-term"],
  investorAccess: ["none", "angels", "vcs", "institutional"],
  customerAccess: ["cold", "warm", "hot", "existing"],
  goal: ["lifestyle", "agency", "saas", "venture", "acquisition"],
};

function validateEnum(value: string | undefined, field: string): string {
  if (!value) return "";
  const allowed = VALID_ENUMS[field];
  if (allowed && !allowed.includes(value)) return "";
  return value;
}

// ═══════ RATE LIMITING ═══════
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 }); // 1 hour
    return true;
  }
  if (limit.count >= 5) return false;
  limit.count++;
  return true;
}

// ═══════ AGENT PROMPTS ═══════
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
3. **Market Timing** - Is now the right time?
4. **Network Effects Potential** - Does the product get better with more users?
5. **Pricing Psychology** - Anchoring, decoy effect, value-based pricing
6. **Unit Economics Deep Dive** - CAC, LTV, margins, payback period, contribution margin
7. **Revenue Model Fit** - Which model fits best?
8. **Winner-Take-All Dynamics** - Is this market prone to monopoly?

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
    "ltv_cac_ratio": "X:1",
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
8. **Anti-Patterns** - Warning signs from failed startups

FOUNDER PROFILE ANALYSIS:
Based on the founder's background, experience, budget, goals, and previous business history, analyze:
- How their unique background creates unfair advantages
- What blind spots they might have
- Similar successful founders with matching profiles

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
    "similar_successful_founders": ["founder who matches profile"],
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
  "personalized_usp": "One sentence that captures unique value",
  "tagline_options": ["option1", "option2", "option3"],
  "story_framework": {
    "hook": "Opening that grabs attention",
    "struggle": "The problem they personally experienced",
    "insight": "The unique insight they discovered",
    "solution": "How their solution is different",
    "vision": "The bigger picture"
  },
  "credibility_anchors": ["What from their background builds trust"],
  "positioning_statement": "For [target] who [need], [product] is the [category] that [benefit]",
  "brand_dna": {
    "values": ["value1", "value2", "value3"],
    "personality": "How the brand should feel",
    "voice": "How to communicate"
  },
  "differentiation_matrix": [
    {"vs_competitor": "competitor name", "your_advantage": "why you win"}
  ]
}`,

  regionalMarketAnalyst: `You are the "Regional Market Analyst" - expert in geographic and cultural market dynamics.
Analyze based on the founder's specific location and target market:

1. **Local Market Psychology** - How do people in this region make buying decisions?
2. **Cultural Trust Factors** - What proof points work in this culture?
3. **Payment Behavior** - How do customers prefer to pay?
4. **Competition Dynamics** - Local vs global competitor positioning
5. **Regulatory Environment** - Country/state specific rules and compliance
6. **Infrastructure Reality** - Internet, logistics, banking, talent availability
7. **Pricing Localization** - What price points work in this market?
8. **Distribution Channels** - What channels work in this geography?

Return ONLY a JSON object:
{
  "regional_viability_score": number 1-100,
  "market_psychology": {
    "decision_style": "relationship-based" | "transaction-based" | "hybrid",
    "trust_signals_needed": ["what builds trust in this market"],
    "buying_triggers": ["what makes people buy here"],
    "price_sensitivity": "high" | "medium" | "low",
    "brand_vs_price": "brand-loyal" | "price-driven" | "value-seeking"
  },
  "cultural_fit_analysis": {
    "score": number 1-10,
    "alignment_factors": ["factor1", "factor2"],
    "friction_factors": ["friction1", "friction2"],
    "adaptation_needed": ["what to change for this market"]
  },
  "payment_landscape": {
    "preferred_methods": ["method1", "method2"],
    "fintech_maturity": "nascent" | "emerging" | "developed",
    "subscription_readiness": "high" | "medium" | "low",
    "recommended_pricing_model": "recommendation based on local behavior"
  },
  "localization_requirements": ["requirement1", "requirement2"],
  "pricing_recommendations": {
    "local_price_range": "$X-Y in local context",
    "purchasing_power_adjustment": "X% vs US pricing",
    "premium_viability": boolean,
    "discount_culture": "heavy" | "moderate" | "minimal"
  },
  "distribution_strategy": {
    "primary_channels": ["channel1", "channel2"],
    "acquisition_tactics": ["tactic1", "tactic2"],
    "viral_potential": "high" | "medium" | "low",
    "offline_required": boolean
  },
  "regulatory_checklist": ["compliance item 1", "compliance item 2"],
  "infrastructure_dependencies": {
    "internet_reliability": "excellent" | "good" | "moderate" | "poor",
    "logistics_quality": "excellent" | "good" | "moderate" | "poor",
    "talent_availability": "abundant" | "moderate" | "scarce",
    "key_infrastructure_risks": ["risk1", "risk2"]
  },
  "local_competitor_map": [
    {"name": "competitor", "strength": "what they do well", "weakness": "opportunity"}
  ],
  "regional_success_probability": "X% adjusted for regional factors",
  "go_to_market_timeline_adjustment": "faster" | "same" | "slower" | "much slower",
  "regional_pivot_suggestions": ["suggestion based on local market reality"]
}`,

  cognitivebiasAnalyst: `You are the "Cognitive Bias Analyst" - expert in human psychology and decision-making biases.
Analyze how cognitive biases affect both the FOUNDER's decision-making and the TARGET CUSTOMER's buying behavior:

FOUNDER BIAS ANALYSIS:
1. **Confirmation Bias** - Is founder only seeing evidence that supports their idea?
2. **Sunk Cost Fallacy** - Are they too invested to see reality?
3. **Dunning-Kruger Effect** - Do they overestimate their competence in key areas?
4. **Survivorship Bias** - Are they only looking at successful examples?
5. **Optimism Bias** - Are projections unrealistic?
6. **IKEA Effect** - Are they overvaluing their creation?
7. **Anchoring Bias** - Are they stuck on initial assumptions?
8. **Bandwagon Effect** - Are they chasing trends without validation?

CUSTOMER PSYCHOLOGY:
1. **Loss Aversion** - Can this product prevent loss? (2x more powerful than gains)
2. **Social Proof Dependency** - How much do customers need others' validation?
3. **Authority Bias** - Will expert endorsements drive adoption?
4. **Scarcity Effect** - Can urgency/exclusivity drive purchases?
5. **Status Quo Bias** - How hard is it to change behavior?
6. **Reciprocity Principle** - Can free value drive conversion?

PERSUASION PSYCHOLOGY:
1. **Cialdini's Principles** - Which apply? (reciprocity, scarcity, authority, consistency, liking, consensus)
2. **Jobs-to-be-Done** - What functional, emotional, social jobs does this do?

Return ONLY a JSON object:
{
  "founder_bias_warnings": [
    {"bias": "bias name", "severity": "critical" | "warning" | "minor", "evidence": "why this might apply", "mitigation": "how to counteract"}
  ],
  "founder_reality_score": number 1-10,
  "blind_spot_analysis": "Summary of what founder might be missing",
  "customer_psychology": {
    "primary_motivator": "fear" | "desire" | "status" | "convenience" | "belonging",
    "decision_speed": "impulse" | "considered" | "committee" | "lengthy",
    "emotional_triggers": ["trigger1", "trigger2"],
    "rational_justifications": ["justification1", "justification2"],
    "objection_patterns": ["objection1", "objection2"]
  },
  "persuasion_leverage": {
    "strongest_principles": ["cialdini principle 1", "principle 2"],
    "recommended_tactics": ["tactic1", "tactic2"],
    "trust_building_sequence": ["step1", "step2", "step3"],
    "conversion_psychology": "How to move from interest to purchase"
  },
  "loss_aversion_angle": "What loss can this product prevent?",
  "social_proof_strategy": {
    "proof_types_needed": ["testimonial", "case study", "numbers"],
    "early_adopter_profile": "Who will buy first and why",
    "viral_coefficient_potential": number 0-3
  },
  "jobs_to_be_done": {
    "functional": "What practical job does this do?",
    "emotional": "How does this make them feel?",
    "social": "How does this make them look to others?"
  },
  "behavioral_barriers": ["barrier1", "barrier2"],
  "behavioral_enablers": ["enabler1", "enabler2"],
  "neuromarketing_insights": {
    "dopamine_triggers": ["anticipation", "novelty", "reward patterns"],
    "oxytocin_builders": ["trust signals", "community", "shared values"],
    "cortisol_reducers": ["risk reversal", "guarantees", "social proof"]
  },
  "bias_adjusted_success_probability": "X% after accounting for founder biases"
}`,

  macroEnvironmentAnalyst: `You are the "Macro Environment Analyst" - an expert in global macroeconomic factors that directly impact startup viability.
Analyze the current (2026) global economic landscape and how it specifically affects this business idea.

Evaluate:
1. **Economic Climate**: GDP trends, inflation rates, interest rates, recession risk in the target market
2. **Geopolitical Factors**: Trade wars, sanctions, regional conflicts affecting supply chains or market access
3. **Currency & Forex Impact**: Exchange rate risks for cross-border businesses
4. **Regulatory Shifts**: Government policy changes, tax reforms, industry-specific regulations
5. **Technology Disruption Risk**: AI displacement, platform shifts that could make this obsolete
6. **Supply Chain Vulnerabilities**: Global dependencies, manufacturing bottlenecks
7. **Consumer Spending Trends**: Discretionary vs essential spending shifts, consumer confidence
8. **Labor Market Dynamics**: Hiring difficulty, remote work trends, wage inflation
9. **Energy & Resource Costs**: Impact on operational costs and margins
10. **Black Swan Preparedness**: How resilient is this business to unexpected global shocks

Return ONLY a JSON object:
{
  "macro_risk_score": number 0-100 (100 = very favorable macro conditions),
  "economic_climate_summary": "2-3 sentence summary of current macro conditions for this business",
  "favorable_factors": ["tailwind 1", "tailwind 2", "tailwind 3"],
  "headwind_factors": ["headwind 1", "headwind 2", "headwind 3"],
  "recession_resilience": "strong" | "moderate" | "weak",
  "inflation_sensitivity": "low" | "moderate" | "high",
  "geopolitical_exposure": "minimal" | "moderate" | "significant",
  "supply_chain_risk": "low" | "moderate" | "high",
  "technology_disruption_risk": "low" | "moderate" | "high",
  "labor_market_impact": "favorable" | "neutral" | "challenging",
  "energy_cost_impact": "minimal" | "moderate" | "significant",
  "black_swan_preparedness": "resilient" | "moderate" | "vulnerable",
  "hedging_strategies": ["strategy 1", "strategy 2", "strategy 3"]
}`,

  verdictSynthesizer: `You are the "Verdict Synthesizer" - the final arbiter synthesizing all agent analyses.
Given findings from our 8 specialist agents:

DOPAMINE DETECTIVE: {dopamineAnalysis}
MONEY TRAIL: {moneyAnalysis}
AMYGDALA AUDIT: {amygdalaAnalysis}
CEO PATTERN MATCHER: {ceoPatterns}
USP GENERATOR: {uspAnalysis}
REGIONAL MARKET ANALYST: {regionalAnalysis}
COGNITIVE BIAS ANALYST: {biasAnalysis}
MACRO ENVIRONMENT ANALYST: {macroAnalysis}

FOUNDER CONTEXT: {founderContext}

Synthesize a final verdict. Be BRUTALLY HONEST like a top-tier VC who has seen 10,000 pitches.

WEIGHT FACTORS BASED ON FOUNDER'S CONTEXT:
- If in emerging market: Weight regional factors 30%, adapt pricing expectations
- If LIFESTYLE business: Weight pain/demand (50%), execution feasibility (30%), unit economics (20%)
- If GROWTH business: Weight market size (40%), unit economics (30%), execution (30%)
- If UNICORN potential: Weight market size (30%), network effects (25%), timing (25%), team (20%)
- ALWAYS factor macro-economic conditions — even great ideas fail in terrible macro climates

BIAS ADJUSTMENT:
- Factor in founder bias warnings to adjust confidence scores
- Highlight if founder optimism may be inflating projections
- Factor macro headwinds/tailwinds into success probability
- Provide reality-adjusted success probability

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
  "bias_adjusted_verdict": {
    "raw_score": number,
    "bias_penalty": number,
    "adjusted_score": number,
    "explanation": "How founder biases affected the score"
  },
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
  "eli8_summary": "Explain to an 8-year-old why this will/won't work",
  "one_liner": "One sentence core insight",
  "personalized_blueprint": {
    "phase_1": {"title": "Phase name", "duration": "X weeks", "actions": ["action1", "action2"], "budget_needed": "$X", "goal": "What success looks like"},
    "phase_2": {"title": "Phase name", "duration": "X weeks", "actions": ["action1", "action2"], "budget_needed": "$X", "goal": "What success looks like"},
    "phase_3": {"title": "Phase name", "duration": "X weeks", "actions": ["action1", "action2"], "budget_needed": "$X", "goal": "What success looks like"},
    "phase_4": {"title": "Phase name", "duration": "X months", "actions": ["action1", "action2"], "budget_needed": "$X", "goal": "What success looks like"}
  },
  "immediate_plan": [
    {"day": "Day 1", "action": "specific action", "goal": "what success looks like"},
    {"day": "Day 3", "action": "specific action", "goal": "what success looks like"},
    {"day": "Week 1", "action": "specific action", "goal": "what success looks like"},
    {"day": "Week 2", "action": "specific action", "goal": "what success looks like"},
    {"day": "Month 1", "action": "specific action", "goal": "what success looks like"}
  ],
  "pivot_suggestions": ["suggestion 1", "suggestion 2"] | null,
  "what_would_change_verdict": ["factor that would upgrade/downgrade the verdict"],
  "key_assumptions": ["assumption to validate 1", "assumption 2"],
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
  "founder_specific_advice": "2-3 sentences specific to their background",
  "founder_fit_questions": ["Deep question 1", "Deep question 2", "Deep question 3"],
  "recommended_reading": ["Book or resource 1", "Book or resource 2"],
  "similar_successful_founders": ["Founder who did something similar"],
  "risk_mitigation_plan": ["How to reduce biggest risk 1", "How to reduce biggest risk 2"]
}`
};

async function callAgent(
  agentName: string,
  prompt: string,
  userContext: string,
  apiKey: string
): Promise<any> {
  console.log(`[Agent] Starting ${agentName}...`);
  
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
    console.error(`[Agent] ${agentName} failed with status ${status}`);
    throw new Error(`Agent failed: ${status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";
  
  try {
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
    console.log(`[Agent] ${agentName} completed successfully`);
    return JSON.parse(jsonStr);
  } catch {
    console.error(`[Agent] Failed to parse ${agentName} response`);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ═══════ AUTHENTICATION ═══════
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("[Security] Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Authentication required. Please sign in." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      console.log("[Security] Invalid or expired token");
      return new Response(
        JSON.stringify({ error: "Invalid or expired session. Please sign in again." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log(`[Auth] Authenticated user: ${userId}`);

    // ═══════ RATE LIMITING (per-user + per-IP) ═══════
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    // Rate limit by user ID (more reliable than IP)
    if (!checkRateLimit(userId)) {
      console.log(`[Security] Rate limit exceeded for user ${userId}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    // Also check IP to prevent multi-account abuse
    if (!checkRateLimit(clientIP)) {
      console.log(`[Security] Rate limit exceeded for IP ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();

    // ═══════ VALIDATE & SANITIZE ALL INPUTS ═══════
    const idea = sanitizeInput(body.idea, 2000);
    const problem = sanitizeInput(body.problem, 1200);
    const solution = sanitizeInput(body.solution, 1200);
    const targetCustomer = sanitizeInput(body.targetCustomer, 1000);
    const targetSegment = sanitizeInput(body.targetSegment, 240);
    const industry = sanitizeInput(body.industry, 180);
    const revenueModel = sanitizeInput(body.revenueModel, 120);
    const price = sanitizeInput(body.price, 20);
    const uniqueInsight = sanitizeInput(body.uniqueInsight, 500);
    const competitiveAdvantage = sanitizeInput(body.competitiveAdvantage, 500);
    const country = sanitizeInput(body.country, 100);
    const state = sanitizeInput(body.state, 100);

    // Validate enums
    const platform = validateEnum(body.platform, "platform");
    const stage = validateEnum(body.stage, "stage");
    const cityTier = validateEnum(body.cityTier, "cityTier");
    const marketMaturity = validateEnum(body.marketMaturity, "marketMaturity");
    const customerLocation = validateEnum(body.customerLocation, "customerLocation");
    const paymentMaturity = validateEnum(body.paymentMaturity, "paymentMaturity");
    const trustCulture = validateEnum(body.trustCulture, "trustCulture");
    const regulatoryEnvironment = validateEnum(body.regulatoryEnvironment, "regulatoryEnvironment");
    const infrastructure = validateEnum(body.infrastructure, "infrastructure");
    const age = validateEnum(body.age, "age");
    const coreSkill = validateEnum(body.coreSkill, "coreSkill");
    const industryYears = validateEnum(body.industryYears, "industryYears");
    const energyLevel = validateEnum(body.energyLevel, "energyLevel");
    const previousBusiness = validateEnum(body.previousBusiness, "previousBusiness");
    const budget = validateEnum(body.budget, "budget");
    const monthlyBurn = validateEnum(body.monthlyBurn, "monthlyBurn");
    const riskTolerance = validateEnum(body.riskTolerance, "riskTolerance");
    const hoursPerDay = validateEnum(body.hoursPerDay, "hoursPerDay");
    const deadline = validateEnum(body.deadline, "deadline");
    const investorAccess = validateEnum(body.investorAccess, "investorAccess");
    const customerAccess = validateEnum(body.customerAccess, "customerAccess");
    const goal = validateEnum(body.goal, "goal");

    if (!idea || !targetCustomer) {
      return new Response(
        JSON.stringify({ error: "Business idea and target customer are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const finalPrice = price || "Not specified";
    const finalRevenueModel = revenueModel || "Not specified";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("[Config] LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Analysis service is temporarily unavailable." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build comprehensive context
    const founderContext = `
FOUNDER PROFILE:
- Age Range: ${age || "Not specified"}
- Core Skill: ${coreSkill || "Not specified"}
- Industry Experience: ${industryYears || "Not specified"}
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
STRUCTURED STARTUP BRIEF:
- Idea: ${idea}
- Problem: ${problem || "Not specified"}
- Solution: ${solution || "Not specified"}
- Target Customer: ${targetCustomer}
- Target Segment: ${targetSegment || "Not specified"}
- Industry: ${industry || "Not specified"}
- Planned Revenue Model: ${finalRevenueModel}
- Planned Price: ${finalPrice}

${founderContext}

${geographicContext}

PLATFORM/DELIVERY: ${platform || "Not specified"}

CURRENT STAGE: ${stage || "Just an idea"}

Analyze with brutal honesty using patterns from 100,000+ successful and failed startups.
Consider all real-world factors including REGIONAL MARKET DYNAMICS, cultural trust patterns, 
local competition, payment behaviors, and infrastructure limitations.
Tailor analysis to this specific founder's background, budget, location, goals, and business model.`;

    // Run all 7 specialist agents in PARALLEL
    console.log("[Analysis] Starting 7-Agent Multi-Dimensional Analysis...");
    
    const [dopamineResult, moneyResult, amygdalaResult, ceoResult, uspResult, regionalResult, biasResult] = await Promise.all([
      callAgent("DopamineDetective", agentPrompts.dopamineDetective, userContext, LOVABLE_API_KEY),
      callAgent("MoneyTrail", agentPrompts.moneyTrail, userContext, LOVABLE_API_KEY),
      callAgent("AmygdalaAudit", agentPrompts.amygdalaAudit, userContext, LOVABLE_API_KEY),
      callAgent("CEOPatternMatcher", agentPrompts.ceoPatternMatcher, userContext, LOVABLE_API_KEY),
      callAgent("USPGenerator", agentPrompts.uspGenerator, userContext, LOVABLE_API_KEY),
      callAgent("RegionalMarketAnalyst", agentPrompts.regionalMarketAnalyst, userContext, LOVABLE_API_KEY),
      callAgent("CognitiveBiasAnalyst", agentPrompts.cognitivebiasAnalyst, userContext, LOVABLE_API_KEY),
    ]);

    console.log("[Analysis] All 7 agents completed, synthesizing verdict...");

    // Synthesize with all agent findings
    const synthesisPrompt = agentPrompts.verdictSynthesizer
      .replace("{dopamineAnalysis}", JSON.stringify(dopamineResult || {}))
      .replace("{moneyAnalysis}", JSON.stringify(moneyResult || {}))
      .replace("{amygdalaAnalysis}", JSON.stringify(amygdalaResult || {}))
      .replace("{ceoPatterns}", JSON.stringify(ceoResult || {}))
      .replace("{uspAnalysis}", JSON.stringify(uspResult || {}))
      .replace("{regionalAnalysis}", JSON.stringify(regionalResult || {}))
      .replace("{biasAnalysis}", JSON.stringify(biasResult || {}))
      .replace("{founderContext}", founderContext + geographicContext);

    const verdictResult = await callAgent("VerdictSynthesizer", synthesisPrompt, userContext, LOVABLE_API_KEY);

    // Combine all results
    const finalResult = {
      startup_brief: {
        idea,
        problem: problem || null,
        solution: solution || null,
        target_customer: targetCustomer,
        target_segment: targetSegment || null,
        industry: industry || null,
        revenue_model: moneyResult?.revenue_model || revenueModel || null,
        price_point: finalPrice,
        platform: platform || null,
        stage: stage || null,
      },
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
      },

      network_effects: moneyResult?.network_effects || null,
      unit_economics: moneyResult?.unit_economics || null,
      revenue_model: moneyResult?.revenue_model || revenueModel || "subscription",

      pricing_psychology: {
        fair: true,
        suggested: moneyResult?.suggested_price || `$${price}`,
        reason: moneyResult?.price_reasoning || "Based on market analysis",
        anchor_strategy: moneyResult?.anchor_strategy || "Consider tiered pricing",
      },

      buying_friction: amygdalaResult?.buying_friction || ["Needs validation"],
      trust_barriers: amygdalaResult?.trust_barriers || [],
      objection_handling: amygdalaResult?.objection_handling || [],
      switching_costs: amygdalaResult?.switching_costs || null,
      regulatory_concerns: amygdalaResult?.regulatory_concerns || null,
      legal_considerations: amygdalaResult?.legal_considerations || null,
      industry_barriers: amygdalaResult?.industry_barriers || null,
      execution_risks: amygdalaResult?.execution_risks || null,
      founder_market_fit: amygdalaResult?.founder_market_fit || null,
      distribution_channels: amygdalaResult?.distribution_channels || null,

      neuroscience: {
        dopamine_triggers: dopamineResult?.dopamine_triggers || [],
        oxytocin_factors: amygdalaResult?.oxytocin_factors || [],
        cortisol_urgency: amygdalaResult?.cortisol_urgency || [],
        risk: amygdalaResult?.risk_level || "medium",
        trust_difficulty: amygdalaResult?.trust_difficulty || "medium",
      },

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

      usp_analysis: {
        personalized_usp: uspResult?.personalized_usp || null,
        tagline_options: uspResult?.tagline_options || [],
        story_framework: uspResult?.story_framework || null,
        credibility_anchors: uspResult?.credibility_anchors || [],
        positioning_statement: uspResult?.positioning_statement || null,
        brand_dna: uspResult?.brand_dna || null,
        differentiation_matrix: uspResult?.differentiation_matrix || [],
      },

      regional_analysis: {
        regional_viability_score: regionalResult?.regional_viability_score || 50,
        cultural_fit_analysis: regionalResult?.cultural_fit_analysis || null,
        local_market_psychology: regionalResult?.market_psychology || null,
        localization_requirements: regionalResult?.localization_requirements || [],
        pricing_recommendations: regionalResult?.pricing_recommendations || null,
        distribution_strategy: regionalResult?.distribution_strategy || null,
        regulatory_checklist: regionalResult?.regulatory_checklist || [],
        infrastructure_dependencies: regionalResult?.infrastructure_dependencies || null,
        local_competitor_map: regionalResult?.local_competitor_map || [],
        regional_success_probability: regionalResult?.regional_success_probability || null,
        payment_landscape: regionalResult?.payment_landscape || null,
      },
      
      geographic_context: {
        country: country || null,
        state: state || null,
        cityTier: cityTier || null,
        marketMaturity: marketMaturity || null,
      },

      // Cognitive Bias Analysis
      cognitive_bias_analysis: {
        founder_bias_warnings: biasResult?.founder_bias_warnings || [],
        founder_reality_score: biasResult?.founder_reality_score || 5,
        blind_spot_analysis: biasResult?.blind_spot_analysis || null,
        customer_psychology: biasResult?.customer_psychology || null,
        persuasion_leverage: biasResult?.persuasion_leverage || null,
        loss_aversion_angle: biasResult?.loss_aversion_angle || null,
        social_proof_strategy: biasResult?.social_proof_strategy || null,
        jobs_to_be_done: biasResult?.jobs_to_be_done || null,
        neuromarketing_insights: biasResult?.neuromarketing_insights || null,
        bias_adjusted_success_probability: biasResult?.bias_adjusted_success_probability || null,
      },

      // Verdict
      confidence_score: verdictResult?.confidence_score || 50,
      verdict: verdictResult?.verdict || "PIVOT",
      verdict_probability: verdictResult?.verdict_probability || null,
      verdict_reasoning: verdictResult?.verdict_reasoning || "Further validation needed",
      executive_bullets: verdictResult?.executive_bullets || [],
      key_metrics: verdictResult?.key_metrics || [],
      risk_opportunity_balance: verdictResult?.risk_opportunity_balance || null,
      bottom_line: verdictResult?.bottom_line || null,
      bias_adjusted_verdict: verdictResult?.bias_adjusted_verdict || null,
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

      analysis_agents: [
        "Dopamine Detective", "Money Trail", "Amygdala Audit", 
        "CEO Pattern Matcher", "USP Generator", "Regional Market Analyst", 
        "Cognitive Bias Analyst", "Verdict Synthesizer"
      ],
      analysis_version: "5.0-cognitive-bias-security",
    };

    console.log("[Analysis] Complete. Verdict:", finalResult.verdict, "Score:", finalResult.confidence_score);

    return new Response(JSON.stringify(finalResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[Error] Validation error:", error);
    
    if (error instanceof Error) {
      if (error.message === "429") {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (error.message === "402") {
        return new Response(
          JSON.stringify({ error: "Service credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }
    
    // Generic error — never expose internal details
    return new Response(
      JSON.stringify({ error: "Analysis failed. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
