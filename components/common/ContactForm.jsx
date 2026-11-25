'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useToast } from '@chakra-ui/react';
import { getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js/min';
import countryNames from '../../utils/Constant/phoneCountries.json';
import { services, CONTACT } from '../../utils/Constant';
import { whatsappHref } from '../../utils/Constant/navigation';
import { trackEvent, EVENTS } from '../../utils/analytics';
import { getLeadSource, formatUtm } from '../../utils/leadSource';
import { useBooking } from '../../context/BookingContext';
import styles from './ContactForm.module.css';

// Fixed English labels/order keep server rendering independent of browser ICU data.
const priorityCountries = ['US','CA','AE','NZ','IN'];
const otherCountries = Object.keys(countryNames).filter(c=>!priorityCountries.includes(c));

const EMAILJS = { service: 'service_jc2bgz1', template: 'template_j9ap29a', publicKey: 'nURJDAbLK8UpUR46a' };
const firstName = full => String(full || '').trim().split(/\s+/)[0].slice(0, 40);
const timeout = ms => (typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(ms) : undefined);

export default function ContactForm({location='contact-page'}) {
 const id=useId(),form=useRef(null),phoneInput=useRef(null),sentHeading=useRef(null),submitting=useRef(false),toast=useToast();
 const pathname=usePathname()||'/contact',booking=useBooking();
 const [country,setCountry]=useState('US'),[phone,setPhone]=useState(''),[service,setService]=useState('');
 const [busy,setBusy]=useState(false),[phoneError,setPhoneError]=useState(''),[status,setStatus]=useState(''),[sent,setSent]=useState(null);
 useEffect(()=>{if(sent)sentHeading.current?.focus()},[sent]);
 const parse=(value,region)=>parsePhoneNumberFromString(value,{defaultCountry:region,extract:false});
 // Only called when something was typed: phone / WhatsApp is optional.
 const validatePhone=()=>{
  const number=parse(phone,country);
  const error=!number?.isValid()?'Enter a valid phone number, including the area code, or leave it empty.':'';
  setPhoneError(error);phoneInput.current?.setCustomValidity(error);return error?null:number;
 };
 const changePhone=e=>{
  const value=e.target.value;setPhone(value);setPhoneError('');e.target.setCustomValidity('');
  if(value.trim().startsWith('+')){const parsed=parse(value,country);if(parsed?.country)setCountry(parsed.country)}
 };
 const sendEmail=async e=>{
  e.preventDefault();if(submitting.current)return;
  const node=form.current;
  let phoneE164='';
  if(phone.trim()){
   const number=validatePhone();
   if(!number){phoneInput.current?.reportValidity();phoneInput.current?.focus();return}
   phoneE164=number.number;
  }else{setPhoneError('');phoneInput.current?.setCustomValidity('')}
  const name=node.elements.user_name.value.trim();
  if(!name){node.elements.user_name.setCustomValidity('Enter your name.');node.elements.user_name.reportValidity();return}
  const brief=node.elements.project_brief.value.trim();
  const source=getLeadSource(),utm=formatUtm(source);
  // Keep the existing EmailJS template fields. Service, phone and where the lead came from
  // also go into `message`, so they reach the inbox even though the template has no field for them.
  node.elements.phone.value=phoneE164;
  node.elements.message.value=[
   `Service: ${service}`,
   `Phone / WhatsApp: ${phoneE164||'not given'}`,
   `Country: ${countryNames[country]}`,
   '',
   brief||'No project description supplied.',
   '',
   '---',
   `Sent from: ${pathname} (${location})`,
   `Landing page: ${source.landing||'unknown'}`,
   `Referrer: ${source.referrer||'none (direct, app or blocked)'}`,
   `UTM: ${utm||'none'}${source.paidClick?' (paid click)':''}`,
  ].join('\n');
  // 🔴 READ EVERY FIELD HERE, BEFORE setBusy(true). The <fieldset> below is disabled while
  // `busy`, and browsers leave disabled controls out of form data. The old code awaited the
  // EmailJS import after setBusy, React re-rendered in between, and every enquiry from
  // 20 Oct to 25 Nov 2026 reached the inbox blank while the visitor saw "Message sent".
  // scripts/postbuild-guards.mjs fails the build if this order or sendForm comes back.
  const params=Object.fromEntries(new FormData(node));
  const trap=String(params.website||'').trim();
  delete params.website;
  if(trap){setSent({name:firstName(name)});return} // honeypot filled: a bot. Pretend success, send nothing.
  const lead={
   type:'contact',name,company:params.company||'',email:params.user_email||'',phone:phoneE164,
   country:countryNames[country]||country,service,brief,location,page:pathname,
   landing:source.landing||'',referrer:source.referrer||'',utm:utm||'',website:'',
  };
  submitting.current=true;setBusy(true);setStatus('');
  try{
   const [mail,store]=await Promise.allSettled([
    import('@emailjs/browser').then(({default:emailjs})=>emailjs.send(EMAILJS.service,EMAILJS.template,params,{publicKey:EMAILJS.publicKey})),
    fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(lead),signal:timeout(10000)})
     .then(r=>{if(!r.ok)throw new Error(`lead store ${r.status}`);return r}),
   ]);
   const mailed=mail.status==='fulfilled',stored=store.status==='fulfilled';
   if(mailed||stored){
    trackEvent(EVENTS.CONTACT_FORM_SUBMIT,{location,has_message:Boolean(brief),has_phone:Boolean(phoneE164),delivery:mailed&&stored?'email+store':mailed?'email':'store'});
    node.reset();setCountry('US');setPhone('');setService('');setPhoneError('');
    setSent({name:firstName(name)});
   }else{
    trackEvent(EVENTS.CONTACT_FORM_ERROR,{location});
    setStatus('Your message could not be sent. Your details are still here. Please retry, email us directly or message us on WhatsApp.');
    toast({title:'Failed to send message.',description:'Please try again, email us or message us on WhatsApp.',status:'error',duration:6000,isClosable:true,position:'top'});
   }
  }finally{submitting.current=false;setBusy(false)}
 };
 const option=c=><option key={c} value={c}>{countryNames[c]} (+{getCountryCallingCode(c)})</option>;
 const whatsapp=whatsappHref(pathname);
 const trackWhatsapp=where=>()=>trackEvent(EVENTS.WHATSAPP_CLICK,{location:where});

 if(sent) return <div className={styles.form} role="status" aria-live="polite">
  <div className={styles.heading}>
   <span>02 / RECEIVED</span>
   <h2 ref={sentHeading} tabIndex={-1}>Got it{sent.name?`, ${sent.name}`:''}.</h2>
   <p>Your message is with us and we’ll reply within one business day. Want to skip the back-and-forth? Pick a time for a free 45-minute call now.</p>
  </div>
  <div className={styles.sentActions}>
   <button type="button" className={styles.submit} onClick={()=>booking?.onOpen('contact-success')}>Pick a call time<span aria-hidden="true">↗</span></button>
   <a className={styles.secondary} href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={trackWhatsapp('contact-success')}>Or message us on WhatsApp ↗</a>
  </div>
  <button type="button" className={styles.again} onClick={()=>setSent(null)}>Send another message</button>
 </div>;

 return <form ref={form} onSubmit={sendEmail} className={styles.form} aria-labelledby={`${id}-title`} aria-busy={busy}>
  <div className={styles.heading}><span>01 / YOUR PROJECT</span><h2 id={`${id}-title`}>Share your details.</h2><p>Fill out the form below and we’ll reply within one business day.</p></div>
  <fieldset disabled={busy}>
   <div className={styles.row}>
    <label htmlFor={`${id}-name`}>Your name <span>*</span><input id={`${id}-name`} name="user_name" autoComplete="name" required maxLength={150} placeholder="Full name" onChange={e=>e.target.setCustomValidity('')}/></label>
    <label htmlFor={`${id}-company`}>Company <small>optional</small><input id={`${id}-company`} name="company" autoComplete="organization" maxLength={200} placeholder="Company name"/></label>
   </div>
   <label htmlFor={`${id}-email`}>Email address <span>*</span><input id={`${id}-email`} name="user_email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com"/></label>
   <div className={styles.phoneRow}>
    <label htmlFor={`${id}-country`}>Country / code <span>*</span><select id={`${id}-country`} name="country" autoComplete="country" value={country} onChange={e=>{setCountry(e.target.value);setPhoneError('');phoneInput.current?.setCustomValidity('');if(phone.trim().startsWith('+')){const previous=parse(phone,country);if(previous)setPhone(previous.nationalNumber)}}} required><optgroup label="Primary markets">{priorityCountries.map(option)}</optgroup><optgroup label="All other countries">{otherCountries.map(option)}</optgroup></select></label>
    <label htmlFor={`${id}-phone`}>Phone or WhatsApp <small>optional</small><input ref={phoneInput} id={`${id}-phone`} name="phone_national" type="tel" inputMode="tel" autoComplete="tel-national" maxLength={32} placeholder="Phone with area code" value={phone} onChange={changePhone} onBlur={()=>{if(phone.trim())validatePhone()}} aria-invalid={Boolean(phoneError)} aria-describedby={`${id}-phone-help`}/></label>
   </div>
   <p id={`${id}-phone-help`} className={phoneError?styles.error:styles.helper}>{phoneError || `Selected code: +${getCountryCallingCode(country)}. Optional. You can also paste a full international number.`}</p>
   <label htmlFor={`${id}-service`}>What can we help you with? <span>*</span><select id={`${id}-service`} name="service" value={service} onChange={e=>setService(e.target.value)} required><option value="" disabled>Select a service</option>{Object.values(services).map(s=><option key={s.title} value={s.title}>{s.title}</option>)}<option value="Multiple services / not sure yet">Multiple services / not sure yet</option></select></label>
   <label htmlFor={`${id}-message`}>Tell us about your project <small>optional</small><textarea id={`${id}-message`} name="project_brief" rows={4} maxLength={5000} placeholder="What are you building, and what would you like help with?"/></label>
   {/* Honeypot: hidden from people and assistive tech; bots that fill every field reveal themselves. */}
   <div className={styles.trap} aria-hidden="true"><label htmlFor={`${id}-website`}>Leave this field empty<input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off"/></label></div>
   <input type="hidden" name="phone"/><input type="hidden" name="message"/>
   <button className={styles.submit} type="submit" disabled={busy}>{busy?'Sending…':'Send message'}<span aria-hidden="true">↗</span></button>
  </fieldset>
  <p className={styles.privacy}>Fields marked * are required. Your details are used solely to respond to your enquiry.</p>
  <p className={styles.status} role="status" aria-live="polite">{status}</p>
  {status.startsWith('Your message')&&<p className={styles.fallback}>
   <a className={styles.email} href={`mailto:${CONTACT.email}`}>Email us directly ↗</a>
   <a className={styles.email} href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={trackWhatsapp('contact-error')}>Message us on WhatsApp ↗</a>
  </p>}
 </form>;
}
