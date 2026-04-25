# Fix the build error — create the missing file

## Root cause (confirmed)
- `src/pages/Result.tsx` line 58 imports `@/components/result/MacroEnvironment.tsx`
- That file does **not** exist on disk in `src/components/result/`
- Every previous "create" attempt did not actually persist the file, so Vite's `[vite:load-fallback]` correctly errors with `ENOENT`
- This is not a cache issue — the file is genuinely absent

## Fix (one file, one component)

**Create `src/components/result/MacroEnvironment.tsx`** as a self-contained component that:
- Accepts `data: any` (matches existing call site: `<MacroEnvironment data={result.macro_environment} />`)
- Safely handles partial/missing data (the backend may not yet return the expanded shape)
- Renders an obsidian/gold "Macro Environment" dossier card consistent with the existing luxury result-card styling used by siblings like `BoardroomSummary`, `FundingReadiness`, `RegionalAnalysis`
- Sections: overall macro score, economic / geopolitical / technology / climate / operational signals, tailwinds, headwinds, hedges, narrative summary
- Uses only existing design tokens and lucide-react icons — no new dependencies
- Has a valid `export default MacroEnvironment`

## Files changed
- **New:** `src/components/result/MacroEnvironment.tsx`

## Out of scope for this pass
The full cinematic rebrand (3D landing, brand primitives, page-by-page redesign, expanded `validate-idea` macro factors) is **not** included here. It will be applied in the next pass once the build is green and stable. Trying to do both at once is exactly what kept regressing the build.

## Verification
After creating the file, the `vite build --mode development` ENOENT error will be resolved and the project will build cleanly.