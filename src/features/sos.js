import { Capacitor } from "@capacitor/core";
import { getMode, setMode } from "./modeState.js";
import { playClick } from "../utils/sound.js";

const Flashlight = Capacitor.isNativePlatform()
  ? Capacitor.registerPlugin("Flashlight")
  : null;

export function initSOS(btn, status) {

  let timer = null;
  let state = false;

  btn.onclick = async () => {
    playClick();

    if (Capacitor.isNativePlatform() && Flashlight) {

      try {

        if (getMode() === "sos") {
          await Flashlight.stopSOS();
          setMode("off");
          status.textContent = "SOS MODE OFF";
        } else {
          await Flashlight.startSOS();
          setMode("sos");
          status.textContent = "SOS MODE ON";
        }

      } catch (e) {
        console.error(e);
        status.textContent = "SOS unavailable";
      }

      return;
    }

    // Browser fallback
    if (timer) {
      clearInterval(timer);
      timer = null;
      document.body.classList.remove("sos-flash");
      setMode("off");
      status.textContent = "SOS MODE OFF";
      return;
    }

    timer = setInterval(() => {
      state = !state;
      document.body.classList.toggle("sos-flash", state);
    }, 400);

    setMode("sos");
    status.textContent = "SOS MODE ON";
  };
}