package com.farhadaistudio.fslight.tiles;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
import android.os.Build;
import android.service.quicksettings.Tile;
import android.service.quicksettings.TileService;

import androidx.annotation.RequiresApi;

public class FlashlightTileService extends TileService {

    private CameraManager cameraManager;
    private String cameraId;
    private boolean isOn = false;

    @Override
    public void onCreate() {
        super.onCreate();

        cameraManager =
            (CameraManager) getSystemService(CAMERA_SERVICE);
    }

    @Override
    public void onStartListening() {
        super.onStartListening();
        updateTile();
    }

    @Override
    public void onClick() {
        super.onClick();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M &&
            checkSelfPermission(Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED) {

            Intent intent = new Intent(this, getMainActivityClass());
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivityAndCollapse(intent);
            return;
        }

        toggleFlashlight();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            updateTile();
        }
    }

    private void toggleFlashlight() {

        try {

            if (cameraManager == null) {
                return;
            }

            if (cameraId == null) {
                cameraId = findFlashCamera();
            }

            if (cameraId == null) {
                return;
            }

            isOn = !isOn;

            cameraManager.setTorchMode(cameraId, isOn);

            updateTile();

        } catch (CameraAccessException |
                 SecurityException e) {

            isOn = false;
            updateTile();
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

    private void updateTile() {

        Tile tile = getQsTile();

        if (tile == null) {
            return;
        }

        tile.setState(
            isOn
                ? Tile.STATE_ACTIVE
                : Tile.STATE_INACTIVE
        );

        tile.setLabel(
            isOn
                ? "FS Light ON"
                : "FS Light"
        );

        tile.setContentDescription(
            isOn
                ? "FS Light flashlight is ON"
                : "FS Light flashlight is OFF"
        );

        tile.updateTile();
    }

    private Class<?> getMainActivityClass() {
        try {
            return Class.forName(
                "com.farhadaistudio.fslight.MainActivity"
            );
        } catch (ClassNotFoundException e) {
            return FlashlightTileService.class;
        }
    }

    @Override
    public void onDestroy() {

        if (cameraManager != null &&
            cameraId != null &&
            isOn) {

            try {
                cameraManager.setTorchMode(
                    cameraId,
                    false
                );
            } catch (Exception ignored) {
            }
        }

        isOn = false;

        super.onDestroy();
    }
}
