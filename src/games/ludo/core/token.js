/*
 * FS Ludo Engine
 * Token Class
 */

export class Token {

  constructor(color, id) {
    this.color = color;
    this.id = id;

    // -1 = Home
    this.position = -1;

    this.finished = false;
  }

  isHome() {
    return this.position === -1;
  }

  canEnter(dice) {
    return this.isHome() && dice === 6;
  }

  enterBoard(startCell) {
    this.position = startCell;
  }

  move(steps) {
    if (this.finished) return;

    this.position += steps;
  }

  reset() {
    this.position = -1;
    this.finished = false;
  }

}
