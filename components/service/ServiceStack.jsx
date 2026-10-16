'use client';
import Link from 'next/link';
import { techStacks } from '../../utils/Constant';
import { getTechLogo } from '../../utils/Constant/techLogos';
import styles from './ServiceStack.module.css';

export default function ServiceStack({ service }) {
  const data = techStacks[service];
  if (!data) return null;
  return <section className={styles.section} aria-labelledby="stack-title">
    <header className={styles.header}><p className={styles.eyebrow}>Capabilities</p><h2 id="stack-title">Our <em>{data.title}</em></h2><p>The tools and approaches we use to deliver fast, reliable, future-proof results.</p></header>
    {data.stacks.map((stack,index)=><article className={styles.stack} key={stack.title}>
      <div className={styles.copy}><span className={styles.number}>{String(index+1).padStart(2,'0')}</span><p className={styles.eyebrow}>{stack.subtitle}</p><h3>{stack.title}</h3><p>{stack.description}</p><Link href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link></div>
      <ul className={styles.logos} style={{'--columns': stack.techStack.split(',').length >= 9 ? 5 : stack.techStack.split(',').length >= 7 ? 4 : stack.techStack.split(',').length === 4 ? 2 : 3}} aria-label={`${stack.title} technologies`}>
        {stack.techStack.split(',').map(s=>s.trim()).filter(Boolean).map(tech=>{
          const {icon:Mark,color}=getTechLogo(tech);
          return <li key={tech} className={styles.tile}><span className={styles.mark}><Mark aria-hidden="true" focusable="false" style={{color}} /></span><span className={styles.label}>{tech}</span></li>;
        })}
      </ul>
    </article>)}
  </section>;
}
