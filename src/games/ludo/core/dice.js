/*
 * FS Ludo Engine
 * Dice
 */

export class Dice {

  constructor() {
    this.value = 1;
  }

  roll() {
    this.value = Math.floor(Math.random() * 6) + 1;
    return this.value;
  }

  getValue() {
    return this.value;
  }

  isSix() {
    return this.value === 6;
  }

  reset() {
    this.value = 1;
  }

}
