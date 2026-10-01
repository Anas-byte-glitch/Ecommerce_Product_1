// npm run check:release — opens both release zips and fails if they contain:
//   - an internal / excluded file (CLAUDE.md, DESIGN_NOTES.md, reference/, internal/, release
//     tooling, node_modules, .git, dist, release, images-source, .env…)
//   - the words "framerusercontent", "framer" or "atlas" (case-insensitive) in any file name or
//     file content, or a mention of an internal file.
// "atlas" is matched anywhere (substring). "framer" is matched as a word, because minified
// library code contains words such as "keyframeResolver" / "FrameRate". Two third-party library
// identifiers are allowed and reported: the npm package name "framer-motion" (a dependency of
// the "motion" animation library, in package-lock.json) and Motion's internal attribute
// "data-framer-portal-id" (inside the bundled JavaScript).
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { unzipSync } from 'fflate'
import { builtZip, EXCLUDED, root, sourceZip } from './release-config.mjs'

const rootPath = fileURLToPath(root)
const FORBIDDEN = [
  { name: 'framerusercontent', re: /framerusercontent/gi },
  { name: 'atlas', re: /atlas/gi },
  { name: 'framer', re: /(?<![a-z])framer(?![a-z])/gi },
  { name: 'internal file mention', re: /DESIGN_NOTES|CLAUDE\.md/g },
]
const ALLOWED = [
  { file: /(^|\/)package-lock\.json$/, text: /framer-motion/gi, why: 'npm dependency of "motion"' },
  { file: /^assets\/.*\.js$/, text: /data-framer-portal-id/g, why: 'attribute name inside the Motion library' },
]

let failures = 0
const fail = (msg) => {
  failures++
  console.error(`  ✗ ${msg}`)
}

for (const zip of [sourceZip, builtZip]) {
  console.log(`\n${zip}`)
  if (!existsSync(`${rootPath}${zip}`)) {
    fail('zip not found — run `npm run package` first')
    continue
  }
  const files = unzipSync(new Uint8Array(readFileSync(`${rootPath}${zip}`)))
  const names = Object.keys(files)
  const allowedHits = {}
  // Source zip entries live in a top-level folder; strip it for the path rules.
  const strip = (p) => (zip === sourceZip ? p.replace(/^[^/]+\//, '') : p)

  for (const path of names) {
    const rel = strip(path)
    if (EXCLUDED.some((re) => re.test(rel))) fail(`excluded file: ${path}`)
    for (const { name, re } of FORBIDDEN) if (rel.match(re)) fail(`"${name}" in file name: ${path}`)

    let text = Buffer.from(files[path]).toString('latin1')
    for (const a of ALLOWED) {
      if (!a.file.test(rel)) continue
      const n = text.match(a.text)?.length ?? 0
      if (n) {
        allowedHits[`${rel}: ${a.text.source} (${a.why})`] = n
        text = text.replace(a.text, '')
      }
    }
    for (const { name, re } of FORBIDDEN) {
      const m = text.match(re)
      if (m) {
        const i = text.search(re)
        fail(`"${name}" ×${m.length} in ${path}: …${text.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, ' ')}…`)
      }
    }
  }
  console.log(`  ${names.length} files scanned`)
  for (const [k, n] of Object.entries(allowedHits)) console.log(`  allowed ×${n}: ${k}`)
}

if (failures) {
  console.error(`\ncheck:release FAILED (${failures} problem${failures > 1 ? 's' : ''})`)
  process.exit(1)
}
console.log('\ncheck:release passed')
