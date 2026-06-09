import { motion, useReducedMotion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const MotionBox = motion(Box);

/**
 * Smooth page-entrance transition. Re-keys on route change so each page
 * fades/eases in on navigation. Respects prefers-reduced-motion.
 */
const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  return (
    <MotionBox
      key={pathname}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionBox>
  );
};

export default PageTransition;
