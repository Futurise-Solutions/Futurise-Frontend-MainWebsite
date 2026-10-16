'use client';
import Image from 'next/image';
import { partners } from '../../utils/Constant';
import styles from './HomeProof.module.css';
import useMotionVisibility from '../common/useMotionVisibility';

// Optical sizing: square marks get more height than wide wordmarks, so every logo carries similar visual weight.
const logoHeight = ({ width, height }) => Math.round(Math.min(60, Math.max(34, 84 / Math.sqrt(width / height))));

export default function Partners() {
  const motionRef = useMotionVisibility();
  return <section ref={motionRef} className={styles.trust} aria-labelledby="trusted-heading">
    <div className={styles.trustHeader}>
      <div><p className={styles.eyebrow}>THE COMPANY WE KEEP</p><h2 id="trusted-heading">Trusted by ambitious<br /><em>teams worldwide.</em></h2></div>

    </div>
    <div className={styles.viewport} tabIndex={0} role="region" aria-label="Client logos">
      <div className={styles.track}>{[0, 1].map(copy => <div className={styles.logoGroup} key={copy} aria-hidden={copy === 1 ? true : undefined}>
        {partners.map(partner => <div key={partner.name} className={styles.logo}><div className={styles.logoFrame} style={{ '--logo-h': `${logoHeight(partner.img)}px` }}><Image src={partner.img} alt={copy ? '' : partner.name} sizes="160px" /></div><span>{partner.name}</span></div>)}
      </div>)}</div>
    </div>
  </section>;
}
