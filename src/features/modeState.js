let currentMode = "off";

export function getMode() {
  return currentMode;
}

export function setMode(mode) {
  currentMode = mode;
}

export function isMode(mode) {
  return currentMode === mode;
}
