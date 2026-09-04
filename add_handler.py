from pathlib import Path

p = Path("android/app/src/main/java/com/farhadaistudio/fslight/plugins/FlashlightPlugin.java")
s = p.read_text()

old = "private boolean isOn = false;"

new = """private boolean isOn = false;

    private final Handler handler = new Handler(Looper.getMainLooper());

    private Runnable strobeRunnable;
    private Runnable sosRunnable;

    private boolean strobeRunning = false;
    private boolean sosRunning = false;
"""

if old in s and "strobeRunnable" not in s:
    s = s.replace(old, new)

p.write_text(s)
