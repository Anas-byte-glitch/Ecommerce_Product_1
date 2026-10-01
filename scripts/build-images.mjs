// Builds the store's photos from images.json (run with `npm run images`).
//
// 1. Downloads each photo once into public/images-source/<file>.jpg (skipped when the file is
//    already there, so the network is only needed the first time).
// 2. Crops it to the slot's exact aspect ratio and writes optimized WebP files at each width:
//    public/images/<file>-<width>.webp
// 3. Writes src/data/imageManifest.json, which the components read. A slot that is missing from
//    the manifest falls back to its SVG placeholder.
//
// Optional per-slot fields in images.json:
//   focus: [x, y]  point of the photo to keep in the middle of the crop (0–1, default [0.5, 0.5])
//   zoom:  number  > 1 crops tighter around `focus` (default 1 = largest possible crop)
//
// To use your own photo: put a JPG/PNG/WebP at public/images-source/<file>.jpg (same name as the
// slot's "file" + .jpg) and run `npm run images` again. Delete `url` from the slot if you like.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const { images } = JSON.parse(readFileSync(`${root}images.json`, 'utf8'))
const only = process.argv.slice(2) // optional: build only these slots / files
const manifest = {}

for (const img of images) {
  const selected = !only.length || only.includes(img.slot) || only.includes(img.file)
  const source = `${root}public/images-source/${img.file}.jpg`

  if (!existsSync(source)) {
    if (!img.url) {
      console.warn(`- ${img.slot}: no source file and no url, keeping the placeholder`)
      continue
    }
    mkdirSync(dirname(source), { recursive: true })
    // Pexels serves resized originals; 2400px is plenty for every slot.
    const url = img.url.includes('pexels.com') ? `${img.url}?auto=compress&cs=tinysrgb&w=2400` : img.url
    const res = await fetch(url)
    if (!res.ok) {
      console.warn(`- ${img.slot}: download failed (${res.status}), keeping the placeholder`)
      continue
    }
    writeFileSync(source, Buffer.from(await res.arrayBuffer()))
    console.log(`↓ ${img.file} downloaded`)
  }

  const [aw, ah] = img.aspect
  const widths = [...img.widths].sort((a, b) => a - b)
  if (selected) {
    const { width: sw, height: sh } = await sharp(source).rotate().metadata()
    // Largest box with the slot's aspect ratio, shrunk by `zoom`, centered on `focus`.
    const zoom = img.zoom ?? 1
    let cw = Math.min(sw, (sh * aw) / ah) / zoom
    let ch = (cw * ah) / aw
    const [fx, fy] = img.focus ?? [0.5, 0.5]
    const left = Math.round(Math.min(Math.max(fx * sw - cw / 2, 0), sw - cw))
    const top = Math.round(Math.min(Math.max(fy * sh - ch / 2, 0), sh - ch))
    cw = Math.floor(cw)
    ch = Math.floor(ch)

    const outDir = dirname(`${root}public/images/${img.file}`)
    mkdirSync(outDir, { recursive: true })
    for (const w of widths) {
      const out = `${root}public/images/${img.file}-${w}.webp`
      rmSync(out, { force: true })
      await sharp(source)
        .rotate()
        .extract({ left, top, width: cw, height: ch })
        .resize(w, Math.round((w * ah) / aw))
        .webp({ quality: 78, effort: 5 })
        .toFile(out)
    }
    console.log(`✓ ${img.file} (${widths.join(', ')}px)`)
  }
  if (widths.every((w) => existsSync(`${root}public/images/${img.file}-${w}.webp`))) {
    manifest[img.file] = { widths, aspect: img.aspect }
  }
}

writeFileSync(`${root}src/data/imageManifest.json`, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Manifest: ${Object.keys(manifest).length} of ${images.length} slots use photos.`)
