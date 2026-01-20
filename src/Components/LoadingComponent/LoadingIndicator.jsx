import React from "react";
import { Box, Image, keyframes, Progress } from "@chakra-ui/react";
import logoLoading from "../../assests/logoLoading.png"; // Replace with the actual path to your logo

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const progressAnimation = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const LoadingIndicator = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="#000000"
      zIndex="1000"
    // border={"1px solid red"}
    >
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="300px"
        h="100px"
        mb="20px"
        animation={`${glow} 2s infinite alternate`}
        borderRadius={"0.5rem"}
      // border={"5px solid white"}
      >
        <Image src={logoLoading} alt="Logo" />
      </Box>
      <Box
        position="relative"
        w="30%"
        h="10px"
        bg="#e9e4e4"
        borderRadius="5px"
        overflow="hidden"
      // border={"5px solid teal"}

      >
        <Box
          position="absolute"
          h="100%"
          bg="skyblue"
          animation={`${progressAnimation} 3s ease-in-out infinite`}
        // border={"2px solid yellow"}

        />
      </Box>
    </Box>
  );
};

export default LoadingIndicator;
