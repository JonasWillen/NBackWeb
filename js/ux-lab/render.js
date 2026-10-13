/**
 * UX Lab renderer — builds 20 concept cards with tiny self-contained demos.
 * Each demo runs a canned mock stimulus sequence so the interaction can be felt, not just seen.
 */

const SEQ = [4, 1, 4, 7, 0, 4, 2, 8, 2, 5];

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function card(parent, { name, tag, desc }) {
  const cardEl = el('section', 'ux-card');
  const head = el('div');
  head.append(el('h3', '', name), el('span', 'tag', tag));
  head.style.display = 'flex';
  head.style.justifyContent = 'space-between';
  head.style.alignItems = 'center';
  head.style.gap = '0.5rem';
  cardEl.append(head, el('p', '', desc));
  const demo = el('div', 'demo');
  cardEl.append(demo);
  parent.append(cardEl);
  return demo;
}

function playerButton(demo, onStart, label = '▶ Play') {
  const btn = el('button', 'demo-btn', label);
  btn.addEventListener('click', () => {
    btn.disabled = true;
    onStart(() => { btn.disabled = false; });
  });
  demo.append(btn);
  return btn;
}

function runSequence(step, onDone) {
  let i = 0;
  const tick = () => {
    step(i, SEQ[i]);
    i += 1;
    if (i < SEQ.length) setTimeout(tick, 600);
    else setTimeout(onDone, 600);
  };
  tick();
}

function resetChildren(node, count, cls) {
  node.innerHTML = '';
  for (let i = 0; i < count; i += 1) node.append(el('div', cls));
}

/* ---------- helpers per concept ---------- */

