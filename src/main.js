import { Game } from "./game";
import { GameBoard } from "./game-board";

const canvas = document.querySelector("#canvas");

const game = new Game(100, 100);
const gameBoard = new GameBoard(canvas, game);

document.querySelector("#start").addEventListener("click", () => {
  gameBoard.start();
});
document.querySelector("#pause").addEventListener("click", () => {
  gameBoard.stop();
});
document.querySelector("#random").addEventListener("click", () => {
  gameBoard.random();
});
