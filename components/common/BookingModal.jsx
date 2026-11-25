'use client';

import { useEffect, useRef, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useReducedMotion } from 'framer-motion';
import { useBooking } from '@/context/BookingContext';
import { trackEvent, EVENTS } from '@/utils/analytics';
import styles from './BookingModal.module.css';

const BOOKING_URL = 'https://calendar.app.google/oZ5ENgnwaCWAchAv6';
const EMBED_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0aFyvaujrzkoyugDXtY1nJVN0uCQOT_6Ce_uqA58bOB_409ANHe4RwcBLoZ5BoLiubC-Cou1_4?gv=true';
const BENEFITS = [
  'Discuss your project goals & tech requirements',
  'Get a recommended tech stack for your idea',
  'Receive a clear build roadmap & timeline estimate',
  'No sales pitch, just honest, expert advice',
];

export default function BookingModal() {
  const { isOpen, onClose, source } = useBooking();
  const reduced = useReducedMotion();
  // The iframe is only created after the click, so nothing from Google loads until asked for.
  const [embed, setEmbed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const frame = useRef(null);
  // The clicked button is replaced by the calendar, so hand focus to the frame rather than dropping it.
  useEffect(() => { if (embed) frame.current?.focus({ preventScroll: true }); }, [embed]);
  // Each opening starts at the invitation again, so "Choose your time" (and its event) is
  // the step every visitor takes, instead of a reopened modal jumping straight to the calendar.
  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmbed(false);
      setLoaded(false);
    }
  }, [isOpen]);
  const handleBook = () => {
    trackEvent(EVENTS.BOOKING_CALENDAR_OPEN, { location: source, mode: 'embed' });
    setEmbed(true);
  };
  const handleNewTab = () => trackEvent(EVENTS.BOOKING_CALENDAR_NEW_TAB, { location: source, mode: 'new-tab' });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered scrollBehavior="inside" motionPreset={reduced ? 'none' : 'slideInBottom'}>
      <ModalOverlay bg="rgba(8,8,13,.78)" backdropFilter="blur(8px)" />
      <ModalContent bg="#F4F2FF" color="#08080D" borderRadius="8px" overflow="hidden" mx={4} my={3} maxH="calc(100dvh - 24px)" boxShadow="0 30px 100px #0006">
        <ModalHeader px={{ base: 5, md: 7 }} py={3} minH="48px" borderBottom="1px solid #08080d20" pr={14} fontWeight={500} fontSize="12px" letterSpacing=".06em">
          Book a Free Strategy Call
        </ModalHeader>
        <ModalCloseButton top={1} right={2} width="44px" height="44px" color="#514b60" borderRadius="full" _hover={{ bg: '#7b6cff20' }} />
        <ModalBody p={0}>
          <div className={styles.layout}>
            <div className={`${styles.invitation} ${embed ? styles.invitationEmbed : ''}`}>
              <p className={styles.eyebrow}>YOUR NEXT CHAPTER STARTS HERE</p>
              <h2>Big idea?<br />{' '}Let’s give it<br />{' '}<em>direction.</em></h2>
              <div className={styles.session}>
                <svg viewBox="0 0 180 180" aria-hidden="true">
                  <circle cx="90" cy="90" r="74" fill="none" stroke="#08080d20" strokeWidth="1" />
                  <circle className={styles.arc} cx="90" cy="90" r="74" fill="none" stroke="#7055bf" strokeWidth="3" pathLength="100" strokeDasharray="75 25" transform="rotate(-90 90 90)" />
                  {Array.from({ length: 12 }, (_, i) => <path key={i} d="M90 26V31" stroke="#7055bf" transform={`rotate(${i * 30} 90 90)`} />)}
                  <text x="90" y="98" textAnchor="middle" fill="#08080d" fontSize="48">45</text>
                  <text x="90" y="119" textAnchor="middle" fill="#514b60" fontSize="9" letterSpacing="2">MINUTES</text>
                </svg>
                <div><strong>A focused conversation.</strong><span>Free · No commitment</span></div>
              </div>
              <p className={styles.signature}>FUTURISE SOLUTIONS <span>↗</span></p>
            </div>
            {embed ? (
            <div className={styles.embedPanel}>
              <div className={styles.embedBar}>
                <p className={styles.eyebrow}>PICK A TIME</p>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={handleNewTab}>Open in a new tab <span aria-hidden="true">↗</span></a>
              </div>
              <div className={styles.frameWrap}>
                {!loaded && <p className={styles.loading} role="status">Loading the calendar…</p>}
                <iframe ref={frame} className={styles.frame} src={EMBED_URL} title="Book a free 45-minute strategy call" onLoad={() => setLoaded(true)} />
              </div>
            </div>
            ) : (
            <div className={styles.details}>
              <p className={styles.eyebrow}>LESS GUESSWORK. MORE CLARITY.</p>
              <h3>Leave with a<br />{' '}clearer next step.</h3>
              <p className={styles.description}>Talk to our experts about your project. We’ll give you a clear tech stack recommendation and build roadmap. It’s completely free, with no sales pitch.</p>
              <h4 className={styles.listTitle}>WHAT YOU’LL GET</h4>
              <ol className={styles.benefits}>
                {BENEFITS.map((benefit, i) => <li key={benefit}><span>0{i + 1}</span>{benefit}</li>)}
              </ol>
              <button type="button" className={styles.book} onClick={handleBook}>Choose your time <span aria-hidden="true">↓</span></button>
              <p className={styles.note}>Pick a time below. No Google account needed.</p>
            </div>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
