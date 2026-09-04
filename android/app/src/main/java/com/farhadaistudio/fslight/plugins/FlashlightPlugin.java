package com.farhadaistudio.fslight.plugins;

import android.Manifest;
import android.content.Context;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
import android.os.Handler;
import android.os.Looper;

import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

@CapacitorPlugin(
    name = "Flashlight",
    permissions = {
        @Permission(
            alias = "camera",
            strings = { Manifest.permission.CAMERA }
        )
    }
)
public class FlashlightPlugin extends Plugin {

    private CameraManager cameraManager;
    private String cameraId;
    private boolean isOn = false;

    private final Handler handler = new Handler(Looper.getMainLooper());

    private Runnable strobeRunnable;
    private Runnable sosRunnable;

    private boolean strobeRunning = false;
    private boolean sosRunning = false;


    @Override
    public void load() {
        cameraManager =
            (CameraManager) getContext()
                .getSystemService(Context.CAMERA_SERVICE);
    }

    @PluginMethod
    public void turnOn(PluginCall call) {
        if (!hasPermission()) {
            requestPermissionForAlias(
                "camera",
                call,
                "cameraPermissionCallback"
            );
            return;
        }

        setTorch(call, true);
    }

    @PluginMethod
    public void turnOff(PluginCall call) {
        if (!hasPermission()) {
            call.reject("Camera permission is required");
            return;
        }

        setTorch(call, false);
    }

    @PluginMethod
    public void toggle(PluginCall call) {
        if (!hasPermission()) {
            requestPermissionForAlias(
                "camera",
                call,
                "cameraPermissionCallback"
            );
            return;
        }

        setTorch(call, !isOn);
    }

    @PermissionCallback
    private void cameraPermissionCallback(PluginCall call) {
        if (!hasPermission()) {
            call.reject("Camera permission was denied");
            return;
        }

        setTorch(call, true);
    }

    private boolean hasPermission() {
        return getPermissionState("camera") ==
            PermissionState.GRANTED;
    }

    private void setTorch(PluginCall call, boolean enabled) {
        if (cameraManager == null) {
            call.reject("Camera service unavailable");
            return;
        }

        try {
            if (cameraId == null) {
                cameraId = findFlashCamera();
            }

            if (cameraId == null) {
                call.reject("No flashlight found on this device");
                return;
            }

            cameraManager.setTorchMode(cameraId, enabled);
            isOn = enabled;

            call.resolve();

        } catch (CameraAccessException e) {
            call.reject("Unable to control flashlight", e);

        } catch (SecurityException e) {
            call.reject("Camera permission is required", e);

        } catch (Exception e) {
            call.reject("Flashlight error", e);
        }
    }

    private String findFlashCamera()
        throws CameraAccessException {

        for (String id : cameraManager.getCameraIdList()) {

            CameraCharacteristics characteristics =
                cameraManager.getCameraCharacteristics(id);

            Boolean hasFlash =
                characteristics.get(
                    CameraCharacteristics.FLASH_INFO_AVAILABLE
                );

            if (Boolean.TRUE.equals(hasFlash)) {
                return id;
            }
        }

        return null;
    }

    

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



    @Override
    protected void handleOnDestroy() {

        stopStrobeInternal();
        stopSOSInternal();

        try {
            if (cameraManager != null && cameraId != null) {
                cameraManager.setTorchMode(cameraId, false);
            }
        } catch (Exception ignored) {
        }

        isOn = false;
        strobeRunning = false;
        sosRunning = false;

        super.handleOnDestroy();
    }

}