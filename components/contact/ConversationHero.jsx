'use client';
import {useState} from 'react';
import {useBooking} from '../../context/BookingContext';
import s from './ConversationHero.module.css';
export default function ConversationHero(){const {onOpen}=useBooking();const [hovered,setHovered]=useState(false);return <header className={s.hero}>
 <div className={s.top}><p>CONTACT FUTURISE</p><span>A CONVERSATION IS A GOOD PLACE TO START.</span></div>
 <div className={s.statement}><div className={s.glyph} aria-hidden="true" data-active={hovered}><svg viewBox="0 0 300 260" fill="none"><path className={s.bubbleBack} d="M70 40H225Q255 40 255 70V170Q255 200 225 200H150L110 235V200H70Q40 200 40 170V70Q40 40 70 40Z" fill="#d5caee" stroke="#7b6cff"/><path className={s.bubbleFront} d="M40 20H195Q225 20 225 50V140Q225 170 195 170H95L55 205V170H40Q10 170 10 140V50Q10 20 40 20Z" fill="#7b6cff"/>{[75,115,155].map((x,i)=><circle className={s.dot} key={x} cx={x} cy="95" r="8" fill="#f4f2ff" style={{animationDelay:`${i*.16}s`}}/>)}</svg></div><h1>Tell us about<br/><em>your project.</em></h1></div>
 <div className={s.bottom}><p>Share a few details and we&apos;ll get back to you within one business day to schedule a call and discuss your goals.</p><div className={s.actions}><a href="#project-enquiry" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocus={()=>setHovered(true)} onBlur={()=>setHovered(false)}>Write to us <span>↓</span></a><button onClick={()=>onOpen('contact-page')}>Book a free strategy call ↗</button></div></div>
 </header>}
