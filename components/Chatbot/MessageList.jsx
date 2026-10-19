'use client';
import TypingIndicator from './TypingIndicator';
import ContactFallback from './ContactFallback';
import styles from './Chat.module.css';
export default function MessageList({ messages, isTyping, typingLabel, onRetry }) {
  return <>
    <div className={styles.messages} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
      {messages.map(message=><div key={message.id} className={message.role==='user'?styles.userMessage:styles.assistantMessage}>
        <span className={styles.messageLabel}>{message.role==='user'?'YOU':'FUTURISE AI'}</span>
        {message.isFallback?<ContactFallback failed={message.failed} onRetry={onRetry&&(()=>onRetry(message.question))} retryDisabled={isTyping} />:<div className={styles.messageText}>{message.text}</div>}
      </div>)}
    </div>
    {isTyping&&<div className={styles.thinking}><TypingIndicator label={typingLabel} /></div>}
  </>;
}
