'use client';
import {useId} from 'react';
import useAutoScene from '../common/useAutoScene';
import Image from 'next/image';
import Link from 'next/link';
import {Projects,services} from '../../utils/Constant';
import {useBooking} from '../../context/BookingContext';
import MasonryGrid from '../common/MasonryGrid';
import {PortfolioOpening} from '../common/PageOpenings';
import styles from '../common/CommercialPages.module.css';
import presentation from './PortfolioPresentation.module.css';

function ProjectGallery({project,priority}){
 const {ref,active,setActive}=useAutoScene(project.img.length,1500),id=useId();
 const image=project.img[active];
 const mobileImage=project.mobilePreviews?.[active % project.mobilePreviews.length];
 const first=project.img[0].src;
 const ratio=typeof first==='object' ? first.width/first.height : 1.44;
 return <div ref={ref} className={presentation.gallery} role="region" aria-roledescription="carousel" aria-label={`${project.clentName} project images`}>
  <div className={presentation.stage} data-mobile={!!mobileImage}>
   <div className={presentation.laptop}>
    <div className={presentation.lid}><span className={presentation.camera} aria-hidden="true"/>
     <div id={id} className={presentation.screen} style={{aspectRatio:ratio}}><Image src={image.src} alt={image.alt} fill priority={priority&&active===0} sizes="(max-width:700px) 80vw, (max-width:1700px) 40vw, 26vw"/></div>
    </div><div className={presentation.base} aria-hidden="true"/>
   </div>
   {mobileImage&&<div className={presentation.phone}><span aria-hidden="true"/><Image src={mobileImage} alt={`${project.clentName} mobile website, view ${active+1}`} width={390} height={844} sizes="(max-width:700px) 22vw, 12vw"/></div>}
  </div>
  <div className={styles.galleryControls}><p>{project.clentName} · {String(active+1).padStart(2,'0')} / {String(project.img.length).padStart(2,'0')}</p><div><button type="button" aria-controls={id} aria-label={`Previous image of ${project.clentName}`} onClick={()=>setActive(v=>(v-1+project.img.length)%project.img.length)}>←</button><button type="button" aria-controls={id} aria-label={`Next image of ${project.clentName}`} onClick={()=>setActive(v=>(v+1)%project.img.length)}>→</button></div></div>
 </div>;
}
const projectId=name=>String(name).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
export default function PortfolioBody(){
 const {onOpen}=useBooking();
 return <div className={`${styles.page} ${presentation.page}`}>
  <PortfolioOpening eyebrow="Our portfolio" title="Crafting innovation with" accent="every project." description="A look at some of the products we've designed and engineered for ambitious teams around the world."><Link href="/contact">Start your project ↗</Link><Link href="/service/web-development">Our services ↗</Link></PortfolioOpening>
  <section id="project-index" className={styles.container} aria-label="Portfolio projects">
   <MasonryGrid className={styles.projectGrid}>{Projects.map(project=><div key={project.Heading}><article id={projectId(project.clentName)} className={`${styles.project} ${presentation.anchor}`} aria-label={project.Heading}>
    <ProjectGallery project={project} priority={Projects.indexOf(project)===0}/>
    <div className={styles.projectHead}><div><p className={styles.meta}>{project.projectType}</p><h2>{project.Heading}</h2></div><span>{String(Projects.indexOf(project)+1).padStart(2,'0')}</span></div>
    <details className={styles.projectNotes}><summary>Project notes <span aria-hidden="true">+</span></summary>
    <div className={styles.projectInfo}><p>{project.aboutProject}</p><details><summary>The problem &amp; our solution</summary><h3>The Problem</h3><p>{project.problem}</p><h3>Our Solution</h3><p>{project.solution}</p></details></div>
    <div className={styles.projectFoot}>{project.stats&&<dl className={styles.metrics}>{project.stats.map(s=><div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}</dl>}<p className={styles.meta}>Client: {project.clentName}</p><button type="button" className={presentation.similar} onClick={()=>onOpen('portfolio:'+projectId(project.clentName))}>Start a similar project ↗</button></div>
    </details>
   </article></div>)}</MasonryGrid>
  </section>
  <section className={styles.dark}><div className={styles.container}><p className={styles.eyebrow}>The work behind these projects</p><h2 className={styles.sectionTitle}>Every project here came out of <span>one of six disciplines</span></h2><p className={styles.intro}>Each links through to what that work involves and how it is priced.</p><div className={styles.linkList}>{Object.entries(services).map(([slug,s])=><Link key={slug} href={`/service/${slug}`}>{s.title} ↗</Link>)}<Link href="/case-studies">Detailed case studies ↗</Link></div></div></section>
  <section className={styles.end}><p className={styles.eyebrow}>Your project next</p><h2>Let&apos;s create something worth showcasing.</h2><p>Tell us about your idea and we&apos;ll help you bring it to life and add it to this list.</p><div className={styles.actions}><Link href="/contact">Start your project ↗</Link></div></section>
 </div>;
}
