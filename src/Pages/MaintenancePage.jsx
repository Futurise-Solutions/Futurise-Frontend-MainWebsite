import React from "react";
import { Box, VStack, Image, Flex, Icon, HStack } from "@chakra-ui/react";
import { logo, glowBg } from "../assests";
import { CustomText } from "../utils/Texts";
import { 
  CheckCircleIcon, 
  TimeIcon, 
  SettingsIcon,
  ArrowForwardIcon
} from "@chakra-ui/icons";

const MaintenancePage = () => {
  return (
    <Box
      minH="100vh"
      h="100vh"
      w="100%"
      bg="black"
      color="white"
      position="relative"
      overflow="hidden"
    >
      {/* Animated gradient mesh background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="radial-gradient(circle at 20% 30%, rgba(7, 171, 232, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(7, 171, 232, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(7, 171, 232, 0.08) 0%, transparent 50%)"
        zIndex={0}
        animation="gradientShift 15s ease infinite"
        sx={{
          "@keyframes gradientShift": {
            "0%, 100%": {
              opacity: 1,
              transform: "scale(1)",
            },
            "50%": {
              opacity: 0.8,
              transform: "scale(1.1)",
            },
          },
        }}
      />

      {/* Animated geometric shapes */}
      <Box
        position="absolute"
        top="10%"
        right="5%"
        w={{ base: "80px", md: "120px", lg: "200px" }}
        h={{ base: "80px", md: "120px", lg: "200px" }}
        border="2px solid rgba(7, 171, 232, 0.2)"
        borderRadius="20px"
        transform="rotate(45deg)"
        display={{ base: "none", md: "block" }}
        animation="shapeRotate1 20s linear infinite"
        sx={{
          "@keyframes shapeRotate1": {
            "0%": { transform: "rotate(45deg) translate(0, 0)" },
            "50%": { transform: "rotate(225deg) translate(20px, -20px)" },
            "100%": { transform: "rotate(405deg) translate(0, 0)" },
          },
        }}
      />
      <Box
        position="absolute"
        bottom="15%"
        left="8%"
        w={{ base: "60px", md: "100px", lg: "150px" }}
        h={{ base: "60px", md: "100px", lg: "150px" }}
        border="2px solid rgba(7, 171, 232, 0.15)"
        borderRadius="50%"
        display={{ base: "none", sm: "block" }}
        animation="shapePulse 8s ease-in-out infinite"
        sx={{
          "@keyframes shapePulse": {
            "0%, 100%": {
              transform: "scale(1)",
              opacity: 0.3,
            },
            "50%": {
              transform: "scale(1.3)",
              opacity: 0.6,
            },
          },
        }}
      />
      <Box
        position="absolute"
        top="50%"
        right="15%"
        w={{ base: "50px", md: "70px", lg: "100px" }}
        h={{ base: "50px", md: "70px", lg: "100px" }}
        border="2px solid rgba(7, 171, 232, 0.2)"
        transform="rotate(30deg)"
        display={{ base: "none", md: "block" }}
        animation="shapeRotate2 15s linear infinite"
        sx={{
          "@keyframes shapeRotate2": {
            "0%": { transform: "rotate(30deg)" },
            "100%": { transform: "rotate(390deg)" },
          },
        }}
      />

      {/* Animated wave lines */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        w="100%"
        h="200px"
        overflow="hidden"
        zIndex={0}
      >
        <Box
          w="200%"
          h="100%"
          bg="linear-gradient(90deg, transparent, rgba(7, 171, 232, 0.1), transparent)"
          animation="waveMove 10s linear infinite"
          sx={{
            "@keyframes waveMove": {
              "0%": { transform: "translateX(-50%)" },
              "100%": { transform: "translateX(0%)" },
            },
          }}
        />
      </Box>
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="150px"
        overflow="hidden"
        zIndex={0}
      >
        <Box
          w="200%"
          h="100%"
          bg="linear-gradient(90deg, transparent, rgba(7, 171, 232, 0.08), transparent)"
          animation="waveMove 12s linear infinite reverse"
          sx={{
            "@keyframes waveMove": {
              "0%": { transform: "translateX(-50%)" },
              "100%": { transform: "translateX(0%)" },
            },
          }}
        />
      </Box>

      {/* Glow background image with overlay */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="100%"
        h="100%"
        opacity={0.25}
        zIndex={0}
      >
        <Image
          src={glowBg}
          alt="glow background"
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>

      {/* Animated grid pattern with rotation */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        opacity={0.04}
        zIndex={1}
        backgroundImage="linear-gradient(rgba(7, 171, 232, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(7, 171, 232, 0.1) 1px, transparent 1px)"
        backgroundSize="80px 80px"
        animation="gridRotate 30s linear infinite"
        sx={{
          "@keyframes gridRotate": {
            "0%": {
              transform: "rotate(0deg) translate(0, 0)",
            },
            "100%": {
              transform: "rotate(360deg) translate(80px, 80px)",
            },
          },
        }}
      />

      {/* Logo at top left */}
      <Box
        position="absolute"
        top={{ base: 3, md: 5, lg: 8 }}
        left={{ base: 3, md: 5, lg: 8 }}
        zIndex={3}
        animation="logoGlow 3s ease-in-out infinite"
        sx={{
          "@keyframes logoGlow": {
            "0%, 100%": {
              filter: "drop-shadow(0 0 20px rgba(7, 171, 232, 0.5))",
            },
            "50%": {
              filter: "drop-shadow(0 0 40px rgba(7, 171, 232, 0.9))",
            },
          },
        }}
      >
        <Image
          src={logo}
          alt="Logo"
          w={{ base: "120px", sm: "140px", md: "160px", lg: "180px" }}
          h="auto"
        />
      </Box>

      {/* Main Content Container */}
      <Box
        w="100%"
        maxW={{ base: "100%", lg: "1400px" }}
        mx="auto"
        px={{ base: 4, sm: 5, md: 8, lg: 12 }}
        py={{ base: "90px", sm: "100px", md: "80px", lg: 10 }}
        position="relative"
        zIndex={2}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          w="100%"
          direction={{ base: "column", md: "column", lg: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={{ base: 6, sm: 7, md: 6, lg: 12 }}
        >
        {/* Left Side - Main Content */}
        <VStack
          spacing={{ base: 3.5, sm: 4, md: 4, lg: 5 }}
          textAlign={{ base: "center", md: "center", lg: "left" }}
          alignItems={{ base: "center", md: "center", lg: "flex-start" }}
          maxW={{ base: "100%", sm: "95%", md: "700px", lg: "50%" }}
          flex="1"
          w="100%"
        >
          {/* Main Heading */}
          <Box position="relative" w="100%">
            <CustomText
              variant="subheading6"
              styles={{
                fontFamily: "Oxanium",
                background: "linear-gradient(135deg, #FFFFFF 0%, #07ABE8 50%, #8ADEFE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: { base: "28px", sm: "34px", md: "40px", lg: "52px" },
                lineHeight: { base: "34px", sm: "40px", md: "46px", lg: "58px" },
                fontWeight: 700,
              }}
            >
              We're Updating
              <br />
              Our Website
            </CustomText>
            <Box
              position="absolute"
              bottom="-10px"
              left={{ base: "50%", md: "50%", lg: "0" }}
              transform={{ base: "translateX(-50%)", md: "translateX(-50%)", lg: "none" }}
              w={{ base: "140px", sm: "160px", md: "170px", lg: "180px" }}
              h={{ base: "3px", md: "3px", lg: "4px" }}
              bg="linear-gradient(90deg, #07ABE8, #8ADEFE, #07ABE8)"
              borderRadius="2px"
              animation="lineShimmer 2s ease-in-out infinite"
              sx={{
                "@keyframes lineShimmer": {
                  "0%, 100%": {
                    opacity: 0.8,
                  },
                  "50%": {
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>

          {/* Description */}
          <Box
            mt={{ base: 6, sm: 7, md: 8, lg: 10 }}
            w="100%"
          >
            <CustomText
              variant="callout6"
              styles={{
                fontFamily: "Oxanium",
                color: "rgba(255, 255, 255, 0.85)",
                maxWidth: { base: "100%", sm: "95%", md: "600px", lg: "500px" },
                lineHeight: { base: "1.6", sm: "1.7", md: "1.75", lg: "1.8" },
                fontSize: { base: "14px", sm: "15px", md: "16px", lg: "20px" },
                px: { base: 1, sm: 0, md: 2 },
              }}
            >
              We're enhancing our website to deliver improved services and a seamless experience. 
              Please check back soon. We appreciate your understanding.
            </CustomText>
          </Box>

          {/* Status Indicators */}
          <HStack
            spacing={{ base: 2.5, sm: 3, md: 3.5, lg: 4 }}
            mt={{ base: 5, sm: 6, md: 6, lg: 10 }}
            mb={{ base: 0, md: 0, lg: -10 }}
            flexWrap="wrap"
            justify={{ base: "center", md: "center", lg: "flex-start" }}
            w="100%"
            px={{ base: 2, sm: 0, md: 0 }}
          >
            {[
              { icon: SettingsIcon, label: "Updating" },
              { icon: CheckCircleIcon, label: "Improving" },
              { icon: TimeIcon, label: "Back Soon" },
            ].map((item, index) => (
              <Flex
                key={index}
                alignItems="center"
                gap={{ base: 1.5, sm: 2 }}
                px={{ base: 2.5, sm: 3 }}
                py={{ base: 1.5, sm: 2 }}
                borderRadius="lg"
                bg="rgba(7, 171, 232, 0.1)"
                border="1px solid rgba(7, 171, 232, 0.3)"
                backdropFilter="blur(5px)"
                transition="all 0.3s ease"
                _hover={{
                  bg: "rgba(7, 171, 232, 0.2)",
                  borderColor: "#07ABE8",
                  transform: "translateY(-2px)",
                }}
              >
                <Icon
                  as={item.icon}
                  w={{ base: 3.5, sm: 4 }}
                  h={{ base: 3.5, sm: 4 }}
                  color="#07ABE8"
                />
                <CustomText
                  variant="subheading3"
                  styles={{
                    fontFamily: "Oxanium",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: { base: "11px", sm: "12px" },
                  }}
                >
                  {item.label}
                </CustomText>
              </Flex>
            ))}
          </HStack>
        </VStack>

        {/* Right Side - Visual Elements & Info Cards */}
        <VStack
          spacing={{ base: 4, md: 4, lg: 4 }}
          mt={{ base: 2, sm: 3, md: 4, lg: -10 }}
          maxW={{ base: "100%", sm: "95%", md: "90%", lg: "45%" }}
          flex="1"
          alignItems={{ base: "center", lg: "flex-end" }}
          w="100%"
        >
          {/* Large Info Card */}
          <Box
            p={{ base: 4, sm: 5, md: 6 }}
            borderRadius="2xl"
            bg="rgba(7, 171, 232, 0.1)"
            border="1px solid rgba(7, 171, 232, 0.3)"
            backdropFilter="blur(15px)"
            w="100%"
            maxW={{ base: "100%", sm: "420px", md: "400px", lg: "400px" }}
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              h: "2px",
              bg: "linear-gradient(90deg, transparent, #07ABE8, transparent)",
              animation: "shimmer 3s ease-in-out infinite",
            }}
            sx={{
              "@keyframes shimmer": {
                "0%, 100%": { opacity: 0.5 },
                "50%": { opacity: 1 },
              },
            }}
          >
            <VStack spacing={{ base: 2.5, sm: 3, md: 3 }} alignItems="flex-start" w="100%">
              <Flex alignItems="center" gap={{ base: 2.5, sm: 3 }} mb={{ base: 1, sm: 2 }}>
                <Box
                  w={{ base: "10px", sm: "12px" }}
                  h={{ base: "10px", sm: "12px" }}
                  borderRadius="50%"
                  bg="#07ABE8"
                  animation="pulseDot 2s ease-in-out infinite"
                  sx={{
                    "@keyframes pulseDot": {
                      "0%, 100%": {
                        opacity: 1,
                        transform: "scale(1)",
                        boxShadow: "0 0 0 0 rgba(7, 171, 232, 0.7)",
                      },
                      "50%": {
                        opacity: 0.7,
                        transform: "scale(1.2)",
                        boxShadow: "0 0 0 8px rgba(7, 171, 232, 0)",
                      },
                    },
                  }}
                />
                <CustomText
                  variant="subheading4"
                  styles={{
                    fontFamily: "Oxanium",
                    color: "#07ABE8",
                    fontSize: { base: "13px", sm: "14px" },
                    fontWeight: 600,
                  }}
                >
                  Website Status
                </CustomText>
              </Flex>
              <CustomText
                variant="callout6"
                styles={{
                  fontFamily: "Oxanium",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: { base: "13px", sm: "14px", md: "15px" },
                  lineHeight: { base: "1.6", sm: "1.65", md: "1.7" },
                  width: "100%",
                }}
              >
                We're updating our website to better serve you. Our services remain available, and we'll be back online shortly.
              </CustomText>
              <Flex alignItems="center" gap={2} mt={{ base: 1.5, sm: 2 }}>
                <Icon as={ArrowForwardIcon} w={{ base: 3.5, sm: 4 }} h={{ base: 3.5, sm: 4 }} color="#07ABE8" />
                <CustomText
                  variant="subheading3"
                  styles={{
                    fontFamily: "Oxanium",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: { base: "11px", sm: "12px" },
                  }}
                >
                  We'll be back soon
                </CustomText>
              </Flex>
            </VStack>
          </Box>
        </VStack>
        </Flex>
      </Box>

      {/* Enhanced floating particles with trails */}
      {[
        { top: "15%", left: "10%", delay: "0s", duration: "8s", sizeBase: "4px", sizeMd: "6px", sizeLg: "8px" },
        { top: "25%", left: "85%", delay: "1s", duration: "9s", sizeBase: "3px", sizeMd: "5px", sizeLg: "6px" },
        { top: "60%", left: "12%", delay: "2s", duration: "7s", sizeBase: "4px", sizeMd: "5px", sizeLg: "7px" },
        { top: "70%", left: "88%", delay: "1.5s", duration: "8.5s", sizeBase: "3px", sizeMd: "5px", sizeLg: "6px" },
        { top: "40%", left: "5%", delay: "0.5s", duration: "9.5s", sizeBase: "3px", sizeMd: "4px", sizeLg: "5px" },
        { top: "50%", left: "95%", delay: "2.5s", duration: "7.5s", sizeBase: "4px", sizeMd: "5px", sizeLg: "7px" },
      ].map((particle, i) => (
        <Box
          key={i}
          position="absolute"
          w={{ base: particle.sizeBase, md: particle.sizeMd, lg: particle.sizeLg }}
          h={{ base: particle.sizeBase, md: particle.sizeMd, lg: particle.sizeLg }}
          bg="#07ABE8"
          borderRadius="50%"
          opacity={0.6}
          top={particle.top}
          left={particle.left}
          display={{ base: i < 4 ? "block" : "none", md: "block" }}
          animation={`particleOrbit ${particle.duration} ease-in-out infinite`}
          animationDelay={particle.delay}
          filter="drop-shadow(0 0 10px rgba(7, 171, 232, 0.9))"
          sx={{
            "@keyframes particleOrbit": {
              "0%, 100%": {
                transform: "translate(0, 0) rotate(0deg)",
                opacity: 0.6,
              },
              "25%": {
                transform: "translate(20px, -20px) rotate(90deg)",
                opacity: 0.4,
              },
              "50%": {
                transform: "translate(0, -40px) rotate(180deg)",
                opacity: 0.2,
              },
              "75%": {
                transform: "translate(-20px, -20px) rotate(270deg)",
                opacity: 0.4,
              },
            },
          }}
        />
      ))}

      {/* Corner accent lines */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w={{ base: "60px", sm: "80px", md: "100px" }}
        h={{ base: "60px", sm: "80px", md: "100px" }}
        borderTop="2px solid rgba(7, 171, 232, 0.3)"
        borderLeft="2px solid rgba(7, 171, 232, 0.3)"
        zIndex={1}
      />
      <Box
        position="absolute"
        bottom={0}
        right={0}
        w={{ base: "60px", sm: "80px", md: "100px" }}
        h={{ base: "60px", sm: "80px", md: "100px" }}
        borderBottom="2px solid rgba(7, 171, 232, 0.3)"
        borderRight="2px solid rgba(7, 171, 232, 0.3)"
        zIndex={1}
      />
    </Box>
  );
};

export default MaintenancePage;
