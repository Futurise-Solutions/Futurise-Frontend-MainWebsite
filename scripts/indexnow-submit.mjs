/**
 * IndexNow submission (Bing, Yandex, Seznam; feeds ChatGPT search and Copilot).
 *
 *   npm run indexnow                                   submit every <loc> in the live sitemap
 *   node scripts/indexnow-submit.mjs <url> [<url>...]  submit only the given URLs
 *
 * Run this AFTER the production deploy is live. It first fetches the key file from
 * production and exits non-zero if it is not served yet, because IndexNow rejects
 * submissions whose key file cannot be verified. Node 20+, no dependencies.
 */

const HOST = 'www.futurisesolutions.com'
const KEY = 'a4f29a770331ad81d74843080a324d60'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP = `https://${HOST}/sitemap.xml`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

function fail(message) {
  console.error(`indexnow: ${message}`)
  process.exit(1)
}

async function keyFileIsLive() {
  try {
    const res = await fetch(KEY_LOCATION)
    return res.ok && (await res.text()).trim() === KEY
  } catch {
    return false
  }
}

async function sitemapUrls() {
  const res = await fetch(SITEMAP)
  if (!res.ok) fail(`could not fetch ${SITEMAP} (HTTP ${res.status})`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1])
}

if (!(await keyFileIsLive())) {
  fail(`key file ${KEY_LOCATION} is not live or does not match the key. Deploy to production first, then re-run.`)
}

const args = process.argv.slice(2)
const urlList = args.length ? args : await sitemapUrls()
if (!urlList.length) fail('no URLs to submit')

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
})

console.log(`IndexNow responded ${res.status} for ${urlList.length} URL(s)`)
if (!res.ok) process.exit(1)
