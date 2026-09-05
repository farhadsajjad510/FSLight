export function vibrate(ms = 20) {
  if (localStorage.getItem("fslight_vibration") === "false") return;

  if (navigator.vibrate) {
    navigator.vibrate(ms);
  }
}
