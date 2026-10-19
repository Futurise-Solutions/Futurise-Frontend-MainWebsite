import Link from 'next/link';
import Image from 'next/image';
import { Projects } from '../../utils/Constant';
import styles from './HomeProof.module.css';

const selectedNames = ['Infinity Bay Trading', 'HOMIES PropTech', 'Marty-QR', 'Dhanlaxmi Property'];
const selectedProjects = selectedNames.map(name => Projects.find(project => project.clentName === name)).filter(Boolean);

export default function OurProjects() {
  return <section className={styles.work} aria-labelledby="work-title">
    <div className={styles.workHeading}><div><p className={styles.eyebrow}>A GLIMPSE OF OUR WORK</p><h2 id="work-title">A few things we’ve built.</h2></div><Link className={styles.allWork} href="/portfolio">View full portfolio <span aria-hidden="true">↗</span></Link></div>
    <div className={styles.projects} role="region" aria-label="Four selected projects" tabIndex={0}>{selectedProjects.map(project => <Link href="/portfolio" key={project.clentName} className={styles.project} aria-label={`Explore ${project.clentName} in our portfolio`}>
      <div className={styles.image}><Image src={project.img[0].src} alt={project.img[0].alt} fill sizes="(max-width:600px) 78vw, (max-width:1000px) 44vw, 22vw" /></div>
      <div className={styles.caption}><h3>{project.clentName}</h3><span aria-hidden="true">↗</span></div><p>{project.projectType}</p>
    </Link>)}</div>
  </section>;
}
