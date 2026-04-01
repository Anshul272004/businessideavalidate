

# Futuristic AI-Powered Landing Page Redesign

## Overview
Complete redesign of the Landing page and its sub-components to create a cinematic, futuristic AI product experience. The current gold/obsidian luxury theme shifts to a deep black + neon blue/purple cyberpunk-AI aesthetic with glassmorphism, particle effects, parallax, and interactive micro-interactions.

## Color System Change
Update CSS variables in `src/index.css`:
- Background: pure deep black (`240 10% 2%`)
- Primary accent: neon blue (`220 90% 60%`) instead of gold
- Secondary accent: electric purple (`270 80% 60%`)
- Keep success/destructive semantics
- Add `--neon-blue`, `--neon-purple`, `--glass-bg` custom properties

Update `tailwind.config.ts` with new color tokens and keyframes for particle float, glow-pulse-blue, and scan-line effects.

## New/Rewritten Components

### 1. `src/components/landing/ParticleField.tsx` (NEW)
Canvas-based animated particle/neural-network background. Dots connected by lines, subtle mouse-reactive movement. Replaces `GradientMesh`.

### 2. `src/components/landing/HeroSection.tsx` (NEW — replaces TypewriterHero + hero markup in Landing)
- Full-viewport cinematic hero
- Animated 3D-like floating glass sphere using CSS transforms + framer-motion (rotation, glow pulse, mouse-parallax via `onMouseMove`)
- Headline: "Validate Your Business Idea Before You Build It"
- Subheadline with typing animation
- CTA button with breathing neon glow + hover ripple
- Floating stats badges around the sphere

### 3. `src/components/landing/InteractiveInput.tsx` (NEW)
- Glassmorphism floating panel with a fake input field
- On focus/type simulation: shows "Analyzing market...", "Scanning competitors...", "Calculating risk..." step-by-step with animated progress
- Triggers curiosity — clicking navigates to `/input`

### 4. `src/components/landing/AnimatedFlow.tsx` (NEW — replaces HowItWorks)
- SVG-based node graph: 3 nodes connected by glowing animated lines
- Data particles flowing along the lines
- Step 1 → Step 2 → Step 3 with scroll-triggered activation
- Each node expands on scroll to reveal details

### 5. `src/components/landing/FeatureCards.tsx` (REWRITE of FeatureShowcase)
- Glassmorphism cards with tilt-on-hover (CSS perspective transform)
- Subtle float animation per card (staggered)
- Neon border glow on hover
- 6 key features: Market Validation, Competitor Analysis, Risk Score, AI Suggestions, Revenue Model, Startup Score

### 6. `src/components/landing/MockResult.tsx` (NEW)
- Fake AI result dashboard showing:
  - Animated score counter (0→78%)
  - Animated progress bars for strengths
  - Glassmorphism card layout
  - Scroll-triggered animation

### 7. `src/components/landing/PricingCards.tsx` (REWRITE)
- 3 glassmorphism pricing cards
- Middle card highlighted with neon glow border
- Hover lift + glow intensify
- Anchoring bias layout

### 8. Updated `src/components/landing/FinalCTA.tsx`
- Full-width dark section with particle background
- Large headline + breathing CTA
- Neon glow effects

## Landing.tsx Rewrite
Simplify the Landing page to use the new components in order:
1. ParticleField (fixed background)
2. Nav (glassmorphism, updated colors)
3. HeroSection
4. InteractiveInput
5. AnimatedFlow (How it Works)
6. FeatureCards
7. MockResult
8. PricingCards
9. Testimonials (keep, restyle)
10. FinalCTA
11. Footer

Remove: OnboardingOverlay, LiveActivityFeed, LiveCounterStrip, WallOfVerdicts, ProblemAgitation, CEOPatternSection, FounderShowcase, ComparisonTable, MoneyBackGuarantee, Benefits, SocialProof, TrustBadges — these bloat the page and fight the futuristic aesthetic.

## Scroll Experience
- Add `scroll-smooth` behavior
- Each section uses `whileInView` fade-up with stagger
- Parallax on hero sphere (translateY based on scroll)
- Section transitions feel cinematic with opacity + translateY

## Micro-Interactions
- All buttons: hover glow intensify + scale 1.02
- Cards: perspective tilt on mousemove (`rotateX`/`rotateY` from cursor position)
- CTA: breathing neon pulse animation
- Nav: glassmorphism blur on scroll
- Cursor: subtle glow trail effect via CSS

## Files Changed
- `src/index.css` — new color variables, glassmorphism utilities, neon glow classes
- `tailwind.config.ts` — new keyframes and animation tokens
- `src/pages/Landing.tsx` — complete rewrite with new component composition
- `src/components/landing/GradientMesh.tsx` → replaced by `ParticleField.tsx`
- `src/components/landing/TypewriterHero.tsx` → replaced by `HeroSection.tsx`
- `src/components/landing/HowItWorks.tsx` → replaced by `AnimatedFlow.tsx`
- `src/components/landing/FeatureShowcase.tsx` → replaced by `FeatureCards.tsx`
- `src/components/landing/FinalCTA.tsx` — updated styling
- **New files**: `ParticleField.tsx`, `HeroSection.tsx`, `InteractiveInput.tsx`, `AnimatedFlow.tsx`, `FeatureCards.tsx`, `MockResult.tsx`, `PricingCards.tsx`

## Performance
- Canvas particle field uses `requestAnimationFrame` with throttling
- All animations use `will-change` and GPU-composited properties (transform, opacity)
- Lazy-load below-fold sections
- No heavy 3D libraries — pure CSS transforms + framer-motion

## What Stays
- Auth flow, Dashboard, Input, Loading, Result pages untouched
- App routing unchanged
- All backend edge functions unchanged
- Existing UI component library (button, card, etc.) unchanged

