import styles from './HomeIntro.module.css';

// Runs once while the initial HTML is parsed, before the site shell is painted.
// The persistent root layout does not rerun this script on client-side navigation.
// Shown once per browser session and never under reduced motion: the dialog holds the
// page inert for 2s, which is a welcome the first time and a delay every time after.
const startIntro = `(() => {
  if (window.location.pathname !== '/') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    const q = new URLSearchParams(window.location.search);
    for (const k of q.keys()) if (/^utm_/i.test(k) || k === 'gclid' || k === 'msclkid') return;
    const host = new URL(document.referrer).hostname + '/';
    if (['google.', 'bing.', 'duckduckgo.', 'yahoo.', 'ecosia.', 'baidu.', 'yandex.', 'search.brave.'].some(e => host.includes(e))) return;
  } catch {}
  try {
    if (sessionStorage.getItem('futurise-intro')) return;
    sessionStorage.setItem('futurise-intro', '1');
  } catch {}
  const dialog = document.getElementById('home-intro');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  dialog.showModal();
  window.setTimeout(() => { if (dialog.open) dialog.close(); }, 2000);
})();`;

export default function HomeIntro() {
  return <>
    {/* showModal changes the native open attribute before hydration, intentionally. */}
    <dialog id="home-intro" className={styles.intro} aria-label="Welcome to Futurise Solutions" suppressHydrationWarning>
      <div className={styles.frame}>
        <div className={styles.top}><span>FUTURISE SOLUTIONS</span><span>IDEAS INTO REALITY</span></div>
        <div className={styles.sculpture} aria-hidden="true" />
        <div className={styles.shutters} aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <i key={i} style={{ '--panel': i }} />)}</div>
        <div className={styles.center}>
          <p className={styles.word} aria-label="Futurise">{'FUTURISE'.split('').map((letter, i) => <span key={i} aria-hidden="true" style={{ '--letter': i }}>{letter}</span>)}</p>
          <p className={styles.tagline}>Think boldly. Build beautifully.</p>
        </div>
        <div className={styles.bottom}><span role="status">Opening the studio</span><span>DESIGN / ENGINEERING / FUTURISE</span></div>
        <div className={styles.track} aria-hidden="true"><i /></div>
      </div>
    </dialog>
    <script dangerouslySetInnerHTML={{ __html: startIntro }} />
  </>;
}
