'use client'

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useBooking } from "../../context/BookingContext";
import WhatsAppLink from "../common/WhatsAppLink";
import { trackEvent, EVENTS } from "../../utils/analytics";
import AssistantMark from "./AssistantMark";
import styles from "./Chat.module.css";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import PredefinedChips from "./PredefinedChips";
import { predefinedAnswers, answersWithBooking } from "./predefinedQA";
import { matchKeyword } from "./keywordMatcher";
import { sendChatMessage } from "../../api/chat";

let idSeq = 0;
const nextId = () => `m_${++idSeq}`;

const GREETING = {
  id: nextId(),
  role: "assistant",
  text: "Hi, I’m Futurise’s AI assistant. I can help you explore our services, understand pricing, or plan your next step. What are you working on?",
};

const LABEL_START = "Thinking through your question";
const LABEL_SLOW = "Taking a little longer than usual";
const LABEL_RETRY = "Still working on it, one moment";
const SLOW_AFTER_MS = 6000; // switch to the "longer than usual" label
const ATTEMPT_TIMEOUT_MS = 35000; // give up on one request after this
const RETRY_DELAY_MS = 1000; // pause before the single automatic retry

/**
 * The chat window. Holds the conversation in useState (cleared on refresh — no
 * storage, per the SEO/perf rules) and runs the answer cascade:
 *   1. Predefined chip  → instant answer, 0 API calls
 *   2. Backend AI       → POST /api/chat
 *      (one automatic retry on error / timeout; none on quota)
 *   3. Keyword matcher  → if AI is unavailable (quota / error / offline)
 *   4. Contact fallback → if nothing matches ("Try again" shown after a failure)
 */
