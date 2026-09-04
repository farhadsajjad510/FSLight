package com.farhadaistudio.fslight.plugins;

import android.Manifest;
import android.content.Context;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;

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

    @Override
    protected void handleOnDestroy() {

        if (cameraManager != null &&
            cameraId != null &&
            isOn) {

            try {
                cameraManager.setTorchMode(cameraId, false);
            } catch (Exception ignored) {
            }
        }

        isOn = false;

        super.handleOnDestroy();
    }
}
