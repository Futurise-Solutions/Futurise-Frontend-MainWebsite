'use client';

import {useEffect, useRef, useState} from 'react';
import s from './HeroContext.module.css';

const chapters = [
 {label:'AI that automates.', detail:'Agents & intelligent workflows'},
 {label:'Products people love.', detail:'Web, mobile & SaaS experiences'},
 {label:'Engineering that scales.', detail:'Connected systems, built to grow'},
];

// An optional overlay. The preserved StudioFilm controls its own playback as before.
export default function HeroContext(){
 const ref=useRef(null);
 const [chapter,setChapter]=useState(0);
 useEffect(()=>{
  const node=ref.current;
  const video=node.closest('section')?.querySelector('video');
  if(!video)return;
  const update=()=>{
   const duration=Number.isFinite(video.duration)&&video.duration>0?video.duration:10;
   setChapter(Math.min(2,Math.floor(video.currentTime/duration*chapters.length)));
   node.style.setProperty('--context-play',video.paused?'paused':'running');
  };
  const events=['timeupdate','loadedmetadata','play','pause','seeked'];
  events.forEach(event=>video.addEventListener(event,update));
  update();
  return()=>events.forEach(event=>video.removeEventListener(event,update));
 },[]);
 return <div ref={ref} className={s.context} aria-hidden="true">
  <svg className={s.connector} viewBox="0 0 280 90" fill="none">
   <path d="M5 5L80 80H280" stroke="#F4F2FF" strokeOpacity=".25"/>
   <path className={s.pulse} d="M5 5L80 80H280" stroke="#B57BFF" strokeWidth="2" pathLength="100" strokeDasharray="9 91"/>
   <circle cx="5" cy="5" r="4" fill="#B57BFF"/>
  </svg>
  <div className={s.caption}>
   <p className={s.kicker}>CONNECTED BY CRAFT <span>0{chapter+1} / 03</span></p>
   <div className={s.chapters}>{chapters.map((item,i)=><div key={item.label} className={s.chapter} data-active={i===chapter}><p>{item.label}</p><span>{item.detail}</span></div>)}</div>
   <div className={s.indicators}>{chapters.map((item,i)=><i key={item.label} data-active={i===chapter}/>)}</div>
  </div>
 </div>;
}
