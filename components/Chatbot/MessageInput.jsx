'use client';
import { useState } from 'react';
import styles from './Chat.module.css';
export default function MessageInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const submit = event => {
    event.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue('');
  };
  return <form className={styles.composer} onSubmit={submit}>
    <input aria-label="Your message to Futurise Assistant" value={value} onChange={event=>setValue(event.target.value)} placeholder="Tell us what’s on your mind…" autoComplete="off" onKeyDown={event=>{if(event.key==='Enter'&&event.nativeEvent.isComposing)event.preventDefault();}} />
    <button type="submit" aria-label="Send message" disabled={disabled||!value.trim()}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5M6 11L12 5L18 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
  </form>;
}
