import React from "react";
import { Box, Flex, HStack, VStack, Text, Icon, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiSmartphone, FiGlobe, FiTrendingUp, FiShield, FiZap,
  FiCheckCircle, FiLayers, FiPenTool,
} from "react-icons/fi";

const MotionBox = motion(Box);

/* Shared building blocks ------------------------------------------------ */

// Frosted browser/app chrome wrapper
const Frame = ({ children, label, ...rest }) => (
  <Box
    borderRadius="20px"
    border="1px solid"
    borderColor="border.strong"
    bg="rgba(13,13,22,0.82)"
    backdropFilter="blur(14px)"
    boxShadow="0 40px 90px -36px rgba(0,0,0,0.85)"
    overflow="hidden"
    {...rest}
  >
    <HStack px={4} py={3} borderBottom="1px solid" borderColor="border.subtle" spacing={3}>
      <HStack spacing={1.5}>
        <Box w="9px" h="9px" rounded="full" bg="#ff5f57" />
        <Box w="9px" h="9px" rounded="full" bg="#febc2e" />
        <Box w="9px" h="9px" rounded="full" bg="#28c840" />
      </HStack>
      {label && (
        <Box flex="1">
          <Text
            fontSize="11px"
            color="text.faint"
            textAlign="center"
            bg="rgba(255,255,255,0.04)"
            borderRadius="full"
            py={1}
            px={3}
            noOfLines={1}
          >
            {label}
          </Text>
        </Box>
      )}
    </HStack>
    <Box p={4}>{children}</Box>
  </Box>
);

const Bar = ({ w = "100%", h = "10px", grad = false, ...rest }) => (
  <Box
    w={w}
    h={h}
    borderRadius="full"
    bg={grad ? undefined : "rgba(255,255,255,0.08)"}
    bgGradient={grad ? "linear(90deg, brand.500, violet.500)" : undefined}
    {...rest}
  />
);