const ChatWidget = ({ onClose }) => {
  const [messages, setMessages] = useState([GREETING]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingLabel, setTypingLabel] = useState(LABEL_START);
  const scrollRef = useRef(null);
  const closeRef = useRef(null);
  const aliveRef = useRef(true);
  const abortRef = useRef(null);
  const timersRef = useRef([]);
  const turnRef = useRef(0);
  const booking = useBooking();
  useEffect(() => { closeRef.current?.focus({ preventScroll: true }); }, []);

  // The widget is mounted lazily and can be closed mid-request: cancel the request,
  // clear every timer, and make sure nothing sets state afterwards.
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      abortRef.current?.abort();
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const hasUserMessage = messages.some((m) => m.role === "user");
  const hasAnswer = messages.some((m) => m.role === "assistant" && m.id !== GREETING.id);

  // Auto-scroll to the newest message / typing indicator.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  const push = useCallback(
    (msg) => setMessages((prev) => [...prev, { id: nextId(), ...msg }]),
    []
  );

  // No AI answer: try the keyword matcher first. If that finds nothing, show the
  // contact fallback (with a "Try again" button when the AI actually failed).
  const runFallback = useCallback(
    (question, failed = false) => {
      const kw = matchKeyword(question);
      if (kw) { push({ role: "assistant", text: kw }); return "keyword"; }
      if (failed) push({ role: "assistant", isFallback: true, failed: true, question });
      else push({ role: "assistant", isFallback: true });
      return "fallback";
    },
    [push]
  );

  const later = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  // One request with its own timeout. A throw (network, timeout, abort) counts as an error.
  const ask = useCallback(
    async (question, history) => {
      const controller = new AbortController();
      abortRef.current = controller;
      const timer = later(() => controller.abort(), ATTEMPT_TIMEOUT_MS);
      try {
        return await sendChatMessage(question, history, { signal: controller.signal });
      } catch {
        return { source: "error" };
      } finally {
        clearTimeout(timer);
      }
    },
    [later]
  );

  // `retry` = the visitor pressed "Try again": same path, but the question is
  // already on screen so it is not echoed a second time.
  const handleSend = useCallback(
    async (question, { retry = false } = {}) => {
      if (retry) {
        // The failed notice is replaced by the new attempt.
        setMessages((prev) => prev.filter((m) => !(m.failed && m.question === question)));
      } else {
        // 1. Echo the user's message.
        push({ role: "user", text: question });
        turnRef.current += 1;

        // 2. Predefined chip → instant answer, no network call.
        if (predefinedAnswers[question]) {
          push({ role: "assistant", text: predefinedAnswers[question], cta: answersWithBooking.has(question) });
          trackEvent(EVENTS.CHATBOT_MESSAGE, { turn: turnRef.current, answer_source: "chip" });
          return;
        }
      }

      // 3. Ask the backend AI (send the recent turns as context).
      setTypingLabel(LABEL_START);
      setIsTyping(true);
      const prior = [...messages];
      if (retry) {
        // The question is already in the list; it goes in as the new question instead.
        const at = prior.map((m) => m.role === "user" && m.text).lastIndexOf(question);
        if (at !== -1) prior.splice(at, 1);
      }
      const history = prior
        .filter((m) => !m.isFallback && m.text)
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.text }));

      const slowTimer = later(() => setTypingLabel(LABEL_SLOW), SLOW_AFTER_MS);
      try {
        let res = await ask(question, history);
        if (!aliveRef.current) return;

        // One automatic retry for errors and timeouts. Quota is not retried.
        if (res.source !== "ai" && res.source !== "quota_exceeded") {
          clearTimeout(slowTimer);
          setTypingLabel(LABEL_RETRY);
          await new Promise((resolve) => later(resolve, RETRY_DELAY_MS));
          if (!aliveRef.current) return;
          res = await ask(question, history);
          if (!aliveRef.current) return;
        }

        let answerSource;
        if (res.source === "ai" && res.answer) {
          push({ role: "assistant", text: res.answer });
          answerSource = "ai";
        } else if (res.source === "quota_exceeded") {
          answerSource = runFallback(question);
        } else {
          answerSource = runFallback(question, true);
        }
        // A retry re-answers a message that was already counted. Never send the text itself.
        if (!retry) trackEvent(EVENTS.CHATBOT_MESSAGE, { turn: turnRef.current, answer_source: answerSource });
      } finally {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
        if (aliveRef.current) setIsTyping(false);
      }
    },
    [messages, push, runFallback, ask, later]
  );

  const handleRetry = useCallback((question) => handleSend(question, { retry: true }), [handleSend]);

  return (
    <section className={styles.widget} role="dialog" aria-modal="false" aria-labelledby="assistant-title">
      <header className={styles.header}>
        <span className={styles.headerMark}><AssistantMark /></span>
        <div><h2 id="assistant-title">Futurise Assistant <span>AI</span></h2><p>Services, ideas &amp; your next step</p></div>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close chat">×</button>
      </header>
      <div ref={scrollRef} className={styles.conversation}>
        {!hasUserMessage && <div className={styles.welcome}><p>A CONVERSATION STARTS HERE</p><h3>Your next idea.<br /><em>A clearer direction.</em></h3></div>}
        <MessageList messages={messages} isTyping={isTyping} typingLabel={typingLabel} onRetry={handleRetry} />
      </div>
      <div className={styles.composerArea}>
        {hasAnswer && <div className={styles.actions} role="group" aria-label="Next steps"><button type="button" onClick={() => booking?.onOpen?.("chatbot-actions")} disabled={!booking?.onOpen}>Book a free 45-min call</button><Link href="/contact">Send your brief</Link><WhatsAppLink context="chat" location="chatbot-actions">WhatsApp</WhatsAppLink></div>}
        {!hasUserMessage && <PredefinedChips onSelect={handleSend} />}
        <MessageInput onSend={handleSend} disabled={isTyping} />
        <p className={styles.disclosure}>Futurise AI assistant · For project guidance</p>
      </div>
    </section>
  );
};
export default ChatWidget;
