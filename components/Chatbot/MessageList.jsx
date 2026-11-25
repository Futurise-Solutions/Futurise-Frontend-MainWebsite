'use client';
import { useBooking } from '../../context/BookingContext';
import TypingIndicator from './TypingIndicator';
import ContactFallback from './ContactFallback';
import styles from './Chat.module.css';

// Answers are plain text; turn URLs into links. Site links open in the same tab,
// anything else in a new one. Trailing punctuation stays outside the link.
const URL_RE = /(https?:\/\/[^\s<>()]+[^\s<>().,;:!?'"])/g;
const SITE_RE = /^https:\/\/(www\.)?futurisesolutions\.com(?=\/|$)/;
const withLinks = text => String(text).split(URL_RE).map((part, i) => {
  if (i % 2 === 0) return part;
  const internal = SITE_RE.test(part);
  return <a key={i} href={part} className={styles.messageLink} {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>{internal ? `futurisesolutions.com${part.replace(SITE_RE, '')}` : part}</a>;
});
export default function MessageList({ messages, isTyping, typingLabel, onRetry }) {
  const booking=useBooking();
  return <>
    <div className={styles.messages} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
      {messages.map(message=><div key={message.id} className={message.role==='user'?styles.userMessage:styles.assistantMessage}>
        <span className={styles.messageLabel}>{message.role==='user'?'YOU':'FUTURISE AI'}</span>
        {message.isFallback?<ContactFallback failed={message.failed} onRetry={onRetry&&(()=>onRetry(message.question))} retryDisabled={isTyping} />:<div className={styles.messageText}>{message.role==='user'?message.text:withLinks(message.text)}{message.cta&&<button type="button" className={styles.answerCta} onClick={()=>booking?.onOpen?.('chatbot-answer')} disabled={!booking?.onOpen}>Book a free 45-min call <span aria-hidden="true">↗</span></button>}</div>}
      </div>)}
    </div>
    {isTyping&&<div className={styles.thinking}><TypingIndicator label={typingLabel} /></div>}
  </>;
}
