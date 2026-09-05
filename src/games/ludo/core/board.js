import { Game } from "./game.js";

/*
 * FS Ludo Engine
 * Board Controller
 */

let game = null;

export function createGame(level = "easy") {
  game = new Game(level);
  return game;
}

export function getGame() {
  return game;
}

export function resetGame() {
  if (game) {
    game.reset();
  }
}
