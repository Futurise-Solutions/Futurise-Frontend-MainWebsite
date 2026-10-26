import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';

// Run with Node 22.13+; no browser, real API calls or emails.
const source = await readFile('lib/blog.ts', 'utf8');
// lib/blog.ts imports the retired-slug map; the sandbox gets a stub instead.
const javascript = stripTypeScriptTypes(source).replace(/^import .*$/gm, '').replace(/\bexport /g, '');
let now = 1000, requests = 0, fail = false;
const records = [
  { slug:'old', status:'published', createdAt:'2025-01-01', content:'word '.repeat(500), shortDescription:'Short' },
  { slug:'draft', status:'draft', createdAt:'2026-01-01', content:'Hidden' },
  { slug:'new', status:'published', createdAt:'2025-06-01', content:'word '.repeat(300), shortDescription:'Short' },
  { slug:'retired', status:'published', createdAt:'2026-02-01', content:'Redirected' },
];
const context = vm.createContext({
  process: { env: {} },
  RETIRED_BLOG_REDIRECTS: { retired: '/blog' },
  Date: class extends Date { static now() { return now; } },
  fetch: async () => {
    requests++;
    return { ok: !fail, status: fail ? 503 : 200, json: async () => records };
  },
});
vm.runInContext(javascript + '\nglobalThis.api={getBlogs,getBlogSummaries};', context);
const { api } = context;
const [first, second] = await Promise.all([api.getBlogs(1), api.getBlogs(1)]);
assert.equal(requests, 1, 'Concurrent requests should share one fetch');
assert.equal(first, second);
assert.deepEqual(Array.from(first, item => item.slug), ['new','old']);
await api.getBlogs(1);
assert.equal(requests, 1, 'Fresh memo should be reused');
now += 1100;
await api.getBlogs(1);
assert.equal(requests, 2, 'Expired memo must refresh');
now += 1100; fail = true;
await assert.rejects(api.getBlogs(1), /503/);
fail = false;
await api.getBlogs(1);
assert.equal(requests, 4, 'Failed request must remain retryable');
const summaries = await api.getBlogSummaries(1);
assert(summaries.every(item => !('content' in item)));
assert.equal(summaries[0].readingMinutes, 2);
assert.equal(summaries[1].readingMinutes, 3);
console.log('PASS: blog deduplication, expiry, error recovery, retired-slug filtering, published-only summaries and reading times');

const budgets = [
  ['public/motion/studio-sculpture.mp4', 750 * 1024],
  ['public/motion/studio-sculpture-poster.webp', 50 * 1024],];
for (const [path, budget] of budgets) {
  const { size } = await stat(path);
  assert(size <= budget, `${path} exceeds its asset budget`);
  console.log(`PASS: ${path}: ${(size/1024).toFixed(1)} KiB / ${budget/1024} KiB budget`);
}
