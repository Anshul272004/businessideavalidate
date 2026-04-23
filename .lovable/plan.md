

# Fix Build + Ultra-Luxury Polish + Expanded Real-World Factors

## Part 1: Fix Build Error (Critical)

`src/pages/Result.tsx` imports `@/components/result/MacroEnvironment` but the file was never written to disk. Build fails.

**Create `src/components/result/MacroEnvironment.tsx`** — premium gold/obsidian card displaying:
- Macro Risk Score gauge (0–100)
- Recession Resilience indicator (low/medium/high with color coding)
- Inflation Sensitivity meter
- Geopolitical Exposure rating
- Two-column tailwinds (favorable_factors) vs headwinds (headwind_factors)
- Supply chain dependency assessment
- Recommended macro-hedging strategies list
- Built with framer-motion reveal, Cormorant Garamond heading, gold accent borders, glassmorphism

## Part 2: Ultra-Luxury UI Polish (Apple/Samsung Tier)

Reference inspiration: refined editorial luxury — generous whitespace, restrained motion, hairline 1px borders, deep obsidian + warm gold (#AD8B3A), champagne gradients only at focal points.

**Refine `src/index.css`:**
- Add `.luxury-hairline` (1px gold-tinted border at 8% opacity)
- Add `.luxury-grain` (very subtle SVG noise overlay for premium texture)
- Add `.text-editorial` (tight letter-spacing, Cormorant Garamond, large display sizes)
- Refine `.premium-card` — softer shadow, hairline border, 16% gold hover glow
- Refine `.glass` — warmer undertone (gold tint at 3%)
- Slow all transitions to 280–300ms with `cubic-bezier(0.16, 1, 0.3, 1)` (Apple ease)

**Polish remaining pages to match landing-tier quality:**
- `src/pages/Auth.tsx` — center-stage glass card on obsidian, Cormorant heading, gold CTA, hairline divider for OAuth
- `src/pages/Dashboard.tsx` — editorial header with serif, refined tab bar, glass stat cards with subtle gold accent rings
- `src/pages/Pricing.tsx` — large editorial headline, three glass plans with hairline borders, middle plan elevated with gold ring + champagne gradient
- `src/pages/Input.tsx` — focused single-column form, large serif heading, generous spacing, gold-glow focus states on inputs
- `src/pages/CaseStudies.tsx` — magazine-style layout with serif headlines, asymmetric grid
- `src/pages/Methodology.tsx` — editorial timeline, gold numerals, generous line-height
- `src/pages/WhoThisIsNotFor.tsx` — minimal manifesto-style typography
- `src/pages/Loading.tsx` — already shows 9 agents; polish with gold shimmer and slower reveal cadence

## Part 3: Expand Real-World Factors in Analysis

**Update `supabase/functions/validate-idea/index.ts`** — extend the Macro Environment Analyst prompt to evaluate **additional real-world factors** that directly impact business success:

1. **Climate & Environmental Risk** — extreme weather, ESG pressure, carbon costs
2. **Pandemic & Health System Resilience** — health-shock vulnerability, remote-work durability
3. **Demographic Shifts** — aging population, Gen-Z spending, urbanization
4. **AI Disruption Risk** — likelihood of being replaced or augmented by AI in 2–5 yrs
5. **Energy & Commodity Price Volatility** — oil, electricity, raw materials exposure
6. **Cybersecurity & Data Sovereignty Risk** — breach exposure, cross-border data laws
7. **Cultural & Social Trends** — values shifts, generational preference changes
8. **Talent War Index** — hiring difficulty in target geography/role
9. **Regulatory Whiplash** — likelihood of sudden policy reversal
10. **Black Swan Preparedness** — already present; keep

Returns expanded JSON with: `macro_risk_score`, `recession_resilience`, `inflation_sensitivity`, `geopolitical_exposure`, `climate_risk`, `ai_disruption_risk`, `demographic_alignment`, `cyber_risk`, `talent_difficulty`, `regulatory_volatility`, `favorable_factors[]`, `headwind_factors[]`, `hedging_strategies[]`, `black_swan_resilience`.

Update the **Verdict Synthesizer** to weight these new factors into the final probability (cap macro impact at ~25% to prevent overshadowing core signals).

**Update `MacroEnvironment.tsx`** to render the expanded fields in organized sub-sections (Economic / Geopolitical / Tech & AI / Climate & Society / Operational).

## Files Summary

**New (1):**
- `src/components/result/MacroEnvironment.tsx` ← fixes build immediately

**Modified (10):**
- `src/index.css` — luxury utilities + Apple-ease transitions
- `src/pages/Auth.tsx`, `Dashboard.tsx`, `Pricing.tsx`, `Input.tsx`, `CaseStudies.tsx`, `Methodology.tsx`, `WhoThisIsNotFor.tsx`, `Loading.tsx` — ultra-luxury polish
- `supabase/functions/validate-idea/index.ts` — expanded macro factors + synthesizer weighting

## Order of Execution
1. Create MacroEnvironment.tsx (unblocks build)
2. Refine index.css luxury utilities
3. Polish all remaining pages
4. Expand validate-idea agent + redeploy
5. Verify build passes

