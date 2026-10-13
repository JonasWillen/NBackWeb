/**
 * HomeScreen — MVVM View
 * High score, mode selection, settings summary, navigation.
 */
export class HomeScreen {
  /**
   * @param {object} deps
   * @param {SettingsViewModel} deps.settingsVM
   * @param {HighScoreViewModel} deps.scoresVM
   * @param {function} deps.onNavigate(screenId, payload)
   */
  constructor({ settingsVM, scoresVM, onNavigate }) {
    this.settingsVM = settingsVM;
    this.scoresVM = scoresVM;
    this.onNavigate = onNavigate;

    this.root = document.getElementById('home-screen');
    this.bestEl = this.root.querySelector('#home-best');
    this.summaryEl = this.root.querySelector('#home-summary');
    this.visualBtn = this.root.querySelector('[data-mode="visual"]');
    this.audioBtn = this.root.querySelector('[data-mode="audio"]');
    this.dualBtn = this.root.querySelector('[data-mode="dual"]');

    this.visualBtn.addEventListener('click', () => this.selectMode('visual'));
    this.audioBtn.addEventListener('click', () => this.selectMode('audio'));
    this.dualBtn.addEventListener('click', () => this.selectMode('dual'));
    this.root.querySelector('#home-settings').addEventListener('click', () =>
      this.onNavigate('settings-screen')
    );
    this.root.querySelector('#home-scores').addEventListener('click', () =>
      this.onNavigate('scores-screen')
    );

    this.settingsVM.onChange(() => this.refresh());
    this.scoresVM.onChange(() => this.refresh());
    this.refresh();
  }

  selectMode(mode) {
    this.settingsVM.update({ modality: mode });
    this.refresh();
    this.onNavigate('game-screen');
  }

  refresh() {
    this.bestEl.textContent = String(this.scoresVM.best());
    this.summaryEl.innerHTML = this.settingsVM.summary().replace(/(\b[^·]+\b)/g, (m) => `<strong>${m}</strong>`);
    const current = this.settingsVM.settings.modality;
    [this.visualBtn, this.audioBtn, this.dualBtn].forEach((btn) =>
      btn.classList.toggle('selected', btn.dataset.mode === current)
    );
  }
}
