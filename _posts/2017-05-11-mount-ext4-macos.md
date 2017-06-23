---
layout: post
title: "Mount Ext4 Filesystem on MacOS"
tags: [macos, ext4]
---

## Fuse-ext2
1. Install dependencies:
   ```bash
   brew tap homebrew/fuse
   brew install Caskroom/cask/osxfuse
   brew install e2fsprogs m4 automake autoconf libtool
   ```
2. Clone repository:
   ```bash
   git clone --depth=1 https://github.com/alperakcan/fuse-ext2.git
   cd fuse-ext2
   ```
3. Missing *XCode* workaround (optional):
   If *XCode* is not installed, the following error will be thrown:
   > xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance

   Since *XCode* is actually not required for building `fuse-ext2`, this little workaround makes the error go away:
   ```bash
   ln -s /usr/bin/true /usr/local/bin/xcodebuild
   ```
4. Build & Install:
   ```bash
   ./autogen.sh
   CFLAGS="-idirafter/$(brew --prefix e2fsprogs)/include -idirafter/usr/local/include/osxfuse" LDFLAGS="-L$(brew --prefix e2fsprogs)/lib"  ./configure
   make
   sudo make install
   ```
5. Enable write access:
   ```bash
   sudo sed -e 's/OPTIONS="local,allow_other"/OPTIONS="local,allow_other,rw+"/' -i.orig /Library/Filesystems/fuse-ext2.fs/fuse-ext2.util
   ```
6. Remove the *XCode* workaround symlink (optional):
   ```bash
   rm /usr/local/bin/xcodebuild
   ```

## Ext4fuse
1. Install `ext4fuse`
   ```bash
   brew install ext4fuse
   ```
2. Add current user to *operator* group:
   ```bash
   sudo dscl . append /Groups/operator GroupMembership `whoami`
   ```

## Mount Ext4 Disk
1. Show available disks:
   ```bash
   sudo diskutil list
   ```
2. Unmount Disk:
   ```bash
   sudo diskutil unmountDisk /dev/disk2
   ```
3. Mount partition:
   ```bash
   mkdir mnt
   sudo fuse-ext2 /dev/disk2s2 mnt -o rw+
   ```
4. Unmount partition:
   ```bash
   sudo umount mnt
   ```

---
1. [https://github.com/nodejs/node-gyp/issues/341#issuecomment-137134818](https://github.com/nodejs/node-gyp/issues/341#issuecomment-137134818)
2. [http://www.janosgyerik.com/mounting-a-raspberry-pi-image-on-osx/](http://www.janosgyerik.com/mounting-a-raspberry-pi-image-on-osx/)
3. [https://apple.stackexchange.com/a/251611](https://apple.stackexchange.com/a/251611)
4. [http://tips.jay.cat/ext4-support-in-osx-yosemite/](http://tips.jay.cat/ext4-support-in-osx-yosemite/)
