import { Token } from "./token.js";

/*
 * FS Ludo Engine
 * Player Class
 */

export class Player {

  constructor(name, color, startCell, isAI = false) {

    this.name = name;
    this.color = color;
    this.startCell = startCell;
    this.isAI = isAI;

    this.tokens = [
      new Token(color, 1),
      new Token(color, 2),
      new Token(color, 3),
      new Token(color, 4)
    ];

  }

  getHomeTokens() {
    return this.tokens.filter(token => token.isHome());
  }

  getActiveTokens() {
    return this.tokens.filter(token => !token.isHome());
  }

  canMove(dice) {

    if (dice === 6) return true;

    return this.getActiveTokens().length > 0;

  }

}
