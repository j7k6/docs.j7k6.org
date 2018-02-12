---
layout: post
title: "Install Active Directory Domain Controller on Windows Server 2016 Core with Powershell"
tags: [windows-server, active-directory, powershell]
---

1. Set computer name:
   ```powershell
   Rename-Computer -NewName <$COMPUTER_NAME>
   ```
2. Configure network interface:
   ```powershell
   New-NetIPAddress -InterfaceAlias Ethernet0 -IPAddress <$IP_ADDRESS> -AddressFamily IPv4 -PrefixLength 24 -DefaultGateway <$GATEWAY>
   ```
3. Set DNS nameserver:
   ```powershell
   Set-DnsClientServerAddress -InterfaceAlias Ethernet0 -ServerAddresses 127.0.0.1
   ```
4. `Restart-Computer`
5. Install *Active Directory Domain Controller Services*:
   ```powershell
   Install-WindowsFeature AD-Domain-Services -IncludeManagementTools
   ```
6. Install Active Directory forest:
   ```powershell
   Install-ADDSForest -DomainName <$DOMAIN> -DomainNetbiosName <$NETBIOS_DOMAIN>
   ```
7. `Restart-Computer`
8. Set DNS forwarder:
   ```powershell
   Add-DnsServerForwarder -IPAddress 8.8.8.8,8.8.4.4
   ```

---
1. [https://blogs.technet.microsoft.com/chadcox/2016/10/25/chads-quick-notes-installing-a-domain-controller-with-server-2016-core/](https://blogs.technet.microsoft.com/chadcox/2016/10/25/chads-quick-notes-installing-a-domain-controller-with-server-2016-core/)
