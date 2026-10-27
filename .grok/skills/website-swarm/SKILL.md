---
name: website-swarm
description: Orchestrates a small swarm of Grok Build agents to build a page or dashboard with parallel agents. Use when the user asks to build or extend the site with parallel agents.
when-to-use: build website, dashboard, swarm, multi-agent, implement page
---

# Website Swarm Skill

## When to use
A page with two or more independent parts (components or data modules) that agents can
build at the same time.

## Steps
1. Plan. Read SPEC.md. First define the shared contract yourself: the data types and the
   filter state shape, in one file such as `lib/types.ts`. Then list each slice with one
   owner and the exact files it may create. No two slices share a file.
2. Spawn one `frontend` subagent per slice, in parallel. Give each one:
   - its file list, the SPEC.md items it covers, and the exact `data-testid` names;
   - the shared types file and helper names to import;
   - "match the styles in `components/Header.tsx`".
3. When all of them finish, you (the parent) wire the parts into `app/page.tsx`.
4. Spawn `reviewer` with the plan text, SPEC.md, and the list of changed files.
5. Fix what the reviewer finds, then finish the turn. The Stop hook runs `npm run verify`;
   fix anything it reports.
6. Summarize: what was built, which agent owned which files, and the verify result.

## Constraints
- Stay in the stack in AGENTS.md. Code goes in `app/`, `components/` and `lib/`.
- Subagents never edit `app/page.tsx`, config files or `package.json`.
