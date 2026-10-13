/**
 * HighScoreViewModel — MVVM ViewModel
 * Persists score entries and provides sorted access by name, score, or date.
 */
import { Storage, STORAGE_KEYS } from '../model/Storage.js';
import { sortScores } from '../model/Score.js';

const MAX_ENTRIES = 100;

export class HighScoreViewModel {
  constructor(storage = new Storage()) {
    this.storage = storage;
    this.entries = this.load();
    this.listeners = new Set();
  }

  load() {
    const saved = this.storage.readJSON(STORAGE_KEYS.scores, []);
    return Array.isArray(saved) ? saved : [];
  }

  persist() {
    this.storage.writeJSON(STORAGE_KEYS.scores, this.entries);
  }

  onChange(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit() {
    this.listeners.forEach((l) => l(this.entries));
  }

  /**
   * @param {{value:number, modality:string, n:number, date?:string}} score
   * @param {string|null} playerName
   */
  add(score, playerName = null) {
    const entry = { ...score, playerName: playerName?.trim() || 'Anonymous' };
    this.entries = [entry, ...this.entries].slice(0, MAX_ENTRIES);
    this.persist();
    this.emit();
    return entry;
  }

  sortedBy(key) {
    return sortScores(this.entries, key);
  }

  best() {
    return this.entries.length ? Math.max(...this.entries.map((e) => e.value)) : 0;
  }

  clear() {
    this.entries = [];
    this.persist();
    this.emit();
  }
}
