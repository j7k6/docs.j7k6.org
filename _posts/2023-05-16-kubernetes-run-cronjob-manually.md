---
layout: post
title: "Run Cronjob manually in Kubernetes"
fav: 1
---

Sometimes you need to test if a cronjob is working and you dont want to wait for the exact moment it's triggered to tail the log output. In that case you can create a "job" from the Cronjob to run it immediately.

1. Get list of available cronjobs to get `<$CRONJOB_NAME>`:
   ```bash
   kubectl -n <$NAMESPACE> get cronjobs.batch
   ```
2. Create job `backup-test` from cronjob:
   ```bash
   kubectl -n <$NAMESPACE> create job --from=cronjob/<$CRONJOB_NAME> backup-test
   ```
3. Get job's `<$POD_NAME>`:
   ```bash
   kubectl -n <$NAMESPACE> get pods
   ```
4. Tail log output:
   ```bash
   kubectl -n <$NAMESPACE> logs -f <$POD_NAME>
   ```
5. When finished delete the job:
   ```bash
   kubectl -n <$NAMESPACE> delete jobs.batch backup-test
   ```

---
