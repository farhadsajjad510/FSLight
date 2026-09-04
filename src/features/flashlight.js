import { Capacitor } from "@capacitor/core";
import { getMode, setMode } from "./modeState.js";

let nativeFlashlight = null;

if (Capacitor.isNativePlatform()) {
  nativeFlashlight = Capacitor.registerPlugin("Flashlight");
}

export function initFlashlight(button, status, icon) {

  function updateUI(on) {
    button.textContent = on ? "Turn OFF" : "Turn ON";
    status.textContent = on ? "Flashlight ON" : "Flashlight OFF";
    icon.style.filter = on
      ? "drop-shadow(0 0 60px #00ff99)"
      : "drop-shadow(0 0 20px #00e5ff)";
  }

  updateUI(false);

  button.addEventListener("click", async () => {
    try {

      const mode = getMode();

      if (mode === "torch") {
        if (Capacitor.isNativePlatform() && nativeFlashlight) {
          await nativeFlashlight.turnOff();
        }

        setMode("off");
        updateUI(false);
        return;
      }

      if (Capacitor.isNativePlatform() && nativeFlashlight) {
        await nativeFlashlight.turnOn();
      }

      setMode("torch");
      updateUI(true);

    } catch (error) {
      console.error("Flashlight error:", error);

      setMode("off");
      updateUI(false);
      status.textContent = "Flashlight unavailable";
    }
  });

  return getMode;
}
