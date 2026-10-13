# spec.md — Dual N-back Web App

## 1. Purpose
A browser-based Dual N-back game that trains and measures working memory, per the HI1033 Lab B.1 assignment. The game must be usable on a smartphone (touch-first), and deployable as a static site on GitHub Pages.

## 2. Background
The n-back task presents a sequence of stimuli and asks the user to respond when the current stimulus matches the one from *n* steps earlier. The **dual** variant presents two independent stimulus streams simultaneously — typically one visual (position in a grid) and one auditory (a spoken letter).

## 3. Functional requirements

### 3.1 Basic (single n-back) — pass level
- **Home screen**: shows current high score and lets the user choose between visual or auditory stimuli.
- **Game screen**: runs one round of n-back.
- Visual stimuli are shown in a **3×3 grid** (one cell lights up per event).
- Auditory stimuli are **spoken letters** from a limited set (e.g. C, H, K, L, Q, R, S, T).
- User controls: **start a new round** and **input an n-back match** (separate buttons/keys for visual and auditory matches in dual mode).
- Home screen shows current settings: modality (visual/audio), value of n, time between events, number of events per round.
- During a round the app shows state: current event number and number of correct responses.
- **Non-offensive feedback** on an erroneous guess (e.g. gentle color/size animation of the pressed button — no red flashing or harsh sound).

### 3.2 Higher level (dual n-back + at least one extra)
- **Dual n-back**: visual and auditory streams presented simultaneously; user must track both.
- At least one of:
  1. **Settings screen** (persistent): number of events per round, time between events, value of n, grid size (e.g. 5×5 vs 3×3), number of spoken letters.
  2. **High score list**: save score under a name; view all scores sorted by name, score, or date.
  3. Full responsiveness in both landscape and portrait, from small phones to tablets.

Goal: implement dual n-back **and all three** extras.

## 4. Non-functional requirements
- **Mobile-first**: touch targets ≥ 44 px, no hover-only interactions, works one-handed in portrait.
- **Responsive**: fluid layout for 320 px–1200 px+ widths, portrait and landscape.
- **Static deployment**: no backend; runs on GitHub Pages. Persistence via `localStorage`.
- **Audio**: spoken letters via Web Speech API (`speechSynthesis`) with graceful fallback to short tones if unavailable.
- **Code quality**: MVVM separation; classes named after their usage; no god objects.

## 5. Scoring
- A round produces a score: e.g. percentage of correctly identified matches (hits) minus penalties for false alarms, per modality, combined for dual mode. Score is saved with player name and date.

## 6. Out of scope
- Native iOS/Android wrappers (the C model from the original lab is replaced by a JavaScript stimulus generator).
- Multiplayer, accounts, or server-side leaderboards.
