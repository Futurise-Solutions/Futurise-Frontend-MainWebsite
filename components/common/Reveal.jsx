'use client'

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

const MotionBox = motion.create(Box);

const directions = {
  up: { y: 32, x: 0 },
  down: { y: -32, x: 0 },
  left: { x: 48, y: 0 },
  right: { x: -48, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered reveal. Wrap any block to fade/slide it in once on view.
 * <Reveal delay={0.1} from="up">...</Reveal>
 */
const Reveal = ({ children, from = "up", delay = 0, duration = 0.6, once = true, ...rest }) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const visible = useInView(ref, { once, amount: 0.2 });
  // eslint-disable-next-line react-hooks/set-state-in-effect -- mount flag: server and first client render show the final state, the slide offset applies only after mount
  useEffect(() => { setReady(true); }, []);
  const offset = directions[from] || directions.up;
  return (
    <MotionBox
      ref={ref}
      initial={false}
      animate={!ready || reduced || visible ? { opacity: 1, x: 0, y: 0 } : { opacity: 1, ...offset }}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionBox>
  );
};

export default Reveal;
