export function getGreeting() {
  const h = new Date().getHours();

  if (h < 12) return "🌅 Good Morning";
  if (h < 17) return "☀️ Good Afternoon";
  if (h < 20) return "🌇 Good Evening";
  return "🌙 Good Night";
}
