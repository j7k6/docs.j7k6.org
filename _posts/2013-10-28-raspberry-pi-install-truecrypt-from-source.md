---
layout: post
title: "Raspberry Pi: Install TrueCrypt From Source"
---

1. Generate a download link [here](http://www.truecrypt.org/downloads2).
2. Download:
   ```bash
   wget http://www.truecrypt.org/download/transient/<DOWNLOADLINK>/TrueCrypt%207.1a%20Source.tar.gz
   wget http://prdownloads.sourceforge.net/wxwindows/wxWidgets-2.8.12.tar.gz
   ```
3. Install dependencies:
   ```bash
   sudo apt-get install libfuse-dev pkg-config
   mkdir ~/pkcs-header-dir
   cd ~/pkcs-header-dir
   wget ftp://ftp.rsasecurity.com/pub/pkcs/pkcs-11/v2-20/*.h
   cd ..
   ```
4. Build **TrueCrypt**:
   ```bash
   tar zxvf TrueCrypt\ 7.1a\ Source.tar.gz
   tar zxvf wxWidgets-2.8.12.tar.gz
   export PKCS11_INC=/home/pi/pkcs-header-dir/
   cd truecrypt-7.1a-source/
   make NOGUI=1 WX_ROOT=/home/pi/wxWidgets-2.8.12 wxbuild
   make NOGUI=1 WXSTATIC=1
   sudo cp Main/truecrypt /usr/local/bin/
   ```
5. Create mount point:
   ```bash
   sudo mkdir /media/truecrypt1
   sudo chmod 777 /media/truecrypt1
   sudo chown pi:root /media/truecrypt1
   ```
6. Add init script `/etc/init.d/truecrypt`:
   ```
   #!/bin/sh
   ### BEGIN INIT INFO
   # Provides:          truecrypt
   # Required-Start:    $remote_fs $syslog
   # Required-Stop:     
   # Default-Start:     2 3 4 5
   # Default-Stop:      0 1 6
   # Short-Description: start truecrypt volume at boot time
   # Description:       start truecrypt volume at boot time
   ### END INIT INFO
   
   PATH="/usr/bin:/sbin:/bin:/usr/local/bin"
   
   start()
   {
     echo -n " * mounting truecrypt ... "
     truecrypt -t -k "/home/pi/.tckey" /dev/sda1 /media/truecrypt1/ -v -p "" --protect-hidden=no -m=nokernelcrypto --fs-options="umask=0000"
   }

   stop()
   {
     echo -n " * umounting truecrypt ..."
     truecrypt -d
   }

   case "$1" in
     start)
       start
       ;;
     stop)
       stop
       ;;
     *)
       echo -n "You should try those ones: /etc/init.d/truecrypt {start|stop}" 
       exit 1
       ;;
   esac

   exit 0
   ```
7. Start TrueCrypt service:
   ```bash
   sudo chmod +x /etc/init.d/truecrypt
   sudo update-rc.d truecrypt defaults
   /etc/init.d/truecrypt start
   ```

---
