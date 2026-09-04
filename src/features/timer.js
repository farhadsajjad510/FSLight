export function initTimer(btn, status) {
  let timer = null;

  btn.onclick = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      status.textContent = "Timer OFF";
      return;
    }

    let seconds = 30;

    status.textContent = `Light OFF in ${seconds}s`;

    timer = setInterval(() => {
      seconds--;

      status.textContent = `Light OFF in ${seconds}s`;

      if (seconds <= 0) {
        clearInterval(timer);
        timer = null;

        document.body.style.background = "";
        document.body.style.color = "";

        status.textContent = "Timer Finished";
      }
    }, 1000);
  };
}
