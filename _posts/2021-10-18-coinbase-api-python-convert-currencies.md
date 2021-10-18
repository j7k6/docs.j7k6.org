---
layout: post
title: "Convert Currencies with the Coinbase Python API"
---

For some reason, Coinbase didn't implement the "Convert" function from the app in the Python (or any other) API framework. There are only two Stackoverflow comments that vaguely describe a workaround. This is how I got it working in Python:

```python
from coinbase.wallet.client import Client

client = Client(API_KEY, API_SECRET)

""" get base_id's """
prices = client._get("v2", "assets", "prices", params={
	"base": "EUR",
	"filter": "holdable",
	"resolution": "latest"
})

""" Convert BTC to ETH """
trade = client._post("v2", "trades", data={
    "amount": 1,
    "amount_asset": "EUR"
    "amount_from": "input",
    "source_asset": list(filter(lambda a: a["base"] == "BTC", prices.json()["data"]))[0]["base_id"],
    "target_asset": list(filter(lambda a: a["base"] == "ETH", prices.json()["data"]))[0]["base_id"]
})

if trade.status_code == 201:
    client._post("v2", "trades", trade.json()["data"]["id"], "commit")
```

---
1. <https://stackoverflow.com/a/67064120>
2. <https://stackoverflow.com/a/66831192>




