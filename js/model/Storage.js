/**
 * Storage — persistence adapter (Model layer boundary)
 * Thin wrapper around localStorage so ViewModels stay testable.
 */
export class Storage {
  constructor(store = globalThis.localStorage) {
    this.store = store;
  }

  readJSON(key, fallback = null) {
    try {
      const raw = this.store?.getItem(key);
      return raw === null || raw === undefined ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  writeJSON(key, value) {
    try {
      this.store?.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
}

export const STORAGE_KEYS = {
  settings: 'nback.settings',
  scores: 'nback.scores',
};
