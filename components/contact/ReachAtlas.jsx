'use client';
import useAutoScene from '../common/useAutoScene';
import {COLS,ROWS,LAND} from '../../utils/Constant/worldLand';
import s from './ReachAtlas.module.css';
const markets=[{name:'USA',lon:-98,lat:39},{name:'UK',lon:-3,lat:54},{name:'Denmark',lon:10,lat:56},{name:'UAE',lon:55,lat:25},{name:'India',lon:79,lat:21},{name:'South Africa',lon:23,lat:-30},{name:'Australia',lon:134,lat:-25}];
const project=(lon,lat)=>({x:50+(lon+180)/360*900,y:25+(90-lat)/180*450});
const home=project(174.8,-41.3);
const dots=Object.entries(LAND).flatMap(([row,spans])=>spans.split(' ').flatMap(span=>{const [start,len]=span.split(':').map(Number);return Array.from({length:len},(_,i)=>({x:50+(start+i+.5)/COLS*900,y:25+(Number(row)+.5)/ROWS*450}))}));
const routeTo=m=>{const p=project(m.lon,m.lat);return `M${home.x},${home.y} Q${(home.x+p.x)/2},${Math.min(home.y,p.y)-100} ${p.x},${p.y}`};
export default function ReachAtlas(){
 const {ref,active:selected}=useAutoScene(markets.length,2800);const market=markets[selected];
 return <div ref={ref} className={s.atlas}>
  <div className={s.top}><span>FUTURISE / GLOBAL REACH</span><span>BASED IN WELLINGTON, NZ</span></div>
  <div className={s.map}>
   <svg viewBox="0 0 1000 520" aria-hidden="true" fill="none"><ellipse cx="500" cy="268" rx="468" ry="238" fill="#e5deef"/><g stroke="#c9bedc" strokeWidth=".65">{[110,190,270,350,430].map(y=><path key={y} d={`M60 ${y} H940`}/>)}{[170,335,500,665,830].map(x=><path key={x} d={`M${x} 40 Q${500+(x-500)*.5} 270 ${x} 490`}/>)}</g><g fill="#8a7ca5">{dots.map((d,i)=><circle key={i} cx={d.x} cy={d.y} r="2"/>)}</g><g stroke="#ab98d0" strokeWidth="1" opacity=".5">{markets.map(m=><path key={m.name} d={routeTo(m)}/>)}</g><path key={market.name} className={s.activeRoute} d={routeTo(market)} pathLength="1" stroke="#7055bf" strokeWidth="3"/><g>{markets.map((m,i)=>{const p=project(m.lon,m.lat);return <g key={m.name}><circle cx={p.x} cy={p.y} r={i===selected?13:5} fill={i===selected?'#7b6cff':'#f4f2ff'} stroke="#7055bf" strokeWidth="2"/>{i===selected&&<circle cx={p.x} cy={p.y} r="23" stroke="#7b6cff" opacity=".45"/>}</g>})}</g><circle cx={home.x} cy={home.y} r="8" fill="#08080d"/><circle cx={home.x} cy={home.y} r="18" stroke="#08080d" opacity=".25"/><text x={home.x-12} y={home.y+38} textAnchor="end" fill="#08080d" fontSize="15">Wellington, NZ</text><text x={project(market.lon,market.lat).x} y={project(market.lon,market.lat).y-32} textAnchor="middle" fill="#493667" fontSize="18">{market.name}</text></svg>
  </div>
  <div className={s.bottom}><div className={s.caption}><span>CONNECTED ACROSS BORDERS</span><p>Wellington <b aria-hidden="true">↗</b> {market.name}</p></div><div className={s.controls} aria-label="Connected markets">{markets.map((m,i)=><span key={m.name} data-active={selected===i}>{m.name}</span>)}</div></div>
 </div>;
}
