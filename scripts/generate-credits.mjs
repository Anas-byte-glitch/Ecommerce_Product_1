// Writes CREDITS.md from images.json (author, source link, license of every demo photo).
// Runs at the end of `npm run images`; run it alone with `npm run credits`.
import { readFileSync, writeFileSync } from 'node:fs'

const root = new URL('..', import.meta.url)
const { images } = JSON.parse(readFileSync(new URL('images.json', root), 'utf8'))
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|')
const link = (text, url) => (url ? `[${cell(text)}](${url})` : cell(text))

const rows = images.map(
  (img) =>
    `| \`${img.file}\` | ${cell(img.where)} | ${cell(img.author)} | ${link(img.source ?? 'source', img.page)} | ${link(img.license, img.licenseUrl)} |`,
)

const md = `# Image credits

> **Demo images — for preview only.** The photos below are included so the store looks complete
> in the demo. They were downloaded from free stock sites under the licenses listed, but those
> licenses cover *your* use on a website, not resale of the photos themselves. **Before you sell
> or publish a store built from this template, replace every photo with your own (product shots,
> team, etc.) or check each license yourself.** Product photos show other people's garments, not
> the products described in the catalogue. See \`docs/IMAGES.md\` for how to replace them.

Demo photos: [Pexels License](https://www.pexels.com/license/) — free for commercial and personal
use, attribution not required, modification allowed. Not allowed: selling unaltered copies,
implying endorsement by the people shown, showing identifiable people in a bad light, or
redistributing the photos on other stock sites.

| Slot (file in \`public/images/\`) | Where it appears | Author | Source | License |
| --- | --- | --- | --- | --- |
${rows.join('\n')}

Generated from \`images.json\` by \`npm run credits\` — edit images.json, not this file.
`
writeFileSync(new URL('CREDITS.md', root), md)
console.log(`CREDITS.md written (${images.length} images).`)
