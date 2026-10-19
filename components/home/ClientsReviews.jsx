'use client';
import Link from 'next/link';
import { testimonials, clientProof, engagementCommitments } from '../../utils/clientsReviewsData';
import styles from './ClientFeedback.module.css';
import useMotionVisibility from '../common/useMotionVisibility';

const initials = name => name.split(/\s+/).slice(0, 2).map(part => part[0]).join('');

export default function ClientsReviews() {
  const motionRef = useMotionVisibility();
  const [featured, ...others] = testimonials;
  // Two rails moving in opposite directions; the first gets the extra card when the count is odd.
  const half = Math.ceil(others.length / 2);
  const rows = [others.slice(0, half), others.slice(half)].filter(row => row.length);
  return <section ref={motionRef} className={styles.section} aria-labelledby="feedback-heading">
    <div className={styles.container}>
      <div className={styles.heading}><div><p className={styles.eyebrow}>CLIENT FEEDBACK</p><h2 id="feedback-heading">Good work.<br /><em>In their words.</em></h2></div><p>The experience of working with Futurise, shared by our clients across India, the UAE, the US, Canada, Australia and New Zealand.</p></div>
      {featured && <figure className={styles.featured}>
        <figcaption className={styles.person}><span className={styles.avatar} aria-hidden="true">{initials(featured.name)}</span><div><strong>{featured.name}</strong><span>{featured.title}</span>{featured.service && <span className={styles.serviceTag}>{featured.service}</span>}</div><span className={styles.quotation} aria-hidden="true">“</span></figcaption>
        <blockquote>{featured.review}</blockquote>
      </figure>}
      {rows.length > 0 && <div className={styles.motionHeading}><p>More from our clients</p><p>{others.length} reviews</p></div>}
    </div>
    {rows.length > 0 && <div className={styles.rails}>
      {rows.map((row, index) => <div className={styles.rail} key={index} tabIndex={0} role="region" aria-label={`Client reviews, row ${index + 1}`}>
        <div className={`${styles.track} ${index ? styles.reverse : ''}`}>
          {[0, 1].map(copy => <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {row.map(client => <figure key={client.name} className={`${styles.excerpt} ${styles.review}`}><p>{client.service}</p><blockquote>“{client.review}”</blockquote><figcaption><span className={styles.smallAvatar} aria-hidden="true">{initials(client.name)}</span><span>{client.name}<small>{client.title}</small></span></figcaption></figure>)}
          </div>)}
        </div>
      </div>)}
    </div>}
    <div className={styles.container}>
      <div className={styles.commitments}>{engagementCommitments.map((item, i) => <article key={item.label}><span>0{i + 1}</span><h3>{item.label}</h3><p>{item.detail}</p></article>)}</div>
      <details className={styles.delivery}><summary>Project delivery notes <span aria-hidden="true">+</span></summary><p>Named clients and delivered work: every project below is on our portfolio, not a placeholder.</p><div>{clientProof.map(item => <article key={item.client}><small>{item.discipline}</small><h3>{item.client}</h3><p>{item.work}. {item.outcome}.</p></article>)}</div></details>
      <Link className={styles.portfolio} href="/portfolio">Explore the projects behind the work <span aria-hidden="true">↗</span></Link>
    </div>
  </section>;
}
