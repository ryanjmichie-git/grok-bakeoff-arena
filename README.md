# Grok bake-off arena

The starting point for a comparison: four ways of building the same dashboard from
[SPEC.md](SPEC.md). Each attempt lives on its own `run/*` branch; `main` is the shared start.

The data in `data/` is generated sample data, copied from the inventory-management workshop
app (`server/data`, commit `5f427fc`). It does not describe a real company.

```bash
npm ci
npm run verify
npm run dev   # http://localhost:3000
```
