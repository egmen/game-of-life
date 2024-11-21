import { Game } from "./game";

export class GameBoard {
  /**
   * @type {HTMLCanvasElement}
   */
  canvas;
  cellSize = 5;

  generation = 0;

  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.parentElement.addEventListener(
      "resize",
      this.resizeCanvas.bind(this)
    );
    this.game = new Game();
    this.resizeCanvas();
  }

  get gameSize() {
    return this.game.width * this.game.height;
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
    let alive = 0;
    this.game.cells.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell) {
          alive++;
          this.drawCell(y, x);
        }
      });
    });
    document.getElementById("alive").innerHTML = `${alive} (${(
      (alive / this.gameSize) *
      100
    ).toFixed(1)}%)`;
    document.getElementById("dead").innerHTML = `${this.gameSize - alive} (${(
      (1 - alive / this.gameSize) *
      100
    ).toFixed(1)}%)`;
    document.getElementById(
      "total"
    ).innerHTML = `${this.game.width}x${this.game.height}=${this.gameSize}`;
  }

  drawCell(xIndex, yIndex) {
    const x = yIndex * this.cellSize;
    const y = xIndex * this.cellSize;
    this.canvasCtx.fillStyle = "green";
    this.canvasCtx.fillRect(x, y, this.cellSize, this.cellSize);
  }

  start() {
    this.gameInterval = setInterval(() => this.nextMove(), 100);
  }

  nextMove() {
    this.game.next();
    this.generation++;
    document.getElementById("generation").innerHTML = this.generation;
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
    this.generation = 0;
    this.game.random();
    this.redraw();
  }
}
