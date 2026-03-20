# Pour-Over Brew

A desktop-friendly web app for planning manual pour-over coffee. You pick a method, tune dose and water, and get a clear brew plan with timed stages. There is also a guided playback view and a small library of reading material and video notes that tie back into your setup.

The goal is not to replace a scale or your taste, but to keep numbers and timing consistent so you can focus on pouring.

## What it does

**Recipe planning**

- **Standard recipes** — Choose dripper, filter paper, hot or iced brew, and a preset profile. Adjust dose, ratio, roast level, process, bloom behaviour, pour count, and target time where the preset allows it.
- **4:6 method** — Hario-style 4:6 planning with taste modes (basic, more sweetness, more acidity) and body modes (basic, stronger, lighter). The engine builds pour percentages, stage times, and cumulative water targets from your inputs.

**Studio workspace** (`/studio`)

- **Config** — Edit the active recipe and see a summary (water, temperature guidance, grind note, stage overview).
- **Brewing** — Step through the plan with playback controls, a stage table, and a visual scene (dripper, stream, server glass) driven by the current stage.
- **Blog** — Curated articles and video guides (bloom, agitation, water, methods, and similar topics). Many items include an “apply” action that pushes suggested settings back into Standard or 4:6 and returns you to Config.

**Homepage**

- Landing page with short explanations and links into each studio view.
- Language toggle for **English** and **Thai** in the UI copy (blog content and labels follow the same provider).

All brew math and validation live in a dedicated engine under `src/lib/brew-engine/` (stage ordering, water totals, integrity checks). The UI stays mostly presentational and stateful.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS 4 |
| Motion | Motion (formerly Framer Motion) for UI animation |
| Icons | Lucide React |
| Types | TypeScript |
| Tests | Vitest, Testing Library |

## Project layout (short)

```
src/
  app/              # Routes: /, /studio
  components/       # UI: brew panels, studio shell, blog, animations
  data/             # Drippers, filters, presets, blog content (static TS)
  hooks/            # Brew calculation + playback state
  lib/brew-engine/  # Plan calculation, 4:6 builder, validators
  types/            # Brew and domain types
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Open Studio** or go straight to [http://localhost:3000/studio](http://localhost:3000/studio).

Other scripts:

```bash
npm run build    # Production build
npm run start    # Run production server (after build)
npm run lint     # ESLint
npm run test     # Vitest (watch)
npm run test:run # Vitest once
```

### Note on `npm run dev`

The default dev script runs `arch -arm64 next dev` so Node stays on Apple Silicon when the shell is forced into x86 mode (for example, some Conda `osx-64` setups). If that command fails on your machine (e.g. Linux or Windows), run the dev server directly:

```bash
npx next dev
```

You can change the `dev` script in `package.json` to match your environment.

## Deployment

This is a standard Next.js app. Build with `npm run build` and host on any platform that supports Node (Vercel, your own server, etc.). No database or API keys are required for the features described above.

## License

Private project (`"private": true` in `package.json`). Add a license file if you open-source it later.
