# AGENTS.md — NBackWeb

## Project
Responsive web implementation of the Dual N-back working-memory game (HI1033 Lab B.1).
Target platform: **mobile-first web app** for smartphones, tablets, and desktop, deployed as a static site on **GitHub Pages** (https://jonaswillen.github.io/NBackWeb/).

## Architecture
- **MVVM**: Model (game engine), ViewModel (state & bindings), View (DOM). No "god" classes/files.
- Pure static site: HTML + CSS + vanilla JavaScript (ES modules). No build step, no framework — the site runs directly or via GitHub Pages.
- Layout:
  - `index.html` — app shell containing all screens
  - `css/styles.css` — mobile-first theme
  - `js/app.js` — composition root & screen navigator
  - `js/model/` — StimulusGenerator, Round, Score, Storage (localStorage adapter)
  - `js/viewmodel/` — SettingsViewModel, GameViewModel, HighScoreViewModel
  - `js/view/` — HomeScreen, GameScreen, GridView, AudioView, SettingsScreen, ScoresScreen, SummaryScreen
  - `docs/` — spec.md, plan.md, testing.md

## Requirements source
`docs/spec.md` implements Lab B.1: single n-back (basic), dual n-back plus settings/high-scores/responsiveness (higher grade). `docs/testing.md` is the manual QA checklist.

## Conventions
- ES modules (`<script type="module">`); no global namespace pollution.
- ViewModels expose `onChange(listener)` observables; Views subscribe and re-render.
- Mobile-first CSS: flexible layouts (`clamp()`, flex/grid), touch targets ≥ 44px, portrait & landscape support (see the landscape media query).
- Audio: `speechSynthesis` with **lowercase letters** (uppercase triggers "capital K" announcements); WebAudio tone fallback; starts only after a user gesture.
- Persistence: `localStorage` via the `Storage` adapter, keys prefixed `nback.`.
- No secrets, no server-side code, no external CDN dependencies.

## Testing
- `node --check` every changed JS file.
- Cross-check that every DOM id referenced in `js/view/**` and `js/app.js` exists in `index.html`.
- Manual QA per `docs/testing.md` (phone/tablet/desktop, portrait/landscape, all modality flows).
- Serve locally: `python3 -m http.server 8000` → http://localhost:8000.

## Git / delivery
- Branches: `main` is default; work on `vibe/*` or feature branches; merge via PRs.
- Commits: short imperative subject lines, e.g. `Add 3x3 grid view`.
- Deploy: GitHub Pages from `main` root; any push to `main` auto-publishes (~1 min). Hard-refresh to bypass cache.
