# 08 — Troubleshooting

## The page is blank (white)

**While running `npm run dev`:** look at the terminal and at the browser (red error overlay).
Almost always a typing mistake in a file you just edited:

- a missing comma between two entries of a list, e.g. `{ … }` `{ … }` instead of `{ … },` `{ … }`
- a missing or extra quote: `'It's great'` — the apostrophe ends the text early. Write
  `'It’s great'` (typographic apostrophe) or `` `It's great` `` (backticks)
- a missing closing bracket `}` or `]`

Undo your last change (Ctrl + Z in the editor), save, and redo it carefully. The error message
gives the file and line number.

**On the live site:**

1. Open the browser console (F12 → Console). An error about a missing file (`404` for
   `/assets/index-….js`) means not all files were uploaded: upload the **whole contents** of
   `dist/` again, including the `assets` folder.
2. The site must be at the root of a domain or subdomain. In a sub-folder
   (`mystore.com/shop/`) the page stays blank because the files are looked for at `/assets/`.
3. Make sure you uploaded the built `dist/` contents, not the project's source files (an
   `index.html` that mentions `/src/main.jsx` is the source one).

## "404 Not Found" when reloading a page or opening a link directly

Home works, but `/product/…`, `/about` etc. give the host's 404 page when opened directly or
reloaded. The host is missing the single-page-app fallback to `index.html`:

- **Apache / cPanel:** `.htaccess` was not uploaded (hidden file — enable "Show Hidden Files" in
  File Manager or your FTP program) or is in the wrong folder (it must be next to `index.html`).
- **Netlify:** `_redirects` must be inside the published folder (it is, if you upload `dist/`).
- **Vercel:** keep `vercel.json` at the project root.
- **Nginx:** add `try_files $uri $uri/ /index.html;` (see [06 — Deploy](06-deploy.md)).

## "500 Internal Server Error" after uploading `.htaccess`

Your Apache host does not allow one of the directives. Open `.htaccess` and remove, one at a
time, the line `Options -MultiViews`, then the `<IfModule mod_headers.c>` block, reloading the
site after each change. If it still fails, ask your host to enable `mod_rewrite`.

## Images are missing or show grey placeholders

- **Grey/beige shapes instead of photos:** the WebP file for that slot is missing, so the SVG
  placeholder is shown. Run `npm run images` (needs internet the first time to download the demo
  photos), then `npm run build`.
- **Empty image areas on the live site:** the `images` folder was not uploaded, or only partly.
  Upload `dist/images` again.
- **A new product shows no image:** add its photos (see [03 — Products](03-products.md)) or copy
  two placeholder SVGs with the product's slug in the name.
- **`npm run images` fails to download:** check your internet connection, or put your own photos
  in `public/images-source/…` (see [IMAGES.md](IMAGES.md)); a slot without a source keeps its
  placeholder.
- File names are case-sensitive on most hosts: `Hoodie-1.jpg` ≠ `hoodie-1.jpg`.

## Build errors

| Message | Fix |
| --- | --- |
| `'node' is not recognized` / `command not found: npm` | Node.js is not installed or the terminal was opened before installing it. Install Node.js 20.19+ and open a new terminal |
| `npm ERR! enoent … package.json` | The terminal is not in the project folder. `cd` into the folder that contains `package.json` (see [01 — Quick start](01-quick-start.md)) |
| `Cannot find module …` / `vite: not found` | Run `npm install` first |
| `Unsupported engine` or Vite says your Node.js version is too old | Install Node.js 22 LTS from nodejs.org |
| `Expected "," but found …` / `Unexpected token` with a file and line | Typing mistake at that line — see "The page is blank" above |
| `Could not resolve "../data/…"` | A file was renamed or deleted; restore it or fix the import at the line shown |
| `Error: Cannot find module '@rolldown/binding-…'` or `sharp` errors after copying the project from another computer | Delete the `node_modules` folder and `npm install` again (these packages are specific to each operating system) |
| `EACCES` / permission errors | Do not use `sudo`; move the project to a folder you own (e.g. Documents) |

## `npm run dev`: "Port 5173 is in use"

Another dev server is still running. Close the other terminal, or use the address Vite prints
(it picks the next free port, e.g. 5174).

## Changes do not appear on the live site

- Did you run `npm run build` after the change and upload the new `dist` contents?
- The browser may show a cached copy: reload with Ctrl + Shift + R (Cmd + Shift + R on macOS).

## Cart behaves oddly after changing products

The cart is saved in each visitor's browser. Products that no longer exist are removed
automatically. To start fresh in your own browser: F12 → Application → Local Storage → delete
`store-cart`.

## Accessibility check (`npm run a11y`, optional)

It runs automated accessibility tests on every page in a headless browser. It needs Playwright:

```bash
npm install -D playwright
npx playwright install chromium
npm run build
npm run preview          # leave running, then in a second terminal:
npm run a11y
```
