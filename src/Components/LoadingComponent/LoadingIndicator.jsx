import React from 'react';
import { Box, Image, Flex, keyframes, Text } from '@chakra-ui/react';
import { logo } from '../../assests'; 

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const fadeInText = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoadingIndicator = () => {
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      bg="rgba(0, 0, 0, 0.7)"
      zIndex="9999"
      animation={`${fadeIn} 1s ease-in-out`}
      flexDirection="column"
    >
      <Box textAlign="center" mb={{ base: "10px", md: "20px" }}>
        <Image
          src={logo}
          w={{ base: "100px", md: "150px", lg: "200px", xl: "300px" }}
          h={{ base: "50px", md: "75px", lg: "100px", xl: "150px" }}
          animation={`${rotate} 2s linear infinite, ${bounce} 2s ease-in-out infinite`}
          background="transparent"
        />
      </Box>
      <Flex
        gap={{ base: "5px", md: "10px" }}
        flexDirection={{ base: "column", sm: "row" }}
        alignItems="center"
      >
        <Text
          color="white"
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          animation={`${slideInLeft} 3s ease-in-out`}
        >
          We shape your
        </Text>
        <Text
          color="white"
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          animation={`${fadeInText} 3s ease-in-out`}
        >
          ideas
        </Text>
        <Text
          color="white"
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          animation={`${slideInRight} 3s ease-in-out`}
        >
          into creativity
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoadingIndicator;
