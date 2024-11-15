export class Game {
  cells = [];

  setGameSize(width, height) {
    this.width = width;
    this.height = height;
    this.cells = Array.from({ length: width }).map(() =>
      Array.from({ length: height })
    );
  }

  random() {
    this.cells = Array.from({ length: this.width }).map(() =>
      Array.from({ length: this.height }).map(() => Math.random() > 0.9)
    );
  }

  next() {
    this.cells = this.cells.map((row, xIndex) =>
      row.map((isAlive, yIndex) => {
        const liveNeighborsCount = this.getLiveNeighborsCount(xIndex, yIndex);
        if (isAlive) {
          if (liveNeighborsCount < 2 || liveNeighborsCount > 3) {
            return false;
          }
          return true;
        } else {
          if (liveNeighborsCount === 3) {
            return true;
          }
          return false;
        }
      })
    );
  }

  getLiveNeighborsCount(xIndex, yIndex) {
    const diff = [-1, 0, 1];
    return diff
      .map((xDiff) =>
        diff.map((yDiff) => this.cells.at(xIndex + xDiff)?.at(yIndex + yDiff))
      )
      .flat()
      .filter((_, index) => index !== 4)
      .filter((isLive) => isLive).length;
  }
}
