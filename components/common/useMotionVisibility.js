'use client';
import { useEffect, useRef } from 'react';

// Pause CSS motion without re-rendering the section or changing its initial markup.
export default function useMotionVisibility() {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let visible = false;
    const sync = () => node.style.setProperty('--motion-state', visible && !document.hidden ? 'running' : 'paused');
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(node);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); node.style.removeProperty('--motion-state'); };
  }, []);
  return ref;
}
