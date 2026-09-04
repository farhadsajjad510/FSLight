import { Capacitor } from "@capacitor/core";

let nativeFlashlight = null;

if (Capacitor.isNativePlatform()) {
  nativeFlashlight = Capacitor.registerPlugin("Flashlight");
}

export function initFlashlight(button, status, icon) {
  let state = false;

  button.addEventListener("click", async () => {
    try {
      if (Capacitor.isNativePlatform() && nativeFlashlight) {
        if (state) {
          await nativeFlashlight.turnOff();
        } else {
          await nativeFlashlight.turnOn();
        }
      }

      state = !state;

      button.textContent = state ? "Turn OFF" : "Turn ON";
      status.textContent = state
        ? "Flashlight ON"
        : "Flashlight OFF";

      icon.style.filter = state
        ? "drop-shadow(0 0 60px #00ff99)"
        : "drop-shadow(0 0 20px #00e5ff)";

    } catch (error) {
      console.error("Flashlight error:", error);

      state = false;
      button.textContent = "Turn ON";
      status.textContent = "Flashlight unavailable";
      icon.style.filter = "drop-shadow(0 0 20px #00e5ff)";
    }
  });

  return () => state;
}
