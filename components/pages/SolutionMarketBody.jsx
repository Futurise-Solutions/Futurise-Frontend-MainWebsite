import Link from 'next/link';
import {solutions} from '../../utils/Constant/solutions';
import {MARKETS,baseMarket,marketVariants} from '../../utils/Constant/solutionMarkets';
import BookDemoButton from '../common/BookDemoButton';
import EditorialOpening from '../common/EditorialOpening';
import TrustStrip from '../common/TrustStrip';
import MarketSwitcher from '../common/MarketSwitcher';
import MidCta from '../common/MidCta';
import ProcessSteps from '../common/ProcessSteps';
import styles from '../common/CommercialPages.module.css';
export default function SolutionMarketBody({slug,market}){
 const base=solutions[slug],v=marketVariants[slug][market],m=MARKETS[market];
 const switcher=[{key:'base',label:baseMarket[slug]?MARKETS[baseMarket[slug]].label:'Global',href:`/solutions/${slug}`},...Object.keys(marketVariants[slug]).map(k=>({key:k,label:MARKETS[k].label,href:`/solutions/${slug}/${k}`}))];
 const related=base.related.filter(r=>solutions[r]).slice(0,2);
 return <div className={styles.page}>
  <nav aria-label="Breadcrumb" className={`${styles.container} ${styles.breadcrumb}`}><Link href="/">Home</Link> / <Link href="/solutions">Solutions</Link> / <Link href={`/solutions/${slug}`}>{base.name}</Link> / <span>{m.label}</span></nav>
  <EditorialOpening eyebrow={v.hero.eyebrow} title={v.hero.title} accent={v.hero.highlight} description={v.hero.subtitle}><BookDemoButton source={`solution-${slug}-${market}`}>Book a free live demo ↗</BookDemoButton><Link href="/solutions">All solutions ↗</Link></EditorialOpening>
  <TrustStrip/>
  <div className={styles.container}>
   <aside className={styles.insight}><p className={styles.eyebrow}>In short</p><p>{v.answer}</p></aside>
   <div className={styles.articleBody}>
    <section id="market" className={styles.articleSection}><p className={styles.eyebrow}>The market</p><h2>What&apos;s different in {m.short}</h2><div className={styles.phaseGrid}>{v.marketPoints.map((p,i)=><article key={p.title}><span>0{i+1}</span><h3>{p.title}</h3><p>{p.desc}</p></article>)}</div></section>
    <aside className={styles.insight}><p className={styles.eyebrow}>Proof</p><p>{v.proof}</p></aside>
    <MidCta source={`solution-${slug}-${market}-mid`}/>
    <section id="capabilities" className={styles.articleSection}><p className={styles.eyebrow}>Capabilities</p><h2>What we build</h2><div className={styles.phaseGrid}>{base.capabilities.map((c,i)=><article key={c.title}><span>0{i+1}</span><h3>{c.title}</h3><p>{c.desc}</p></article>)}</div></section>
    <section id="builds" className={styles.articleSection}><p className={styles.eyebrow}>Delivered work</p><h2>Built by us</h2><div className={styles.ruledList}>{base.builds.map(b=><article key={b.title}><p className={styles.eyebrow}>{b.client}</p><h3>{b.title}</h3><p><strong>Outcome: </strong>{b.outcome}</p></article>)}</div>{base.caseStudy&&<div className={styles.linkList}><Link href={`/case-studies/${base.caseStudy}`}>Read the full case study ↗</Link></div>}</section>
    <ProcessSteps/>
    <section id="questions" className={styles.articleSection}><p className={styles.eyebrow}>Frequently Asked</p><h2>Questions</h2><div className={styles.ruledList}>{v.faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div></section>
    <MarketSwitcher items={switcher} current={market}/>
    <section id="related" className={styles.articleSection}><p className={styles.eyebrow}>Related</p><h2>Keep exploring</h2><div className={styles.linkList}><Link href={m.countryPage}>Software development in {m.label} ↗</Link><Link href={`/solutions/${slug}`}>{base.name} ↗</Link>{related.map(r=><Link key={r} href={`/solutions/${r}`}>{solutions[r].name} ↗</Link>)}</div></section>
   </div>
  </div>
  <section className={styles.end}><p className={styles.eyebrow}>Next step</p><h2>See it working before you decide.</h2><p>Our client work is under NDA, so we don&apos;t publish screenshots. We walk you through the working software live on a call instead.</p><div className={styles.actions}><BookDemoButton source={`solution-${slug}-${market}-cta`}>Book a free live demo ↗</BookDemoButton></div></section>
 </div>;
}
