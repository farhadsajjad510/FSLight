let ctx;

export function playClick() {
  if (localStorage.getItem("fslight_sound") === "false") return;

  try {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(1000, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + 0.05
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);

  } catch (e) {
    console.error(e);
  }
}
