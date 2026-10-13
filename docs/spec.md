# spec.md — Dual N-back Web App

## 1. Purpose
A browser-based Dual N-back game that trains and measures working memory, per the HI1033 Lab B.1 assignment. Touch-first on smartphones, deployable as a static site on GitHub Pages.

## 2. Background
The n-back task presents a sequence of stimuli and asks the user to respond when the current stimulus matches the one from *n* steps earlier. The **dual** variant presents two independent streams simultaneously — visual (grid position) and auditory (a spoken letter).

## 3. Functional requirements

### 3.1 Basic (single n-back) — implemented
- **Home screen**: best score, mode selection (visual / audio / dual), settings summary.
- **Game screen**: one round of n-back per session.
- Visual stimuli in a **3×3 grid** (configurable 2–6); one cell lights up per event.
- Auditory stimuli: **spoken letters** from a limited set (C, H, K, L, Q, R, S, T; count configurable).
- User controls: **start a new round** and **match input** buttons (separate per stream in dual mode).
- Home screen shows current settings: modality, n, interval, events per round.
- During a round: current event number and correct-response count.
- **Non-offensive feedback** on wrong guesses: gentle shake/color animation; a small blink marks a repeated grid cell.

### 3.2 Higher level — implemented
- **Dual n-back** with independent visual and audio streams judged separately; one response per stream per event.
- All three extras:
  1. **Settings screen** (persistent via localStorage): events per round, interval, n, grid size, letter count.
  2. **High score list**: save under a name, sort by name/score/date.
  3. **Full responsiveness**: portrait & landscape, phones through tablets.

## 4. Non-functional requirements
- Mobile-first: touch targets ≥ 44 px, no hover-only interactions, safe-area aware.
- Responsive from 320 px to 1200 px+ widths.
- Static deployment on GitHub Pages; no backend; persistence via `localStorage`.
- Audio via Web Speech API with lowercase input (avoids "capital K" announcements); WebAudio tone fallback.
- MVVM separation; classes named after usage; no god objects.

## 5. Scoring
Per stream: hit rate (hits/total matches, 100% if no matches) minus 2 points per false alarm; final score is the average across active streams, clamped at 0.

## 6. Out of scope
- Native iOS/Android wrappers; the C model from the original lab is replaced by a JavaScript stimulus generator.
- Multiplayer, accounts, server-side leaderboards.
