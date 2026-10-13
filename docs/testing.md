# testing.md — Manual QA Checklist

Run locally first: `python3 -m http.server 8000` → open http://localhost:8000.
Then repeat key checks on https://jonaswillen.github.io/NBackWeb/ after each release.

## Home screen
- [ ] Best score shows the highest saved score (0 when empty).
- [ ] Tapping a mode card (Visual / Audio / Dual) navigates to the game screen.
- [ ] Settings summary line matches current settings.

## Game — visual mode
- [ ] Grid shows 3×3 (or configured size) and one cell lights up per event.
- [ ] Status bar counts events (x/total) and correct responses.
- [ ] Tapping **Position match** on a true n-back repeat: green pop animation, correct count +1.
- [ ] Tapping it on a non-match: gentle pink shake (non-offensive).
- [ ] Repeated identical position on consecutive events: the cell blinks.

## Game — audio mode
- [ ] Letters are spoken each event; the voice says "k", "j" — **not** "capital k".
- [ ] Grid is hidden; only **Sound match** button is visible.
- [ ] If no speech voice is available, a distinct tone per letter plays instead.

## Game — dual mode
- [ ] Grid highlights and a letter is spoken simultaneously.
- [ ] Both match buttons are visible and independently judged.
- [ ] One response per stream per event (second tap in the same event is ignored).

## Round end
- [ ] Summary shows score, mode, n, and per-modality hits (visual hits hidden in audio mode and vice versa).
- [ ] Saving under a name adds it to the scores list (blank name → "Anonymous").
- [ ] Play again starts a fresh round with the same settings.

## Settings
- [ ] All fields editable and saved; values persist after reload (localStorage).
- [ ] Invalid values are clamped to allowed ranges.

## Scores
- [ ] Entries sortable by Score, Name, and Date.
- [ ] Empty state shows a friendly message.

## Responsive / devices
- [ ] Phone portrait (~375 px) and landscape (~667×375): grid and buttons fit without scrolling; landscape uses side-by-side layout.
- [ ] Tablet (~768 px+): content stays centered, grid max 420 px.
- [ ] Touch targets ≥ 44 px; no hover-only interactions.
- [ ] Notched phones: content respects safe areas.

## Regression checks
- [ ] `node --check` passes on every `js/**/*.js`.
- [ ] DOM id cross-check: every id referenced in `js/view/**` and `js/app.js` exists in `index.html`.
