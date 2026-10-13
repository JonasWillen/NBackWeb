# NBackWeb — Dual N-back

A responsive, mobile-first web implementation of the **Dual N-back** working-memory game, built for smartphones, tablets, and desktops. Deployed as a static site — no build step, no backend.

**Play it:** https://jonaswillen.github.io/NBackWeb/

## What is N-back?
You are shown a sequence of stimuli (a cell lighting up in a grid, and/or a spoken letter). Respond when the current stimulus matches the one from *n* steps earlier. The dual variant runs two independent streams at once — visual (grid position) and auditory (spoken letter).

## Features
- Single n-back (visual or auditory) and **dual n-back**
- 3×3 visual grid (configurable up to 5×5)
- Spoken letters via the Web Speech API
- Persistent settings (n, event count, interval, grid size, letter set)
- High score list, sortable by name, score, and date
- Responsive portrait/landscape layout from small phones to tablets

## Run locally
```bash
git clone https://github.com/JonasWillen/NBackWeb.git
cd NBackWeb
python3 -m http.server 8000
```
Then open http://localhost:8000 — or simply open `index.html` directly in a browser.

## Deploy on GitHub Pages
1. Push to `main`.
2. **Settings → Pages → Build and deployment**: source *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Your site is published at `https://<user>.github.io/NBackWeb/` (first build takes a minute).

## Architecture
MVVM, plain ES modules, no framework:

```
index.html          entry point / home screen
css/                styles
js/model/           game engine (stimuli, round state, scoring)
js/viewmodel/        app state, navigation, localStorage adapters
js/view/             DOM rendering, animations, speech
docs/spec.md         requirements specification
docs/plan.md         implementation plan
```

See `AGENTS.md` for coding conventions and `docs/` for the spec and plan.

## Roadmap
See [docs/plan.md](docs/plan.md). Current status: M0 skeleton done, M1 game engine in progress.

## License
MIT — see [LICENSE](LICENSE).
