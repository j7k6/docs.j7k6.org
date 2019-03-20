---
layout: post
title: "Host a Static Jekyll Site on GitHub Pages with Cloudflare HTTPS Support"
fav: 1
---

## Prerequirements
1. Set up [**Cloudflare**](https://www.cloudflare.com) to answer DNS requests for your domain.
2. Build a static site with [**Jekyll**](https://jekyllrb.com/) (obviously.)
3. Create a `CNAME` file inside the local repository:
   ```bash
   echo "docs.j7k6.org" > CNAME
   ```

## GitHub
1. Create a GitHub repository and push the contents of the local Jekyll repository to it.
2. Navigate to the GitHub repositories' *Settings* page and scroll down the the *GitHub Pages* section to active the hosting by selecting the master branch as *Source*:
   ![github-ghpages](/files/jekyll-static-site-github-pages-cloudflare-https/ghpages-01.png)

## Cloudflare
1. Create a new *CNAME* DNS record for the desired domain in the *DNS* settings panel:
   ![cloudflare-dns](/files/jekyll-static-site-github-pages-cloudflare-https/ghpages-02.png)
   > The *Name* field is either the subdomain part or `@` if the site will not be served as a subdomain. The *Domain name* field is `<$GITHUB_USERNAME>`*.github.io*.
2. Navigate to the *Page Rules* section and create a new page rule:
   ![cloudflare-https](/files/jekyll-static-site-github-pages-cloudflare-https/ghpages-03.png)
   > This rule will redirect any page request to HTTPS, so it's always served encrypted.

That's it! Every push to the GitHub repository will now trigger a new Jekyll build and update your static site automatically.
![github-deployment](/files/jekyll-static-site-github-pages-cloudflare-https/ghpages-04.png)

## Purge Cloudflare Cache (optional)
Cloudflare's cache prevents an update to the site to be shown immediately after the push has been made. To purge the cache on every push to the GitHub repository, follow [this steps](/github-pages-cloudflare-cache-reset/).

---
