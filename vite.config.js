import { rmSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { site } from './src/config/site.js'

// Fonts used above the fold on every page: preloaded so text renders without a swap flash.
const CRITICAL_FONTS = /^assets\/(Inter-(Regular|Medium|SemiBold)-subset|jost-latin-400-normal|abril-fatface-latin-400-normal)-[\w-]+\.woff2$/

// index.html: fills %BRAND% / %DESCRIPTION% / %SITE_URL% / %TAGLINE% from site.js, and (in builds)
// adds <link rel="preload"> for the critical font files emitted by the bundler.
function storeHtml() {
  return {
    name: 'store-html',
    transformIndexHtml(html, ctx) {
      const filled = html
        .replaceAll('%BRAND%', site.brandName)
        .replaceAll('%TAGLINE%', site.tagline)
        .replaceAll('%DESCRIPTION%', site.description)
        .replaceAll('%SITE_URL%', site.siteUrl)
      const fonts = Object.keys(ctx.bundle ?? {}).filter((f) => CRITICAL_FONTS.test(f))
      return {
        html: filled,
        tags: fonts.map((f) => ({
          tag: 'link',
          attrs: { rel: 'preload', href: `/${f}`, as: 'font', type: 'font/woff2', crossorigin: '' },
          injectTo: 'head-prepend',
        })),
      }
    },
  }
}

// public/images-source/ holds the original photo downloads used by `npm run images`; they are
// build inputs only, so they are removed from the built site.
function dropImageSources() {
  let outDir = 'dist'
  return {
    name: 'drop-image-sources',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      rmSync(resolve(outDir, 'images-source'), { recursive: true, force: true })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), storeHtml(), dropImageSources()],
})
