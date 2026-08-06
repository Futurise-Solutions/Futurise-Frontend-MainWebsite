/*
 * Puppeteer keeps its browser downloads in $HOME/.cache/puppeteer by default. That is
 * durable on a workstation and ephemeral on Vercel, and it is what broke production:
 * the build container resolved the path correctly, found nothing in it, and
 * prerender.js fell through to meta-only output. The log read
 *
 *   2. your cache path is incorrectly configured (which is: /vercel/.cache/puppeteer)
 *
 * which is Puppeteer reporting where it looked, not a malformed path.
 *
 * Pinning the cache inside the project makes the location a property of the repo
 * rather than of $HOME, so the install step and the prerender step agree on one
 * directory in every environment. Whichever mechanism supplies the browser — npm
 * running puppeteer's postinstall on a cold tree, or `npm run browsers:install` on a
 * warm one — it lands here.
 *
 * Must stay .cjs: package.json sets "type": "module".
 * The directory is gitignored; it is build input, never build output (only dist/ ships).
 */
const { join } = require('path');

module.exports = {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
