/**
 * Round — Model (MVVM)
 * Holds settings and mutable state of one n-back round and judges match inputs.
 */
export class Round {
  /**
   * @param {Array<{position:number, letter:string, positionMatch:boolean, letterMatch:boolean}>} events
   * @param {object} options
   * @param {number} options.n
   * @param {number} options.eventCount
   * @param {number} options.intervalMs
   * @param {'visual'|'audio'|'dual'} options.modality
   */
  constructor(events, { n, eventCount, intervalMs, modality }) {
    this.events = events;
    this.n = n;
    this.eventCount = eventCount;
    this.intervalMs = intervalMs;
    this.modality = modality;
    this.eventIndex = -1;
    this.stats = this.emptyStats();
  }

  emptyStats() {
    const stream = () => ({ hits: 0, misses: 0, falseAlarms: 0, correctRejections: 0 });
    return { position: stream(), letter: stream() };
  }

  get currentEvent() {
    return this.eventIndex >= 0 && this.eventIndex < this.events.length
      ? this.events[this.eventIndex]
      : null;
  }

  tracks(stream) {
    return this.modality === 'dual' || this.modality === stream;
  }

  advance() {
    this.eventIndex += 1;
    return this.currentEvent;
  }

  recordResponse(stream, isMatchGuess) {
    if (!this.tracks(stream)) return null;
    const event = this.currentEvent;
    if (!event) return null;
    const key = stream === 'visual' ? 'position' : 'letter';
    const actual = stream === 'visual' ? event.positionMatch : event.letterMatch;
    const s = this.stats[key];
    if (isMatchGuess && actual) s.hits += 1;
    else if (isMatchGuess && !actual) s.falseAlarms += 1;
    else if (!isMatchGuess && actual) s.misses += 1;
    else s.correctRejections += 1;
    return { correct: isMatchGuess === actual, actual };
  }

  totalMatches(stream) {
    return this.events.filter(
      (e) => (stream === 'visual' ? e.positionMatch : e.letterMatch)
    ).length;
  }
}
