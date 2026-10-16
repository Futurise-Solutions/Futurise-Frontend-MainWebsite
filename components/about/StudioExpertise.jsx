'use client';
import Link from 'next/link';
import {strengths} from '../../utils/Constant';
import ScrollStory from '../common/ScrollStory';
import CapabilityStudy from '../common/CapabilityStudy';
import s from './StudioAbout.module.css';
const routes=['ai-ml-solutions','web-development','app-development','blockchain-development','ui-ux-design','digital-marketing'];
export default function StudioExpertise(){return <section className={s.expertise}><div className={s.sectionIntro}><p className={s.number}>OUR EXPERTISE</p><h2>Technology <em>excellence</em></h2><p>Deep, hands-on capability across the full modern technology stack. We can build whatever your product needs.</p></div><ScrollStory items={strengths.map((x,i)=>({title:x.name,content:<><ul>{x.description.map(p=><li key={p}>{p}</li>)}</ul><Link href={'/service/'+routes[i]}>Explore this service ↗</Link></>}))} renderVisual={active=><CapabilityStudy key={routes[active]} service={routes[active]} compact/>} label="Our connected disciplines"/></section>;}
