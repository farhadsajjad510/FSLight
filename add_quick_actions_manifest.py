from pathlib import Path

p = Path("android/app/src/main/AndroidManifest.xml")
s = p.read_text()

entry = '''
        <activity
            android:name=".QuickActionsActivity"
            android:exported="false"
            android:theme="@style/AppTheme.NoActionBarLaunch"/>
'''

if "QuickActionsActivity" not in s:
    s = s.replace(
        "</application>",
        entry + "\n    </application>"
    )

p.write_text(s)
print("Done.")
