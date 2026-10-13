/**
 * GameScreen — MVVM View
 * Plays a round: grid highlights, spoken letters, match buttons, status bar.
 */
import { GridView } from './GridView.js';
import { AudioView } from './AudioView.js';
import { GameViewModel } from '../viewmodel/GameViewModel.js';

export class GameScreen {
  /**
   * @param {object} deps
   * @param {SettingsViewModel} deps.settingsVM
   * @param {HighScoreViewModel} deps.scoresVM
   * @param {function} deps.onNavigate
   */
  constructor({ settingsVM, scoresVM, onNavigate }) {
    this.settingsVM = settingsVM;
    this.scoresVM = scoresVM;
    this.onNavigate = onNavigate;

    this.root = document.getElementById('game-screen');
    this.gridEl = this.root.querySelector('#game-grid');
    this.statusEl = this.root.querySelector('#game-status');
    this.eventNumEl = this.root.querySelector('#game-event-num');
    this.eventTotalEl = this.root.querySelector('#game-event-total');
    this.correctEl = this.root.querySelector('#game-correct');
    this.visualBtn = this.root.querySelector('#btn-match-visual');
    this.audioBtn = this.root.querySelector('#btn-match-audio');
    this.startOverlay = this.root.querySelector('#game-start-overlay');

    this.audio = new AudioView();
    this.gameVM = null;
    this.gridView = null;

    this.visualBtn.addEventListener('click', () => this.onMatch('visual', this.visualBtn));
    this.audioBtn.addEventListener('click', () => this.onMatch('audio', this.audioBtn));
    this.root.querySelector('#game-start').addEventListener('click', () => this.start());
    this.root.querySelector('#game-home').addEventListener('click', () => this.quit());
  }

  show() {
    this.prepare();
  }

  prepare() {
    const { gridSize, modality } = this.settingsVM.settings;
    this.gridView = new GridView(this.gridEl, gridSize);
    this.visualBtn.style.display = modality === 'audio' ? 'none' : '';
    this.audioBtn.style.display = modality === 'visual' ? 'none' : '';
    this.statusEl.style.display = 'none';
    this.startOverlay.style.display = 'flex';
    this.gridView.clear();
  }

  start() {
    const settings = { ...this.settingsVM.settings, letters: this.settingsVM.letters };
    this.gameVM = new GameViewModel(settings);
    this.gameVM.onChange((s) => this.render(s));
    this.startOverlay.style.display = 'none';
    this.statusEl.style.display = '';
    this.gameVM.start();
  }

  onMatch(stream, btn) {
    if (!this.gameVM || this.gameVM.state !== 'running') return;
    const result = this.gameVM.respond(stream, true);
    if (!result) return;
    btn.classList.remove('error', 'good');
    void btn.offsetWidth; // restart animation
    btn.classList.add(result.correct ? 'good' : 'error');
    if (!result.correct) {
      setTimeout(() => btn.classList.remove('error'), 450);
    } else {
      setTimeout(() => btn.classList.remove('good'), 350);
    }
  }

  render(s) {
    this.eventNumEl.textContent = String(Math.max(1, s.eventNumber));
    this.eventTotalEl.textContent = String(s.eventCount);
    this.correctEl.textContent = String(s.correct);

    const showsGrid = this.settingsVM.settings.modality !== 'audio';
    if (s.state === 'running' && showsGrid && s.event) {
      this.gridView.highlight(s.event.position);
    } else {
      this.gridView?.clear();
    }

    const playsAudio = this.settingsVM.settings.modality !== 'visual';
    if (s.state === 'running' && playsAudio && s.event) {
      this.audio.speak(s.event.letter);
    }

    if (s.state === 'finished' && s.score) {
      this.audio.stop();
      this.onNavigate('summary-screen', { score: s.score.toJSON(), stats: this.gameVM.round.stats });
    }
  }

  quit() {
    this.gameVM?.stop();
    this.audio.stop();
    this.onNavigate('home-screen');
  }
}
