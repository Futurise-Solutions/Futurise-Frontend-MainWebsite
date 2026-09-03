import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from "@vercel/analytics/react"
import { initClarity } from './utils/clarity'

/*
 * Microsoft Clarity is started here rather than rendered as a component, because it has
 * no UI and nothing about it belongs in the React tree.
 *
 * `requestIdleCallback` holds the injection until the browser is idle, so fetching the
 * tag cannot compete with the home hero for bandwidth or main-thread time during the
 * first paint — the boot loader and LCP element are unaffected either way, since the
 * script is async and injected after mount. The 3s timeout is the fallback for a page
 * that never goes idle, and for Safari, which still lacks requestIdleCallback.
 *
 * initClarity() is a no-op outside production and guards against double-injection, so
 * calling it here is safe despite StrictMode's deliberate double-invocation.
 */
const startClarity = () => initClarity()
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) window.requestIdleCallback(startClarity, { timeout: 3000 })
  else setTimeout(startClarity, 2000)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
        <SpeedInsights />
        <Analytics/>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)