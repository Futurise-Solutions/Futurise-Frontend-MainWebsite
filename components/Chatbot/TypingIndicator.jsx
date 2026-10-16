'use client';
import styles from './Chat.module.css';
export default function TypingIndicator({ label = 'Thinking through your question' }) {
  return <div className={styles.typing} role="status"><span className={styles.typingBars} aria-hidden="true">{[0,1,2,3].map(i=><i key={i} style={{'--beat':i}} />)}</span><span>{label}</span></div>;
}
