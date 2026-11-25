'use client';
import Link from 'next/link';
import WhatsAppLink from '../common/WhatsAppLink';
import ContactForm from '../common/ContactForm';
import ConversationHero from '../contact/ConversationHero';
import ServicesWorldwide from '../contact/ServicesWorldwide ';
import ClientsReviews from '../home/ClientsReviews';
import { CONTACT,services } from '../../utils/Constant';
import { trackEvent,EVENTS } from '../../utils/analytics';
import styles from '../common/CommercialPages.module.css';
export default function ContactUsBody(){
 return <div className={styles.page}>
  <ConversationHero/>
  <div id="project-enquiry" style={{scrollMarginTop:110}} className={`${styles.container} ${styles.contactLayout}`}>
   <aside className={styles.contactAside}>
    <h2>Let’s make the next step clear.</h2>
    <p>Tell us what you have in mind. We’ll discuss your goals, the scope and how we can help.</p>
    <dl className={styles.contactInfo}>
     <div><dt>Email us</dt><dd><a href={`mailto:${CONTACT.email}`} onClick={()=>trackEvent(EVENTS.EMAIL_CLICK,{location:'contact-page-cards'})}>{CONTACT.email}</a></dd></div>
     <div><dt>WhatsApp</dt><dd><WhatsAppLink location="contact-page-cards">Message us on WhatsApp ↗</WhatsAppLink></dd></div>
     <div><dt>Location</dt><dd>Wellington, NZ · Serving worldwide</dd></div>
     <div><dt>Call hours</dt><dd>Mon to Sat, 9:00 AM to 10:30 PM India time (IST). The booking calendar shows each slot in your own time zone.</dd></div>
     <div><dt>Response time</dt><dd>Within one business day</dd></div>
    </dl>
    <div className={styles.linkList}><Link href="/portfolio">Explore our work ↗</Link><Link href="/pricing">Understand the scope ↗</Link></div>
   </aside>
   <ContactForm/>
  </div>
  <div className={styles.dark}><ServicesWorldwide/></div>
  <ClientsReviews/>
  <section className={styles.section}><div className={styles.container}><p className={styles.eyebrow}>Not ready to send a scope</p><h2>Work out what you need <span>before you write it down</span></h2><div className={styles.linkList}>{Object.entries(services).map(([slug,s])=><Link key={slug} href={`/service/${slug}`}>{s.title} ↗</Link>)}<Link href="/pricing">What it costs ↗</Link><Link href="/portfolio">The delivered work ↗</Link></div></div></section>
 </div>;
}
