'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './NotFound.module.css';

export default function NotFoundBody() {
  const router = useRouter();
  return (
    <section className={styles.page}>
      <div className={styles.masthead}><span>FUTURISE / OFF THE MAP</span><span>ERROR 404</span></div>
      <div className={styles.layout}>
        <div className={styles.art} aria-hidden="true">
          <span>4</span>
          <div className={styles.portal}>
            {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ '--ring': i }} />)}
            <b>?</b>
          </div>
          <span>4</span>
          <small>A LITTLE OUTSIDE THE KNOWN UNIVERSE.</small>
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>A WRONG TURN. A FRESH START.</p>
          <h1>This page drifted<br />into the <em>future.</em></h1>
          <p>The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track.</p>
          <div className={styles.actions}>
            <Link href="/">Back home <span aria-hidden="true">↗</span></Link>
            <button type="button" onClick={() => window.history.length > 1 ? router.back() : router.push('/')}>← Go back</button>
          </div>
        </div>
      </div>
      <nav className={styles.routes} aria-label="Explore Futurise">
        <span>FIND YOUR NEXT DIRECTION</span>
        <Link href="/about">Meet the studio <span aria-hidden="true">↗</span></Link>
        <Link href="/portfolio">Explore our work <span aria-hidden="true">↗</span></Link>
        <Link href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
      </nav>
    </section>
  );
}
