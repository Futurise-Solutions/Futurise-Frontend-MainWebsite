import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Logo } from "../common";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

/**
 * Premium initial loader — brand wordmark entrance over an ambient glow, with a
 * rotating gradient accent ring and a determinate progress fill. Fast (~1.3s)
 * and intentional; fades itself out and never blocks real content.
 */
const LoadingIndicator = () => {
  return (
    <MotionFlex
      position="fixed"
      inset="0"
      direction="column"
      justify="center"
      align="center"
      bg="bg.canvas"
      zIndex={2000}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ambient brand glow */}
      <Box position="absolute" w="380px" h="380px" bg="rgba(123,108,255,0.22)" filter="blur(110px)" rounded="full" pointerEvents="none" />

      {/* rotating gradient accent ring */}
      <Box position="relative" w="64px" h="64px" mb={8}>
        <MotionBox
          position="absolute"
          inset={0}
          borderRadius="full"
          sx={{ background: "conic-gradient(from 0deg, transparent 0deg, #7b6cff 120deg, #b57bff 250deg, transparent 360deg)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        <Box position="absolute" inset="5px" borderRadius="full" bg="bg.canvas" />
        <Box position="absolute" inset={0} display="grid" placeItems="center">
          <Box w="10px" h="10px" borderRadius="full" bgGradient="linear(135deg, brand.400, violet.500)" />
        </Box>
      </Box>

      {/* brand wordmark */}
      <MotionBox
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        mb={7}
      >
        <Logo size="lg" to={null} />
      </MotionBox>

      {/* determinate progress fill */}
      <Box position="relative" w="190px" h="3px" bg="rgba(255,255,255,0.08)" borderRadius="full" overflow="hidden">
        <MotionBox
          position="absolute"
          left={0}
          top={0}
          h="100%"
          borderRadius="full"
          bgGradient="linear(90deg, brand.500, violet.500)"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </Box>

      <Text mt={5} fontSize="xs" letterSpacing="0.22em" textTransform="uppercase" color="text.faint">
        Crafting premium experiences
      </Text>
    </MotionFlex>
  );
};

export default LoadingIndicator;
