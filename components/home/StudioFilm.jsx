'use client';
import { useEffect, useRef } from 'react';
import styles from './CinematicHero.module.css';

export default function StudioFilm() {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => {
      if (!visible || document.hidden || preference.matches || navigator.connection?.saveData) {
        video.pause();
        return;
      }
      if (!video.getAttribute('src')) video.src = '/motion/studio-sculpture.mp4';
      video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.1 });
    observer.observe(video);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); preference.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); video.pause(); };
  }, []);
  return <div className={styles.film} aria-hidden="true">
    <video ref={ref} muted loop playsInline preload="none" poster="/motion/studio-sculpture-poster.webp" />
  </div>;
}

