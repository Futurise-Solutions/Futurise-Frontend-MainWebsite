import React from "react";
import {
  Box, Container, Flex, Heading, Text, Button, HStack, VStack, Stack, Avatar, AvatarGroup, Icon, Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import { FiArrowRight, FiStar, FiCpu } from "react-icons/fi";
import { FaReact, FaApple, FaAndroid, FaEthereum, FaFigma } from "react-icons/fa6";
import { propertyDashboard1 } from "../../assests";

const MotionBox = motion(Box);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

const float = {
  animate: { y: [0, -14, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } },
};

const techIcons = [
  { icon: FaReact, label: "React" },
  { icon: FaApple, label: "iOS" },
  { icon: FaAndroid, label: "Android" },
  { icon: FaEthereum, label: "Web3" },
  { icon: FiCpu, label: "AI" },
  { icon: FaFigma, label: "Design" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const { onOpen: openBooking } = useBooking();

  return (
    <Box position="relative" overflow="hidden">
      {/* ambient glow orbs */}
      <Box position="absolute" top="-10%" left="-5%" w="480px" h="480px" bg="rgba(123,108,255,0.22)" filter="blur(120px)" rounded="full" pointerEvents="none" />
      <Box position="absolute" top="20%" right="-8%" w="420px" h="420px" bg="rgba(181,123,255,0.2)" filter="blur(120px)" rounded="full" pointerEvents="none" />

      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 16, md: 24 }}>
        <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 14, lg: 10 }}>
          {/* Left copy */}
          <VStack align={{ base: "center", lg: "start" }} spacing={6} flex="1" textAlign={{ base: "center", lg: "left" }}>
            <MotionBox custom={0} variants={fadeUp} initial="hidden" animate="show">
              <HStack
                spacing={2}
                px={3}
                py={1.5}
                borderRadius="full"
                bg="rgba(180,160,255,0.1)"
                border="1px solid"
                borderColor="rgba(180,160,255,0.25)"
              >
                <Box w="7px" h="7px" borderRadius="full" bgGradient="linear(135deg, brand.400, violet.500)" />
                <Text fontSize="xs" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="accent.solid">
                  AI Agents · SaaS · Web · Mobile · Blockchain
                </Text>
              </HStack>
            </MotionBox>

            <MotionBox custom={1} variants={fadeUp} initial="hidden" animate="show">
              <Heading
                as="h1"
                fontSize={{ base: "40px", md: "58px", lg: "64px" }}
                lineHeight={1.05}
                letterSpacing="-0.03em"
                maxW="640px"
              >
                AI-powered apps &{" "}
                <Box as="span" className="gradient-text">SaaS that scale.</Box>
              </Heading>
            </MotionBox>

            <MotionBox custom={2} variants={fadeUp} initial="hidden" animate="show">
              <Text fontSize={{ base: "md", md: "xl" }} color="text.muted" maxW="540px" lineHeight={1.7}>
                We build AI agents, AI-integrated web apps, SaaS platforms, mobile apps, and Web3 products — end-to-end, from concept to scaled production.
              </Text>
            </MotionBox>

            <MotionBox custom={3} variants={fadeUp} initial="hidden" animate="show" w={{ base: "full", lg: "auto" }}>
              <Stack direction={{ base: "column", sm: "row" }} spacing={4} w={{ base: "full", sm: "auto" }}>
                <Button variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => navigate("/contact")}>
                  Start your project
                </Button>
                <Button variant="outlineGlow" size="lg" onClick={openBooking}>
                  Book appointment
                </Button>
              </Stack>
            </MotionBox>

            <MotionBox custom={4} variants={fadeUp} initial="hidden" animate="show" pt={2}>
              <HStack spacing={4} flexWrap="wrap" justify={{ base: "center", lg: "start" }}>
                <AvatarGroup size="sm" max={4}>
                  <Avatar src="https://i.pravatar.cc/100?img=12" />
                  <Avatar src="https://i.pravatar.cc/100?img=47" />
                  <Avatar src="https://i.pravatar.cc/100?img=33" />
                  <Avatar src="https://i.pravatar.cc/100?img=45" />
                </AvatarGroup>
                <Box>
                  <HStack spacing={1}>
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} as={FiStar} color="#FFB547" fill="#FFB547" boxSize={3.5} />
                    ))}
                    <Text fontSize="sm" fontWeight={600} ml={1}>4.9/5</Text>
                  </HStack>
                  <Text fontSize="sm" color="text.faint">Trusted by 45+ clients worldwide</Text>
                </Box>
              </HStack>
            </MotionBox>
          </VStack>

          {/* Right visual */}
          <MotionBox
            flex="1"
            w="full"
            maxW={{ base: "440px", lg: "none" }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box position="relative" maxW="520px" mx="auto">
              {/* main glass panel */}
              <Box
                borderRadius="28px"
                border="1px solid"
                borderColor="border.subtle"
                bg="rgba(255,255,255,0.04)"
                backdropFilter="blur(16px)"
                p={{ base: 6, md: 8 }}
                boxShadow="0 40px 80px -30px rgba(0,0,0,0.7)"
              >
                <HStack justify="space-between" mb={5}>
                  <HStack spacing={2}>
                    <Box w="11px" h="11px" rounded="full" bg="#ff5f57" />
                    <Box w="11px" h="11px" rounded="full" bg="#febc2e" />
                    <Box w="11px" h="11px" rounded="full" bg="#28c840" />
                  </HStack>
                  <Text fontSize="xs" color="text.faint">futurisesolutions.com</Text>
                </HStack>

                {/* real product screenshot — HOMIES property dashboard we built */}
                <Box borderRadius="14px" overflow="hidden" border="1px solid" borderColor="border.subtle" boxShadow="0 20px 50px -24px rgba(0,0,0,0.7)">
                  <Image
                    src={propertyDashboard1}
                    alt="HOMIES property management dashboard built by Futurise Solutions, showing income, expenses, and unit analytics"
                    w="full"
                    display="block"
                    loading="eager"
                  />
                </Box>
              </Box>

              {/* floating tech pill */}
              <MotionBox
                variants={float}
                animate="animate"
                position="absolute"
                top="-22px"
                right={{ base: "-6px", md: "-26px" }}
                px={4}
                py={3}
                borderRadius="16px"
                bg="rgba(13,13,22,0.9)"
                border="1px solid"
                borderColor="border.strong"
                backdropFilter="blur(10px)"
                boxShadow="0 20px 40px -16px rgba(0,0,0,0.6)"
              >
                <HStack spacing={3}>
                  {techIcons.map((t) => (
                    <Icon key={t.label} as={t.icon} boxSize={5} color="accent.solid" />
                  ))}
                </HStack>
              </MotionBox>

              {/* floating rating chip */}
              <MotionBox
                animate={{ y: [0, 12, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
                position="absolute"
                bottom="-24px"
                left={{ base: "-6px", md: "-28px" }}
                px={4}
                py={3}
                borderRadius="16px"
                bg="rgba(13,13,22,0.9)"
                border="1px solid"
                borderColor="border.strong"
                backdropFilter="blur(10px)"
                boxShadow="0 20px 40px -16px rgba(0,0,0,0.6)"
              >
                <HStack spacing={3}>
                  <Flex w="38px" h="38px" rounded="12px" bgGradient="linear(135deg, brand.500, violet.500)" align="center" justify="center">
                    <Icon as={FiArrowRight} color="white" />
                  </Flex>
                  <Box>
                    <Text fontSize="lg" fontWeight={700} lineHeight={1}>+40%</Text>
                    <Text fontSize="xs" color="text.faint">avg. engagement lift</Text>
                  </Box>
                </HStack>
              </MotionBox>
            </Box>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
};

export default HeroSection;
