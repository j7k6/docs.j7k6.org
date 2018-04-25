---
layout: post
title: "Fix Redirect Loop when using Nginx as SSL Reverse Proxy for Tomcat"
tags: [nginx,fix,tomcat,ssl]
---

### Nginx
Add this to *Nginx* proxy configuration:
```
  proxy_set_header X-Forwarded-Proto https;
```

### Tomcat
Add this to *Tomcat*'s `conf/server.xml`:

```xml
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="x-forwarded-for"
  remoteIpProxiesHeader="x-forwarded-by"
  protocolHeader="x-forwarded-proto"
/>
```

---
1. [https://stackoverflow.com/a/19917372](https://stackoverflow.com/a/19917372)
