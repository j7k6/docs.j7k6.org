---
layout: post
title: "Fix JIRA Upgrade Error ('JIRA Agile is currently unavailable')"
tags: [jira, fix]
---

1. Stop JIRA
2. Execute Database Queries: 
   ```mysql
   UPDATE propertynumber SET propertyvalue = 47 
   WHERE id = (SELECT id FROM propertyentry WHERE property_key = 'GreenHopper.Upgrade.Latest.Upgraded.Version');
   UPDATE propertystring SET propertyvalue = '47' 
   WHERE id = (SELECT id FROM propertyentry WHERE property_key = 'com.pyxis.greenhopper.jira:build');
   ```
3. Start JIRA

---
1. [https://confluence.atlassian.com/jirakb/jira-agile-is-currently-unavailable-error-when-restoring-the-jira-cloud-backup-to-jira-6-4-5-with-jira-agile-6-7-4-779158585.html](https://confluence.atlassian.com/jirakb/jira-agile-is-currently-unavailable-error-when-restoring-the-jira-cloud-backup-to-jira-6-4-5-with-jira-agile-6-7-4-779158585.html)
