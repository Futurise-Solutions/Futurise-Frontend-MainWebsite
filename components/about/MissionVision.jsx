'use client';
import s from './Purpose.module.css';
const items = [
  { title: "Our Mission", text: "To help enterprises accelerate the adoption of new technologies, untangle the complexity that comes with digital evolution, and orchestrate ongoing innovation, so our clients can focus on what they do best." },
  { title: "Our Vision", text: "To be the technology partner enterprises worldwide trust, delivering solutions that help businesses grow sustainably." },
];


export default function MissionVision(){return <section className={s.purpose}><div className={s.intro}><div><small>PURPOSE</small><h2>Mission &amp; Vision</h2></div><p>What drives us forward and where we’re headed.</p></div><div className={s.grid}>{items.map((item,i)=><article key={item.title}><span>0{i+1} / {i===0?'WHAT WE DO':'WHERE WE GO'}</span><div className={s.art} aria-hidden="true">{Array.from({length:7},(_,j)=><i key={j} style={{'--i':j}}/>)}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>}