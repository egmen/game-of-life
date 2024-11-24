export class Game {
  cells = [];

  setGameSize(width, height) {
    this.width = width;
    this.height = height;
    this.clear();
  }

  fill(callback) {
    this.cells = Array.from({ length: this.width }).map(() =>
      Array.from({ length: this.height }).map(callback)
    );
  }

  random() {
    this.fill(() => Math.random() > 0.5);
  }

  clear() {
    this.fill(() => false);
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
    const neighboursDiffs = diff
      .map((xDiff) => diff.map((yDiff) => [xDiff, yDiff]))
      .flat()
      .filter(([xDiff, yDiff]) => xDiff !== 0 || yDiff !== 0);

    return neighboursDiffs
      .map(([xDiff, yDiff]) =>
        this.cells.at(xIndex + xDiff)?.at(yIndex + yDiff)
      )
      .filter((isLive) => isLive).length;
  }

  getLiveNeighborsCount1(xIndex, yIndex) {
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
