'use client';
import Link from 'next/link';
import CapabilityStudy from '../common/CapabilityStudy';
import styles from '../common/AgencyPages.module.css';
export default function ServiceIntro({service,slug}) {
 return <>
  <section className={`${styles.hero} ${styles.serviceHero}`}>
   <div className={styles.heroContent}>
    <p className={styles.eyebrow}>{service.whatWeDo}</p>
    <h1>{service.h1 || service.title}</h1>
    <p className="speakable-answer">{service.description}</p>
    <div className={styles.actions}><Link href="/contact">Get a free quote <span aria-hidden="true">↗</span></Link><Link href="/portfolio">View our work <span aria-hidden="true">↗</span></Link></div>
   </div>
   <div className={styles.serviceVisual}><CapabilityStudy service={slug}/></div>
  </section>
  <section className={styles.included}>
   <div className={styles.includedIntro}><div><p className={styles.eyebrow}>{service.title}</p><h2>What’s included</h2></div><p>{service.details}</p></div>
   <ul>{service.features?.map((feature,i)=><li key={feature}><span>{String(i+1).padStart(2,'0')}</span>{feature}</li>)}</ul>
  </section>
 </>;
}