const gameConcepts = [
  {
    name: '1 · Neumorphic grid', tag: '3×3 grid · soft',
    desc: 'Current default direction: soft shadows, the active cell lifts with a glow. Familiar and calm.',
    build(demo) {
      const grid = el('div', 'demo-grid');
      resetChildren(grid, 9);
      demo.append(grid);
      playerButton(demo, (done) => runSequence((i, pos) => {
        [...grid.children].forEach((c, idx) => c.classList.toggle('on', idx === pos));
      }, done));
    },
  },
  {
    name: '2 · Radial clock', tag: 'position around a ring',
    desc: 'Stimuli appear at clock positions on a ring. Great spatial memory mapping; positions are always equidistant from center.',
    build(demo) {
      const ring = el('div', 'ring');
      resetChildren(ring, 9);
      [...ring.children].forEach((c, i) => {
        c.style.clipPath = 'none';
        const angle = (i / 9) * Math.PI * 2;
        c.style.inset = '';
        c.style.width = c.style.height = '18px';
        c.style.borderRadius = '50%';
        c.style.left = `calc(50% + ${Math.cos(angle) * 45}px - 9px)`;
        c.style.top = `calc(50% + ${Math.sin(angle) * 45}px - 9px)`;
        c.style.position = 'absolute';
      });
      demo.append(ring);
      playerButton(demo, (done) => runSequence((i, pos) => {
        [...ring.children].forEach((c, idx) => c.classList.toggle('on', idx === pos % 9));
      }, done));
    },
  },
  {
    name: '3 · Slider timeline', tag: 'sequential strip',
    desc: 'A thumb slides along a track; each stimulus is a tick on the strip. Makes the "n steps back" distance physically visible.',
    build(demo) {
      const track = el('div', 'slider-track');
      const thumb = el('div', 'slider-thumb');
      track.append(thumb);
      demo.append(track);
      playerButton(demo, (done) => runSequence((i) => {
        thumb.style.left = `calc(${(i / (SEQ.length - 1)) * 100}% - 9px)`;
        thumb.style.background = i >= 2 && SEQ[i] === SEQ[i - 2] ? 'var(--good)' : 'var(--accent)';
      }, done));
    },
  },
  {
    name: '4 · Fingerprint circles', tag: 'concentric rings',
    desc: 'Each n-level is its own ring — inner ring = 1-back, outer = n-back. Stimuli ripple outward; you watch the ring your n lives on.',
    build(demo) {
      const wrap = el('div', '', '');
      wrap.style.cssText = 'position:relative;width:120px;height:120px';
      for (let r = 0; r < 3; r += 1) {
        const ring = el('div');
        ring.style.cssText = `position:absolute;inset:${r * 18}px;border:3px solid var(--surface-2);border-radius:50%`;
        wrap.append(ring);
      }
      demo.append(wrap);
      playerButton(demo, (done) => runSequence((i, pos) => {
        [...wrap.children].forEach((c, r) => {
          c.style.borderColor = r === pos % 3 ? 'var(--accent)' : 'var(--surface-2)';
          c.style.boxShadow = r === pos % 3 ? '0 0 12px var(--accent)' : 'none';
        });
      }, done));
    },
  },
  {
    name: '5 · Color flip', tag: 'full-screen flash',
    desc: 'Instead of position, the whole screen flashes a color; match = same color as n back. Immersive, zero fine-motor demands.',
    build(demo) {
      const swatch = el('div');
      swatch.style.cssText = 'width:90px;height:90px;border-radius:16px;background:var(--surface-2);transition:background 0.2s';
      demo.append(swatch);
      const hues = [200, 280, 130, 40];
      playerButton(demo, (done) => runSequence((i, pos) => {
        swatch.style.background = `hsl(${hues[pos % hues.length]} 80% 60%)`;
      }, done));
    },
  },
  {
    name: '6 · Big letter card', tag: 'typographic',
    desc: 'For audio-averse environments: a giant letter replaces speech. Same dual-stream idea, fully visual, silent.',
    build(demo) {
      const letter = el('div', '', 'C');
      letter.style.cssText = 'font-size:4rem;font-weight:800;color:var(--accent)';
      demo.append(letter);
      const letters = 'CHK LQRS'.replace(' ', '').split('');
      playerButton(demo, (done) => runSequence((i, pos) => {
        letter.textContent = letters[pos % letters.length];
        letter.style.color = i >= 2 && SEQ[i] === SEQ[i - 2] ? 'var(--good)' : 'var(--accent)';
      }, done));
    },
  },
  {
    name: '7 · Progress bar round', tag: 'event progress',
    desc: 'A single bar fills across the round; stimulus markers drop onto it. Gives a strong "how much is left" sense.',
    build(demo) {
      const bar = el('div', 'bar-fill');
      const inner = el('div');
      bar.append(inner);
      demo.append(bar);
      playerButton(demo, (done) => runSequence((i) => {
        inner.style.width = `${((i + 1) / SEQ.length) * 100}%`;
      }, done));
    },
  },
  {
    name: '8 · Spin wheel', tag: 'attention anchor',
    desc: 'A wheel spins between events as a "loading" rhythm; the cell flash happens on the beat. Good for pacing longer intervals.',
    build(demo) {
      const spin = el('div', 'spin-btn');
      demo.append(spin);
      playerButton(demo, (done) => runSequence((i) => {
        spin.style.animationPlayState = i % 2 ? 'paused' : 'running';
      }, done));
    },
  },
  {
    name: '9 · Keyboard map', tag: 'desktop-friendly',
    desc: 'Grid mapped onto a visual keyboard (QWE/ASD/ZXC); works with physical keys on desktop, taps on mobile. Shows the key binding inline.',
    build(demo) {
      const kb = el('div', 'keyboard');
      'QWEASDZXC'.split('').forEach((k) => kb.append(el('div', '', k)));
      demo.append(kb);
      playerButton(demo, (done) => runSequence((i, pos) => {
        [...kb.children].forEach((c, idx) => c.classList.toggle('on', idx === pos));
      }, done));
    },
  },
  {
    name: '10 · Dot strip timeline', tag: 'history visible',
    desc: 'Past events shrink into a row of dots at the top — you literally see the last few stimuli lined up. Reduces working-memory load.',
    build(demo) {
      const strip = el('div', 'timeline');
      for (let i = 0; i < 10; i += 1) strip.append(el('span'));
      demo.append(strip);
      playerButton(demo, (done) => runSequence((i) => {
        [...strip.children].forEach((c, idx) => {
          c.classList.toggle('on', idx === i);
          c.classList.toggle('past', idx < i);
        });
      }, done));
    },
  },
  {
    name: '11 · Dual half-split', tag: 'dual mode layout',
    desc: 'Screen splits: top half = visual stream, bottom half = audio waveform. Each half has its own match button — clear ownership in dual mode.',
    build(demo) {
      const wrap = el('div');
      wrap.style.cssText = 'display:flex;flex-direction:column;gap:6px;width:100%';
      const top = el('div', 'demo-grid');
      top.style.cssText += ';width:72px;height:72px;margin:0 auto';
      resetChildren(top, 9);
      const wave = el('div');
      wave.style.cssText = 'height:30px;display:flex;gap:3px;align-items:center;justify-content:center';
      for (let i = 0; i < 12; i += 1) {
        const b = el('div');
        b.style.cssText = `width:5px;border-radius:3px;background:var(--accent);height:${8 + ((i * 13) % 20)}px`;
        wave.append(b);
      }
      wrap.append(top, wave);
      demo.append(wrap);
      playerButton(demo, (done) => runSequence((i, pos) => {
        [...top.children].forEach((c, idx) => c.classList.toggle('on', idx === pos));
        [...wave.children].forEach((c) => {
          c.style.height = `${6 + Math.random() * 24}px`;
        });
      }, done));
    },
  },
  {
    name: '12 · Peek ghost', tag: 'assist mode',
    desc: 'Accessibility/easy mode: the cell from n steps back shows as a faint ghost. Beginners can "cheat-peek" until they learn the mechanics.',
    build(demo) {
      const grid = el('div', 'demo-grid');
      resetChildren(grid, 9);
      demo.append(grid);
      playerButton(demo, (done) => runSequence((i, pos) => {
        [...grid.children].forEach((c, idx) => {
          c.classList.toggle('on', idx === pos);
          c.style.opacity = i >= 2 && idx === SEQ[i - 2] && idx !== pos ? '0.45' : '1';
          c.style.background = c.classList.contains('on')
            ? 'var(--accent)'
            : i >= 2 && idx === SEQ[i - 2]
              ? 'var(--good)'
              : '';
        });
      }, done));
    },
  },
];

