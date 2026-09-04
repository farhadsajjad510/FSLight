package com.farhadaistudio.fslight;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class QuickActionsActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_quick_actions);

        Button flashlight = findViewById(R.id.btnFlashlight);
        Button strobe = findViewById(R.id.btnStrobe);
        Button sos = findViewById(R.id.btnSOS);
        Button close = findViewById(R.id.btnClose);

        flashlight.setOnClickListener(v -> {
            finish();
        });

        strobe.setOnClickListener(v -> {
            finish();
        });

        sos.setOnClickListener(v -> {
            finish();
        });

        close.setOnClickListener(v -> finish());
    }
}
