'use client'

import { useEffect, useState } from 'react'
import usePathname from '../../lib/useSitePathname'
import { useBooking } from '../../context/BookingContext'
import styles from './BookingStrip.module.css'

const KEY = 'booking-strip-dismissed'

/**
 * One static line above the Navbar. Height is fixed in CSS so the server HTML already
 * reserves it (no layout shift). The strip is in normal flow, so it scrolls away and the
 * sticky Navbar below it is unaffected. Dismissal lasts for the visit (sessionStorage).
 */
export default function BookingStrip() {
  const { onOpen } = useBooking()
  const pathname = usePathname()
  const [dismissed, setDismissed] = useState(false)
  useEffect(() => {
    // Read after mount so the server HTML (strip present, height reserved) matches hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    try { if (window.sessionStorage.getItem(KEY) === '1') setDismissed(true) } catch {}
  }, [])
  if (dismissed || pathname?.startsWith('/futurise-admin')) return null
  const dismiss = () => {
    setDismissed(true)
    try { window.sessionStorage.setItem(KEY, '1') } catch {}
  }
  return (
    <div className={styles.strip}>
      <button type="button" className={styles.cta} onClick={() => onOpen('announcement-bar')}>
        Book a free 45-minute strategy call <span aria-hidden="true">→</span>
      </button>
      <button type="button" className={styles.close} onClick={dismiss} aria-label="Dismiss booking banner">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  )
}
