/**
 * SettingsScreen — MVVM View
 * Editable persistent settings.
 */
export class SettingsScreen {
  constructor({ settingsVM, onNavigate }) {
    this.settingsVM = settingsVM;
    this.onNavigate = onNavigate;
    this.root = document.getElementById('settings-screen');

    this.fields = {
      modality: this.root.querySelector('#set-modality'),
      n: this.root.querySelector('#set-n'),
      eventCount: this.root.querySelector('#set-events'),
      intervalMs: this.root.querySelector('#set-interval'),
      gridSize: this.root.querySelector('#set-grid'),
      letterCount: this.root.querySelector('#set-letters'),
    };

    this.root.querySelector('#settings-save').addEventListener('click', () => {
      this.settingsVM.update({
        modality: this.fields.modality.value,
        n: Number(this.fields.n.value),
        eventCount: Number(this.fields.eventCount.value),
        intervalMs: Number(this.fields.intervalMs.value),
        gridSize: Number(this.fields.gridSize.value),
        letterCount: Number(this.fields.letterCount.value),
      });
      this.onNavigate('home-screen');
    });
    this.root.querySelector('#settings-back').addEventListener('click', () =>
      this.onNavigate('home-screen')
    );
  }

  show() {
    const s = this.settingsVM.settings;
    this.fields.modality.value = s.modality;
    this.fields.n.value = String(s.n);
    this.fields.eventCount.value = String(s.eventCount);
    this.fields.intervalMs.value = String(s.intervalMs);
    this.fields.gridSize.value = String(s.gridSize);
    this.fields.letterCount.value = String(s.letterCount);
  }
}
