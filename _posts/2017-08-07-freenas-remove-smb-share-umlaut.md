---
layout: post
title: "Remove Failing SMB Share from FreeNAS with SQLite"
tags: [freenas, samba, fix, sqlite]
---

**Problem:** When (accidently) creating a SMB share containing an umlaut on FreeNAS, the SMB service will stop working and so will the Active Directory Service.
Every attempt to fix this via the FreeNAS UI will fail, it's not possible to remove the wrongly-named share there.

**Solution**: Remove the share in the FreeNAS SQLite database:
1. Open database:
   ```bash
   sqlite3 /data/freenas-v1.db
   ```
2. Find Share ID:
   ```bash
   select * from sharing_cifs_share;
   ```
3. Delete Share:
   ```bash
   delete from sharing_cifs_share where id=<SHARE_ID>;
   ```

---
