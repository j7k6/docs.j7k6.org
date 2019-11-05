---
layout: post
title: "Enable CORS in Flask"
---

```python
@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'

    return response
```

---
