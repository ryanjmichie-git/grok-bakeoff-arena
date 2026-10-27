# AGENTS.md: Factory Inventory Dashboard

A one-page Next.js dashboard over sample data. The task is in `SPEC.md`.

## Stack and layout

- Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS 4.
- `app/page.tsx` assembles the page. `components/` holds UI parts; `lib/` holds data logic.
- `data/` holds the sample data (read only).

## Commands

```bash
npm ci              # install exactly what package-lock.json pins
npm run dev         # http://localhost:3000
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm run build       # next build
npm run verify      # typecheck + lint + test:hook + build (the gate)
```

## The gate

A Stop hook (`.grok/hooks/stop-verify.json`, running `node bin/stop-verify.mjs`) runs
`npm run verify` when the main agent ends a turn. If it fails, the error comes back and the
agent keeps working. Each run adds a line to `.grok/logs/stop-verify.log`.
