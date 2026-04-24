

# Ultra-Luxury Cinematic Rebrand — CHRONOS-Inspired 3D Experience

## 1) Fix the recurring build error (one last time, properly)
The build keeps failing on `MacroEnvironment.tsx` — the file gets created but doesn't persist correctly through cache cycles. I will:
- Recreate `src/components/result/MacroEnvironment.tsx` cleanly
- Replace the import in `src/pages/Result.tsx` with an inline lazy import fallback so even if the module hiccups, the build never breaks again
- Verify with a fresh build before any visual work

## 2) Brand DNA — extracted from your CHRONOS reference

```text
Name treatment:  spaced uppercase serif (Cinzel / Cormorant)
Palette:         #030303 obsidian · #C9A84C gold · #F2D472 light gold
                 #8B6914 deep gold · #D8D8D8 platinum · #F5F1EA cream
Type system:     Cinzel (display)  ·  Cormorant Garamond (body italics)
                 Raleway 200-300 (UI labels, wide tracking)
Mood:            cinematic · monumental · slow · reverent
Motion:          custom gold cursor · preloader · parallax · scroll reveal
```

This becomes the project's new brand identity — applied everywhere, not just landing.

## 3) Global design system overhaul (`src/index.css` + `tailwind.config.ts`)
- Import Cinzel, Cormorant Garamond, Raleway from Google Fonts
- Replace the current dark-SaaS palette with the obsidian/gold/platinum tokens above
- New utilities:
  - `.brand-cursor` host + custom gold dot + outer ring
  - `.luxury-preloader` (gold logo reveal + hairline expand)
  - `.editorial-display`, `.editorial-italic`, `.ui-label` typography classes
  - `.luxury-hairline`, `.gold-divider`, `.gold-sheen`
  - `.depth-stage`, `.parallax-layer`, `.cinematic-orb`, `.luxury-noise`
  - `.luxury-panel`, `.luxury-card`, `.luxury-pill`
- Slow premium easing curve as default transition

## 4) Cinematic 3D landing experience
Files: `Landing.tsx`, `HeroSection.tsx`, `ParticleField.tsx`, `InteractiveInput.tsx`, `AnimatedFlow.tsx`, `FeatureCards.tsx`, `MockResult.tsx`, `PricingCards.tsx`, `FinalCTA.tsx`

New cinematic structure:
1. **Preloader** — gold wordmark fades in, hairline expands, "EST. 2026 / DECISION INTELLIGENCE" subtitle
2. **Custom gold cursor** with magnetic outer ring (desktop only)
3. **Hero** — full-bleed obsidian stage, monumental Cinzel headline, parallax layered "object" (replaces sphere) using `react-three-fiber` for a slowly-rotating 3D faceted gold artifact with rim lighting + floating orbital metric chips
4. **Scroll-driven sections** — each section enters with editorial reveal (mask wipes, hairline draws, slow fades)
5. **Asymmetric editorial blocks** instead of stacked centered cards
6. **Marquee strip** of validated industries in wide-tracked Raleway
7. **Footer** — monogram + uppercase columns + fine print, premium hairlines

Tech for 3D: `@react-three/fiber@^8.18` + `@react-three/drei@^9.122.0` + `three@^0.160` (exact versions per docs).

## 5) Apply the new brand to every page
- **Auth** — luxury entry vestibule, dual-column with vertical gold rule, monogram
- **Input** — guided intake styled like a private consultation form
- **Loading** — cinematic analysis chamber: rotating 3D core + gold progress ring + agent ledger
- **Result** — boardroom dossier: cover sheet → numbered chapters → gold dividers → embedded MacroEnvironment
- **Dashboard** — founder's private archive: ledger-style rows, gold accents, archive shelves
- **Pricing** — three positioned tiers like watch collections (Essential / Founder / Decision Companion)
- **Methodology / CaseStudies / WhoThisIsNotFor** — editorial long-form with drop caps and pull quotes
- **NotFound** — minimalist obsidian void with single gold line
- **MobileNav** — floating gold-rimmed dock

## 6) Expanded macro analysis
Update `supabase/functions/validate-idea/index.ts` to include all factors and align JSON shape consumed by the new `MacroEnvironment` component:
- inflation · interest rates · recession resilience · geopolitics · sanctions · supply chain · energy · climate · regulation · demographics · AI disruption · talent market · cyber/data · cultural alignment · black swan · pandemic resilience
- Output: `macro: { score, economic{}, geopolitical{}, technology{}, climate{}, operational{}, tailwinds[], headwinds[], hedges[], summary }`

## 7) New / modified files

**New**
- `src/components/result/MacroEnvironment.tsx`
- `src/components/brand/LuxuryCursor.tsx`
- `src/components/brand/LuxuryPreloader.tsx`
- `src/components/brand/Monogram.tsx`
- `src/components/landing/CinematicArtifact.tsx` (R3F 3D centerpiece)
- `src/components/landing/EditorialReveal.tsx`

**Modified**
- `src/index.css`, `tailwind.config.ts`, `index.html`
- `src/App.tsx` (mounts cursor + preloader globally)
- `src/pages/Landing.tsx` + all `src/components/landing/*`
- `src/pages/Auth.tsx`, `Input.tsx`, `Loading.tsx`, `Result.tsx`, `Dashboard.tsx`, `Pricing.tsx`, `Methodology.tsx`, `CaseStudies.tsx`, `WhoThisIsNotFor.tsx`, `NotFound.tsx`
- `src/components/shared/MobileNav.tsx`
- `supabase/functions/validate-idea/index.ts`
- `package.json` (add three / r3f / drei pinned versions)

## 8) Execution order
1. Fix MacroEnvironment + verify build
2. Install three / r3f / drei (exact versions)
3. Global design system (CSS + tailwind + fonts + index.html)
4. Brand primitives (cursor, preloader, monogram)
5. Cinematic landing (hero + 3D artifact + sections)
6. All other pages rebranded
7. MobileNav redesign
8. Backend macro expansion + result wiring
9. Final build + visual sweep

