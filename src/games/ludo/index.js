export function openLudoHome() {
  return `
    <div class="ludo-home">

      <button class="whatsapp-card" id="ludoVsComputer">
        <div class="whatsapp-icon">🤖</div>
        <div class="whatsapp-text">
          <strong>VS Computer</strong>
          <span>Play Offline</span>
        </div>
        <div class="whatsapp-arrow">▶</div>
      </button>

    </div>
  `;
}

export function openLevelSelect() {
  return `
    <div class="ludo-home">

      <button class="whatsapp-card level-btn" data-level="easy">
        <div class="whatsapp-icon">🟢</div>
        <div class="whatsapp-text">
          <strong>Easy</strong>
          <span>For Beginners</span>
        </div>
      </button>

      <button class="whatsapp-card level-btn" data-level="medium">
        <div class="whatsapp-icon">🟡</div>
        <div class="whatsapp-text">
          <strong>Medium</strong>
          <span>Balanced AI</span>
        </div>
      </button>

      <button class="whatsapp-card level-btn" data-level="hard">
        <div class="whatsapp-icon">🔴</div>
        <div class="whatsapp-text">
          <strong>Hard</strong>
          <span>Smart AI</span>
        </div>
      </button>

      <button class="whatsapp-card" disabled>
        <div class="whatsapp-icon">⚫</div>
        <div class="whatsapp-text">
          <strong>Impossible</strong>
          <span>Coming Soon</span>
        </div>
      </button>

    </div>
  `;
}
