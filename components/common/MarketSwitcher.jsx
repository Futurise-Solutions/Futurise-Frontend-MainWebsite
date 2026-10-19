import Link from 'next/link';
import styles from './CommercialPages.module.css';
/** "Available in" links across a solution's base page and market variants. `items`: [{key,label,href}]. */
export default function MarketSwitcher({items,current}){
 return <nav aria-label="Available in" className={styles.marketSwitcher}><p className={styles.eyebrow}>Available in</p><div className={styles.linkList}>{items.map(i=>i.key===current?<span key={i.key} aria-current="page">{i.label}</span>:<Link key={i.key} href={i.href}>{i.label}</Link>)}</div></nav>;
}
