

# Resolve Persistent Build Cache Error

## Root cause
`src/components/result/MacroEnvironment.tsx` exists on disk and `src/pages/Result.tsx` imports it correctly. The build is failing on a cached extensionless path lookup that never gets refreshed.

## Fix (one tiny change)

**Modify `src/pages/Result.tsx` line 58** — switch from extensionless to explicit `.tsx` import:

```ts
// Before
import MacroEnvironment from "@/components/result/MacroEnvironment";

// After
import MacroEnvironment from "@/components/result/MacroEnvironment.tsx";
```

This forces Vite/Rollup to resolve the exact file path, bypassing the stuck cache state and immediately unblocking the build.

## Why not the full rebrand right now
The full luxury rebrand plan you previously approved (index.css overhaul, cinematic landing, all-page redesign, expanded macro analysis) is large and should be executed as its own work pass. Right now the only thing actually blocking you is this build error — fixing that first keeps the project usable while we then proceed with the visual rebrand in a clean state.

## Files changed
- `src/pages/Result.tsx` (1 line)

## After this fix
Build will pass. Then we proceed with the previously-approved rebrand: global tokens → cinematic landing → page-by-page polish → expanded macro factors in `validate-idea`.

