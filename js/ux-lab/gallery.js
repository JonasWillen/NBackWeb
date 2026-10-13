/**
 * Theme gallery UI — renders the 12 theme swatch cards and applies themes live.
 */
import { THEMES, applyTheme } from './themes.js';

export function buildThemeGallery(container) {
  const current = document.createElement('div');
  current.id = 'theme-current';
  current.style.cssText = 'font-size:0.85rem;color:var(--muted);text-align:center;min-height:1.2em;margin-top:0.5rem';
  const grid = document.createElement('div');
  grid.className = 'ux-grid';

  THEMES.forEach((theme) => {
    const card = document.createElement('section');
    card.className = 'ux-card theme-card';
    card.dataset.themeId = theme.id;
    const swatches = ['bg', 'surface', 'surface-2', 'fg', 'accent', 'good', 'bad']
      .map((k) => `<span style="background:${theme.vars[k]}"></span>`)
      .join('');
    card.innerHTML = `
      <div class="swatch-row">${swatches}</div>
      <h3>${theme.name}</h3>
      <p>${theme.vibe}</p>
      <button class="demo-btn">Apply</button>`;
    card.querySelector('.demo-btn').addEventListener('click', () => {
      const applied = applyTheme(document.documentElement, theme.id);
      current.textContent = `Applied: ${applied.name}`;
      document.querySelectorAll('.theme-card').forEach((c) =>
        c.classList.toggle('selected', c.dataset.themeId === theme.id)
      );
    });
    grid.append(card);
  });

  container.append(grid, current);
  applyTheme(document.documentElement, THEMES[0].id);
  grid.children[0].classList.add('selected');
}
