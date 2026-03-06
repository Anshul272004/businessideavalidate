

# Implementation Plan: Steps 4-8 — Complete AI Startup Copilot

## Current State
Steps 1-3 are done: structured input, research tables with RLS, research orchestrator edge function. The remaining work is artifact generation, funding/growth sections, and dashboard expansion.

## Implementation (4 tasks)

### Task 1: Artifact Generator Edge Function + UI

**New file: `supabase/functions/generate-artifact/index.ts`**
- Accepts `validationId`, `artifactType` (business-plan | mvp-roadmap | pitch-deck), `validationResult`, `formData`
- Uses Lovable AI gateway with tool calling to return structured JSON per type:
  - **business-plan**: executive_summary, market_analysis, product_strategy, marketing_strategy, financial_projections
  - **mvp-roadmap**: core_features[], tech_stack, timeline[], budget_estimate, milestones[]
  - **pitch-deck**: slides[] (Problem, Solution, Market, Business Model, Competition, Go-to-Market, Financials) each with title + content + talking_points
- Persists to `report_artifacts` table with user auth
- Register in `supabase/config.toml`

**New file: `src/components/result/ArtifactGenerator.tsx`**
- Three buttons in a premium card: "Business Plan", "MVP Roadmap", "Pitch Deck"
- Loading state per artifact, renders result in collapsible accordion
- "Copy as Markdown" action per artifact
- Add to Result page after the Action Plan section

### Task 2: Funding Readiness + Growth Strategy Components

**New file: `src/components/result/FundingReadiness.tsx`**
- Derives scores from existing validation data (no new backend call):
  - VC Readiness (from scalability + market size + network effects)
  - Angel Readiness (from execution simplicity + founder fit)
  - Bootstrap Potential (from unit economics + low burn)
- Visual progress bars + investor checklist

**New file: `src/components/result/GrowthStrategy.tsx`**
- Top growth channels (from `distribution_channels` data)
- Viral loop potential (from `network_effects`)
- Revenue simulator: Year 1/3/5 projections from unit economics
- Startup Score breakdown

**Update `src/pages/Result.tsx`**: Add new "Funding & Growth" section with both components, and add "Artifacts" section with ArtifactGenerator. Add nav entries for these sections.

### Task 3: Dashboard Expansion — Founder OS Workspace

**Update `src/pages/Dashboard.tsx`**: Add tab-based layout with 3 tabs:
- **Validations** (current content)
- **Research Library**: Query `research_runs` for current user, display past research with status/section/summary, expandable to view cached result
- **Artifacts**: Query `report_artifacts`, show generated business plans/pitch decks/roadmaps with view/copy actions
- **Startup Score** card at top: aggregate from latest validation's confidence + bias-adjusted data

### Task 4: Connect External Research Providers

Use `connect` tool for Perplexity and Firecrawl connectors. The `research-orchestrator` already has code paths for both API keys — once connected, deep research automatically uses live grounded sources.

## Files Summary

**New (3):** `generate-artifact/index.ts`, `ArtifactGenerator.tsx`, `FundingReadiness.tsx`, `GrowthStrategy.tsx`
**Modified (3):** `config.toml`, `Result.tsx`, `Dashboard.tsx`
**No new migrations needed** — all tables exist.

