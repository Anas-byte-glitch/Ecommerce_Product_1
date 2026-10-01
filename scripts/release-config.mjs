// Shared settings for `npm run package` and `npm run check:release` (seller-only tooling: these
// files are not shipped in the zips).
import { readFileSync } from 'node:fs'
import { site } from '../src/config/site.js'

export const root = new URL('..', import.meta.url)
export const version = JSON.parse(readFileSync(new URL('package.json', root), 'utf8')).version
export const brand = site.brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'store'
export const sourceZip = `release/${brand}-source-v${version}.zip`
export const builtZip = `release/${brand}-built-v${version}.zip`

// Everything that goes into the source zip (folders are copied recursively).
export const SOURCE_ALLOWLIST = [
  'src',
  'public',
  'scripts',
  'docs/01-quick-start.md',
  'docs/02-store-settings.md',
  'docs/03-products.md',
  'docs/04-design.md',
  'docs/05-pages-and-content.md',
  'docs/06-deploy.md',
  'docs/07-next-steps.md',
  'docs/08-troubleshooting.md',
  'docs/IMAGES.md',
  'index.html',
  'vite.config.js',
  'package.json',
  'package-lock.json',
  '.oxlintrc.json',
  '.gitignore',
  'vercel.json',
  'images.json',
  'README.md',
  'CHANGELOG.md',
  'LICENSE.txt',
  'CREDITS.md',
]

// Internal files: kept in the repository for the seller, never shipped (checked in both zips).
export const EXCLUDED = [
  /(^|\/)CLAUDE\.md$/,
  /(^|\/)DESIGN_NOTES\.md$/,
  /(^|\/)reference\//,
  /(^|\/)internal\//,
  /(^|\/)scripts\/(package-release|check-release|release-config)\.mjs$/,
  /(^|\/)node_modules\//,
  /(^|\/)\.git\//,
  /(^|\/)dist\//,
  /(^|\/)release\//,
  /(^|\/)images-source\//,
  /(^|\/)\.env/,
]

// package.json scripts that only make sense for the seller.
export const SELLER_SCRIPTS = ['package', 'check:release']

// Old-URL redirects (from before the rebrand) are marked with these comments in public/_redirects
// and public/.htaccess; the packaged copies drop the marked block. In vercel.json every redirect
// whose source starts with LEGACY_PREFIX is dropped.
export const LEGACY_START = '# legacy-redirects:start'
export const LEGACY_END = '# legacy-redirects:end'
export const LEGACY_PREFIX = '/atlas/'