const FloatChip = ({ icon, title, sub, animate, ...rest }) => (
  <MotionBox
    position="absolute"
    px={4}
    py={3}
    borderRadius="16px"
    bg="rgba(13,13,22,0.92)"
    border="1px solid"
    borderColor="border.strong"
    backdropFilter="blur(10px)"
    boxShadow="0 20px 40px -16px rgba(0,0,0,0.7)"
    animate={animate || { y: [0, -12, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    {...rest}
  >
    <HStack spacing={3}>
      <Flex w="38px" h="38px" rounded="12px" align="center" justify="center"
        bgGradient="linear(135deg, brand.500, violet.500)" flexShrink={0}>
        <Icon as={icon} color="white" boxSize={5} />
      </Flex>
      <Box>
        <Text fontSize="md" fontWeight={700} lineHeight={1.1}>{title}</Text>
        {sub && <Text fontSize="11px" color="text.faint">{sub}</Text>}
      </Box>
    </HStack>
  </MotionBox>
);

/* Per-service compositions --------------------------------------------- */

const WebVisual = () => (
  <Box position="relative" maxW="500px" mx="auto">
    <Frame label="yourbrand.com">
      <Bar w="40%" h="8px" mb={4} />
      <Box borderRadius="12px" h="120px" bgGradient="linear(135deg, rgba(123,108,255,0.25), rgba(181,123,255,0.18))" mb={4} position="relative" overflow="hidden">
        <Box position="absolute" top="14px" left="14px"><Bar w="120px" h="10px" grad /></Box>
        <Box position="absolute" top="34px" left="14px"><Bar w="80px" h="7px" /></Box>
      </Box>
      <SimpleGrid columns={3} spacing={3}>
        {[0, 1, 2].map((i) => (
          <Box key={i} borderRadius="10px" bg="rgba(255,255,255,0.04)" border="1px solid" borderColor="border.subtle" p={3}>
            <Box w="22px" h="22px" rounded="8px" bgGradient="linear(135deg, brand.500, violet.500)" mb={2} />
            <Bar w="100%" h="6px" mb={1.5} />
            <Bar w="60%" h="6px" />
          </Box>
        ))}
      </SimpleGrid>
    </Frame>
    {/* overlapping responsive phone */}
    <MotionBox
      position="absolute" bottom="-28px" right="-14px" w="92px"
      animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <Box borderRadius="16px" border="1px solid" borderColor="border.strong" bg="rgba(13,13,22,0.95)" p={2} boxShadow="0 24px 50px -20px rgba(0,0,0,0.8)">
        <Box borderRadius="9px" h="110px" bgGradient="linear(160deg, rgba(123,108,255,0.3), rgba(181,123,255,0.18))" p={2}>
          <Bar w="70%" h="6px" mb={2} />
          <Bar w="100%" h="22px" mb={2} grad opacity={0.8} />
          <Bar w="100%" h="22px" bg="rgba(255,255,255,0.06)" />
        </Box>
      </Box>
    </MotionBox>
    <FloatChip icon={FiGlobe} title="100" sub="Lighthouse score" top="-22px" left="-18px"
      animate={{ y: [0, 10, 0] }} />
  </Box>
);

const AppVisual = () => {
  const Phone = ({ tint, ...rest }) => (
    <Box borderRadius="26px" border="1px solid" borderColor="border.strong" bg="rgba(13,13,22,0.95)"
      p={2.5} boxShadow="0 30px 60px -24px rgba(0,0,0,0.85)" w="150px" {...rest}>
      <Box w="34px" h="4px" rounded="full" bg="rgba(255,255,255,0.18)" mx="auto" mb={2} />
      <Box borderRadius="18px" h="230px" overflow="hidden" bgGradient={tint} p={3}>
        <Bar w="55%" h="7px" mb={3} />
        <Box borderRadius="12px" h="70px" bg="rgba(255,255,255,0.1)" mb={3} />
        <HStack spacing={2} mb={3}>
          <Box flex="1" borderRadius="10px" h="40px" bg="rgba(255,255,255,0.08)" />
          <Box flex="1" borderRadius="10px" h="40px" bg="rgba(255,255,255,0.08)" />
        </HStack>
        <Bar w="100%" h="9px" grad mb={2} />
        <Bar w="80%" h="7px" />
      </Box>
    </Box>
  );
  return (
    <Box position="relative" maxW="440px" mx="auto" h="320px">
      <MotionBox position="absolute" left="6%" top="40px" animate={{ y: [0, 12, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
        <Phone tint="linear(160deg, rgba(99,80,230,0.45), rgba(157,78,221,0.3))" transform="rotate(-6deg)" />
      </MotionBox>
      <MotionBox position="absolute" right="6%" top="0" animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <Phone tint="linear(160deg, rgba(123,108,255,0.5), rgba(181,123,255,0.32))" transform="rotate(5deg)" />
      </MotionBox>
      <FloatChip icon={FiSmartphone} title="iOS + Android" sub="One codebase" bottom="2px" left="50%"
        style={{ x: "-50%" }} animate={{ y: [0, -10, 0] }} />
    </Box>
  );
};

const UiUxVisual = () => (
  <Box position="relative" maxW="500px" mx="auto">
    <Frame label="Futurise — Design System">
      <Flex gap={3}>
        <VStack align="stretch" spacing={2} w="64px">
          {["brand.500", "violet.500", "rgba(255,255,255,0.12)"].map((c, i) => (
            <Box key={i} h="34px" borderRadius="10px" bg={c.includes("rgba") ? c : undefined} bgGradient={!c.includes("rgba") ? `linear(135deg, ${c}, ${c})` : undefined} />
          ))}
          <Box h="34px" borderRadius="10px" border="1px dashed" borderColor="border.strong" />
        </VStack>
        <Box flex="1" borderRadius="12px" border="1px solid" borderColor="border.subtle" bg="rgba(255,255,255,0.02)" p={3} position="relative">
          <Bar w="50%" h="9px" mb={3} grad />
          <Bar w="100%" h="6px" mb={2} />
          <Bar w="85%" h="6px" mb={4} />
          <Box borderRadius="10px" h="60px" bgGradient="linear(135deg, rgba(123,108,255,0.28), rgba(181,123,255,0.18))" mb={3} />
          <HStack spacing={2}>
            <Box flex="1" h="26px" borderRadius="full" bgGradient="linear(135deg, brand.500, violet.500)" />
            <Box flex="1" h="26px" borderRadius="full" border="1px solid" borderColor="border.strong" />
          </HStack>
          {/* cursor */}
          <Icon as={FiPenTool} position="absolute" bottom="12px" right="14px" color="accent.solid" boxSize={5} transform="rotate(-10deg)" />
        </Box>
      </Flex>
    </Frame>
    <FloatChip icon={FiLayers} title="Design system" sub="Reusable components" top="-22px" right="-16px"
      animate={{ y: [0, 11, 0] }} />
  </Box>
);

const BlockchainVisual = () => {
  // decentralized node graph
  const nodes = [
    { x: 50, y: 18 }, { x: 18, y: 42 }, { x: 82, y: 40 },
    { x: 32, y: 78 }, { x: 68, y: 80 }, { x: 50, y: 52 },
  ];
  const edges = [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [0, 1], [0, 2], [3, 4]];
  return (
    <Box position="relative" maxW="460px" mx="auto" h="320px">
      <Box position="absolute" inset={0} borderRadius="24px" border="1px solid" borderColor="border.subtle"
        bg="rgba(13,13,22,0.6)" backdropFilter="blur(10px)" overflow="hidden">
        <Box position="absolute" top="-20%" left="20%" w="240px" h="240px" bg="rgba(123,108,255,0.2)" filter="blur(70px)" />
        <Box as="svg" viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke="rgba(180,160,255,0.35)" strokeWidth="0.4" />
          ))}
        </Box>
        {nodes.map((n, i) => (
          <MotionBox key={i} position="absolute" left={`${n.x}%`} top={`${n.y}%`}
            transform="translate(-50%,-50%)"
            w={i === 5 ? "46px" : "30px"} h={i === 5 ? "46px" : "30px"} rounded="full"
            bgGradient="linear(135deg, brand.500, violet.500)"
            display="flex" alignItems="center" justifyContent="center"
            boxShadow="0 0 22px rgba(123,108,255,0.6)"
            animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
          >
            {i === 5 && <Icon as={FiShield} color="white" boxSize={5} />}
          </MotionBox>
        ))}
      </Box>
      <FloatChip icon={FiZap} title="Decentralized" sub="Multi-chain ready" bottom="-14px" right="-14px"
        animate={{ y: [0, -10, 0] }} />
    </Box>
  );
};

const SmartContractVisual = () => (
  <Box position="relative" maxW="500px" mx="auto">
    <Frame label="contract.sol — audited">
      <VStack align="stretch" spacing={2.5} fontFamily="mono">
        {[
          { w: "55%", c: "violet.400" },
          { w: "78%", c: null },
          { w: "65%", c: "brand.400" },
          { w: "85%", c: null },
          { w: "45%", c: "violet.400" },
        ].map((l, i) => (
          <HStack key={i} spacing={3}>
            <Text fontSize="11px" color="text.faint" w="14px" textAlign="right">{i + 1}</Text>
            <Box h="9px" w={l.w} borderRadius="full"
              bg={l.c ? undefined : "rgba(255,255,255,0.09)"}
              bgGradient={l.c ? `linear(90deg, ${l.c}, ${l.c})` : undefined}
              opacity={l.c ? 0.7 : 1} />
          </HStack>
        ))}
      </VStack>
      <Flex mt={4} pt={3} borderTop="1px solid" borderColor="border.subtle" align="center" justify="space-between">
        <HStack spacing={2} color="accent.solid">
          <Icon as={FiCheckCircle} />
          <Text fontSize="13px" fontWeight={600}>Security audit passed</Text>
        </HStack>
        <Text fontSize="12px" color="text.faint">gas −34%</Text>
      </Flex>
    </Frame>
    <FloatChip icon={FiShield} title="Audited" sub="0 critical issues" top="-22px" left="-16px"
      animate={{ y: [0, 11, 0] }} />
  </Box>
);

const MarketingVisual = () => (
  <Box position="relative" maxW="500px" mx="auto">
    <Frame label="Growth — last 30 days">
      <SimpleGrid columns={3} spacing={3} mb={4}>
        {[{ k: "Traffic", v: "+128%" }, { k: "Leads", v: "+64%" }, { k: "ROAS", v: "4.2×" }].map((m) => (
          <Box key={m.k} borderRadius="12px" bg="rgba(255,255,255,0.03)" border="1px solid" borderColor="border.subtle" p={3}>
            <Text fontSize="11px" color="text.faint" mb={1}>{m.k}</Text>
            <Text fontSize="lg" fontWeight={700} className="gradient-text">{m.v}</Text>
          </Box>
        ))}
      </SimpleGrid>
      {/* rising chart */}
      <Box position="relative" h="120px" borderRadius="12px" bg="rgba(255,255,255,0.02)" border="1px solid" borderColor="border.subtle" overflow="hidden" p={2}>
        <Box as="svg" viewBox="0 0 100 50" width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mkt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(123,108,255,0.5)" />
              <stop offset="100%" stopColor="rgba(123,108,255,0)" />
            </linearGradient>
          </defs>
          <path d="M0,42 L18,36 L36,38 L54,24 L72,18 L100,4 L100,50 L0,50 Z" fill="url(#mkt)" />
          <path d="M0,42 L18,36 L36,38 L54,24 L72,18 L100,4" fill="none" stroke="#b4a0ff" strokeWidth="1.2" />
        </Box>
      </Box>
    </Frame>
    <FloatChip icon={FiTrendingUp} title="+128%" sub="Organic traffic" bottom="-20px" right="-14px"
      animate={{ y: [0, -11, 0] }} />
  </Box>
);

/* Router ---------------------------------------------------------------- */

const VISUALS = {
  "web-development": WebVisual,
  "app-development": AppVisual,
  "ui-ux-design": UiUxVisual,
  "blockchain-development": BlockchainVisual,
  "smart-contract": SmartContractVisual,
  "digital-marketing": MarketingVisual,
};

const ServiceHeroVisual = ({ service }) => {
  const Visual = VISUALS[service] || WebVisual;
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      w="full"
    >
      <Visual />
    </MotionBox>
  );
};

export default ServiceHeroVisual;
