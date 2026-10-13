# AGENTS.md — NBackWeb

## Project
Responsive web implementation of the Dual N-back working-memory game (HI1033 Lab B.1).
Target platform: **mobile-first web app** that works on smartphones, tablets, and desktop, deployed as a static site on **GitHub Pages**.

## Architecture
- Follow **MVVM**: Model (game engine / stimulus sequence), ViewModel (state & bindings), View (HTML/CSS/JS DOM updates). No "god" classes/files.
- Pure static site: HTML + CSS + vanilla JavaScript (ES modules). No build step, no framework, no bundler — the site must run by opening `index.html` or via GitHub Pages.
- Proposed layout:
  - `index.html` — entry page (home screen)
  - `css/` — stylesheets
  - `js/model/` — game logic (stimulus generator, round state, scoring)
  - `js/viewmodel/` — app state, screen navigation, persistence adapters
  - `js/view/` — DOM rendering, animations, audio playback
  - `docs/` — `spec.md`, `plan.md` (this repo's planning documents)

## Requirements source
`docs/spec.md` derives from the Lab B.1 assignment (single n-back basic, dual n-back + settings/highscores/responsive for higher grade).

## Conventions
- ES modules (`<script type="module">`); no global namespace pollution.
- Mobile-first CSS: flexible layouts (`clamp()`, flex/grid), touch targets ≥ 44px, support portrait & landscape, small and large screens.
- Audio: use Web Speech API (`speechSynthesis`) or small audio files for spoken letters; must work after first user interaction (mobile autoplay policy).
- Persistence: `localStorage` (settings + high scores).
- No secrets, no server-side code, no external CDN dependencies.

## Testing
- Manual testing on mobile viewport (Chrome DevTools device mode) plus keyboard input on desktop.
- Smoke test: serve locally with `python3 -m http.server` and open `http://localhost:8000`.

## Git / delivery
- Branches: `main` is default; work on `vibe/*` or feature branches.
- Commits: short imperative subject lines, e.g. `Add 3x3 grid view`.
- Deploy: GitHub Pages from `main` (root). Any push to `main` auto-publishes.
