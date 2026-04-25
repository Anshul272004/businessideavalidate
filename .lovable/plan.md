# Cinematic Glass + 3D Interactive Pass

The brand foundation (gold/obsidian palette, Cinzel/Cormorant/Raleway, custom cursor, preloader, hero artifact) is already live and the build is green. This pass adds the **dynamic, interactive, glass-morphic 3D feel** from the reference images (translucent panels with prismatic light, floating dashboards, neural-core centerpieces) — without rewriting working pages.

## Reference mapping (which image powers what)

- **Floating glass dashboards** (`Whisk_acf6b691...`, `Whisk_7b0418e5...`, `Whisk_43aeb50a...`) → Landing `MockResult` becomes a 3D-tilting glass dashboard cluster
- **Neural core** (`Whisk_374db59f...`) → Loading page centerpiece (rotating neural sphere with synapse particles)
- **Glass control surface** (`Whisk_4df7fcbb...`) → Input page intake form rendered on a tilted glass plate
- **Connected glass cubes** (`Whisk_589a8a93...`, `Whisk_b41d4f83...`) → AnimatedFlow becomes glass nodes connected by light beams
- **Circuit traces with particle streams** (`Whisk_efdc99ff...`) → Hero ambient backdrop layer
- **Holographic dashboard tiles** (`Whisk_c2b274dc...`) → Result page section headers float in on glass cards

## What I'll build

### 1) New shared 3D + glass primitives (one source of truth)
- `src/components/brand/GlassPanel.tsx` — reusable translucent panel with prismatic edge highlight, hover tilt (vanilla mouse-tracked 3D transform, no extra deps), gold inner border, subtle noise. Used everywhere instead of plain cards.
- `src/components/brand/PrismaticBackdrop.tsx` — fixed CSS-only animated layer: drifting gold/champagne light shafts + faint circuit-line SVG + slow particle drift. Mounted globally behind the app.
- `src/components/brand/NeuralCore.tsx` — R3F scene: wireframe icosahedron + inner glowing sphere + ~60 synapse particles pulsing on connection lines. Reused by Loading page and as an optional landing accent.
- `src/components/brand/GlassNode.tsx` + `LightBeam.tsx` — small SVG/CSS pieces for the connected-cubes flow visual.

### 2) Landing — make it feel alive
- `HeroSection.tsx` — keep gold artifact, add `PrismaticBackdrop` behind it, add a parallax mouse-follow on the artifact container, add a subtle scroll-driven scale on the headline.
- `MockResult.tsx` — replace the flat preview with **3 floating `GlassPanel` cards** in a layered/perspective stack (verdict score, market chart, risk matrix), each tilting on hover, gently bobbing on a loop.
- `AnimatedFlow.tsx` — rebuild as **5 glass nodes connected by animated light beams** (Idea → Demand → Pain → Market → Verdict), each node a `GlassPanel` with a pulse glow when the beam reaches it. Auto-loops + replays on scroll into view.
- `FeatureCards.tsx` — wrap each card in `GlassPanel` with hover tilt + prismatic edge.

### 3) Loading page — cinematic analysis chamber
- Replace the current loading visual with a centered `NeuralCore` (R3F) + a gold progress ring drawn in SVG around it + the existing 8-stage agent ledger floating to the right on a `GlassPanel`. Stages light up with a gold pulse as they activate.

### 4) Input page — private consultation surface
- Wrap the intake form in a large `GlassPanel` with the prismatic backdrop behind. Step indicators become small glass pills with gold fill on completion. No logic changes — purely visual.

### 5) Result page — boardroom dossier polish
- Mount `PrismaticBackdrop` behind. Each section card (incl. the new `MacroEnvironment`) gets the `GlassPanel` treatment via a single wrapper change. Add a "Chapter N" gold serif label above each section. No backend changes.

### 6) MobileNav — floating glass dock
- Already gold-rimmed; switch its background to `GlassPanel` styling so it picks up the prismatic refraction.

## Out of scope (intentionally)
- No backend / `validate-idea` changes this pass — keep the build stable. Macro factor expansion can be a follow-up.
- No new npm packages. Three / R3F / drei are already installed at the correct pinned versions.
- No edits to `src/integrations/supabase/*`, `package.json` deps, or design tokens (the gold/obsidian system stays).

## Files

**New**
- `src/components/brand/GlassPanel.tsx`
- `src/components/brand/PrismaticBackdrop.tsx`
- `src/components/brand/NeuralCore.tsx`
- `src/components/brand/GlassNode.tsx`
- `src/components/brand/LightBeam.tsx`

**Modified**
- `src/App.tsx` (mount `PrismaticBackdrop` once, globally)
- `src/components/landing/HeroSection.tsx` (parallax + backdrop)
- `src/components/landing/MockResult.tsx` (glass dashboard stack)
- `src/components/landing/AnimatedFlow.tsx` (connected glass nodes)
- `src/components/landing/FeatureCards.tsx` (glass wrap + tilt)
- `src/pages/Loading.tsx` (NeuralCore centerpiece)
- `src/pages/Input.tsx` (glass-panel intake wrapper)
- `src/pages/Result.tsx` (chapter labels + glass section wrappers)
- `src/components/shared/MobileNav.tsx` (glass dock styling)
- `src/index.css` (small additions: `.glass-panel`, `.prismatic-edge`, `.tilt-3d`, `.light-beam` keyframes)

## Verification
After each batch (primitives → landing → loading/input → result/nav) I'll run `bun run build:dev` and only proceed if it passes. Same hard rule that kept the previous pass from regressing.