// npm run package — builds the store and creates the two release zips in release/:
//   <brand>-source-v<version>.zip  the project (explicit allowlist, see release-config.mjs),
//                                  inside a <brand>-source-v<version>/ folder
//   <brand>-built-v<version>.zip   only the built site (dist/ contents incl. .htaccess), ready to
//                                  upload as-is
// Seller-only: this script, check-release.mjs and release-config.mjs are not shipped.
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { zipSync } from 'fflate'
import {
  builtZip,
  EXCLUDED,
  LEGACY_END,
  LEGACY_PREFIX,
  LEGACY_START,
  root,
  SELLER_SCRIPTS,
  SOURCE_ALLOWLIST,
  sourceZip,
} from './release-config.mjs'

const rootPath = fileURLToPath(root)
const isExcluded = (rel) => EXCLUDED.some((re) => re.test(rel))

// Recursively lists files (relative paths with "/") under `rel`, skipping excluded paths.
function listFiles(base, rel) {
  const abs = `${base}/${rel}`
  if (!existsSync(abs)) throw new Error(`Missing release file: ${rel}`)
  if (statSync(abs).isFile()) return isExcluded(rel) ? [] : [rel]
  return readdirSync(abs)
    .sort()
    .flatMap((name) => (isExcluded(`${rel}/${name}/`) ? [] : listFiles(base, `${rel}/${name}`)))
}

function dropLegacyBlock(text) {
  const start = text.indexOf(LEGACY_START)
  const end = text.indexOf(LEGACY_END)
  if (start === -1 || end === -1) return text
  const lineStart = text.lastIndexOf('\n', start) + 1
  const lineEnd = text.indexOf('\n', end) + 1 || text.length
  return text.slice(0, lineStart) + text.slice(lineEnd)
}

// Adjusts a few files for buyers; everything else is copied byte for byte.
function transform(rel, buf) {
  const name = rel.split('/').pop()
  if (name === '_redirects' || name === '.htaccess') {
    let text = dropLegacyBlock(buf.toString('utf8'))
    if (name === '_redirects') text = text.replace(/^# Netlify: old product URLs, then .*\n/m, '# Netlify: single-page-app fallback (every path serves index.html).\n')
    return Buffer.from(text)
  }
  if (rel === 'vercel.json') {
    const json = JSON.parse(buf.toString('utf8'))
    json.redirects = (json.redirects ?? []).filter((r) => !r.source.startsWith(LEGACY_PREFIX))
    if (!json.redirects.length) delete json.redirects
    return Buffer.from(`${JSON.stringify(json, null, 2)}\n`)
  }
  if (rel === 'package.json') {
    const json = JSON.parse(buf.toString('utf8'))
    for (const s of SELLER_SCRIPTS) delete json.scripts[s]
    return Buffer.from(`${JSON.stringify(json, null, 2)}\n`)
  }
  return buf
}

function writeZip(target, entries) {
  mkdirSync(`${rootPath}release`, { recursive: true })
  rmSync(`${rootPath}${target}`, { force: true })
  // mtime fixed so identical content gives identical zips.
  const data = Object.fromEntries(entries.map(([path, buf]) => [path, [new Uint8Array(buf), { mtime: new Date('2026-01-01') }]]))
  writeFileSync(`${rootPath}${target}`, zipSync(data, { level: 9 }))
  const size = (statSync(`${rootPath}${target}`).size / 1024 / 1024).toFixed(1)
  console.log(`✓ ${target} (${entries.length} files, ${size} MB)`)
}

console.log('Building the site…')
execSync('npm run build', { cwd: rootPath, stdio: 'inherit' })

const folder = sourceZip.replace(/^release\//, '').replace(/\.zip$/, '')
const sourceFiles = SOURCE_ALLOWLIST.flatMap((rel) => listFiles(rootPath.replace(/\/$/, ''), rel))
writeZip(
  sourceZip,
  sourceFiles.map((rel) => [`${folder}/${rel}`, transform(rel, readFileSync(`${rootPath}${rel}`))]),
)

const distFiles = listFiles(`${rootPath}dist`.replace(/\/$/, ''), '.').map((p) => p.replace(/^\.\//, ''))
if (!distFiles.includes('.htaccess')) throw new Error('dist/.htaccess is missing')
writeZip(
  builtZip,
  distFiles.map((rel) => [rel, transform(rel, readFileSync(`${rootPath}dist/${rel}`))]),
)
console.log('Next: npm run check:release')
