import Link from 'next/link';
import {solutions} from '../../utils/Constant/solutions';
import {MARKETS,baseMarket,marketVariants} from '../../utils/Constant/solutionMarkets';
import {services} from '../../utils/Constant';
import BookDemoButton from '../common/BookDemoButton';
import EditorialOpening from '../common/EditorialOpening';
import TrustStrip from '../common/TrustStrip';
import MarketSwitcher from '../common/MarketSwitcher';
import MidCta from '../common/MidCta';
import ProcessSteps from '../common/ProcessSteps';
import styles from '../common/CommercialPages.module.css';
const countryPages={in:['/in','India'],us:['/us','United States']};
export default function SolutionPageBody({slug}){
 const s=solutions[slug],service=services[s.service],country=countryPages[s.country];
 const variants=Object.keys(marketVariants[slug]||{});
 const switcher=variants.length?[{key:'base',label:baseMarket[slug]?MARKETS[baseMarket[slug]].label:'Global',href:`/solutions/${slug}`},...variants.map(m=>({key:m,label:MARKETS[m].label,href:`/solutions/${slug}/${m}`}))]:null;
 return <div className={styles.page}>
  <nav aria-label="Breadcrumb" className={`${styles.container} ${styles.breadcrumb}`}><Link href="/">Home</Link> / <Link href="/solutions">Solutions</Link> / <span>{s.name}</span></nav>
  <EditorialOpening eyebrow={s.hero.eyebrow} title={s.hero.title} accent={s.hero.highlight} description={s.hero.subtitle}><BookDemoButton source={`solution-${slug}`}>Book a free live demo ↗</BookDemoButton><Link href="/solutions">All solutions ↗</Link></EditorialOpening>
  <TrustStrip/>
  <div className={styles.container}>
   <aside className={styles.insight}><p className={styles.eyebrow}>In short</p><p>{s.answer}</p></aside>
   {switcher&&<MarketSwitcher items={switcher} current="base"/>}
   <div className={styles.articleBody}>
    <section id="capabilities" className={styles.articleSection}><p className={styles.eyebrow}>Capabilities</p><h2>What we build</h2><div className={styles.phaseGrid}>{s.capabilities.map((c,i)=><article key={c.title}><span>0{i+1}</span><h3>{c.title}</h3><p>{c.desc}</p></article>)}</div></section>
    <section id="builds" className={styles.articleSection}><p className={styles.eyebrow}>Delivered work</p><h2>Built by us</h2><div className={styles.ruledList}>{s.builds.map(b=><article key={b.title}><p className={styles.eyebrow}>{b.client}</p><h3>{b.title}</h3><p>{b.problem}</p><p><strong>What we built</strong></p><ul>{b.built.map(x=><li key={x}>{x}</li>)}</ul><ul className={styles.techList}>{b.stack.map(t=><li key={t}>{t}</li>)}</ul><p><strong>Outcome: </strong>{b.outcome}</p></article>)}</div>{s.caseStudy&&<div className={styles.linkList}><Link href={`/case-studies/${s.caseStudy}`}>Read the full case study ↗</Link></div>}</section>
    <MidCta source={`solution-${slug}-mid`}/>
    <ProcessSteps/>
    <section id="stack" className={styles.articleSection}><p className={styles.eyebrow}>Tech Stack</p><h2>Built with</h2><ul className={styles.techList}>{s.stack.map(t=><li key={t}>{t}</li>)}</ul></section>
    <section id="questions" className={styles.articleSection}><p className={styles.eyebrow}>Frequently Asked</p><h2>Questions</h2><div className={styles.ruledList}>{s.faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div></section>
    <section id="related" className={styles.articleSection}><p className={styles.eyebrow}>Related</p><h2>Keep exploring</h2><div className={styles.linkList}>{s.related.filter(r=>solutions[r]).map(r=><Link key={r} href={`/solutions/${r}`}>{solutions[r].name} ↗</Link>)}{service&&<Link href={`/service/${s.service}`}>{service.title} ↗</Link>}{country&&<Link href={country[0]}>{country[1]} ↗</Link>}</div></section>
   </div>
  </div>
  <section className={styles.end}><p className={styles.eyebrow}>Next step</p><h2>See it working before you decide.</h2><p>Our client work is under NDA, so we don&apos;t publish screenshots. We walk you through the working software live on a call instead.</p><div className={styles.actions}><BookDemoButton source={`solution-${slug}-cta`}>Book a free live demo ↗</BookDemoButton></div></section>
 </div>;
}
