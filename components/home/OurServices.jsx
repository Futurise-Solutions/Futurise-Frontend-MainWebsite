'use client';
import Link from 'next/link';
import CapabilityStudy from '../common/CapabilityStudy';
import ScrollStory from '../common/ScrollStory';
import {OurServiceData} from '../../utils/Constant';
import styles from './SculptedHome.module.css';
export default function OurServices(){return <section className={styles.services} aria-labelledby="services-title"><p className={styles.eyebrow}>What we do <span/></p><h2 id="services-title" className={styles.display}>Services that move your business forward</h2><p className={styles.serviceIntro}>From a single feature to an entire platform, we offer end-to-end product capabilities under one roof.</p><ScrollStory items={OurServiceData.map(s=>({title:s.serviceName,content:<><p>{s.serviceDesc}</p><Link href={'/service/'+s.route}>Explore this service ↗</Link></>}))} renderVisual={active=><CapabilityStudy key={OurServiceData[active].route} service={OurServiceData[active].route} compact/>} label="Explore our capabilities"/></section>;}
