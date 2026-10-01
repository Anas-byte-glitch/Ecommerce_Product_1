# 06 — Deploy (put the store online)

The finished store is a **static website**: a folder of files (`dist/`) that any web host can
serve. No database or server program is needed.

There is one rule every host must follow: **every address must fall back to `index.html`**.
Pages such as `/product/zipper-hoodie` do not exist as files; the site's JavaScript draws them.
Without the fallback, opening or reloading such an address shows the host's "404 Not Found".
The project includes ready-made settings for Vercel, Netlify and Apache (cPanel); for Nginx copy
the snippet below.

**Before deploying:** set `siteUrl` (your domain) and `contactEmail` in `src/config/site.js`,
then run `npm run build`. Always upload the result of a fresh build.

> The store must be served from the root of a domain or subdomain (`https://mystore.com/` or
> `https://shop.mystore.com/`), not from a sub-folder such as `https://mystore.com/shop/`.

---

## Option A — Netlify, drag and drop (easiest, no account setup beyond sign-up)

1. Run `npm run build`.
2. Go to <https://app.netlify.com/drop> and sign in (free).
3. Drag the **`dist` folder** (not the project folder) onto the page.
4. Netlify gives you an address like `https://random-name.netlify.app`. Open it, open a product
   and reload the page: it must stay on the product.
5. To use your own domain: Site configuration → Domain management → Add a domain.

`dist/_redirects` (copied from `public/_redirects`) tells Netlify to fall back to `index.html`.

### Netlify with automatic builds from GitHub/GitLab

New site → Import an existing project → choose the repository, then:

- Build command: `npm run build`
- Publish directory: `dist`

Netlify rebuilds the site each time you push a change.

## Option B — Vercel

1. Put the project in a GitHub, GitLab or Bitbucket repository.
2. On <https://vercel.com> → Add New → Project → import the repository.
3. Framework preset: **Vite** (detected automatically). Build command `npm run build`, output
   directory `dist`. Click Deploy.

`vercel.json` already contains the fallback to `index.html`.

Without a repository you can deploy from your computer with the Vercel command line:

```bash
npx vercel          # first time: log in and answer the questions (defaults are fine)
npx vercel --prod   # publish
```

## Option C — cPanel / shared hosting (Apache)

1. Run `npm run build` (or use the ready-built zip `halvo-built-v1.0.0.zip` if you received it).
2. In cPanel open **File Manager** and go to `public_html` (or the folder of your subdomain).
3. Upload **the contents** of `dist/` — `index.html`, the `assets` and `images` folders,
   `.htaccess`, `favicon.svg`, `og-image.svg`, `robots.txt`, `sitemap.xml`, `_redirects` — so
   that `index.html` sits directly in `public_html`. The easiest way: zip the *contents* of
   `dist`, upload the zip, then right-click it → Extract.
4. **Check that `.htaccess` is there.** Files starting with a dot are hidden by default: in File
   Manager click Settings (top right) → tick "Show Hidden Files (dotfiles)".
5. Visit your domain, open a product, reload: it must stay on the product.

`.htaccess` does three things: the fallback to `index.html` (needs Apache's `mod_rewrite`,
enabled on almost every host), compression of text files, and browser caching (files in
`assets/` have a unique name per build, so they can be cached for a year). If your host shows
"500 Internal Server Error" after uploading `.htaccess`, see
[08 — Troubleshooting](08-troubleshooting.md).

Upload with FTP instead? Use any FTP program (e.g. FileZilla), connect with the details from
your host, and copy the contents of `dist/` into `public_html` the same way. Enable "show hidden
files" in the FTP program so `.htaccess` is uploaded too.

## Option D — Your own server with Nginx

Copy `dist/` to the server, e.g. `/var/www/mystore`, and use a server block like this:

```nginx
server {
    listen 80;
    server_name mystore.com www.mystore.com;
    root /var/www/mystore;
    index index.html;

    # Single-page app: real files are served, every other path gets index.html.
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Hashed build files: cache for a year.
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # Photos: cache for a month.
    location /images/ {
        expires 30d;
        try_files $uri =404;
    }

    # Always revalidate the page itself so visitors get new versions right away.
    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml text/plain text/xml;
}
```

Test and reload Nginx: `sudo nginx -t && sudo systemctl reload nginx`. Add HTTPS with
[Certbot](https://certbot.eff.org) (`sudo certbot --nginx`).

## Option E — Any other static host

Cloudflare Pages, GitHub Pages, Firebase Hosting, Render, S3… all work. Use build command
`npm run build`, output folder `dist`, and enable the host's "single-page app" / "rewrite all
paths to /index.html" option.

## After going live

- Open `https://yourdomain/sitemap.xml` and check the addresses use your domain (they come from
  `siteUrl`). You can submit it in Google Search Console.
- Share a link on a messaging app to see the social preview (brand name, tagline and
  `og-image.svg`).
- Every update: edit → `npm run build` → upload the new `dist` contents again (replace all
  files; old files in `assets/` can be deleted).
