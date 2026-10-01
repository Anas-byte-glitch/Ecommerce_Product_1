// Accessibility check: runs axe-core (WCAG 2.x A/AA + best practices) on every route and on the
// open cart drawer, Size Guide and mobile menu. Usage:
//   npm run build && npm run preview      (in another terminal)
//   npm run a11y                          (needs Playwright: `npm i -D playwright` or a global
//                                          install; set PLAYWRIGHT_MODULE / CHROMIUM_PATH if needed)
import { createRequire } from 'node:module'

const BASE = process.env.BASE_URL || 'http://localhost:4173'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const axePath = createRequire(import.meta.url).resolve('axe-core/axe.min.js')
const items = [
  { slug: 'zipper-hoodie', size: 'M', quantity: 2 },
  { slug: 'chill-vibes-tee', size: 'L', quantity: 1 },
]

const click = (selector) => async (page) => {
  await page.click(selector)
  await page.waitForTimeout(300)
}
const cases = [
  ['/'],
  ['/shop/all'],
  ['/product/zipper-hoodie'],
  ['/about'],
  ['/contact'],
  ['/returns/return-exchange-policy'],
  ['/404'],
  ['/cart'],
  ['/checkout'],
  ['/checkout (errors)', '/checkout', click('main button[type=submit]')],
  ['/product/zipper-hoodie (cart drawer)', '/product/zipper-hoodie', click('main button:has-text("Add to Cart")')],
  ['/product/zipper-hoodie (size guide)', '/product/zipper-hoodie', click('button:has-text("Size Guide")')],
  ['/ (mobile menu)', '/', click('header button[aria-controls="mobile-menu"]'), 390],
]

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
let failed = 0
for (const [label, path = label, action, width = 1440] of cases) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  await page.goto(BASE + '/')
  await page.evaluate((v) => localStorage.setItem('store-cart', JSON.stringify({ state: { items: v }, version: 1 })), items)
  await page.goto(BASE + path)
  await page.waitForTimeout(3200) // let hero appear animations finish
  if (action) await action(page)
  await page.addScriptTag({ path: axePath })
  const violations = await page.evaluate(async () =>
    (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations,
  )
  const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact))
  failed += serious.length
  console.log(`${label}: ${violations.length ? violations.map((v) => `${v.impact}:${v.id}(${v.nodes.length})`).join(', ') : 'no violations'}`)
  await page.close()
}
await browser.close()
process.exit(failed ? 1 : 0)
