/**
 * StimulusGenerator — Model (MVVM)
 * Generates a sequence of dual n-back events (grid position + letter)
 * with a target match probability per stream.
 */
export const DEFAULT_LETTERS = ['C', 'H', 'K', 'L', 'Q', 'R', 'S', 'T'];

export class StimulusGenerator {
  /**
   * @param {object} options
   * @param {number} options.eventCount
   * @param {number} options.gridSize  e.g. 3 for a 3x3 grid
   * @param {number} options.n          n-back level
   * @param {Array<string>} [options.letters]
   * @param {number} [options.matchRate] 0..1 probability a given event matches n-back
   */
  constructor({ eventCount, gridSize, n, letters = DEFAULT_LETTERS, matchRate = 0.28 }) {
    if (eventCount < n + 1) throw new Error('eventCount must be greater than n');
    if (!Number.isInteger(gridSize) || gridSize < 2) throw new Error('gridSize must be >= 2');
    if (letters.length < 2) throw new Error('need at least 2 letters');

    this.eventCount = eventCount;
    this.cellCount = gridSize * gridSize;
    this.n = n;
    this.letters = letters;
    this.matchRate = matchRate;
    this.rng = Math.random;
  }

  randomInt(maxExclusive) {
    return Math.floor(this.rng() * maxExclusive);
  }

  pickMatching(event, offset) {
    return {
      position: event[event.length - this.n].position,
      letter: event[event.length - this.n].letter,
    };
  }

  /**
   * @returns {Array<{position:number, letter:string, positionMatch:boolean, letterMatch:boolean}>}
   */
  generate() {
    const events = [];
    while (events.length < this.eventCount) {
      const index = events.length;
      const positionMatch = index >= this.n && this.rng() < this.matchRate;
      const letterMatch = index >= this.n && this.rng() < this.matchRate;
      const position = positionMatch
        ? events[index - this.n].position
        : this.randomInt(this.cellCount);
      const letter = letterMatch
        ? events[index - this.n].letter
        : this.letters[this.randomInt(this.letters.length)];
      events.push({ position, letter, positionMatch, letterMatch });
    }
    return events;
  }
}
