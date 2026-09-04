export async function getBatteryLevel() {
  if (!("getBattery" in navigator)) return "--";

  const battery = await navigator.getBattery();
  return Math.round(battery.level * 100);
}
