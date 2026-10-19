'use client';
import {coreValues} from '../../utils/Constant';
import ScrollStory from '../common/ScrollStory';
import WorkflowArt from '../common/WorkflowArt';
import s from './StudioAbout.module.css';
export default function StudioValues(){return <section className={s.values}><div className={s.sectionIntro}><p className={s.number}>WHAT WE STAND FOR</p><h2>Our core <em>values</em></h2><p>The principles that shape how we work, communicate, and deliver.</p></div><ScrollStory items={coreValues.map(v=>({title:v.title,content:<p>{v.description}</p>}))} renderVisual={active=><WorkflowArt mode="values" step={active}/>} label="Principles in practice"/></section>;}
