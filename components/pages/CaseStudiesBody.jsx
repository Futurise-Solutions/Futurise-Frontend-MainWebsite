'use client';
import {useState} from 'react';
import Link from 'next/link';
import {caseStudies} from '../../utils/Constant/caseStudies';
import {companyStats} from '../../utils/Constant';
import {useBooking} from '../../context/BookingContext';
import {CaseStudiesOpening} from '../common/PageOpenings';
import styles from '../common/CommercialPages.module.css';
const studies=Object.values(caseStudies);
const countWords=['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve'];
const countWord=n=>countWords[n]??String(n);
export default function CaseStudiesBody(){
 const {onOpen}=useBooking(),[filter,setFilter]=useState('All studies');
 const shown=filter==='All studies'?studies:studies.filter(s=>s.service===filter);
 return <div className={styles.page}>
  <CaseStudiesOpening eyebrow="Real Work. Real Results." title="From Brief to" accent="Breakthrough" description={`${countWord(studies.length)} in-depth case studies documenting exactly how we approached, built, and measured success across AI, web, mobile, blockchain, design, and growth.`}><button onClick={()=>onOpen('case-studies-hub')}>Discuss your project ↗</button><a href="#studies">Browse studies ↓</a></CaseStudiesOpening>
  <div className={styles.container}>
   <dl className={styles.hubStats}>{[{value:String(studies.length),label:'Case Studies Published'},...companyStats.slice(0,3).map(s=>({value:`${s.value}${s.suffix}`,label:s.label}))].map(s=><div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}</dl>
   <div id="studies" className={styles.filterBar} role="group" aria-label="Filter case studies">{['All studies',...new Set(studies.map(s=>s.service))].map(s=><button key={s} aria-pressed={filter===s} onClick={()=>setFilter(s)}>{s}</button>)}<p className={styles.count} role="status">{shown.length} {shown.length===1?'study':'studies'}</p></div>
   <section className={styles.studyGrid} aria-label="Case studies">{shown.map(study=><Link key={study.slug} className={styles.studyCard} href={`/case-studies/${study.slug}`}>
    <div className={styles.studyCover}><span>{study.service} / {study.industry}</span><strong>{study.results[0]?.value}</strong><i aria-hidden="true">{String(studies.indexOf(study)+1).padStart(2,'0')}</i><div className={styles.coverLines} aria-hidden="true">{Array.from({length:22},(_,i)=><i key={i}/>)}</div></div>
    <h2>{study.hero.title} {study.hero.highlight}</h2><p>{study.overview}</p><p className={styles.meta}>{study.duration}</p>
    <dl className={styles.metrics}>{study.results.slice(0,2).map(r=><div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>)}</dl><div className={styles.readMore}>Read Case Study <span aria-hidden="true">↗</span></div>
   </Link>)}</section>
  </div>
  <section className={styles.dark}><div className={styles.container}><p className={styles.eyebrow}>How we work</p><h2 className={styles.sectionTitle}>Every study here came from <span>a shipped product</span></h2><p className={styles.intro}>No pilots, no proofs of concept. Each study here is live software with users on it.</p><div className={styles.linkList}><Link href="/portfolio">Explore the portfolio ↗</Link><Link href="/about">Meet Futurise ↗</Link></div></div></section>
  <section className={styles.end}><p className={styles.eyebrow}>Ready to be our next case study?</p><h2>Let&apos;s build something worth writing about.</h2><p>Book a free strategy call and let&apos;s talk about what&apos;s possible for your product.</p><div className={styles.actions}><button onClick={()=>onOpen('case-studies-cta')}>Book appointment ↗</button></div></section>
 </div>;
}
