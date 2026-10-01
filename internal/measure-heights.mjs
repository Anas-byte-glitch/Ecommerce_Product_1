// Internal QA (not shipped): page heights + wordmark width at 1440 / 1000 / 390px.
// Usage: node internal/measure-heights.mjs [baseUrl] [productPath] > heights.json
// Needs a running server (npm run preview) and the pre-installed Playwright Chromium.
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'

const base = process.argv[2] ?? 'http://localhost:4173'
const productPath = process.argv[3] ?? '/product/zipper-hoodie'
const pages = { Home: '/', Shop: '/shop/all', Product: productPath, About: '/about', Contact: '/contact' }
const widths = [1440, 1000, 390]

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const out = {}
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 } })
  for (const [name, path] of Object.entries(pages)) {
    await page.goto(base + path, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(300)
    const r = await page.evaluate(() => {
      const logo = document.querySelector('header a[aria-label$="home"], nav a[aria-label$="home"]')
      return {
        height: document.documentElement.scrollHeight,
        logo: logo ? Math.round(logo.getBoundingClientRect().width * 10) / 10 : null,
      }
    })
    out[`${name}@${width}`] = r
  }
  await page.close()
}
await browser.close()
console.log(JSON.stringify(out, null, 2))
