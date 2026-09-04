export function initScreenLight(btn, status) {
  let active = false;

  btn.onclick = () => {
    active = !active;

    if (active) {
      document.body.classList.add("screen-light");
      status.textContent = "Screen Light ON";
    } else {
      document.body.classList.remove("screen-light");
      status.textContent = "Screen Light OFF";
    }
  };
}
