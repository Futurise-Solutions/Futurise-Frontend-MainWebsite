'use client';
import { useEffect, useRef, useState } from 'react';
export default function useAutoScene(count, delay = 3200) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false, timer;
    const sync = () => {
      clearInterval(timer);
      const running = visible && !document.hidden && !preference.matches && !navigator.connection?.saveData;
      node.style.setProperty('--motion-state', running ? 'running' : 'paused');
      if (running && count > 1) timer = setInterval(() => setActive(value => (value + 1) % count), delay);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(node);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => { clearInterval(timer); observer.disconnect(); preference.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, [count, delay]);
  return { ref, active, setActive };
}
