import { drawClassicBoard } from "./ui.js";

export function createBoard() {
  return `
    <div class="ludo-container">

      <canvas
        id="ludoCanvas"
        width="600"
        height="600">
      </canvas>

      <button class="whatsapp-card" id="rollDice">
        <div class="whatsapp-icon">🎲</div>

        <div class="whatsapp-text">
          <strong>Roll Dice</strong>
          <span>Tap to Roll</span>
        </div>

        <div class="whatsapp-arrow">▶</div>
      </button>

    </div>
  `;
}

export function initBoard() {
  const canvas = document.getElementById("ludoCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  drawClassicBoard(ctx);
}
