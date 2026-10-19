'use client';
import useAutoScene from '../common/useAutoScene';
import styles from './HomeRefinements.module.css';

const layers = [
  { name: 'Experience', detail: 'The journeys, interfaces and interactions your customers use every day.' },
  { name: 'Intelligence', detail: 'The product logic, data and AI capabilities that connect the experience.' },
  { name: 'Infrastructure', detail: 'The foundations for deployment, reliability and future growth.' },
];

export default function BuildArchitecture() {
  const {ref,active}=useAutoScene(layers.length,3000);
  return <section ref={ref} className={styles.build} aria-labelledby="build-heading">
    <div className={styles.buildGrid}>
      <div className={styles.buildCopy}>
        <p className={styles.eyebrow}>HOW WE BUILD / FROM THE INSIDE OUT</p>
        <h2 id="build-heading">Systems designed<br />to <em>carry weight.</em></h2>
        <p>Architecture, not assembly. Every layer is planned before a line of production code is written.</p>
        <div className={styles.layerDescription}><span>0{active + 1} / {layers[active].name}</span><p>{layers[active].detail}</p></div>
      </div>
      <div className={styles.blueprint} aria-hidden="true">
        <span>ANATOMY OF A DIGITAL PRODUCT</span>
<svg viewBox="0 0 600 490" fill="none"><path className={styles.signal} d="M300 145V195M300 290V335" stroke="#b57bff" strokeWidth="3" strokeDasharray="6 8"/><g className={styles.plane} style={{opacity:active===0?1:.55}}><rect x="115" y="30" width="370" height="115" rx="14" fill="#242033" stroke="#7b6cff"/><path d="M115 57H485M135 44H138M150 44H153" stroke="#b57bff"/><rect x="135" y="75" width="80" height="50" rx="6" fill="#7b6cff"/><path d="M235 82H445M235 101H395M235 120H350" stroke="#f4f2ff" strokeWidth="3"/><text x="500" y="100" fill="#b57bff" fontSize="10">UI</text></g><g className={styles.plane} style={{opacity:active===1?1:.55}}><rect x="200" y="195" width="200" height="95" rx="14" fill="#7b6cff"/><path d="M225 225H250L265 245H335L350 225H375M225 265H250L265 245M335 245L350 265H375" stroke="#f4f2ff" strokeWidth="2"/><text x="300" y="220" textAnchor="middle" fill="#08080d" fontSize="10" letterSpacing="2">LOGIC + AI</text><path d="M160 215H200M160 240H200M160 265H200M400 215H440M400 240H440M400 265H440" stroke="#b57bff" strokeWidth="3"/></g><g className={styles.plane} style={{opacity:active===2?1:.55}}><rect x="135" y="335" width="330" height="110" rx="14" fill="#242033" stroke="#7b6cff"/><path d="M135 390H465" stroke="#7b6cff"/><circle cx="165" cy="362" r="5" fill="#b57bff"/><circle cx="165" cy="418" r="5" fill="#b57bff"/><path d="M195 362H335M195 418H335" stroke="#f4f2ff" strokeWidth="3"/><text x="445" y="366" fill="#b57bff" textAnchor="end" fontSize="10">DATA</text><text x="445" y="422" fill="#b57bff" textAnchor="end" fontSize="10">DEPLOY</text></g></svg>

        <p>ONE PRODUCT. CONNECTED LAYERS.</p>
      </div>
    </div>
    <div className={styles.layerControls} aria-label="Explore the product architecture">
      {layers.map((layer, i) => <div key={layer.name} data-active={active===i}><span>0{i + 1}</span>{layer.name}<b aria-hidden="true">↗</b></div>)}
    </div>
  </section>;
}
