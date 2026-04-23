
## Build Fix Plan: Resolve `MacroEnvironment` Import Failure Completely

### What is actually broken
`src/pages/Result.tsx` imports `@/components/result/MacroEnvironment`, but the build step is trying to open the extensionless path directly:

```text
/dev-server/src/components/result/MacroEnvironment
```

That means the resolver is not successfully landing on `MacroEnvironment.tsx` during build, even though the file now exists in `src/components/result/`.

## Fix strategy
Use a resolver-safe import and make the component reference impossible to miss during production build.

### 1) Harden the import in `src/pages/Result.tsx`
Replace:

```ts
import MacroEnvironment from "@/components/result/MacroEnvironment";
```

with an explicit file import:

```ts
import MacroEnvironment from "@/components/result/MacroEnvironment.tsx";
```

Why:
- `tsconfig.app.json` already enables `allowImportingTsExtensions`
- this bypasses the extension-resolution edge case entirely
- it is the most direct fix for the exact ENOENT path in the build log

### 2) Verify `src/components/result/MacroEnvironment.tsx` is valid for bundling
Keep the component file, but verify these points while editing:
- it has a `default export`
- no broken imports inside it
- no unsupported syntax or accidental path issues
- no hidden dependency on missing CSS/utilities

### 3) Check for any duplicate or stale references
Search the repo for all `MacroEnvironment` references and normalize them so there is only one import style everywhere:
- either all explicit `.tsx`
- or only the final corrected reference used by `Result.tsx`

### 4) Build-proof the Vite config only if needed
If the explicit import alone does not fix the build, apply the fallback hardening in `vite.config.ts`:
- add `resolve.extensions` including `.ts` and `.tsx`
- if the issue still behaves like a cached path-resolution problem, add:
  ```ts
  server: {
    fs: {
      cachedChecks: false,
    },
  }
  ```
This is secondary, not the first fix.

### 5) Final validation
Run a full build after the changes and confirm:
- no more `vite:load-fallback` ENOENT for `MacroEnvironment`
- `Result.tsx` bundles successfully
- the result page still renders the Macro Environment section normally

## Files to update
- `src/pages/Result.tsx` — change the import to explicit `.tsx`
- `src/components/result/MacroEnvironment.tsx` — verify/export cleanup if needed
- `vite.config.ts` — only if the import hardening alone does not fully resolve the build

## Expected outcome
The build will stop failing on the missing `MacroEnvironment` path, and the results page will keep the macro-analysis UI without needing to remove the feature.
