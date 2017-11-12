---
layout: post
title: "Fix ADB Backup Filesize 41 Bytes/549 Bytes Bug"
tags: [andorid,adb,fix]
---

Appearantly the `adb backup` command stopped working for older Android devices in recent versions of the *Android Debug Bridge*. When invoking a backup with `adb`, the backup process is started but stops immediately, leaving a local `backup.ab` file with a filesize of only 49 bytes (549 bytes when the backup is encrypted with a password).  This bug is [well known](https://issuetracker.google.com/issues/37074632), but hasn't been fixed at least until recently (version **1.0.39**). To fix this behaviour, download the last working version of the `adb` executable (**1.0.31**) and invoke the backup with this. The executables for all platforms can be downloaded at [Mozilla](https://archive.mozilla.org/pub/labs/android-tools/).

1. Download zipped `adb` executable:
   ```bash
   wget https://archive.mozilla.org/pub/labs/android-tools/adb-1.0.31-mac.zip
   ```
2. Unzip `adb`:
   ```bash
   unzip adb-1.0.31-mac.zip
   ```
3. Start `adb` with a connected device:
   ```bash
   ./adb-1.0.31-mac/adb devices
   ```
4. Run backup:
   ```bash
   ./adb-1.0.31-mac/adb backup -all
   ```

---
