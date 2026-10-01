# 01 — Quick start

This guide takes you from the downloaded zip file to the store running on your computer, then to
the finished website files you upload to a host. No programming knowledge is needed.

## 1. Install Node.js (once)

Node.js is the free program that builds the website.

1. Go to <https://nodejs.org> and download the **LTS** version (22 or newer is recommended; the
   minimum is 20.19).
2. Run the installer and accept the default options.
3. Check that it worked. Open a terminal:
   - **Windows:** press the Windows key, type `PowerShell`, press Enter.
   - **macOS:** press Cmd + Space, type `Terminal`, press Enter.
   - **Linux:** open your Terminal app.

   Type the following and press Enter:

   ```bash
   node -v
   ```

   You should see a version such as `v22.12.0`. If you see "command not found", restart the
   computer and try again.

## 2. Unzip the project

Unzip `halvo-source-v1.0.0.zip` somewhere easy to find, for example in your Documents folder.
You get a folder containing `package.json`, `src`, `public`, `docs` and more.

## 3. Open a terminal in the project folder

- **Windows:** open the folder in File Explorer, click the address bar, type `powershell` and
  press Enter.
- **macOS:** in Terminal type `cd ` (with a space), drag the folder onto the Terminal window and
  press Enter.
- **Linux:** right-click inside the folder and choose "Open in Terminal", or use `cd`.

Check that you are in the right place:

```bash
npm pkg get name
```

It should print `"halvo-store"` (or the name you gave it later).

## 4. Install the project's libraries (once)

```bash
npm install
```

This downloads everything the project needs into a `node_modules` folder. It takes a minute and
needs an internet connection. Warnings in yellow are normal; red `ERR!` lines are not (see
[08 — Troubleshooting](08-troubleshooting.md)).

## 5. Run the store on your computer

```bash
npm run dev
```

The terminal prints a line like `Local: http://localhost:5173/`. Open that address in your
browser. Leave the terminal open: while it runs, every change you save in the project appears in
the browser immediately. Press **Ctrl + C** in the terminal to stop it.

## 6. Build the finished website

When you are happy with your changes:

```bash
npm run build
```

This creates a `dist` folder containing the complete website (HTML, CSS, JavaScript, images,
fonts). **The `dist` folder is what you upload to your web host** — see [06 — Deploy](06-deploy.md).
The build also regenerates the favicon, the social-sharing image, `robots.txt` and `sitemap.xml`
from your settings.

## 7. Check the finished website before uploading

```bash
npm run preview
```

Open <http://localhost:4173>. This serves the `dist` folder exactly as a host would. Click
through the pages, open a product, then reload the page: it should stay on the product.
Press **Ctrl + C** to stop.

## Next

- Change the brand name, currency and shipping: [02 — Store settings](02-store-settings.md)
- Edit products: [03 — Products](03-products.md)
- Put the site online: [06 — Deploy](06-deploy.md)

## Which program should I edit files with?

Any plain-text editor works. [Visual Studio Code](https://code.visualstudio.com) (free) is the
most comfortable: File → Open Folder → choose the project folder. Do not use Word or another
word processor: it would break the files.
