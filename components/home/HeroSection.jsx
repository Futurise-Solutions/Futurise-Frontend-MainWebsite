'use client'
import Link from "next/link";
import { useBooking } from "../../context/BookingContext";
import StudioFilm from "./StudioFilm";
import HeroContext from "./HeroContext";
import styles from "./CinematicHero.module.css";
export default function HeroSection() {
 const { onOpen } = useBooking();
 return <section className={styles.hero} aria-labelledby="home-title">
 <StudioFilm />
 <div className={styles.inner}>
 <p className={styles.eyebrow}>AI Agents · SaaS · Web · Mobile · Blockchain</p>
 <h1 id="home-title" className={styles.title}><span>AI-powered </span><span>apps &amp; SaaS </span><span>that scale.</span></h1>
 <p className={styles.copy}>We build AI agents, AI-integrated web apps, SaaS platforms, mobile apps, and Web3 products, end to end, from concept to scaled production.</p>
 <div className={styles.actions}><Link href="/contact" className={styles.primary}>Start your project <span aria-hidden="true">↗</span></Link><button type="button" className={styles.secondary} onClick={() => onOpen("home-hero")}>Book a strategy call <span aria-hidden="true">↗</span></button></div>
 </div>
 <HeroContext />
 </section>;
}
