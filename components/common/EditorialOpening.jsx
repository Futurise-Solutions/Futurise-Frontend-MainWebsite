'use client';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './CommercialPages.module.css';

export default function EditorialOpening({ eyebrow, title, accent, description, children, kind = 'work' }) {
  const reduced = useReducedMotion();
  return <header className={styles.opening} data-kind={kind}>
    <p className={styles.eyebrow}>{eyebrow}</p>
    <h1>{title} <span>{accent}</span></h1>
    <div className={styles.openingBottom}><p>{description}</p><div className={styles.actions}>{children}</div></div>
    <div className={styles.score} aria-hidden="true">{Array.from({length:24},(_,i)=><motion.i key={i} initial={false} animate={{scaleY:reduced?1:[.15,1]}} transition={{duration:1.1,delay:i*.025,ease:[.2,.7,.2,1]}} style={{height:`${24+Math.sin(i*.35)**2*68}px`}}/>)}</div>
  </header>;
}
