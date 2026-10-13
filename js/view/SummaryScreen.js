/**
 * SummaryScreen — MVVM View
 * End-of-round results and score saving.
 */
export class SummaryScreen {
  constructor({ scoresVM, onNavigate }) {
    this.scoresVM = scoresVM;
    this.onNavigate = onNavigate;
    this.root = document.getElementById('summary-screen');
    this.score = null;

    this.root.querySelector('#summary-home').addEventListener('click', () =>
      this.onNavigate('home-screen')
    );
    this.root.querySelector('#summary-replay').addEventListener('click', () =>
      this.onNavigate('game-screen')
    );
    this.root.querySelector('#summary-save').addEventListener('click', () => {
      const name = this.root.querySelector('#summary-name').value;
      if (this.score) this.scoresVM.add(this.score, name);
      this.onNavigate('home-screen');
    });
  }

  show(payload) {
    this.score = payload?.score ?? null;
    const stats = payload?.stats;
    const rows = [
      ['Score', this.score ? String(this.score.value) : '—'],
      ['Mode', this.score?.modality ?? '—'],
      ['n-back level', String(this.score?.n ?? '—')],
    ];
    if (stats) {
      rows.push(['Visual hits', `${stats.position.hits}/${stats.position.hits + stats.position.misses}`]);
      rows.push(['Audio hits', `${stats.letter.hits}/${stats.letter.hits + stats.letter.misses}`]);
      rows.push(['False alarms', String(stats.position.falseAlarms + stats.letter.falseAlarms)]);
    }
    this.root.querySelector('#summary-rows').innerHTML = rows
      .map(([k, v]) => `<div><span class="muted">${k}:</span> <strong>${v}</strong></div>`)
      .join('');
    this.root.querySelector('#summary-name').value = '';
  }
}
