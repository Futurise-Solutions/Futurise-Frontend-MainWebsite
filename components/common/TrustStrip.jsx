import styles from './CommercialPages.module.css';
const items=['Fixed-scope quotes','NDA on request','Live demo of real work','Post-launch support'];
/** Four standing facts about how the studio works. Server component. */
export default function TrustStrip(){
 return <div className={styles.container}><ul className={`${styles.techList} ${styles.trustStrip}`} aria-label="How we work">{items.map(t=><li key={t}>{t}</li>)}</ul></div>;
}
