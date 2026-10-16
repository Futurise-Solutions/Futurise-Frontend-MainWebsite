'use client';
import Link from 'next/link';
import { testimonials, clientProof, engagementCommitments } from '../../utils/clientsReviewsData';
import styles from './ClientFeedback.module.css';
import useMotionVisibility from '../common/useMotionVisibility';

const initials = name => name.split(/\s+/).slice(0, 2).map(part => part[0]).join('');
// These are verbatim excerpts of the existing review, not additional testimonials.
const excerpts = [
  { topic: 'The starting point', text: 'We came to Futurise with a slow WordPress site that barely showed up on Google.' },
  { topic: 'The experience', text: 'it loads instantly now, feels far smoother' },
  { topic: 'Discoverability', text: "we're finally getting found by buyers across the UAE." },
  { topic: 'The collaboration', text: 'Professional team, clear communication, handled everything from design to Google Search Console.' },
];

export default function ClientsReviews() {
  const motionRef = useMotionVisibility();
  const source = testimonials[0];
  const highlights = source ? excerpts.filter(item => source.review.includes(item.text)) : [];
  return <section ref={motionRef} className={styles.section} aria-labelledby="feedback-heading">
    <div className={styles.container}>
      <div className={styles.heading}><div><p className={styles.eyebrow}>CLIENT FEEDBACK</p><h2 id="feedback-heading">Good work.<br /><em>In their words.</em></h2></div><p>The experience of working with Futurise, shared by our client.</p></div>
      {testimonials.map(client => <figure key={client.name} className={styles.featured}>
        <figcaption className={styles.person}><span className={styles.avatar} aria-hidden="true">{initials(client.name)}</span><div><strong>{client.name}</strong><span>{client.title}</span></div><span className={styles.quotation} aria-hidden="true">“</span></figcaption>
        <blockquote>{client.review}</blockquote>
      </figure>)}
      {highlights.length > 0 && <div className={styles.motionHeading}><p>Highlights from the same client review</p></div>}
    </div>
    {highlights.length > 0 && <div className={styles.rails}>
      {[highlights.slice(0, 2), highlights.slice(2)].filter(row => row.length).map((row, index) => <div className={styles.rail} key={index} tabIndex={0} role="region" aria-label={`Client review excerpts, row ${index + 1}`}>
        <div className={`${styles.track} ${index ? styles.reverse : ''}`}>
          {[0, 1].map(copy => <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {row.map(item => <figure key={item.topic} className={styles.excerpt}><p>{item.topic}</p><blockquote>“{item.text}”</blockquote><figcaption><span className={styles.smallAvatar} aria-hidden="true">{initials(source.name)}</span><span>{source.name}<small>{source.title}</small></span></figcaption></figure>)}
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
