import { Capacitor } from "@capacitor/core";
import { getMode, setMode } from "./modeState.js";

const Flashlight = Capacitor.isNativePlatform()
  ? Capacitor.registerPlugin("Flashlight")
  : null;

export function initStrobe(btn, status) {

  let timer = null;
  let state = false;

  btn.onclick = async () => {

    if (Capacitor.isNativePlatform() && Flashlight) {

      try {

        if (getMode() === "strobe") {
          await Flashlight.stopStrobe();
          setMode("off");
          status.textContent = "Strobe OFF";
        } else {
          await Flashlight.startStrobe();
          setMode("strobe");
          status.textContent = "Strobe ON";
        }

      } catch (e) {
        console.error(e);
        status.textContent = "Strobe unavailable";
      }

      return;
    }

    // Browser fallback
    if (timer) {
      clearInterval(timer);
      timer = null;
      document.body.classList.remove("strobe-flash");
      setMode("off");
      status.textContent = "Strobe OFF";
      return;
    }

    timer = setInterval(() => {
      state = !state;
      document.body.classList.toggle("strobe-flash", state);
    }, 150);

    setMode("strobe");
    status.textContent = "Strobe ON";
  };
}
