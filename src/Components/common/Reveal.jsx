import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

const MotionBox = motion(Box);

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
  const offset = directions[from] || directions.up;
  return (
    <MotionBox
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionBox>
  );
};

export default Reveal;
