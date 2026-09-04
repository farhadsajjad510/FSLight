export function initSOS(btn, status) {
  let timer = null;
  let state = false;

  btn.onclick = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
      document.body.classList.remove("sos-flash");
      status.textContent = "SOS OFF";
      return;
    }

    const proceed = window.confirm(
      "SOS uses flashing light. Stop if you feel uncomfortable."
    );

    if (!proceed) return;

    timer = setInterval(() => {
      state = !state;
      document.body.classList.toggle("sos-flash", state);
    }, 400);

    status.textContent = "SOS MODE ON";
  };
}
