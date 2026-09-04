from pathlib import Path

p = Path("android/app/src/main/java/com/farhadaistudio/fslight/plugins/FlashlightPlugin.java")
s = p.read_text()

if "startStrobe" in s:
    print("Methods already added.")
    raise SystemExit

methods = """

    @PluginMethod
    public void startStrobe(PluginCall call) {

        stopSOSInternal();

        strobeRunning = true;

        strobeRunnable = new Runnable() {

            boolean state = false;

            @Override
            public void run() {

                if (!strobeRunning) return;

                try {

                    if (cameraId == null)
                        cameraId = findFlashCamera();

                    cameraManager.setTorchMode(cameraId, state);

                    state = !state;

                    handler.postDelayed(this,120);

                } catch (Exception ignored) {}
            }
        };

        handler.post(strobeRunnable);

        call.resolve();
    }

    @PluginMethod
    public void stopStrobe(PluginCall call) {

        stopStrobeInternal();

        call.resolve();
    }

    private void stopStrobeInternal() {

        strobeRunning = false;

        if (strobeRunnable != null)
            handler.removeCallbacks(strobeRunnable);

        try {

            if (cameraId != null)
                cameraManager.setTorchMode(cameraId,false);

        } catch (Exception ignored) {}
    }

    @PluginMethod
    public void startSOS(PluginCall call) {

        stopStrobeInternal();

        sosRunning = true;

        final long[] pattern = {
            200,200,200,200,200,600,
            600,200,600,200,600,600,
            200,200,200,1200
        };

        sosRunnable = new Runnable() {

            int i = 0;

            boolean state = true;

            @Override
            public void run() {

                if (!sosRunning) return;

                try {

                    if (cameraId == null)
                        cameraId = findFlashCamera();

                    cameraManager.setTorchMode(cameraId,state);

                    handler.postDelayed(this,pattern[i]);

                    state = !state;

                    i++;

                    if(i>=pattern.length)
                        i=0;

                } catch (Exception ignored) {}
            }
        };

        handler.post(sosRunnable);

        call.resolve();
    }

    @PluginMethod
    public void stopSOS(PluginCall call) {

        stopSOSInternal();

        call.resolve();
    }

    private void stopSOSInternal() {

        sosRunning = false;

        if (sosRunnable != null)
            handler.removeCallbacks(sosRunnable);

        try {

            if (cameraId != null)
                cameraManager.setTorchMode(cameraId,false);

        } catch (Exception ignored) {}
    }

"""

marker = "@Override\n    protected void handleOnDestroy()"

s = s.replace(marker, methods + "\n\n    " + marker)

p.write_text(s)

print("Done.")
