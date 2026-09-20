'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import EmotionRegistry from './emotion-registry'
import theme from '@/theme'

/**
 * Client-side provider stack. Everything Chakra touches lives under here.
 *
 * ORDER MATTERS: EmotionRegistry must wrap ChakraProvider, not the other way round.
 * The registry installs the Emotion cache that Chakra's components then insert into;
 * inverted, Chakra renders against the default cache and nothing reaches the server HTML.
 *
 * ── ColorModeScript ──────────────────────────────────────────────────────────
 * The site is dark-only: `initialColorMode: 'dark'`, `useSystemColorMode: false`
 * (theme/index.ts). This inline script sets the colour mode before first paint so there
 * is no light-mode flash.
 *
 * ⚠️ Deviating from MIGRATION-GUIDE.md §1.3 here, deliberately:
 * the guide writes `<ColorModeScript initialColorMode="dark" type="cookie" />`.
 *
 *   1. `type="cookie"` is NOT what the old app uses. src/main.jsx renders
 *      `<ColorModeScript initialColorMode={theme.config.initialColorMode} />` with no
 *      `type`, i.e. the localStorage default. Switching storage backends is an
 *      unrequested behaviour change (AGENTS.md rule 1), and `type="cookie"` additionally
 *      makes the layout dependent on a request cookie.
 *   2. The value is read from `theme.config` rather than hardcoded, exactly as the old
 *      app does, so the theme stays the single source of truth for colour mode.
 *
 * Recorded because it is a visible difference from the guide's literal code sample.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </EmotionRegistry>
  )
}
