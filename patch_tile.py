from pathlib import Path

p = Path("android/app/src/main/java/com/farhadaistudio/fslight/tiles/FlashlightTileService.java")
s = p.read_text()

old = """        toggleFlashlight();
"""

new = """        Intent intent = new Intent(this,
                com.farhadaistudio.fslight.QuickActionsActivity.class);

        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        startActivityAndCollapse(intent);
"""

if old in s:
    s = s.replace(old, new, 1)
    p.write_text(s)
    print("Patched successfully.")
else:
    print("toggleFlashlight() call not found.")
