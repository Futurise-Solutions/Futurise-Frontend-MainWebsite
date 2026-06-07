import React from "react";
import { Box, keyframes } from "@chakra-ui/react";
import { Logo } from "../common";

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1.02); }
`;
const slide = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
`;

const LoadingIndicator = () => {
  return (
    <Box
      position="fixed"
      inset="0"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="bg.canvas"
      zIndex={2000}
    >
      <Box position="absolute" w="320px" h="320px" bg="rgba(123,108,255,0.2)" filter="blur(100px)" rounded="full" />
      <Box position="relative" animation={`${pulse} 1.8s ease-in-out infinite`} mb={8} sx={{ transform: "scale(1.4)" }}>
        <Logo size="lg" />
      </Box>
      <Box position="relative" w="180px" h="4px" bg="rgba(255,255,255,0.08)" borderRadius="full" overflow="hidden">
        <Box
          position="absolute"
          h="100%"
          w="40%"
          borderRadius="full"
          bgGradient="linear(90deg, brand.500, violet.500)"
          animation={`${slide} 1.2s ease-in-out infinite`}
        />
      </Box>
    </Box>
  );
};

export default LoadingIndicator;
