/**
 * GridView — MVVM View
 * Renders the visual stimulus grid.
 */
export class GridView {
  /**
   * @param {HTMLElement} container
   * @param {number} gridSize
   */
  constructor(container, gridSize) {
    this.container = container;
    this.gridSize = gridSize;
    this.cells = [];
    this.lastPosition = null;
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.container.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
    this.cells = [];
    for (let i = 0; i < this.gridSize * this.gridSize; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = String(i);
      this.container.appendChild(cell);
      this.cells.push(cell);
    }
  }

  /** @param {number|null} position cell index or null to clear */
  highlight(position) {
    const repeat = this.lastPosition !== null && position === this.lastPosition;
    this.lastPosition = position;
    this.cells.forEach((c, i) => {
      const lit = i === position;
      c.classList.toggle('lit', lit);
      if (lit && repeat) {
        c.classList.remove('blink');
        void c.offsetWidth;
        c.classList.add('blink');
      } else {
        c.classList.remove('blink');
      }
    });
  }

  clear() {
    this.lastPosition = null;
    this.highlight(null);
  }
}
