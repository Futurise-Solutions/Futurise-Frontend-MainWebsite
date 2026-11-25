import Link from 'next/link';
import {solutions,solutionList,numberToWords} from '../../utils/Constant/solutions';
import BookDemoButton from '../common/BookDemoButton';
import EditorialOpening from '../common/EditorialOpening';
import styles from '../common/CommercialPages.module.css';
export default function SolutionsHubBody(){
 return <div className={styles.page}>
  <EditorialOpening eyebrow="Solutions" title="Specialist builds," accent="proven in production." description={`${numberToWords(Object.keys(solutions).length)} kinds of software we have designed and shipped for clients, each with what we built, the stack behind it and the questions buyers ask.`}><BookDemoButton source="solutions-hub">Book a free live demo ↗</BookDemoButton></EditorialOpening>
  <div className={styles.container}>
   <section className={styles.studyGrid} aria-label="Solutions">{solutionList.map((s,i)=><Link key={s.slug} className={styles.studyCard} href={`/solutions/${s.slug}`}>
    <div className={styles.studyCover}><span>{s.market}</span><i aria-hidden="true">{String(i+1).padStart(2,'0')}</i><div className={styles.coverLines} aria-hidden="true">{Array.from({length:22},(_,j)=><i key={j}/>)}</div></div>
    <h2>{s.name}</h2><p>{s.hero.subtitle}</p><div className={styles.readMore}>Explore <span aria-hidden="true">↗</span></div>
   </Link>)}</section>
  </div>
  <section className={styles.end}><p className={styles.eyebrow}>Next step</p><h2>See it working before you decide.</h2><p>Most of these builds are under NDA, so we don&apos;t publish screenshots of them. We walk you through the working software live on a call instead.</p><div className={styles.actions}><BookDemoButton source="solutions-hub-cta">Book a free live demo ↗</BookDemoButton></div></section>
 </div>;
}
