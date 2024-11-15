import { Game } from "./game";

export class GameBoard {
  /**
   * @type {HTMLCanvasElement}
   */
  canvas;
  cellSize = 5;

  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.parentElement.addEventListener(
      "resize",
      this.resizeCanvas.bind(this)
    );
    this.game = new Game();
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.canvas.height = this.canvas.parentElement.offsetHeight;
    this.calcGameSize();
  }

  get canvasCtx() {
    return this.canvas.getContext("2d");
  }

  calcGameSize() {
    const gameWidth = Math.ceil(this.canvas.width / this.cellSize);
    const gameHeight = Math.ceil(this.canvas.height / this.cellSize);
    this.game.setGameSize(gameWidth, gameHeight);
  }

  draw() {
    this.game.cells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          this.drawCell(rowIndex, colIndex);
        }
      });
    });
  }

  drawCell(rowIndex, colIndex) {
    const x = colIndex * this.cellSize;
    const y = rowIndex * this.cellSize;
    this.canvasCtx.fillStyle = "green";
    this.canvasCtx.fillRect(x, y, this.cellSize, this.cellSize);
  }

  start() {
    this.gameInterval = setInterval(() => this.nextMove(), 100);
  }

  nextMove() {
    this.game.next();
    this.redraw();
  }

  redraw() {
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
  }

  stop() {
    clearInterval(this.gameInterval);
  }

  random() {
    this.game.random();
    this.redraw();
  }
}
