import { Cormorant_Garamond, Manrope } from 'next/font/google'

/**
 * Brand typography: Cormorant Garamond (headings) + Manrope (body and UI).
 *
 * Both are open-licence Google Fonts. next/font downloads them at build time and serves
 * them from this site, so no request goes to Google at runtime. They replace the
 * Zangezi and Aeonik *trial* files, which were never licensed for production use.
 *
 * Both are variable fonts, so one file per style covers every weight:
 *   Cormorant Garamond  300–700, normal + italic (italic accents in headings use it)
 *   Manrope             200–800, normal only (the family has no italic cut)
 *
 * The default `adjustFontFallback` stays on: next/font adds a metric-matched local
 * fallback (Times New Roman / Arial) so text does not jump when the web font arrives.
 */
export const headingFont = Cormorant_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['-apple-system', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
})

/** Both CSS variables, for the <html> className. */
export const fontVariables = `${headingFont.variable} ${bodyFont.variable}`
