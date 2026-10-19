'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './ScrollStory.module.css';
export default function ScrollStory({ items, renderVisual, label = 'Explore as you scroll' }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current;
    let visible = false, frame = 0;
    const update = () => {
      frame = 0;
      const cards = Array.from(node.querySelectorAll('[data-story-step]'));
      const visual = node.querySelector('[data-story-visual]');
      const viewport = window.visualViewport?.height || window.innerHeight;
      const line = window.innerWidth <= 760 && visual ? Math.max(viewport * .58, visual.getBoundingClientRect().bottom + 40) : viewport * .52;
      let next = 0;
      cards.forEach((card, index) => { if (card.getBoundingClientRect().top <= line) next = index; });
      setActive(value => value === next ? value : next);
    };
    const schedule = () => { if (visible && !frame) frame = requestAnimationFrame(update); };
    const sync = () => node.style.setProperty('--motion-state', visible && !document.hidden ? 'running' : 'paused');
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); if (visible) schedule(); });
    observer.observe(node);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); document.removeEventListener('visibilitychange', sync); };
  }, [items.length]);
  return <div ref={ref} className={styles.story}>
    <div className={styles.visual} data-story-visual><motion.div key={active} className={styles.visualInner} initial={reduced ? false : { opacity: .65, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .45 }}>{renderVisual(active)}</motion.div><div className={styles.progress} aria-hidden="true"><span>{label}</span><div>{items.map((item, i) => <i key={item.title} data-active={i === active} />)}</div></div></div>
    <div className={styles.steps}>{items.map((item, i) => <article key={item.title} data-story-step data-active={i === active} className={styles.step}><span className={styles.index}>{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3>{item.content}</article>)}</div>
  </div>;
}
