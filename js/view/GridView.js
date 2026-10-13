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
    this.cells.forEach((c, i) => c.classList.toggle('lit', i === position));
  }

  clear() {
    this.highlight(null);
  }
}
