---
layout: post
title: "Monitor APC UPS Status in Zabbix over USB"
tags: [zabbix,monitoring,apc,ups]
---

If your APC UPS doesn't has a network management card, its status can only be monitored with a special USB cable, so there is no SNMP available.
To query the UPS status on a Linux host, the `apcupsd` utility needs to be installed first. This software package contains the tool `apcaccess`, which is able to get some useful information about the batteries status.

## Prerequirements
1. Install `apcupsd`:
   ```bash
   apt-get update
   apt-get install -y apcupsd
   ```
2. Edit `/etc/default/apcupsd`:
   ```
   ISCONFIGURED=yes
   ```
3. Edit `/etc/apcupsd/apcupsd.conf`:
   ```
   UPSCABLE usb
   UPSTYPE usb
   DEVICE
   ...
   ```
4. Restart the service:
   ```
   systemctl restart apcupsd
   ```

## Zabbix
### Zabbix Agent Configuration
To integrate the `apcaccess` status integration into the *Zabbix Agent*, append this lines to the hosts `zabbix_agentd.conf`:
```
UserParameter=UPSStatus,apcaccess | awk '/^(STATUS).*:/ { print $3 }'
UserParameter=UPSBcharge,apcaccess | awk '/^(BCHARGE).*:/ { print $3 }'
UserParameter=UPSTimeleft,apcaccess | awk '/^(TIMELEFT).*:/ { print $3 }'
```

This parameters query the status (`ONLINE`|`ONBATT`) of the connected APC UPS. To activate them, restart the service:
```bash
systemctl restart zabbix-agent
```

### Zabbix Items
In the web interface, navigate to the hosts *Configuration* > *Items* and create 3 new Items:
1. APC Status:
   ![apc-status.png](/files/zabbix-apc-ups-usb/apc-status.png)
2. APC Battery Charge:
   ![apc-battery-charge.png](/files/zabbix-apc-ups-usb/apc-battery-charge.png)
3. APC Time left:
   ![apc-time-left.png](/files/zabbix-apc-ups-usb/apc-time-left.png)

Now, the data from the `apcaccess` query is available in Zabbix (> *Latest data* tab):
![apc-data.png](/files/zabbix-apc-ups-usb/apc-data.png)

### Zabbix Triggers
Navigate to the hosts *Trigger* tab to create a new trigger for the `APCStatus` item:
![apc-trigger.png](/files/zabbix-apc-ups-usb/apc-trigger.png)
- *Name*: `APC Status: {ITEM.VALUE}`
- *Severity*: `Desaster`
- *Expression*: `{example-host:UPSStatus.regexp(ONLINE)}=0`
- *Enabled*: `x`

Now all the alarms (if configured correctly) will go off as soon as the UPS is on battery support.

---
