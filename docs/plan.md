# plan.md — Implementation Plan

Milestones are ordered; each ends with a manually smoke-tested, committed increment on a branch.

## M0 — Skeleton & deploy pipeline ✅
- [x] `AGENTS.md`, `docs/spec.md`, `docs/plan.md`
- [x] `index.html` landing page (responsive, viewport meta)
- [x] GitHub Pages enabled (Deploy from branch `main`, root `/`)
- Verified live at https://jonaswillen.github.io/NBackWeb/

## M1 — Model: game engine (MVVM Model) ✅
- [x] `js/model/StimulusGenerator.js` — random position + letter per event; ~28% match rate per stream; match events validated against n-back.
- [x] `js/model/Round.js` — round state: settings, event index, hit/miss/false-alarm/correct-rejection per modality; judges match inputs.
- [x] `js/model/Score.js` — score computation (hit rate minus false-alarm penalty), serialization, sorting by name/score/date.

## M2 — ViewModel ✅
- [x] `js/model/Storage.js` — thin persistence adapter around `localStorage`.
- [x] `js/viewmodel/SettingsViewModel.js` — validated, clamped, persistent settings with change listeners.
- [x] `js/viewmodel/GameViewModel.js` — round lifecycle (start/tick/respond/stop), observable state snapshots, double-input guard.
- [x] `js/viewmodel/HighScoreViewModel.js` — persistent entries (capped at 100), sort by name/score/date, `best()`.

## M3 — Views ✅
- [x] `index.html` home screen: high score display, mode selection (visual / audio / dual), settings summary.
- [x] `js/view/GridView.js` — configurable grid (3×3 default, 2–6), highlight + blink on repeated position, landscape/portrait safe.
- [x] `js/view/AudioView.js` — speaks lowercase letters via `speechSynthesis` (avoids "capital K" announcements), WebAudio tone fallback.
- [x] `js/view/GameScreen.js` — status bar (event x/y, correct count), match buttons, gentle shake/pop feedback.
- [x] `js/view/SettingsScreen.js`, `js/view/ScoresScreen.js`, `js/view/SummaryScreen.js`, `js/app.js` (navigator/composition root).

## M4 — Polish & higher-grade extras ✅
- [x] Settings persistence (M2), score list with sorting (M3).
- [x] Double input prevented per event (GameViewModel guard); end-of-round summary screen with modality-aware stats.
- [x] Responsive layout: fluid grid (`min(88vw, 60dvh)`), landscape side-by-side layout, safe-area padding, ≥44px touch targets.

## M5 — QA & documentation ✅
- [x] Manual QA checklist: `docs/testing.md` (phone/tablet/desktop, portrait/landscape, all modality flows).
- [x] README, AGENTS.md, spec.md reviewed and updated to final state.
- [x] Syntax check all modules (`node --check`), DOM id cross-check between views and `index.html`.

## Risks (all mitigated)
- Mobile autoplay restrictions → audio starts only after the Start-button gesture.
- `speechSynthesis` voice availability on Android → lowercase letters for clean pronunciation; WebAudio tone fallback.
