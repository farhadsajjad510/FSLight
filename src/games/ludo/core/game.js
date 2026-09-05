import { Player } from "./player.js";
import { Dice } from "./dice.js";
import { START_CELLS } from "../data/path.js";

export class Game {

  constructor(level = "easy") {

    this.level = level;

    this.dice = new Dice();

    this.players = [
      new Player("You", "red", START_CELLS.red, false),
      new Player("Computer", "green", START_CELLS.green, true)
    ];

    this.currentPlayer = 0;
  }

  getPlayer() {
    return this.players[this.currentPlayer];
  }

  rollDice() {
    return this.dice.roll();
  }

  nextTurn() {
    if (!this.dice.isSix()) {
      this.currentPlayer =
        (this.currentPlayer + 1) % this.players.length;
    }
  }

  reset() {
    this.players.forEach(player =>
      player.tokens.forEach(token => token.reset())
    );

    this.currentPlayer = 0;
    this.dice.reset();
  }

}
