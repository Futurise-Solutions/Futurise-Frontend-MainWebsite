'use client';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { trackEvent, EVENTS } from '../../utils/analytics';
import AssistantMark from './AssistantMark';
import TypingIndicator from './TypingIndicator';
import styles from './Chat.module.css';

// Keep the conversation UI and backend client out of the initial page bundle.
const ChatWidget = lazy(() => import('./ChatWidget'));

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const trigger = useRef(null);
  const reduced = useReducedMotion();
  const toggleChat = (next) => {
    const willOpen = typeof next === 'boolean' ? next : !open;
    if (willOpen && !open) trackEvent(EVENTS.CHATBOT_OPEN, { location: 'chat-bubble' });
    setOpen(willOpen);
    setShowPrompt(false);
    if (willOpen) setDismissed(false);
    else trigger.current?.focus({ preventScroll: true });
  };
  useEffect(() => {
    const onKey = event => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  useEffect(() => {
    if (open || dismissed) return;
    const timers = [[10000,true],[15000,false],[25000,true],[30000,false],[65000,true],[85000,false]]
      .map(([delay, visible]) => window.setTimeout(() => setShowPrompt(visible), delay));
    return () => timers.forEach(timer => window.clearTimeout(timer));
  }, [open, dismissed]);
  return <>
    <AnimatePresence>
      {showPrompt && !open && !dismissed && <motion.div className={styles.prompt} key="prompt" initial={{opacity:0,y:reduced?0:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.2}}>
        <button type="button" className={styles.promptAction} onClick={() => toggleChat(true)}><span>AN IDEA IN MIND?</span><strong>Let’s find your next step.</strong><small>Ask our AI assistant <b aria-hidden="true">↗</b></small></button>
        <button type="button" className={styles.dismiss} aria-label="Dismiss chat suggestion" onClick={() => {setShowPrompt(false);setDismissed(true);}}>×</button>
      </motion.div>}
      {open && <motion.div id="futurise-chat" key="window" className={styles.panel} initial={{opacity:0,y:reduced?0:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:8}} transition={{duration:reduced?0:.22}}>
        <Suspense fallback={<div className={styles.loading} role="dialog" aria-label="Opening Futurise Assistant"><button type="button" className={styles.loadingClose} aria-label="Close chat" onClick={() => toggleChat(false)}>×</button><span className={styles.loadingMark}><AssistantMark /></span><h2>A little clarity,<br /><em>on its way.</em></h2><TypingIndicator label="Opening your conversation" /></div>}>
          <ChatWidget onClose={() => toggleChat(false)} />
        </Suspense>
      </motion.div>}
    </AnimatePresence>
    <button ref={trigger} className={styles.launcher} type="button" onClick={() => toggleChat()} aria-label={open?'Close chat':'Open Futurise AI assistant'} aria-expanded={open} aria-controls={open?'futurise-chat':undefined}>
      <span className={styles.launcherMark}>{open?<span className={styles.closeGlyph} aria-hidden="true">×</span>:<AssistantMark />}</span>
      <span className={styles.launcherLabel}>{open?'Close conversation':'Ask Futurise'}<small>AI ASSISTANT</small></span>
    </button>
  </>;
}
