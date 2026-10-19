'use client';
import useAutoScene from './useAutoScene';
import Image from 'next/image';
import {Projects} from '../../utils/Constant';
import Link from 'next/link';
import {caseStudies} from '../../utils/Constant/caseStudies';
import s from './PageOpenings.module.css';

export function PortfolioOpening({eyebrow,title,accent,description,children}){
 return <header className={s.work}><div className={s.workTop}><p>{eyebrow}</p><a href="#project-index">Explore the collection <span>↓</span></a></div><h1>{title}<br/><em>{accent}</em></h1><div className={s.workBottom}><p>{description}</p><div className={s.actions}>{children}</div></div><div className={s.workPreview} aria-label="A selection of our delivered projects">{Projects.slice(0,3).map((project,i)=><a href="#project-index" key={project.Heading}><div><Image src={project.img[0].src} alt={project.img[0].alt} fill sizes="(max-width:700px) 42vw, 28vw" priority={i===0}/></div><span>{project.clentName}</span></a>)}</div><div className={s.workRule} aria-hidden="true"><span>DESIGN</span><i/><span>ENGINEERING</span><i/><span>IN THE REAL WORLD</span></div></header>;
}

export function CaseStudiesOpening({eyebrow,title,accent,description,children}){
 const studies=Object.values(caseStudies);
 return <header className={s.archive}><div className={s.archiveTitle}><p className={s.kicker}>{eyebrow}</p><h1>{title}<br/><em>{accent}</em><span aria-hidden="true">↘</span></h1><p className={s.description}>{description}</p><div className={s.actions}>{children}</div></div><div className={s.dossiers}><p className={s.indexLabel}>THE FIELD NOTES / 01 TO {String(studies.length).padStart(2,'0')}</p>{studies.slice(0,3).map((study,i)=><Link href={`/case-studies/${study.slug}`} key={study.slug} className={s.dossier}><span>0{i+1} / {study.service}</span><h2>{study.hero.title} {study.hero.highlight}</h2><div><span>{study.duration}</span><span>Read the study ↗</span></div></Link>)}</div></header>;
}

export function PricingOpening({eyebrow,title,accent,description,children}){
 const {ref,active}=useAutoScene(3);
 const layers=[{name:'Scope',note:'What needs to be built.'},{name:'Complexity',note:'How the parts connect.'},{name:'Delivery',note:'The team and time it takes.'}];
 return <header ref={ref} className={s.pricing}><div className={s.pricingTop}><p className={s.kicker}>{eyebrow}</p><span>A CLEARER WAY TO PLAN</span></div><div className={s.pricingMain}><div><h1>{title}<br/><em>{accent}</em></h1><div className={s.actions}>{children}</div></div><div className={s.scope}><div className={s.scopeDrawing} aria-hidden="true">{layers.map((l,i)=><div key={l.name} className={active===i?s.selectedPlane:''} style={{'--layer':i}}><span>0{i+1}</span><b>{l.name}</b><i/></div>)}</div><div className={s.scopeControls} aria-hidden="true">{layers.map((l,i)=><span key={l.name} data-active={active===i}>{l.name}</span>)}</div><p>{layers[active].note}</p></div></div><p className={s.pricingDescription}>{description}</p></header>;
}
