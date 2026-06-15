import { HStack, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Dot = ({ delay }) => (
  <MotionBox
    w="7px"
    h="7px"
    borderRadius="full"
    bg="accent.solid"
    animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
    transition={{ duration: 0.9, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

/** Three bouncing dots shown while waiting for the assistant's reply. */
const TypingIndicator = () => (
  <HStack spacing="5px" px="14px" py="11px">
    <Dot delay={0} />
    <Dot delay={0.15} />
    <Dot delay={0.3} />
  </HStack>
);

export default TypingIndicator;
