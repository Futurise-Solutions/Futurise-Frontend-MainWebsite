/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

/**
 * Preload the home route's chunks.
 *
 * THE PROBLEM THIS SOLVES
 * Every route is lazy-loaded, which is right for the site as a whole but wrong for `/`.
 * The browser cannot discover the HomePage chunk until it has downloaded and parsed the
 * entry bundle, so the home page costs a second round trip that the other 780 kB of
 * already-preloaded JavaScript does not. Measured on a local preview: navbar and footer
 * mounted at ~500 ms while the hero did not paint until ~800 ms, and the gap was the
 * HomePage chunk (plus the twelve component chunks it imports) being fetched late.
 *
 * That gap is what made the boot loader feel wrong: the loader cleared on schedule and
 * the page underneath was still assembling.
 *
 * WHY A PLUGIN RATHER THAN A HARDCODED <link>
 * Chunk filenames carry content hashes and change on every build, so a hand-written tag in
 * index.html would be stale immediately. This reads the real bundle graph after Rollup has
 * finished and writes hints for exactly the chunks the home route needs.
 *
 * `modulepreload` (not `preload`) is correct here: these are ES modules, so the browser
 * parses and caches them in the module map ready for the dynamic import, rather than only
 * placing them in the HTTP cache.
 *
 * SCOPE: home only. Preloading every route's chunks would put the whole site on the
 * critical path and make the entry slower for everyone — the opposite of the intent.
 */
function preloadHomeChunks() {
  return {
    name: 'preload-home-chunks',
    apply: 'build',
    enforce: 'post',
    // Runs inside generateBundle and edits the emitted HTML directly, rather than using
    // transformIndexHtml. That hook fires BEFORE the bundle exists, so the chunk graph it
    // would need is not yet available — an earlier version of this plugin read it there and
    // silently injected nothing. Editing the HTML asset here is the only ordering that has
    // the finished graph in hand. Verified by asserting the tag count after a build.
    generateBundle(_options, bundle) {
      const html = Object.values(bundle).find(
        (a) => a.type === 'asset' && a.fileName === 'index.html'
      )
      const entry = Object.values(bundle).find((c) => c.type === 'chunk' && c.isEntry)
      const home = Object.values(bundle).find(
        (c) => c.type === 'chunk' && /(^|\/)HomePage-/.test(c.fileName)
      )
      if (!html || !home) return

      // Anything already in the entry's own preload set is skipped: Vite emits those tags
      // itself and duplicating them would only add bytes to the HTML.
      const alreadyPreloaded = new Set([entry?.fileName, ...(entry?.imports ?? [])])
      const seen = new Set()
      const walk = (fileName) => {
        if (!fileName || seen.has(fileName)) return
        seen.add(fileName)
        const chunk = bundle[fileName]
        if (chunk && chunk.type === 'chunk') chunk.imports.forEach(walk)
      }
      walk(home.fileName)

      const tags = [...seen]
        .filter((f) => !alreadyPreloaded.has(f))
        .map((f) => `    <link rel="modulepreload" crossorigin href="/${f}">`)
        .join('\n')

      if (!tags) return
      html.source = String(html.source).replace('</head>', `${tags}\n  </head>`)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), preloadHomeChunks()],
  build: {
    rollupOptions: {
      output: {
        // Split always-loaded vendor libs into stable, long-cacheable chunks so
        // app-code deploys don't bust the (large) framework bundle in browsers.
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "chakra-vendor": ["@chakra-ui/react", "@emotion/react", "@emotion/styled"],
          "motion-vendor": ["framer-motion"],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: false,
    exclude: ['node_modules', 'dist'],
  },
})
