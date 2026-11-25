'use client'

import { useBooking } from '@/context/BookingContext'
import styles from './ArticleBody.module.css'

/** Short in-article offer, shown once after the first section. Small client island.
 *  A div, not an <aside>: Journal.module.css styles every `.readingLayout aside` as the
 *  sidebar and hides it at <=1000px, which would hide this box on phones and tablets. */
export default function InlineBookingCTA({ slug, heading }) {
  const { onOpen } = useBooking()
  return (
    <div className={styles.inlineCta} role="complementary" aria-label="Book a call">
      <p>{heading || 'Working on something like this? Talk it through with the team that builds it.'}</p>
      <button type="button" onClick={() => onOpen('blog-inline:' + slug)}>Book a free 45-minute call</button>
    </div>
  )
}
