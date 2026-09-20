'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

/**
 * Emotion SSR registry.
 *
 * WHY THIS FILE EXISTS
 * Chakra v2 styles components with Emotion, which by default injects its <style> tags
 * from the browser after hydration. On a server-rendered page that means the first paint
 * has the markup but none of the styles: a flash of unstyled content, followed by a
 * hydration mismatch when the client-generated class names do not match what the server
 * sent. This collects every rule Emotion produces during the render and flushes it into
 * the server HTML via useServerInsertedHTML, so "View Source" already contains the styles.
 *
 * WHY HAND-ROLLED RATHER THAN @chakra-ui/next-js
 * That package wraps this same ~25 lines and adds a dependency that has historically
 * lagged behind Next releases. There is nothing here worth taking a version risk on.
 *
 * HOW THE INSERT HOOK WORKS
 * `cache.insert` is wrapped so that every serialized rule name Emotion inserts is also
 * pushed onto a local array. `flush()` returns and clears that array. useServerInsertedHTML
 * calls flush() at each flush point and emits only the rules inserted since the last one,
 * so nothing is duplicated and nothing is lost across streaming boundaries.
 *
 * `cache.compat = true` suppresses Emotion's "you are rendering a <style> tag on the
 * server" speed-up path, which is what makes the wrapped insert observable at all.
 *
 * The cache key is "chakra" so the emitted tags read <style data-emotion="chakra ...">,
 * matching what the old Vite app produced and what the STOP GATE 1 check looks for.
 */
export default function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'chakra' })
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) inserted.push(serialized.name)
      return prevInsert(...args)
    }
    const flush = () => {
      const prev = inserted
      inserted = []
      return prev
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) return null
    let styles = ''
    for (const name of names) styles += cache.inserted[name]
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}
