'use client';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useReducedMotion } from 'framer-motion';
import { useBooking } from '@/context/BookingContext';
import { trackEvent, EVENTS } from '@/utils/analytics';
import styles from './BookingModal.module.css';

const BOOKING_URL = 'https://calendar.app.google/oZ5ENgnwaCWAchAv6';
const BENEFITS = [
  'Discuss your project goals & tech requirements',
  'Get a recommended tech stack for your idea',
  'Receive a clear build roadmap & timeline estimate',
  'No sales pitch, just honest, expert advice',
];

export default function BookingModal() {
  const { isOpen, onClose, source } = useBooking();
  const reduced = useReducedMotion();
  const handleBook = () => {
    trackEvent(EVENTS.BOOKING_CALENDAR_OPEN, { location: source });
    onClose();
  };
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
            <div className={styles.invitation}>
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
            <div className={styles.details}>
              <p className={styles.eyebrow}>LESS GUESSWORK. MORE CLARITY.</p>
              <h3>Leave with a<br />{' '}clearer next step.</h3>
              <p className={styles.description}>Talk to our experts about your project. We’ll give you a clear tech stack recommendation and build roadmap. It’s completely free, with no sales pitch.</p>
              <h4 className={styles.listTitle}>WHAT YOU’LL GET</h4>
              <ol className={styles.benefits}>
                {BENEFITS.map((benefit, i) => <li key={benefit}><span>0{i + 1}</span>{benefit}</li>)}
              </ol>
              <a className={styles.book} href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={handleBook}>Choose your time <span aria-hidden="true">↗</span></a>
              <p className={styles.note}>Opens Google Calendar in a new tab.<br />{' '}Pick a time that works for you.</p>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
