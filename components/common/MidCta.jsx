import BookDemoButton from './BookDemoButton';
import styles from './CommercialPages.module.css';
/** Compact mid-page prompt shared by the solution pages. Server component. */
export default function MidCta({source}){
 return <aside className={`${styles.insight} ${styles.midCta}`}><p>See the work live before you decide.</p><div className={styles.actions}><BookDemoButton source={source}>Book a free live demo ↗</BookDemoButton></div></aside>;
}
