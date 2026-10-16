'use client';
import ProcessExplorer from "../common/ProcessExplorer";
import styles from "../common/AgencyPages.module.css";
export default function ProcessSection() {
  return <section className={styles.processSection}>
    <p className={styles.eyebrow}>Our process</p>
    <h2>How we craft great products</h2>
    <p>A clear, collaborative workflow that keeps your project on track from first call to long-term support.</p>
    <ProcessExplorer />
  </section>;
}
