---
layout: post
title: "Install Zabbix Agent on FreeNAS"
tags: [zabbix,freenas,freebsd,vagrant]
---

There is no official **Zabbix Agent** binary for **FreeNAS**, so it has to be compiled from source on another machine.
There are several options to do so, I decided to just spin up a FreeBSD Vagrant VM to build the binary.

## Vagrant VM
### Setup VM & Build Environment
1. Create `Vagrantfile`:
   ```bash
   Vagrant.configure("2") do |config|
     config.vm.box = "freebsd/FreeBSD-11.1-STABLE"
     config.vm.base_mac = "00:00:00:12:34:56"
   end
   ```
2. Start VM: `vagrant up`
3. Enter VM: `vagrant ssh`
4. Install dependecies:
   ```bash
   sudo pkg install -y curl autoconf automake gettext gcc pcre
   ```

### Compile Zabbix Agent
1. Download source:
   ```bash
   curl -fsSL "https://kent.dl.sourceforge.net/project/zabbix/ZABBIX%20Latest%20Stable/3.4.5/zabbix-3.4.5.tar.gz" | tar zxvf -
   cd zabbix-3.4.5
   ```
2. Build:
   ```bash
   ./configure --enable-agent
   sudo make install
   ```
3. Transfer compiled binary to FreeNAS system:
   ```bash
   scp /usr/local/sbin/zabbix_agentd root@<FREENAS_IP>:/usr/local/sbin/
   ```
4. Leave VM: `exit`
5. Destroy VM (optional): `vagrant destroy`


## FreeNAS

After the *zabbix_agentd* binary is transferred to the FreeNAS system, it's time to SSH into it to configure the agent.

### Zabbix Agent Configuration
1. Add user:
   ```bash
   pw groupadd zabbix
   pw useradd zabbix -c "Daemon user for Zabbix agent" -d /nonexistent -s /usr/sbin/nologin -w no -g zabbix
   ```
2. Create `/etc/zabbix_agentd.conf`:
   ```
   Server=<ZABBIX_SERVER_IP>
   ServerActive=<ZABBIX_SERVER_IP>
   Hostname=<ZABBIX_AGENT_HOSTNAME>
   LogFile=/tmp/zabbix_agentd.log
   ```

### Daemon Configuration
1. Enable daemon:
   ```bash
   echo 'zabbix_agentd_enable="YES"' >> /etc/rc.conf
   ```
2. Create `/etc/rc.d/zabbix_agentd`:
   ```
   #!/bin/sh

   # PROVIDE: zabbix_agentd
   # REQUIRE: DAEMON
   # KEYWORD: shutdown
   #
   # Add the following lines to /etc/rc.conf.local or /etc/rc.conf to
   # enable zabbix_agentd:
   #
   # zabbix_agentd_enable (bool): Set to NO by default.  Set it to YES to
   #         enable zabbix_agentd.
   #

   . /etc/rc.subr

   name="zabbix_agentd"
   rcvar=zabbix_agentd_enable
   start_precmd="zabbix_precmd"
   required_files="/etc/zabbix_agentd.conf"

   # read configuration and set defaultsc
   load_rc_config "$name"
   : ${zabbix_agentd_enable="NO"}
   #: ${zabbix_agentd_pre:=/etc/${name}.pre.sh}

   zabbix_agentd_conf="/etc/zabbix_agentd.conf"

   if [ ! -z "$zabbix_agentd_conf" ] ; then
     zabbix_agentd_flags="${zabbix_agentd_flags} -c ${zabbix_agentd_conf}"
     required_files=${zabbix_agentd_conf}
   fi

   zabbix_precmd()
   {
     if [ ! -z "$zabbix_agentd_pre" ] ; then
       if [ -e $zabbix_agentd_pre ] ; then
         . $zabbix_agentd_pre
       fi
     fi
   }

   command="/usr/local/sbin/${name}"

   run_rc_command "$1"  run_rc_command "$1"
   ```
2. Make executable:
   ```bash
   chmod +x /etc/rc.d/zabbix_agentd
   ```
3. Start daemon:
   ```bash
   /etc/rc.d/zabbix_agentd start
   ```
4. Make config files persistent and survive reboots:
   ```bash
   cp /etc/rc.conf /conf/base/etc/
   cp /etc/rc.d/zabbix_agentd /conf/base/etc/rc.d/
   cp /etc/zabbix_agentd.conf /conf/base/etc/
   ```

---
1. [https://blag.nullteilerfrei.de/2016/11/26/zabbix-3-0-agent-on-freebsd/](https://blag.nullteilerfrei.de/2016/11/26/zabbix-3-0-agent-on-freebsd/)
2. [https://www.haphazard.io/blog/install-nagios-nrpe-on-freenas/](https://www.haphazard.io/blog/install-nagios-nrpe-on-freenas/)
