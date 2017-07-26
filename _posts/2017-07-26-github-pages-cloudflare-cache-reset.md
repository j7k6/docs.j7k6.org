---
layout: post
title: "Force Cloudflare Cache Purge when Pushing to Github Pages Repository"
tags: [git,github,gh-pages,cloudflare]
---

**Scenario:** A static website is hosted on *Github Pages* and is SSL-terminated
by Cloudflare. it can take some time until the Cloudflare cache is regenerated,
so the changes to the website are not publicly available right after a push to the repository.

**Solution:** Add a local Git hook to reset the Cloudflare Cache on every push
to the repo. Edit `.git/hooks/post-receive`:

```
#!/bin/sh

export CLOUDFLARE_AUTH_EMAIL="<EMAIL>"
export CLOUDFLARE_API_KEY="<API_KEY>"
export CLOUDFLARE_ZONE_ID="<ZONE_ID>"

sleep 10

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
  -H "X-Auth-Email: ${CLOUDFLARE_AUTH_EMAIL}" \
  -H "X-Auth-Key: ${CLOUDFLARE_API_KEY}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'

exit 0
```

---
