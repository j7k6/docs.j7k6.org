---
layout: post
title: "Bypass Cloudflare Protection with Selenium when Scraping Website with Python"
---

## Dependencies
1. Install Packages
   ```bash
   apt update
   apt install -y firefox-esr python3-pip
   
   pip3 install selenium
   ```
2. Download *geckodriver*:
   ```bash
   curl -fsSL https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz | sudo tar zxvf - -C /usr/local/bin/
   ```

## Code
```python
import time
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

url = "<$TARGET_URL>"

options = Options()
options.headless = True
browser = webdriver.Firefox(options=options)
browser.get(url)
time.sleep(5)

page_source = browser.page_source
browser.close()

print(page_source)
```

---
