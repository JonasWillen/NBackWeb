/**
 * SettingsViewModel — MVVM ViewModel
 * Owns game settings, validates them, and persists to localStorage.
 */
import { Storage, STORAGE_KEYS } from '../model/Storage.js';
import { DEFAULT_LETTERS } from '../model/StimulusGenerator.js';

export const DEFAULT_SETTINGS = Object.freeze({
  modality: 'visual',
  n: 2,
  eventCount: 20,
  intervalMs: 2500,
  gridSize: 3,
  letterCount: 8,
});

const LIMITS = Object.freeze({
  n: { min: 1, max: 9 },
  eventCount: { min: 5, max: 100 },
  intervalMs: { min: 1000, max: 6000 },
  gridSize: { min: 2, max: 6 },
  letterCount: { min: 2, max: DEFAULT_LETTERS.length },
});

const MODALITIES = new Set(['visual', 'audio', 'dual']);

export class SettingsViewModel {
  constructor(storage = new Storage()) {
    this.storage = storage;
    this.settings = this.load();
    this.listeners = new Set();
  }

  onChange(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit() {
    this.listeners.forEach((l) => l(this.settings));
  }

  load() {
    const saved = this.storage.readJSON(STORAGE_KEYS.settings, {});
    const merged = { ...DEFAULT_SETTINGS, ...saved };
    return this.sanitize(merged);
  }

  sanitize(s) {
    const clamp = (v, { min, max }, fallback) =>
      Number.isFinite(Number(v)) ? Math.min(max, Math.max(min, Math.round(Number(v)))) : fallback;

    return {
      modality: MODALITIES.has(s.modality) ? s.modality : DEFAULT_SETTINGS.modality,
      n: clamp(s.n, LIMITS.n, DEFAULT_SETTINGS.n),
      eventCount: clamp(s.eventCount, LIMITS.eventCount, DEFAULT_SETTINGS.eventCount),
      intervalMs: clamp(s.intervalMs, LIMITS.intervalMs, DEFAULT_SETTINGS.intervalMs),
      gridSize: clamp(s.gridSize, LIMITS.gridSize, DEFAULT_SETTINGS.gridSize),
      letterCount: clamp(s.letterCount, LIMITS.letterCount, DEFAULT_SETTINGS.letterCount),
    };
  }

  get letters() {
    return DEFAULT_LETTERS.slice(0, this.settings.letterCount);
  }

  update(patch) {
    this.settings = this.sanitize({ ...this.settings, ...patch });
    this.storage.writeJSON(STORAGE_KEYS.settings, this.settings);
    this.emit();
    return this.settings;
  }

  reset() {
    return this.update(DEFAULT_SETTINGS);
  }

  summary() {
    const { modality, n, eventCount, intervalMs } = this.settings;
    const label = { visual: 'Visual', audio: 'Audio', dual: 'Dual' }[modality];
    return `${label} · n=${n} · ${eventCount} events · ${intervalMs / 1000}s interval`;
  }
}
