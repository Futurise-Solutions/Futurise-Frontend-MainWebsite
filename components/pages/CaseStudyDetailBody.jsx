'use client';
import Link from 'next/link';
import {caseStudies,serviceForCaseStudy} from '../../utils/Constant/caseStudies';
import {services} from '../../utils/Constant';
import {useBooking} from '../../context/BookingContext';
import Reveal from '../common/Reveal';
import EditorialOpening from '../common/EditorialOpening';
import styles from '../common/CommercialPages.module.css';
export default function CaseStudyDetailBody({slug}){
 const study=caseStudies[slug],{onOpen}=useBooking();
 const keys=Object.keys(caseStudies),index=keys.indexOf(slug),service=serviceForCaseStudy[slug];
 return <div className={styles.page}>
  <nav aria-label="Breadcrumb" className={`${styles.container} ${styles.breadcrumb}`}><Link href="/">Home</Link> / <Link href="/case-studies">Case Studies</Link> / <span>{study.service}</span></nav>
  <EditorialOpening eyebrow={study.hero.eyebrow} title={study.hero.title} accent={study.hero.highlight} description={study.hero.subtitle}><button onClick={()=>onOpen('case-study-detail')}>Start a similar project ↗</button><Link href="/case-studies">All case studies ↗</Link></EditorialOpening>
  <div className={styles.container}>
   <dl className={styles.studyMeta}>{[['Service',study.service],['Duration',study.duration],['Year',study.year],['Industry',study.industry]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
   <div className={styles.articleLayout}>
    <nav aria-label="In this case study" className={styles.articleNav}><p className={styles.eyebrow}>Inside the study</p>{[['overview','Overview'],['challenge','The challenge'],['solution','Our solution'],...(study.timeline?[['timeline','Execution timeline']]:[]),['stack','Tech stack'],['results','Results'],...(study.lessonsLearned?[['lessons','Lessons learned']]:[]),...(study.faqs?.length?[['questions','Questions']]:[])].map(([anchor,label])=><a key={anchor} href={`#${anchor}`}>{label} ↗</a>)}</nav>
    <div className={styles.articleBody}>
     <section id="overview" className={styles.articleSection}><p className={styles.eyebrow}>Project Overview</p><h2>The work, in context.</h2><p>{study.overview}</p>{study.keyInsight&&<aside className={styles.insight}><h3>Key Insight: {study.keyInsight.title}</h3><p>{study.keyInsight.body}</p></aside>}</section>
     <section id="challenge" className={styles.articleSection}><p className={styles.eyebrow}>The Challenge</p><h2>{study.challenge.heading}</h2><p>{study.challenge.body}</p><ul>{study.challenge.points.map(p=><li key={p}>{p}</li>)}</ul></section>
     <section id="solution" className={styles.articleSection}><p className={styles.eyebrow}>Our Solution</p><h2>{study.solution.heading}</h2><p>{study.solution.body}</p><div className={styles.phaseGrid}>{study.solution.steps.map((s,i)=><Reveal key={s.title}><article><span>0{i+1}</span><h3>{s.title}</h3><p>{s.desc}</p></article></Reveal>)}</div></section>
     {study.timeline&&<section id="timeline" className={styles.articleSection}><p className={styles.eyebrow}>Execution Timeline</p><h2>Our Step-by-Step Process</h2><ol className={styles.ruledList}>{study.timeline.map((p,i)=><li key={p.phase}><p className={styles.eyebrow}>0{i+1} / {p.duration}</p><h3>{p.phase}</h3><p>{p.desc}</p></li>)}</ol></section>}
     <section id="stack" className={styles.articleSection}><p className={styles.eyebrow}>Tech Stack</p><h2>Built with</h2><ul className={styles.techList}>{study.stack.map(t=><li key={t}>{t}</li>)}</ul></section>
     <section id="results" className={styles.articleSection}><p className={styles.eyebrow}>Results</p><h2>Measurable impact and verified outcomes</h2><div className={styles.resultsGrid}>{study.results.map(r=><Reveal key={r.label}><div><strong>{r.value}</strong><h3>{r.label}</h3><p>{r.desc}</p></div></Reveal>)}</div></section>
     {study.lessonsLearned&&<section id="lessons" className={styles.articleSection}><p className={styles.eyebrow}>Retrospective</p><h2>Lessons Learned &amp; Refinements</h2><div className={styles.ruledList}>{study.lessonsLearned.map(l=><article key={l.title}><h3>{l.title}</h3><p>{l.desc}</p></article>)}</div></section>}
     {study.testimonial&&<figure className={styles.quote}><blockquote>“{study.testimonial.quote}”</blockquote><figcaption>{study.testimonial.name} · {study.testimonial.title}</figcaption></figure>}
     {study.faqs?.length>0&&<section id="questions" className={styles.articleSection}><p className={styles.eyebrow}>Frequently Asked</p><h2>Trending Questions &amp; FAQs</h2><div className={styles.ruledList}>{study.faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div></section>}
     {service&&services[service]&&<aside className={styles.insight}><p className={styles.eyebrow}>The service behind this work</p><div className={styles.linkList}><Link href={`/service/${service}`}>{services[service].title} ↗</Link></div></aside>}
     <nav className={styles.prevNext} aria-label="Other case studies">{index>0?<Link href={`/case-studies/${keys[index-1]}`}>← Previous Study</Link>:<span/>}{index<keys.length-1&&<Link href={`/case-studies/${keys[index+1]}`}>Next Study →</Link>}</nav>
    </div>
   </div>
  </div>
  <section className={styles.end}><p className={styles.eyebrow}>Want similar results?</p><h2>Let&apos;s build your success story.</h2><p>Book a free 45-minute strategy call. We&apos;ll scope your project, recommend the best approach, and give you a clear roadmap, no strings attached.</p><div className={styles.actions}><button onClick={()=>onOpen('case-study-detail-cta')}>Book appointment ↗</button><Link href="/case-studies">View all case studies ↗</Link></div></section>
 </div>;
}
