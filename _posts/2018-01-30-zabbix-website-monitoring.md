---
layout: post
title: "Monitor Website Availability in Zabbix"
tags: [zabbix,monitoring]
---

## Web Scenario
To monitor a website in **Zabbix**, a new *web scenario* has to be created.

1. Navigate to *Configuration* > *Hosts* > Select host for web monitoring
2. Go to the **Web scenarios** tab and click on *Create web scenario*.
3. **Scenario**:
   ![scenario.png](/files/zabbix-website-monitoring/scenario.png)
   - *Name*: `<WEBSITE_TITLE>`
   - *Application* OR *New application*: `HTTP`
   - *Enabled*: 
4. **Steps**:
   ![steps.png](/files/zabbix-website-monitoring/steps.png)
   - *Name*: `<WEBSITE_TITLE>`
   - *URL*: `<WEBSITE_URL>`
   - *Follow redirects*: `x`
   - *Retrieve only headers*: `x`
   - *Required status codes*: `200`
5. Click *Add*.

## Trigger
The trigger will take action (e.g. send a notification) when the website does not return HTTP status code `200`.
On the host's page, go to the **Triggers** tab and click on *Create trigger*:

![trigger.png](/files/zabbix-website-monitoring/trigger.png)
- *Name*: `<WEBSITE_TITLE>`
- *Severity*: `High`
- *Expression*: `{<HOST>:web.test.error[<WEBSITE_TITLE>].strlen()}>0 and {<HOST>:web.test.fail[<WEBSITE_TITLE>].last()}>0`
- *Allow manual close*: `x`
- *Enabled*: `x`

...and click *Add*.

---
