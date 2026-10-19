'use client';
import { useId, useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js/min';
import countryNames from '../../utils/Constant/phoneCountries.json';
import { services, CONTACT } from '../../utils/Constant';
import { trackEvent, EVENTS } from '../../utils/analytics';
import styles from './ContactForm.module.css';

// Fixed English labels/order keep server rendering independent of browser ICU data.
const priorityCountries = ['US','CA','AE','NZ','IN'];
const otherCountries = Object.keys(countryNames).filter(c=>!priorityCountries.includes(c));

export default function ContactForm({location='contact-page'}) {
 const id=useId(),form=useRef(null),phoneInput=useRef(null),submitting=useRef(false),toast=useToast();
 const [country,setCountry]=useState('US'),[phone,setPhone]=useState(''),[service,setService]=useState('');
 const [busy,setBusy]=useState(false),[phoneError,setPhoneError]=useState(''),[status,setStatus]=useState('');
 const parse=(value,region)=>parsePhoneNumberFromString(value,{defaultCountry:region,extract:false});
 const validatePhone=()=>{
  const number=parse(phone,country);
  const error=!phone.trim()?'Enter your phone number.':!number?.isValid()?'Enter a valid phone number, including the area code.':'';
  setPhoneError(error);phoneInput.current?.setCustomValidity(error);return error?null:number;
 };
 const changePhone=e=>{
  const value=e.target.value;setPhone(value);setPhoneError('');e.target.setCustomValidity('');
  if(value.trim().startsWith('+')){const parsed=parse(value,country);if(parsed?.country)setCountry(parsed.country)}
 };
 const sendEmail=async e=>{
  e.preventDefault();if(submitting.current)return;
  const number=validatePhone();if(!number){phoneInput.current?.reportValidity();phoneInput.current?.focus();return}
  const node=form.current;
  if(!node.elements.user_name.value.trim()){node.elements.user_name.setCustomValidity('Enter your name.');node.elements.user_name.reportValidity();return}
  const brief=node.elements.project_brief.value.trim();
  // Keep existing EmailJS template fields. Service is also included in message so it
  // reaches the team even before a dashboard template adds a separate service field.
  node.elements.phone.value=number.number;
  node.elements.message.value=`Service: ${service}\nPhone: ${number.number}\nCountry: ${countryNames[country]}\n\n${brief || 'No project description supplied.'}`;
  submitting.current=true;setBusy(true);setStatus('');
  try{
   const { default: emailjs } = await import('@emailjs/browser');
   await emailjs.sendForm('service_jc2bgz1','template_j9ap29a',node,'nURJDAbLK8UpUR46a');
   trackEvent(EVENTS.CONTACT_FORM_SUBMIT,{location,has_message:Boolean(brief)});
   setStatus('Message sent. We’ll get back to you within one business day.');
   toast({title:'Message sent successfully!',description:'We’ll get back to you within one business day.',status:'success',duration:5000,isClosable:true,position:'top'});
   node.reset();setCountry('US');setPhone('');setService('');setPhoneError('');
  }catch{
   trackEvent(EVENTS.CONTACT_FORM_ERROR,{location});setStatus('Your message could not be sent. Your details are still here. Please retry or email us directly.');
   toast({title:'Failed to send message.',description:'Please try again or email us directly.',status:'error',duration:5000,isClosable:true,position:'top'});
  }finally{submitting.current=false;setBusy(false)}
 };
 const option=c=><option key={c} value={c}>{countryNames[c]} (+{getCountryCallingCode(c)})</option>;
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
    <label htmlFor={`${id}-phone`}>Phone number <span>*</span><input ref={phoneInput} id={`${id}-phone`} name="phone_national" type="tel" inputMode="tel" autoComplete="tel-national" required maxLength={32} placeholder="Phone with area code" value={phone} onChange={changePhone} onBlur={()=>{if(phone)validatePhone()}} aria-invalid={Boolean(phoneError)} aria-describedby={`${id}-phone-help`}/></label>
   </div>
   <p id={`${id}-phone-help`} className={phoneError?styles.error:styles.helper}>{phoneError || `Selected code: +${getCountryCallingCode(country)}. You can also paste a full international number.`}</p>
   <label htmlFor={`${id}-service`}>What can we help you with? <span>*</span><select id={`${id}-service`} name="service" value={service} onChange={e=>setService(e.target.value)} required><option value="" disabled>Select a service</option>{Object.values(services).map(s=><option key={s.title} value={s.title}>{s.title}</option>)}<option value="Multiple services / not sure yet">Multiple services / not sure yet</option></select></label>
   <label htmlFor={`${id}-message`}>Tell us about your project <small>optional</small><textarea id={`${id}-message`} name="project_brief" rows={4} maxLength={5000} placeholder="What are you building, and what would you like help with?"/></label>
   <input type="hidden" name="phone"/><input type="hidden" name="message"/>
   <button className={styles.submit} type="submit" disabled={busy}>{busy?'Sending…':'Send message'}<span aria-hidden="true">↗</span></button>
  </fieldset>
  <p className={styles.privacy}>Fields marked * are required. Your details are used solely to respond to your enquiry.</p>
  <p className={styles.status} role="status" aria-live="polite">{status}</p>
  {status.startsWith('Your message')&&<a className={styles.email} href={`mailto:${CONTACT.email}`}>Email us directly ↗</a>}
 </form>;
}
