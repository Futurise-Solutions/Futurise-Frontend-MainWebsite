'use client';
import {useState,useRef} from 'react';
import {useToast} from '@chakra-ui/react';
import Link from 'next/link';
import {FaLinkedinIn,FaInstagram,FaFacebookF,FaXTwitter} from 'react-icons/fa6';
import Logo from '../common/Logo';
import {NavbarservicesOptions,CONTACT,SOCIAL_PROFILES} from '../../utils/Constant/navigation';
import {COUNTRIES} from '../../utils/Constant/countries';
import {trackEvent,EVENTS} from '../../utils/analytics';
import s from './Footer.module.css';
const icons={LinkedIn:FaLinkedinIn,Instagram:FaInstagram,Facebook:FaFacebookF,'X (Twitter)':FaXTwitter};
export default function Footer(){
  const busy = useRef(false);
  const toast = useToast();
  const [email, setEmail] = useState("");

  const [isSubscribing, setIsSubscribing] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if(busy.current) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Enter a valid email address", status: "warning", duration: 3000, isClosable: true });
      return;
    }
    busy.current = true;
    setIsSubscribing(true);
    import('@emailjs/browser')
      .then(({default: emailjs}) => emailjs.send(
        "service_jc2bgz1",
        "template_dfwoqsd",
        {
          subscriber_email: email,
          time: new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }),
        },
        "nURJDAbLK8UpUR46a"
      ))
      .then(
        () => {
          trackEvent(EVENTS.NEWSLETTER_SUBSCRIBE, { location: "footer" });
          toast({ title: "You're subscribed!", description: "Thanks for joining the Futurise newsletter.", status: "success", duration: 4000, isClosable: true });
          setEmail("");
          busy.current = false;
          setIsSubscribing(false);
        },
        () => {
          toast({ title: "Subscription failed.", description: "Please try again or email us directly.", status: "error", duration: 4000, isClosable: true });
          busy.current = false;
          setIsSubscribing(false);
        }
      );
  };

 return <footer className={s.footer}>
  <div className={s.inner}>
   <div className={s.invitation}><svg className={s.contours} viewBox="0 0 1000 360" fill="none" aria-hidden="true">{Array.from({length:18},(_,i)=><path key={i} d={`M ${420+i*16} -40 C ${150+i*23} 170, ${940-i*9} 120, ${690+i*18} 440`} stroke="currentColor"/>)}</svg><div><p>YOUR NEXT CHAPTER</p><h2>Let&apos;s build the<br/><em>future, together.</em></h2></div><Link className={s.start} href="/contact"><span>Start a conversation</span><b aria-hidden="true">↗</b></Link></div>
   <div className={s.main}>
    <div className={s.brand}><Logo size="lg"/><p>We design and build web, mobile, and Web3 products that help ambitious brands grow.</p><form onSubmit={subscribe} aria-label="Newsletter subscription"><label htmlFor="footer-newsletter">Subscribe to our newsletter</label><div className={s.subscribe}><input id="footer-newsletter" name="subscriber_email" type="email" autoComplete="email" required placeholder="you@company.com" value={email} disabled={isSubscribing} onChange={e=>setEmail(e.target.value)}/><button type="submit" disabled={isSubscribing} aria-label={isSubscribing?'Subscribing':'Subscribe'}>{isSubscribing?'…':'↗'}</button></div></form></div>
    <nav className={s.column} aria-label="Footer company"><h3>Explore</h3>{[['/','Home'],['/about','About Us'],['/portfolio','Portfolio'],['/case-studies','Case Studies'],['/solutions','Solutions'],['/pricing','Pricing'],['/contact','Contact']].map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav>
    <nav className={s.column} aria-label="Footer services"><h3>Our expertise</h3>{NavbarservicesOptions.map(service=><Link key={service.path} href={service.path}>{service.option}</Link>)}</nav>
    <div className={s.column}><h3>Get in touch</h3><a className={s.email} href={'mailto:'+CONTACT.email} onClick={()=>trackEvent(EVENTS.EMAIL_CLICK,{location:'footer'})}>{CONTACT.email} ↗</a><a className={s.address} href="https://maps.google.com/?q=Huddart+Parker+Building,+Wellington+Central,+Wellington+6011,+New+Zealand" target="_blank" rel="noopener noreferrer">Huddart Parker Building,<br/>Wellington Central,<br/>Wellington 6011, New Zealand ↗</a><div className={s.socials}>{SOCIAL_PROFILES.map(profile=>{const Icon=icons[profile.label];return <a key={profile.label} href={profile.href} aria-label={profile.label} target="_blank" rel="noopener noreferrer">{Icon?<Icon/>:profile.label}</a>})}</div></div>
   </div>
   <nav className={s.markets} aria-label="Markets"><span>WORKING WORLDWIDE</span><div>{[...COUNTRIES.map(c=>({href:c.path,label:c.label})),{href:'/europe',label:'Europe'}].map(m=><Link key={m.href} href={m.href}>{m.label}</Link>)}</div></nav>
   <div className={s.bottom}><p>© {new Date().getFullYear()} Futurise Solutions. All rights reserved.</p><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms & Conditions</Link><a href="#top" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}}>Back to top ↑</a></div></div>
  </div>
 </footer>;
}
