---
layout: post
title: "Android Emulator on MacOS"
tags: [android, emulator, macos]
---

1. Download & Install HAXM:
   ```
   wget https://software.intel.com/sites/default/files/managed/19/94/haxm-macosx_v6_1_1.zip
   unzip haxm-macosx_v6_1_1.zip
   sudo ./haxm-macosx_v6_1_1/silent_install.sh
   ```
2. Download Android SDK:
   ```
   wget http://dl.google.com/android/android-sdk_r24.4.1-macosx.zip
   unzip android-sdk_r24.4.1-macosx.zip
   ```
3. Install Android Dependencies:
   ```
   echo y | ./android-sdk-macosx/tools/android update sdk -a -u -f -t android-25
   echo y | ./android-sdk-macosx/tools/android update sdk -a -u -f -t platform-tools
   echo y | ./android-sdk-macosx/tools/android update sdk -a -u -f -t build-tools-24.0.0
   echo y | ./android-sdk-macosx/tools/android update sdk -a -u -f -t extra-google-google_play_services
   echo y | ./android-sdk-macosx/tools/android update sdk -a -u -f -t sys-img-x86-google_apis-25
   ``` 
4. Create AVD:
   ```
   echo no | ./android-sdk-macosx/tools/android create avd -t "android-25" -b google_apis/x86 -c 1024M -s 480x800 -n test --snapshot
   ```
5. Enable Hardware Keyboard:
   ```
   echo "hw.keyboard=yes" >> ~/.android/avd/test.avd/config.ini
   ```
6. Run Emulator:
   ```
   ./android-sdk-macosx/tools/emulator64-x86 -avd test -no-audio
   ```

---
