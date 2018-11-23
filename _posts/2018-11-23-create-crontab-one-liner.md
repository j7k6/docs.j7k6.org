---
layout: post
title: "Add Cronjob on the Command Line (non-interactive)"
---

```bash
(crontab -l ; echo "<$NEW_CRONJOB>") | crontab -
```

---
1. <https://stackoverflow.com/questions/878600/how-to-create-a-cron-job-using-bash-automatically-without-the-interactive-editor#comment63572267_878647>
