// Generates public/favicon.svg, public/og-image.svg, public/robots.txt and public/sitemap.xml from
// src/config/site.js and the product catalogue. Runs automatically before `npm run build`
// (npm "prebuild"); run it manually with `npm run seo` after changing the brand or products.
import { writeFileSync } from 'node:fs'
import { categories, site } from '../src/config/site.js'
import { products } from '../src/data/products.js'

const out = (file, content) => writeFileSync(new URL(`../public/${file}`, import.meta.url), content)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const base = site.siteUrl.replace(/\/$/, '')
const initial = esc(site.brandName.trim().charAt(0).toUpperCase() || 'S')

// Favicon: brand initial in the wordmark style (serif, white on ink).
out(
  'favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#09090b"/><text x="16" y="23" text-anchor="middle" font-family="'Abril Fatface', Georgia, serif" font-size="20" fill="#fff">${initial}</text></svg>\n`,
)

// Open Graph placeholder (1200×630): brand wordmark + tagline on a neutral background.
out(
  'og-image.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630"><rect width="1200" height="630" fill="#f0f0f0"/><text x="600" y="320" text-anchor="middle" font-family="'Abril Fatface', Georgia, serif" font-size="120" fill="#09090b">${esc(site.brandName.toUpperCase())}</text><text x="600" y="400" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="36" fill="#6d6d6d">${esc(site.tagline)}</text></svg>\n`,
)

out('robots.txt', `User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /checkout\n\nSitemap: ${base}/sitemap.xml\n`)

const paths = [
  '/',
  ...categories.map((c) => `/shop/${c.slug}`),
  ...products.map((p) => `/atlas/${p.slug}`),
  '/about',
  '/contact',
  '/returns/return-exchange-policy',
]
out(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${base}${p}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
)
console.log(`SEO files written for ${site.brandName} (${paths.length} URLs).`)
