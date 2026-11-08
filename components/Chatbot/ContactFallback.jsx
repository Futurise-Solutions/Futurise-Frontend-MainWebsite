'use client';
import Link from 'next/link';
import { useBooking } from '../../context/BookingContext';
import { CONTACT } from '../../utils/Constant/navigation';
import { trackEvent, EVENTS } from '../../utils/analytics';
import styles from './Chat.module.css';
export default function ContactFallback({ failed = false, onRetry, retryDisabled = false }) {
  const booking=useBooking();
  const openBooking=booking?.onOpen;
  return <div className={styles.fallback}><p>{failed?'Sorry, I’m having trouble answering right now. You can try again, or reach the team directly:':'I couldn’t find a specific answer. Here’s how to reach us directly:'}</p>{failed&&onRetry&&<button type="button" onClick={onRetry} disabled={retryDisabled}>Try again <span aria-hidden="true">↻</span></button>}<button type="button" onClick={()=>openBooking?.('chatbot-fallback')} disabled={!openBooking}>Book a Free Call <span aria-hidden="true">↗</span></button><Link href="/contact">Send us a message <span aria-hidden="true">↗</span></Link><a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" onClick={()=>trackEvent(EVENTS.WHATSAPP_CLICK,{location:'chatbot'})}>WhatsApp us <span aria-hidden="true">↗</span></a></div>;
}
