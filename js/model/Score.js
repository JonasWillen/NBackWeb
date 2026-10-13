/**
 * Score — Model (MVVM)
 * Computes a round score and serializes high score entries.
 */
export class Score {
  /**
   * @param {Round} round
   */
  static fromRound(round) {
    const rate = (s, total) => (total > 0 ? (s.hits / total) * 100 : 100) - s.falseAlarms * 2;
    const streams = [];
    if (round.tracks('visual')) {
      streams.push(rate(round.stats.position, round.totalMatches('visual')));
    }
    if (round.tracks('audio')) {
      streams.push(rate(round.stats.letter, round.totalMatches('audio')));
    }
    const value = Math.max(0, Math.round(streams.reduce((a, b) => a + b, 0) / streams.length));
    return new Score({ value, modality: round.modality, n: round.n, date: new Date().toISOString() });
  }

  constructor({ value, modality, n, date = null, playerName = null }) {
    this.value = value;
    this.modality = modality;
    this.n = n;
    this.date = date ?? new Date().toISOString();
    this.playerName = playerName;
  }

  toJSON() {
    return {
      value: this.value,
      modality: this.modality,
      n: this.n,
      date: this.date,
      playerName: this.playerName,
    };
  }
}

export function sortScores(entries, key) {
  const comparators = {
    name: (a, b) => (a.playerName ?? '').localeCompare(b.playerName ?? ''),
    score: (a, b) => b.value - a.value,
    date: (a, b) => new Date(b.date) - new Date(a.date),
  };
  return [...entries].sort(comparators[key] ?? comparators.score);
}
