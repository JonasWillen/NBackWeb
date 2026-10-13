/**
 * GameViewModel — MVVM ViewModel
 * Owns the active round, drives the event timer, and exposes round state to the View.
 */
import { StimulusGenerator } from '../model/StimulusGenerator.js';
import { Round } from '../model/Round.js';
import { Score } from '../model/Score.js';

export class GameViewModel {
  /**
   * @param {object} settings validated settings (shape of SettingsViewModel.settings)
   */
  constructor(settings) {
    this.settings = settings;
    this.round = null;
    this.timer = null;
    this.state = 'idle'; // idle | running | finished
    this.listeners = new Set();
  }

  onChange(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit() {
    const snapshot = this.snapshot();
    this.listeners.forEach((l) => l(snapshot));
  }

  snapshot() {
    if (!this.round) {
      return { state: this.state, eventNumber: 0, correct: 0, event: null, score: null };
    }
    const s = this.round.stats;
    const correct = (s.position.hits + s.letter.hits) || 0;
    return {
      state: this.state,
      eventNumber: this.round.eventIndex + 1,
      eventCount: this.round.eventCount,
      correct,
      event: this.round.currentEvent,
      score: this.score,
    };
  }

  start() {
    const gen = new StimulusGenerator({
      eventCount: this.settings.eventCount,
      gridSize: this.settings.gridSize,
      n: this.settings.n,
      letters: this.settings.letters ?? this.settingsLetters(),
    });
    this.round = new Round(gen.generate(), {
      n: this.settings.n,
      eventCount: this.settings.eventCount,
      intervalMs: this.settings.intervalMs,
      modality: this.settings.modality,
    });
    this.score = null;
    this.state = 'running';
    this.tick();
    this.timer = setInterval(() => this.tick(), this.settings.intervalMs);
    this.emit();
  }

  settingsLetters() {
    const defaults = ['C', 'H', 'K', 'L', 'Q', 'R', 'S', 'T'];
    return defaults.slice(0, this.settings.letterCount ?? defaults.length);
  }

  tick() {
    if (this.round.eventIndex >= this.round.eventCount - 1) {
      this.stop();
      return;
    }
    this.round.advance();
    this.respondedThisEvent = { visual: false, audio: false };
    this.emit();
  }

  respond(stream, isMatchGuess = true) {
    if (this.state !== 'running' || !this.round) return null;
    if (this.respondedThisEvent?.[stream]) return null;
    this.respondedThisEvent[stream] = true;
    const result = this.round.recordResponse(stream, isMatchGuess);
    if (result) this.emit();
    return result;
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    if (this.round && this.state === 'running') {
      this.state = 'finished';
      this.score = Score.fromRound(this.round);
    }
    this.emit();
  }
}
