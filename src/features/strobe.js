export function initStrobe(btn, status) {
  let timer = null;
  let state = false;

  btn.onclick = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
      document.body.classList.remove("strobe-active");
      status.textContent = "Strobe OFF";
      return;
    }

    const proceed = window.confirm(
      "Strobe uses rapid flashing light. Stop if you feel uncomfortable."
    );

    if (!proceed) return;

    timer = setInterval(() => {
      state = !state;
      document.body.classList.toggle("strobe-flash", state);
    }, 150);

    status.textContent = "Strobe ON";
  };
}