const menuConcepts = [
  {
    name: '13 · Mode chips', tag: 'home menu',
    desc: 'Compact chips instead of big cards. Dense, one-thumb reachable at the bottom, leaves room for stats above.',
    build(demo) {
      const chips = el('div', 'chips');
      ['👀 Visual', '🔊 Audio', '⚡ Dual'].forEach((c, i) => chips.append(el('div', i === 0 ? 'chip hot' : 'chip', c)));
      demo.append(chips);
    },
  },
  {
    name: '14 · Bottom sheet', tag: 'settings',
    desc: 'Settings live in a swipe-up sheet over the game — no page navigation, context is preserved.',
    build(demo) {
      const sheet = el('div', 'bottom-sheet');
      sheet.append(el('div', 'handle'), el('p', '', 'Settings pull-up'));
      sheet.querySelector('p').style.cssText = 'margin:0;color:var(--muted);font-size:0.75rem;text-align:center';
      demo.classList.add('sheet-closed');
      demo.style.minHeight = '170px';
      demo.append(sheet);
      playerButton(demo, (done) => {
        demo.classList.add('sheet-open');
        setTimeout(() => { demo.classList.remove('sheet-open'); done(); }, 1600);
      }, '▾ Open sheet');
    },
  },
  {
    name: '15 · Segmented control', tag: 'inline setting',
    desc: 'n-level as a segmented toggle: 1 | 2 | 3. Fastest possible way to change one value; no keyboard needed.',
    build(demo) {
      const seg = el('div');
      seg.style.cssText = 'display:flex;gap:6px';
      [1, 2, 3, 4].forEach((n, i) => seg.append(el('button', i === 1 ? 'btn on' : 'btn', String(n))));
      demo.append(seg);
      seg.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') return;
        [...seg.children].forEach((b) => b.classList.remove('on'));
        e.target.classList.add('on');
      });
    },
  },
  {
    name: '16 · Page dots', tag: 'navigation',
    desc: 'iOS-style dots for Home / Game / Scores; horizontal swipe between screens.',
    build(demo) {
      const dots = el('div', 'dots');
      ['Home', 'Game', 'Scores'].forEach((_, i) => dots.append(el('span', i === 0 ? 'on' : '')));
      demo.append(dots);
      let cur = 0;
      playerButton(demo, (done) => {
        const t = setInterval(() => {
          cur = (cur + 1) % 3;
          [...dots.children].forEach((d, i) => d.classList.toggle('on', i === cur));
        }, 700);
        setTimeout(() => { clearInterval(t); done(); }, 2200);
      }, '↔ Swipe');
    },
  },
  {
    name: '17 · HUD overlay', tag: 'in-game stats',
    desc: 'Stats (event x/y, correct) live as a translucent HUD at the very top — never covers the grid, glanceable.',
    build(demo) {
      const hud = el('div');
      hud.style.cssText = 'position:absolute;top:0;left:0;right:0;background:rgba(30,41,59,0.85);padding:0.5rem;font-size:0.75rem;display:flex;justify-content:space-between';
      hud.append(el('span', '', 'Event <b>3/20</b>'), el('span', '', 'Correct <b>2</b>'));
      demo.append(hud);
      const grid = el('div', 'demo-grid');
      resetChildren(grid, 9);
      demo.append(grid);
      playerButton(demo, (done) => runSequence((i, pos) => {
        [...grid.children].forEach((c, idx) => c.classList.toggle('on', idx === pos));
        hud.children[0].innerHTML = `Event <b>${i + 1}/20</b>`;
      }, done));
    },
  },
  {
    name: '18 · FAB quick-start', tag: 'home action',
    desc: 'Material-style floating action button: one tap restarts the last mode. Supports the "train daily" use pattern.',
    build(demo) {
      const fab = el('button', 'demo-btn', '▶');
      fab.style.cssText = 'width:64px;height:64px;border-radius:50%;font-size:1.4rem';
      demo.append(fab);
      let taps = 0;
      fab.addEventListener('click', () => {
        taps += 1;
        fab.textContent = taps < 3 ? '⏱' : '▶';
      });
    },
  },
  {
    name: '19 · Streak calendar', tag: 'motivation',
    desc: 'Home shows a training streak (GitHub-contribution style). Motivates repeated play — the core of n-back training.',
    build(demo) {
      const cal = el('div');
      cal.style.cssText = 'display:grid;grid-template-columns:repeat(7,1fr);gap:4px;width:140px';
      for (let i = 0; i < 28; i += 1) {
        const cell = el('div');
        const lvl = [0, 1, 2, 3][i % 4];
        cell.style.cssText = `aspect-ratio:1;border-radius:4px;background:hsl(200 ${30 + lvl * 20}% ${45 - lvl * 8}%)`;
        cal.append(cell);
      }
      demo.append(cal);
    },
  },
  {
    name: '20 · Result share card', tag: 'summary',
    desc: 'End-of-round summary as a pretty shareable card (score, mode, streak) — tap to copy/share. Social hook for scores.',
    build(demo) {
      const shareCard = el('div');
      shareCard.style.cssText = 'background:var(--surface-2);border-radius:14px;padding:1rem;text-align:center;min-width:170px';
      shareCard.innerHTML = `<div style="font-size:0.7rem;color:var(--muted)">DUAL · n=2</div>
        <div style="font-size:2.2rem;font-weight:800;color:var(--accent)">87</div>
        <div style="font-size:0.7rem;color:var(--muted)">Best round this week 🔥</div>`;
      demo.append(shareCard);
      playerButton(demo, (done) => {
        shareCard.style.outline = '2px solid var(--good)';
        setTimeout(() => { shareCard.style.outline = 'none'; done(); }, 900);
      }, 'Tap to share');
    },
  },
];

function render() {
  const gameRoot = document.getElementById('game-concepts');
  const menuRoot = document.getElementById('menu-concepts');
  gameConcepts.forEach((c) => c.build(card(gameRoot, c)));
  menuConcepts.forEach((c) => c.build(card(menuRoot, c)));
}

render();
