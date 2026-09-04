package com.farhadaistudio.fslight;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.farhadaistudio.fslight.plugins.FlashlightPlugin;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(FlashlightPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
