# plan.md — Implementation Plan

Milestones are ordered; each ends with a manually smoke-tested, committed increment on a branch.

## M0 — Skeleton & deploy pipeline
- [x] `AGENTS.md`, `docs/spec.md`, `docs/plan.md`
- [x] `index.html` "Hello World" landing page (responsive, viewport meta)
- [x] Enable GitHub Pages (Settings → Pages → Deploy from branch `main`, root `/`)
- Verify: page loads at `https://<user>.github.io/NBackWeb/`

## M1 — Model: game engine (MVVM Model)
- [ ] `js/model/StimulusGenerator.js` — random position (grid index) + letter per event; guarantees ~25–30% match rate per stream.
- [ ] `js/model/Round.js` — round state: settings (n, event count, interval, grid size, letter set), event index, hit/miss/false-alarm tracking per modality.
- [ ] `js/model/Score.js` — score computation (hits vs false alarms) and serialization.

## M2 — ViewModel
- [ ] `js/viewmodel/SettingsViewModel.js` — load/save settings to `localStorage`.
- [ ] `js/viewmodel/GameViewModel.js` — owns the round timer, exposes observable state (current event, score) to the View; handles match input and judges it against the model.
- [ ] `js/viewmodel/HighScoreViewModel.js` — add score entries; sort by name/score/date.

## M3 — Views
- [ ] `index.html` home screen: high score display, mode selection (visual / auditory / dual), current settings summary.
- [ ] `js/view/GridView.js` — 3×3 (configurable) grid, highlight cell, landscape/portrait safe.
- [ ] `js/view/AudioView.js` (adapter) — speak letters via `speechSynthesis`, fallback tones via WebAudio.
- [ ] `js/view/GameScreen.js` — round progress (event x/y, correct count), match buttons (visual / audio), gentle error animation (CSS transform/color).
- [ ] `js/view/SettingsScreen.js` and `js/view/ScoresScreen.js` — extras for higher grade.

## M4 — Polish & higher-grade extras
- [ ] Settings persistence (M2 done), score list with sorting (M3 done), tablet/landscape QA pass.
- [ ] Preventing double input per event; end-of-round summary screen.
- [ ] Final responsive QA: 320 px phone portrait/landscape, tablet, desktop.

## Risks
- Mobile autoplay restrictions → all audio starts only after a user gesture (the Start button).
- `speechSynthesis` voice availability varies on Android → letter set pronounced via individual letters; fallback tones.
