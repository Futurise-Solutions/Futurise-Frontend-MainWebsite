'use client';
import { predefinedChips } from './predefinedQA';
import styles from './Chat.module.css';
export default function PredefinedChips({ onSelect }) {
  return <div className={styles.suggestions}><p>A FEW PLACES TO START</p><div>{predefinedChips.map(chip=><button key={chip} type="button" onClick={()=>onSelect(chip)}>{chip}<span aria-hidden="true">↗</span></button>)}</div></div>;
}
