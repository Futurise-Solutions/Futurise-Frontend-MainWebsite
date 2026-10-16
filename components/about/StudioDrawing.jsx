'use client';
import useAutoScene from '../common/useAutoScene';
import s from './StudioDrawing.module.css';
export default function StudioDrawing(){
 const {ref,active}=useAutoScene(3,3600);
 return <div ref={ref} className={s.drawing} data-scene={active} aria-label="Strategy, design and engineering coming together in one studio" role="img">
  <div className={s.coordinates} aria-hidden="true"><span>IDEA / EXPLORE / CREATE</span><span>FUTURISE / THE STUDIO</span></div>
  <svg viewBox="0 0 760 500" fill="none" aria-hidden="true">
   <g stroke="#7b6cff" strokeOpacity=".18">{[100,200,300,400,500,600,700].map(x=><path key={x} d={`M${x} 0V500`}/>)}{[100,200,300,400].map(y=><path key={y} d={`M0 ${y}H760`}/>)}</g>
   <path className={s.connection} d="M140 290C140 80 370 80 370 240S620 430 620 210" stroke="#b57bff" strokeWidth="2" strokeDasharray="7 9"/>
   <g className={s.paper} data-active={active===0} transform="translate(60 115) rotate(-12 100 130)"><rect width="210" height="280" rx="10" fill="#f4f2ff"/><text x="22" y="38" fill="#7b6cff" fontSize="11" letterSpacing="2">STRATEGY</text><text x="20" y="112" fill="#08080d" fontSize="61" letterSpacing="-4">What</text><text x="20" y="175" fill="#08080d" fontSize="61" letterSpacing="-4">if?</text><path d="M24 210H180M24 230H155M24 250H110" stroke="#08080d" strokeOpacity=".3"/></g>
   <g className={s.paper} data-active={active===1} transform="translate(275 70) rotate(5 110 150)"><rect width="230" height="310" rx="10" fill="#7b6cff"/><text x="22" y="38" fill="#08080d" fontSize="11" letterSpacing="2">DESIGN</text><circle cx="115" cy="155" r="72" stroke="#f4f2ff" strokeWidth="2"/><path d="M43 155H187M115 83V227" stroke="#f4f2ff" strokeWidth="2"/><rect x="65" y="105" width="100" height="100" fill="#b57bff" style={{mixBlendMode:'multiply'}} transform="rotate(45 115 155)"/><text x="22" y="279" fill="#08080d" fontSize="16">Form meets purpose.</text></g>
   <g className={s.paper} data-active={active===2} transform="translate(490 145) rotate(12 100 115)"><rect width="215" height="260" rx="10" fill="#08080d" stroke="#b57bff" strokeOpacity=".5"/><text x="20" y="38" fill="#b57bff" fontSize="11" letterSpacing="2">ENGINEERING</text><path d="M78 88L42 125L78 162M140 88L176 125L140 162M125 75L95 177" stroke="#f4f2ff" strokeWidth="3"/><path className={s.code} d="M24 210H185M24 230H140" stroke="#7b6cff" strokeWidth="4"/></g>
  </svg>
  <div className={s.legend} aria-hidden="true">{['Think clearly.','Design deliberately.','Build together.'].map((x,i)=><span key={x} data-active={active===i}>{x}</span>)}</div>
 </div>;
}
