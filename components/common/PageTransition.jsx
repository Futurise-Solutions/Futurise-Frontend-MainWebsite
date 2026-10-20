'use client';
import usePathname from '@/lib/useSitePathname';
import styles from './RouteMotion.module.css';
export default function PageTransition({children}){const pathname=usePathname();return <div key={pathname} className={styles.entrance}>{children}</div>}
