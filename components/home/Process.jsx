'use client';
import ProcessExplorer from "../common/ProcessExplorer";
import styles from "./SculptedHome.module.css";
export default function Process() {
  return <section className={styles.lightSection}><div className={styles.container}>
    <p className={styles.eyebrow}>How we work <span /></p>
    <h2 className={styles.display}>A proven process, from idea to impact</h2>
    <p className={styles.sectionIntro}>A clear, collaborative workflow that keeps your project on track and you in the loop every step of the way.</p>
    <ProcessExplorer />
  </div></section>;
}
