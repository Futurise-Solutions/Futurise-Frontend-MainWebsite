'use client'
import Link from "next/link";
import CapabilityStudy from "../common/CapabilityStudy";
import styles from "./SculptedHome.module.css";
export default function AboutUs() {
 return <section id="capabilities" className={styles.lightSection} aria-labelledby="capabilities-title"><div className={styles.container}>
 <p className={styles.eyebrow}>Expert Engineering Team <span /></p>
 <div className={styles.aboutGrid}><h2 id="capabilities-title" className={styles.display}>Senior engineers who ship AI products that scale.</h2>
 <div className={styles.aboutCopy}><p>Futurise is a product engineering team specialising in AI agents, SaaS platforms, web apps, and mobile applications. We own the full cycle, from discovery and architecture to deployment and growth, so you ship faster and scale without re-engineering.</p><Link href="/about" className={styles.textLink}>See how we work <span aria-hidden="true">↗</span></Link></div></div>
 <div className={styles.capabilityPair}><CapabilityStudy service="studio" /><ul className={styles.principles}><li>AI-first engineers who&apos;ve shipped agents, SaaS &amp; mobile apps</li><li>Transparent sprints: weekly demos, zero surprises</li><li>End-to-end ownership: strategy → design → build → scale</li></ul></div>
 </div></section>;
}
