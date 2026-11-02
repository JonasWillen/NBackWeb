# NBackWeb — Dual N-back

A responsive, mobile-first web implementation of the **Dual N-back** working-memory game. Works on smartphones, tablets, and desktops. Static site — no build step, no backend.

**Play it:** https://jonaswillen.github.io/NBackWeb/

## What is N-back?
You see/hear a sequence of stimuli — a cell lighting up in a grid, and/or a spoken letter. Respond when the current stimulus matches the one from *n* steps earlier. The dual variant runs two independent streams at once.

## Features
- Single n-back (visual or audio) and **dual n-back**
- 3×3 visual grid by default (configurable 2–6, e.g. 5×5)
- Spoken letters via the Web Speech API (clean single-letter pronunciation)
- Blink feedback when the same cell repeats
- Persistent settings: modality, n, event count, interval, grid size, letter count
- High score list with medal icons (🥇🥈🥉) for the top 3 and a 🏆 best-score badge, sortable by name, score, and date
- Responsive portrait/landscape layout from small phones to tablets
- **Installable PWA**: works offline after the first load, with home-screen icon and splash colors

## Run locally
```bash
git clone https://github.com/JonasWillen/NBackWeb.git
cd NBackWeb
python3 -m http.server 8000
```
Open http://localhost:8000 — this also enables the full PWA experience (service worker, offline mode, "Install app" button on the home screen). Opening `index.html` directly via `file://` still lets you play, but without offline caching or install.

## Deploy on GitHub Pages
1. Push to `main`.
2. **Settings → Pages**: source *Deploy from a branch*, branch `main`, folder `/ (root)*.
3. Live at `https://<user>.github.io/NBackWeb/` (first build takes a minute; hard-refresh to bypass cache).

## Architecture
MVVM with plain ES modules, no framework:

```
index.html              entry point / app shell (all screens)
manifest.webmanifest    PWA manifest (icons, theme, standalone display)
sw.js                   service worker: offline cache for all static assets
icons/                  app icons (192/512 PNG, maskable, apple-touch-icon)
css/styles.css          mobile-first responsive theme
js/app.js               composition root & screen navigator
js/pwa.js               service worker registration & install prompt
js/model/               game engine: StimulusGenerator, Round, Score, Storage
js/viewmodel/           SettingsViewModel, GameViewModel, HighScoreViewModel
js/view/                HomeScreen, GameScreen, GridView, AudioView,
                        SettingsScreen, ScoresScreen, SummaryScreen
docs/spec.md            requirements specification
docs/plan.md            implementation plan (M0–M5, all done)
docs/testing.md         manual QA checklist
```

## PWA / offline
- `manifest.webmanifest` + `icons/` make the app installable ("Install app" button appears on the home screen where the browser supports it; on iOS use Share → Add to Home Screen).
- `sw.js` precaches every static asset on first load; afterwards the game works fully offline. Bump the `CACHE` version in `sw.js` when assets change so clients pick up updates.
- All manifest/service-worker URLs are relative, so the app works both at the GitHub Pages project URL and from any local static server.

## Documentation
- [docs/spec.md](docs/spec.md) — requirements
- [docs/plan.md](docs/plan.md) — implementation plan and status
- [docs/testing.md](docs/testing.md) — QA checklist
- `AGENTS.md` — coding conventions

## Status
All milestones (M0–M5) complete. The game is playable end-to-end: home → round → summary → score saving.

## License
MIT — see [LICENSE](LICENSE).
