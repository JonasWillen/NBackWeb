/**
 * ScoresScreen — MVVM View
 * List of saved scores, sortable by name, score, and date.
 */
export class ScoresScreen {
  constructor({ scoresVM, onNavigate }) {
    this.scoresVM = scoresVM;
    this.onNavigate = onNavigate;
    this.root = document.getElementById('scores-screen');
    this.listEl = this.root.querySelector('#scores-list');
    this.sortKey = 'score';

    this.root.querySelectorAll('.sort-btn').forEach((btn) =>
      btn.addEventListener('click', () => {
        this.sortKey = btn.dataset.sort;
        this.root
          .querySelectorAll('.sort-btn')
          .forEach((b) => b.classList.toggle('selected', b === btn));
        this.render();
      })
    );
    this.root.querySelector('#scores-back').addEventListener('click', () =>
      this.onNavigate('home-screen')
    );
    this.scoresVM.onChange(() => this.render());
  }

  show() {
    this.render();
  }

  render() {
    const entries = this.scoresVM.sortedBy(this.sortKey);
    const rankByScore = new Map(this.scoresVM.sortedBy('score').map((e, i) => [e, i]));
    const medals = ['🥇', '🥈', '🥉'];
    this.listEl.innerHTML =
      entries.length === 0
        ? '<li class="muted">No scores yet — play a round!</li>'
        : entries
            .map((e) => {
              const rank = rankByScore.get(e) ?? 0;
              const badge = medals[rank] ?? `#${rank + 1}`;
              return `<li>
                <span class="rank-badge">${badge}</span>
                <span class="score-main">${escapeHtml(e.playerName ?? 'Anonymous')}
                  <span class="muted">· ${e.modality} · n=${e.n}</span></span>
                <span class="muted">${new Date(e.date).toLocaleDateString()}</span>
                <span class="score-value">${e.value}</span>
              </li>`;
            })
            .join('');
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}
