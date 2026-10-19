'use client';
import Link from 'next/link';
import {CONTACT} from '../../utils/Constant/navigation';
import {trackEvent,EVENTS} from '../../utils/analytics';
import useMotionVisibility from './useMotionVisibility';
import styles from './StudioCTA.module.css';
const CTASection = ({
  eyebrow = "Start building today",
  title = "Got an idea? We'll build your",
  highlight = "AI-powered product.",
  subtitle = "Tell us your idea and we'll design, build, and launch your AI agent, SaaS platform, or app. Fixed scope. No fluff.",
  primaryLabel = "Start your project",
  secondaryLabel = "View our work",
  primaryTo = "/contact",
  secondaryTo = "/portfolio",
  onPrimary,
}) => {
 const ref=useMotionVisibility();
 return <section ref={ref} className={styles.section}><div className={styles.panel}><div className={styles.copy}><p className={styles.eyebrow}>{eyebrow}</p><h2>{title} <em>{highlight}</em></h2><p className={styles.description}>{subtitle}</p><div className={styles.actions}>{onPrimary?<button type="button" onClick={onPrimary}>{primaryLabel}<span aria-hidden="true">↗</span></button>:<Link href={primaryTo}>{primaryLabel}<span aria-hidden="true">↗</span></Link>}<Link href={secondaryTo}>{secondaryLabel}<span aria-hidden="true">↗</span></Link></div><a className={styles.email} href={'mailto:'+CONTACT.email} onClick={()=>trackEvent(EVENTS.EMAIL_CLICK,{location:'cta-section'})}>{CONTACT.email}</a></div><svg className={styles.graphic} viewBox="0 0 400 400" fill="none" aria-hidden="true">{[0,1,2,3,4].map(i=><rect key={i} x={45+i*20} y={45+i*20} width={310-i*40} height={310-i*40} rx={80-i*12} stroke="currentColor" strokeOpacity={.15+i*.13} transform={'rotate('+(-15+i*7)+' 200 200)'}/>)}<path className={styles.signal} d="M0 200H130Q200 200 200 130V0M200 400V270Q200 200 270 200H400" stroke="#b57bff" strokeWidth="2"/><path d="M170 230L230 170M170 170H230V230" stroke="#f4f2ff" strokeWidth="3"/></svg></div></section>;
};
export default CTASection;
