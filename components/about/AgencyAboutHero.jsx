import Link from 'next/link';
import StudioDrawing from './StudioDrawing';
import styles from './StudioHero.module.css';

export default function AgencyAboutHero() {
  return <section className={styles.hero} aria-labelledby="about-heading">
    <div className={styles.top}><span>ABOUT FUTURISE</span><span>INDEPENDENT THINKING. CONNECTED EXPERTISE.</span></div>
    <div className={styles.heading}><p>A DIGITAL PRODUCT STUDIO</p><h1 id="about-heading">We turn bold ideas into <em>products that scale.</em></h1></div>
    <div className={styles.grid}>
      <div className={styles.visual}><StudioDrawing/></div>
      <div className={styles.note}><span className={styles.index}>THE PEOPLE BEHIND THE BUILD</span><p>Futurise is a full-cycle digital product studio. We build AI &amp; ML systems, web and mobile apps, SaaS platforms, product design, and Web3, with clients in the UAE, the United States, India, the United Kingdom, Canada, Australia and New Zealand.</p><div className={styles.disciplines}><span>Design thinking</span><span>Engineering discipline</span></div><div className={styles.actions}><Link href="/contact">Work with us <span aria-hidden="true">↗</span></Link><Link href="/portfolio">See our work <span aria-hidden="true">↗</span></Link></div></div>
    </div>
  </section>;
}
