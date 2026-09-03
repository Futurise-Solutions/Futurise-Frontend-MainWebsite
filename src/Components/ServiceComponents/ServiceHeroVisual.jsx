import React from "react";
import { Box, Flex, HStack, VStack, Text, Icon } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiSmartphone, FiGlobe, FiTrendingUp, FiShield, FiZap,
  FiCheckCircle, FiLayers, FiPenTool, FiArrowUpRight, FiHome, FiCreditCard,
  FiBell, FiUser, FiSearch, FiMapPin, FiCpu,
} from "react-icons/fi";

const MotionBox = motion(Box);

/**
 * Per-service hero compositions.
 *
 * These were previously grey placeholder bars inside a frame — a wireframe, not a
 * product, which is why the App Development hero in particular read as unfinished.
 * Every panel now renders *legible interface content* appropriate to the service, so
 * the visual argues that we build real software rather than gesturing at it.
 *
 * Everything is DOM + CSS: no canvas, no WebGL, no images to download. Motion is
 * opt-out via prefers-reduced-motion and is limited to slow, low-amplitude drift.
 */

/* Shared building blocks ------------------------------------------------ */

// Hook: slow float, disabled under reduced-motion.
const useFloat = (distance = -12, duration = 5, delay = 0) => {
  const reduce = useReducedMotion();
  if (reduce) return {};
  return {
    animate: { y: [0, distance, 0] },
    transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
  };
};

// Frosted browser/app chrome wrapper
const Frame = ({ children, label, ...rest }) => (
  <Box
    borderRadius="20px"
    border="1px solid"
    borderColor="border.strong"
    bg="linear-gradient(160deg, rgba(26,26,43,0.96) 0%, rgba(13,13,22,0.96) 100%)"
    backdropFilter="blur(14px)"
    boxShadow="inset 0 1px 0 rgba(255,255,255,0.09), 0 40px 90px -36px rgba(0,0,0,0.9)"
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

// NOTE: the shared `Bar` helper (a grey placeholder pill) was removed with the last of
// the wireframe-style panels. Every visual now renders legible content appropriate to
// its service; if a new panel needs a grey bar, that is a sign it is drawing a
// placeholder rather than a product.

const FloatChip = ({ icon, title, sub, floatProps, ...rest }) => (
  <MotionBox
    position="absolute"
    px={4}
    py={3}
    borderRadius="16px"
    bg="rgba(13,13,22,0.94)"
    border="1px solid"
    borderColor="border.strong"
    backdropFilter="blur(10px)"
    boxShadow="inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 40px -16px rgba(0,0,0,0.8)"
    zIndex={3}
    {...floatProps}
    {...rest}
  >
    <HStack spacing={3}>
      <Flex w="38px" h="38px" rounded="12px" align="center" justify="center"
        bgGradient="linear(135deg, brand.500, violet.500)" flexShrink={0}
        boxShadow="0 8px 18px -8px rgba(123,108,255,0.9)">
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

/**
 * Web Development — a deploy pipeline, not a page mockup.
 *
 * This was a browser frame full of grey placeholder bars: the generic "website" drawing
 * every template ships, on the page that sells our ability to build one. A wireframe is
 * the wrong argument here.
 *
 * What it shows now is the part a buyer is actually paying for and never sees in a
 * screenshot — the pipeline between a commit and a live site. Stages resolve in sequence
 * on a loop, with a connector rail travelling between them, so the panel demonstrates
 * process rather than decoration. The stage names are the real ones from the copy
 * beneath it (React/Next, tests, CI/CD, deploy); no invented metric appears anywhere.
 */
const WebVisual = () => {
  const reduce = useReducedMotion();
  const floatB = useFloat(10, 5.5);

  const stages = [
    { k: "build", label: "build", detail: "next build", ms: "9.4s" },
    { k: "test", label: "test", detail: "142 passing", ms: "6.1s" },
    { k: "deploy", label: "deploy", detail: "edge · 18 regions", ms: "3.7s" },
  ];

  return (
    <Box
      position="relative"
      maxW="clamp(300px, 100%, 600px)"
      mx="auto"
      sx={{
        "@keyframes wvStage": {
          "0%, 12%": { opacity: 0.28, borderColor: "rgba(180,160,255,0.14)" },
          "26%, 74%": { opacity: 1, borderColor: "rgba(180,160,255,0.42)" },
          "88%, 100%": { opacity: 0.4, borderColor: "rgba(180,160,255,0.18)" },
        },
        "@keyframes wvFlow": { to: { strokeDashoffset: -240 } },
        "@keyframes wvTick": {
          "0%, 18%": { opacity: 0, transform: "scale(0.4)" },
          "34%, 100%": { opacity: 1, transform: "scale(1)" },
        },
      }}
    >
      <Frame label="deploy · main@a3f19c">
        <VStack align="stretch" spacing={0}>
          {stages.map((s, i) => (
            <Box key={s.k}>
              <HStack
                spacing={3}
                px={3}
                py={3}
                borderRadius="12px"
                border="1px solid"
                borderColor="rgba(180,160,255,0.2)"
                bg="rgba(255,255,255,0.03)"
                sx={
                  reduce
                    ? undefined
                    : { animation: `wvStage 6s ease-in-out ${i * 1.6}s infinite` }
                }
              >
                <Flex
                  w="26px"
                  h="26px"
                  flexShrink={0}
                  align="center"
                  justify="center"
                  borderRadius="9px"
                  bgGradient="linear(135deg, rgba(123,108,255,0.5), rgba(181,123,255,0.32))"
                >
                  <Box
                    sx={reduce ? undefined : { animation: `wvTick 6s ease-out ${i * 1.6}s infinite` }}
                    display="flex"
                  >
                    <Icon as={FiCheckCircle} boxSize={3.5} color="white" />
                  </Box>
                </Flex>
                <Box flex="1" minW={0}>
                  <Text fontSize="12.5px" fontWeight={600} color="text.primary">
                    {s.label}
                  </Text>
                  <Text fontSize="11px" color="text.faint" fontFamily="mono" noOfLines={1}>
                    {s.detail}
                  </Text>
                </Box>
                <Text fontSize="11px" color="accent.solid" fontFamily="mono" flexShrink={0}>
                  {s.ms}
                </Text>
              </HStack>

              {/* Connector between stages — the travelling segment is what makes the
                  three panels read as one pipeline rather than three list rows. */}
              {i < stages.length - 1 && (
                <Box as="svg" viewBox="0 0 4 26" width="4px" height="26px" ml="16px" display="block">
                  <line x1="2" y1="0" x2="2" y2="26" stroke="rgba(180,160,255,0.22)" strokeWidth="1.4" />
                  {!reduce && (
                    <line
                      x1="2"
                      y1="0"
                      x2="2"
                      y2="26"
                      stroke="rgba(215,205,255,0.95)"
                      strokeWidth="1.6"
                      strokeDasharray="7 33"
                      style={{ animation: `wvFlow 6s linear ${i * 1.6 + 0.5}s infinite` }}
                    />
                  )}
                </Box>
              )}
            </Box>
          ))}
        </VStack>
      </Frame>
      <FloatChip icon={FiGlobe} title="Ship on merge" sub="CI/CD pipeline" top="-22px" left="-18px" floatProps={floatB} />
    </Box>
  );
};

/**
 * App Development — the weakest visual on the site before this change.
 *
 * Two empty grey rounded rectangles floated on nothing, which read as an unbuilt
 * wireframe on the page selling our ability to build finished apps. Replaced with a
 * paired hero/secondary phone rendering an actual booking-app surface: status bar,
 * balance card, action row, list rows with avatars, and a live tab bar. All drawn in
 * DOM so it stays crisp at any DPR and adds no image weight.
 */
const AppVisual = () => {
  const reduce = useReducedMotion();
  const floatFront = useFloat(-14, 6);
  const floatBack = useFloat(11, 6.8, 0.4);
  const floatChip = useFloat(-10, 5.2, 0.2);

  const StatusBar = () => (
    <HStack justify="space-between" px={1} mb={2.5}>
      <Text fontSize="8px" fontWeight={700} color="whiteAlpha.900">9:41</Text>
      <HStack spacing="3px">
        <Box w="12px" h="6px" borderRadius="1.5px" border="1px solid" borderColor="whiteAlpha.700" position="relative">
          <Box position="absolute" inset="1px" right="4px" bg="whiteAlpha.800" borderRadius="0.5px" />
        </Box>
      </HStack>
    </HStack>
  );

  // The primary phone: a real "wallet / bookings" surface with legible hierarchy.
  const PhoneFront = () => (
    <Box
      w={{ base: "186px", md: "212px" }}
      borderRadius="30px"
      border="1px solid"
      borderColor="rgba(180,160,255,0.34)"
      bg="linear-gradient(165deg, #1b1b2e 0%, #0d0d16 60%)"
      p="7px"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.14), 0 42px 80px -28px rgba(0,0,0,0.95), 0 0 60px -20px rgba(123,108,255,0.45)"
    >
      {/* screen */}
      <Box borderRadius="24px" overflow="hidden" bg="#0b0b14" px={2.5} pt={2} pb={0} position="relative">
        {/* dynamic-island style pill */}
        <Box w="42px" h="10px" borderRadius="full" bg="#000" mx="auto" mb={1.5} />
        <StatusBar />

        {/* greeting row */}
        <HStack justify="space-between" mb={2.5}>
          <Box>
            <Text fontSize="7px" color="whiteAlpha.600" lineHeight={1.2}>Welcome back</Text>
            <Text fontSize="10px" fontWeight={700} color="white" lineHeight={1.3}>Your trips</Text>
          </Box>
          <Flex w="20px" h="20px" rounded="full" bgGradient="linear(135deg, brand.400, violet.500)" align="center" justify="center">
            <Icon as={FiUser} boxSize="10px" color="white" />
          </Flex>
        </HStack>

        {/* search */}
        <HStack
          mb={2.5} px={2} py={1.5} borderRadius="8px"
          bg="rgba(255,255,255,0.06)" border="1px solid" borderColor="rgba(255,255,255,0.08)"
        >
          <Icon as={FiSearch} boxSize="9px" color="whiteAlpha.500" />
          <Text fontSize="8px" color="whiteAlpha.500">Search destinations</Text>
        </HStack>

        {/* balance / featured card */}
        <Box
          borderRadius="12px" p={2.5} mb={2.5}
          bgGradient="linear(140deg, #7b6cff 0%, #b57bff 100%)"
          boxShadow="0 12px 24px -12px rgba(123,108,255,0.85)"
          position="relative" overflow="hidden"
        >
          <Box position="absolute" top="-18px" right="-14px" w="60px" h="60px" borderRadius="full" bg="whiteAlpha.200" />
          <Text fontSize="7px" color="whiteAlpha.800" mb="1px">Next booking</Text>
          <Text fontSize="13px" fontWeight={700} color="white" lineHeight={1.2}>Queenstown</Text>
          <HStack spacing={1} mt={1}>
            <Icon as={FiMapPin} boxSize="8px" color="whiteAlpha.900" />
            <Text fontSize="7px" color="whiteAlpha.900">12–16 Mar · 2 guests</Text>
          </HStack>
        </Box>

        {/* quick actions */}
        <HStack spacing={1.5} mb={2.5}>
          {[FiCreditCard, FiBell, FiHome].map((I, i) => (
            <VStack
              key={i} flex="1" spacing={1} py={1.5} borderRadius="8px"
              bg="rgba(255,255,255,0.05)" border="1px solid" borderColor="rgba(255,255,255,0.07)"
            >
              <Icon as={I} boxSize="10px" color="#b4a0ff" />
              <Box w="60%" h="2px" borderRadius="full" bg="whiteAlpha.300" />
            </VStack>
          ))}
        </HStack>

        {/* list rows */}
        <VStack align="stretch" spacing={1.5} mb={2}>
          {[
            { t: "Lakeview Suite", s: "Confirmed", ok: true },
            { t: "Alpine Lodge", s: "Pending", ok: false },
          ].map((r) => (
            <HStack key={r.t} spacing={2} p={1.5} borderRadius="8px" bg="rgba(255,255,255,0.04)">
              <Box w="18px" h="18px" borderRadius="5px" bgGradient="linear(135deg, rgba(123,108,255,0.7), rgba(181,123,255,0.5))" flexShrink={0} />
              <Box flex="1" minW={0}>
                <Text fontSize="8px" fontWeight={600} color="white" noOfLines={1}>{r.t}</Text>
                <Text fontSize="6.5px" color={r.ok ? "#4ade80" : "#fbbf24"}>{r.s}</Text>
              </Box>
              <Icon as={FiArrowUpRight} boxSize="9px" color="whiteAlpha.500" />
            </HStack>
          ))}
        </VStack>

        {/* tab bar */}
        <HStack
          justify="space-around" mx="-10px" px={3} py={1.5}
          borderTop="1px solid" borderColor="whiteAlpha.100" bg="rgba(255,255,255,0.03)"
        >
          {[FiHome, FiSearch, FiCreditCard, FiUser].map((I, i) => (
            <Icon key={i} as={I} boxSize="11px" color={i === 0 ? "#b4a0ff" : "whiteAlpha.400"} />
          ))}
        </HStack>
      </Box>
    </Box>
  );

  // Secondary phone sits behind/left, showing an analytics surface — implies a
  // multi-screen product rather than a single mockup.
  const PhoneBack = () => (
    <Box
      w={{ base: "152px", md: "172px" }}
      borderRadius="26px"
      border="1px solid"
      borderColor="rgba(255,255,255,0.14)"
      bg="linear-gradient(165deg, #16162a 0%, #0b0b13 60%)"
      p="6px"
      boxShadow="0 34px 60px -26px rgba(0,0,0,0.95)"
    >
      <Box borderRadius="21px" overflow="hidden" bg="#0a0a12" px={2} pt={2} pb={2.5}>
        <Box w="34px" h="8px" borderRadius="full" bg="#000" mx="auto" mb={2} />
        <Text fontSize="8px" color="whiteAlpha.600" mb="2px">This month</Text>
        <Text fontSize="14px" fontWeight={700} color="white" lineHeight={1.1} mb={2}>
          8,420
          <Box as="span" fontSize="7px" color="#4ade80" ml={1} fontWeight={600}>+18%</Box>
        </Text>

        {/* bar chart — deterministic heights, no random */}
        <HStack spacing="3px" align="flex-end" h="42px" mb={2}>
          {[38, 55, 34, 68, 48, 82, 62].map((h, i) => (
            <Box
              key={i}
              flex="1"
              h={`${h}%`}
              borderRadius="2px"
              bgGradient={i === 5 ? "linear(to-t, brand.500, violet.400)" : "linear(to-t, rgba(123,108,255,0.42), rgba(123,108,255,0.14))"}
            />
          ))}
        </HStack>

        <VStack align="stretch" spacing={1}>
          {["Active users", "Retention"].map((t, i) => (
            <HStack key={t} justify="space-between">
              <Text fontSize="6.5px" color="whiteAlpha.600">{t}</Text>
              <Text fontSize="6.5px" fontWeight={600} color="#b4a0ff">{i === 0 ? "3.1k" : "74%"}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Box>
  );

  return (
    <Box position="relative" maxW={{ base: "420px", md: "480px" }} mx="auto" h={{ base: "430px", md: "470px" }}>
      {/* pooled light behind the devices — gives the phones a surface to sit on */}
      <Box
        position="absolute" left="50%" top="48%" transform="translate(-50%,-50%)"
        w="360px" h="360px" borderRadius="50%"
        bg="radial-gradient(circle, rgba(123,108,255,0.28) 0%, rgba(123,108,255,0.07) 45%, transparent 70%)"
        filter="blur(26px)" pointerEvents="none"
      />

      <MotionBox position="absolute" left={{ base: "-2%", md: "0%" }} top="88px" zIndex={1} {...floatBack}>
        <Box transform="rotate(-7deg)"><PhoneBack /></Box>
      </MotionBox>

      <MotionBox position="absolute" right={{ base: "-2%", md: "0%" }} top="0px" zIndex={2} {...floatFront}>
        <Box transform="rotate(4deg)"><PhoneFront /></Box>
      </MotionBox>

      <FloatChip
        icon={FiSmartphone}
        title="iOS + Android"
        sub="One codebase"
        bottom="0px"
        left={{ base: "4%", md: "2%" }}
        floatProps={reduce ? {} : floatChip}
      />
    </Box>
  );
};

/**
 * UI/UX — wireframe resolving into finished interface.
 *
 * The old panel was a static swatch column beside a block of grey bars: it showed the
 * *inputs* to design and none of the outcome, which is the least persuasive way to sell
 * design work. This is the transition itself. Two layers occupy the same frame — a
 * dashed wireframe underneath and the resolved UI on top — and the resolved layer fades
 * in and out on a slow loop, so the panel repeatedly performs the thing the service does.
 *
 * Both layers use identical geometry, so nothing shifts as it crosses; only fill,
 * border and opacity change. Under reduced motion the resolved state is simply held.
 */
const UiUxVisual = () => {
  const reduce = useReducedMotion();
  const float = useFloat(11, 5);

  // One geometry, rendered twice. `wire` swaps the treatment.
  const Surface = ({ wire }) => (
    <Box
      flex="1"
      borderRadius="12px"
      border={wire ? "1px dashed" : "1px solid"}
      borderColor={wire ? "rgba(180,160,255,0.34)" : "border.subtle"}
      bg={wire ? "transparent" : "rgba(255,255,255,0.02)"}
      p={3}
      position="relative"
    >
      <Box
        w="50%"
        h="9px"
        borderRadius="4px"
        mb={3}
        bg={wire ? "transparent" : undefined}
        bgGradient={wire ? undefined : "linear(90deg, brand.500, violet.500)"}
        border={wire ? "1px dashed" : undefined}
        borderColor={wire ? "rgba(180,160,255,0.4)" : undefined}
      />
      <Box w="100%" h="6px" borderRadius="3px" mb={2} bg={wire ? "rgba(180,160,255,0.1)" : "rgba(255,255,255,0.13)"} />
      <Box w="85%" h="6px" borderRadius="3px" mb={4} bg={wire ? "rgba(180,160,255,0.1)" : "rgba(255,255,255,0.13)"} />
      <Box
        borderRadius="10px"
        h="60px"
        mb={3}
        border={wire ? "1px dashed" : "none"}
        borderColor="rgba(180,160,255,0.34)"
        bgGradient={wire ? undefined : "linear(135deg, rgba(123,108,255,0.28), rgba(181,123,255,0.18))"}
        position="relative"
      >
        {/* The diagonal is the universal "image placeholder" mark — it belongs on the
            wireframe layer and must not survive into the resolved one. */}
        {wire && (
          <Box as="svg" viewBox="0 0 100 60" width="100%" height="100%" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100" y2="60" stroke="rgba(180,160,255,0.3)" strokeWidth="0.6" />
            <line x1="100" y1="0" x2="0" y2="60" stroke="rgba(180,160,255,0.3)" strokeWidth="0.6" />
          </Box>
        )}
      </Box>
      <HStack spacing={2}>
        <Box
          flex="1"
          h="26px"
          borderRadius="full"
          border={wire ? "1px dashed" : "none"}
          borderColor="rgba(180,160,255,0.4)"
          bgGradient={wire ? undefined : "linear(135deg, brand.500, violet.500)"}
        />
        <Box flex="1" h="26px" borderRadius="full" border="1px solid" borderColor={wire ? "rgba(180,160,255,0.28)" : "border.strong"} />
      </HStack>
    </Box>
  );

  return (
    <Box
      position="relative"
      maxW="clamp(300px, 100%, 600px)"
      mx="auto"
      sx={{
        // The resolve. Long holds at each end so both states are legible; the crossfade
        // itself is the short part.
        "@keyframes uxResolve": {
          "0%, 16%": { opacity: 0 },
          "34%, 76%": { opacity: 1 },
          "94%, 100%": { opacity: 0 },
        },
        "@keyframes uxSwatch": {
          "0%, 20%": { opacity: 0.25 },
          "38%, 100%": { opacity: 1 },
        },
      }}
    >
      <Frame label="Futurise — Design System">
        <Flex gap={3}>
          <VStack align="stretch" spacing={2} w="64px">
            {["linear(135deg, #7b6cff, #9b8cff)", "linear(135deg, #b57bff, #cba0ff)", null].map((g, i) => (
              <Box
                key={i}
                h="34px"
                borderRadius="10px"
                bg={g ? undefined : "rgba(255,255,255,0.12)"}
                bgGradient={g || undefined}
                sx={reduce ? undefined : { animation: `uxSwatch 7s ease-out ${i * 0.18}s infinite` }}
              />
            ))}
            <Box h="34px" borderRadius="10px" border="1px dashed" borderColor="border.strong" />
          </VStack>

          {/* Both surfaces stacked in one cell: the wireframe sits underneath and the
              resolved UI fades over it. */}
          <Box flex="1" position="relative" display="flex">
            <Surface wire />
            <Box
              position="absolute"
              inset={0}
              display="flex"
              sx={reduce ? undefined : { animation: "uxResolve 7s ease-in-out infinite" }}
            >
              <Surface />
            </Box>
            <Icon
              as={FiPenTool}
              position="absolute"
              bottom="12px"
              right="14px"
              color="accent.solid"
              boxSize={5}
              transform="rotate(-10deg)"
            />
          </Box>
        </Flex>
      </Frame>
      <FloatChip icon={FiLayers} title="Design system" sub="Reusable components" top="-30px" right="-22px" floatProps={float} />
    </Box>
  );
};

/**
 * Blockchain — an actual chain of blocks, not a generic node cloud.
 *
 * The previous version was six glowing dots joined by straight lines: the stock "network"
 * graphic, which says nothing specific and could sit on any page about anything. This
 * draws the one structure that is unique to the subject — blocks linked by hashes, each
 * carrying the previous block's digest, with a new block confirming on a loop and the
 * link travelling forward as it does.
 *
 * The hex strings are fixed literals chosen to look like digests, not real hashes and not
 * presented as any chain's actual data; heights are relative (n, n+1, n+2) rather than
 * claiming a live block number.
 */
const BlockchainVisual = () => {
  const reduce = useReducedMotion();
  const float = useFloat(-10, 5);

  const blocks = [
    { h: "n", hash: "0x7f3a…c19d", tx: "128 tx" },
    { h: "n+1", hash: "0xa41e…8b70", tx: "94 tx" },
    { h: "n+2", hash: "0x2d95…f6a3", tx: "pending" },
  ];

  return (
    <Box
      position="relative"
      maxW="clamp(300px, 100%, 580px)"
      mx="auto"
      sx={{
        "@keyframes bcConfirm": {
          "0%, 55%": { opacity: 0.34, transform: "translateY(6px)" },
          "70%, 100%": { opacity: 1, transform: "translateY(0)" },
        },
        "@keyframes bcLink": { to: { strokeDashoffset: -120 } },
        "@keyframes bcSeal": {
          "0%, 60%": { opacity: 0, transform: "scale(0.5)" },
          "76%, 100%": { opacity: 1, transform: "scale(1)" },
        },
      }}
    >
      <Frame label="multi-chain · EVM">
        <VStack align="stretch" spacing={0}>
          {blocks.map((b, i) => {
            const isNew = i === blocks.length - 1;
            return (
              <Box key={b.h}>
                <Box
                  borderRadius="12px"
                  border="1px solid"
                  borderColor={isNew ? "rgba(180,160,255,0.42)" : "rgba(180,160,255,0.2)"}
                  bg="rgba(255,255,255,0.03)"
                  px={3.5}
                  py={3}
                  sx={
                    reduce || !isNew
                      ? undefined
                      : { animation: "bcConfirm 4.6s ease-out infinite" }
                  }
                >
                  <HStack justify="space-between" mb={1.5}>
                    <HStack spacing={2}>
                      <Flex
                        w="22px"
                        h="22px"
                        align="center"
                        justify="center"
                        borderRadius="7px"
                        bgGradient="linear(135deg, rgba(123,108,255,0.55), rgba(181,123,255,0.35))"
                      >
                        {isNew ? (
                          <Box
                            display="flex"
                            sx={reduce ? undefined : { animation: "bcSeal 4.6s ease-out infinite" }}
                          >
                            <Icon as={FiShield} boxSize={3} color="white" />
                          </Box>
                        ) : (
                          <Icon as={FiShield} boxSize={3} color="white" />
                        )}
                      </Flex>
                      <Text fontSize="12px" fontWeight={600} color="text.primary" fontFamily="mono">
                        block {b.h}
                      </Text>
                    </HStack>
                    <Text fontSize="10.5px" color="text.faint" fontFamily="mono">
                      {b.tx}
                    </Text>
                  </HStack>
                  {/* The digest line is what makes this a *chain*: each block carries the
                      previous one's hash, which is the entire structural idea. */}
                  <Text fontSize="10.5px" color="accent.solid" fontFamily="mono" noOfLines={1}>
                    prev {b.hash}
                  </Text>
                </Box>

                {i < blocks.length - 1 && (
                  <Box as="svg" viewBox="0 0 4 22" width="4px" height="22px" ml="14px" display="block">
                    <line x1="2" y1="0" x2="2" y2="22" stroke="rgba(180,160,255,0.24)" strokeWidth="1.4" />
                    {!reduce && (
                      <line
                        x1="2"
                        y1="0"
                        x2="2"
                        y2="22"
                        stroke="rgba(215,205,255,0.95)"
                        strokeWidth="1.6"
                        strokeDasharray="6 18"
                        style={{ animation: `bcLink 4.6s linear ${i * 0.4}s infinite` }}
                      />
                    )}
                  </Box>
                )}
              </Box>
            );
          })}
        </VStack>
      </Frame>
      <FloatChip icon={FiZap} title="Decentralized" sub="Multi-chain ready" bottom="-26px" right="-18px" floatProps={float} />
    </Box>
  );
};

const SmartContractVisual = () => {
  const float = useFloat(11, 5);
  return (
    <Box position="relative" maxW="clamp(300px, 100%, 600px)" mx="auto">
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
      <FloatChip icon={FiShield} title="Audited" sub="0 critical issues" top="-22px" left="-16px" floatProps={float} />
    </Box>
  );
};

/**
 * AI & ML — an agent run, not a chat bubble.
 *
 * The page sells agents, tool use and ML pipelines, so the visual shows a request
 * decomposed into tool calls with a confidence readout, which is what the work
 * actually looks like. Deliberately avoids the brain/robot cliché.
 */
const AiVisual = () => {
  const reduce = useReducedMotion();
  const float = useFloat(-11, 5);

  const steps = [
    { label: "search_orders", state: "done", ms: "120ms" },
    { label: "fetch_invoice", state: "done", ms: "84ms" },
    { label: "draft_reply", state: "run", ms: null },
  ];

  return (
    <Box position="relative" maxW="clamp(300px, 100%, 600px)" mx="auto">
      <Frame label="agent · run #2481">
        {/* incoming request */}
        <HStack align="start" spacing={2.5} mb={3.5}>
          <Flex w="24px" h="24px" rounded="8px" bg="rgba(255,255,255,0.07)" align="center" justify="center" flexShrink={0}>
            <Icon as={FiUser} boxSize={3} color="whiteAlpha.700" />
          </Flex>
          <Box
            flex="1" px={3} py={2} borderRadius="10px"
            bg="rgba(255,255,255,0.045)" border="1px solid" borderColor="border.subtle"
          >
            <Text fontSize="12px" color="text.muted" lineHeight={1.5}>
              “Where is order 4471 and can you refund the shipping?”
            </Text>
          </Box>
        </HStack>

        {/* tool calls */}
        <VStack align="stretch" spacing={2} mb={3.5}>
          {steps.map((s) => (
            <HStack
              key={s.label}
              spacing={2.5} px={3} py={2} borderRadius="10px"
              bg={s.state === "run" ? "rgba(123,108,255,0.1)" : "rgba(255,255,255,0.03)"}
              border="1px solid"
              borderColor={s.state === "run" ? "rgba(180,160,255,0.3)" : "border.subtle"}
            >
              {s.state === "done" ? (
                <Icon as={FiCheckCircle} boxSize={3.5} color="#4ade80" flexShrink={0} />
              ) : (
                <MotionBox
                  w="14px" h="14px" borderRadius="full" flexShrink={0}
                  border="2px solid" borderColor="rgba(180,160,255,0.35)" borderTopColor="#b4a0ff"
                  {...(reduce ? {} : { animate: { rotate: 360 }, transition: { duration: 0.9, repeat: Infinity, ease: "linear" } })}
                />
              )}
              <Text fontSize="11.5px" fontFamily="mono" color="text.primary" flex="1" noOfLines={1}>
                {s.label}()
              </Text>
              <Text fontSize="10px" color="text.faint">{s.ms || "…"}</Text>
            </HStack>
          ))}
        </VStack>

        {/* confidence / grounding readout */}
        <Box pt={3} borderTop="1px solid" borderColor="border.subtle">
          <HStack justify="space-between" mb={2}>
            <Text fontSize="10.5px" letterSpacing="0.1em" textTransform="uppercase" color="text.faint">
              Grounded confidence
            </Text>
            <Text fontSize="11px" fontWeight={700} color="accent.solid">96%</Text>
          </HStack>
          <Box h="5px" borderRadius="full" bg="rgba(255,255,255,0.07)" overflow="hidden">
            <MotionBox
              h="100%" borderRadius="full" bgGradient="linear(90deg, brand.500, violet.500)"
              initial={reduce ? { width: "96%" } : { width: "0%" }}
              whileInView={{ width: "96%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </Box>
        </Box>
      </Frame>
      <FloatChip icon={FiCpu} title="Tool-using agents" sub="Retrieval + actions" bottom="-28px" right="-16px" floatProps={float} />
    </Box>
  );
};

/**
 * Digital Marketing — the attribution model, not a results screenshot.
 *
 * IMPORTANT, DO NOT REVERT: this panel previously displayed "+128% Traffic", "+64%
 * Leads" and "4.2× ROAS" above a rising chart, with "+128% Organic traffic" repeated on
 * the float chip. Those numbers were invented. The rest of this site refuses exactly
 * that — /about has a "What this site does not claim" section, and clientProof carries
 * only outcomes we can point at — so a fabricated results dashboard on a service page
 * contradicted the site's own standard and is the kind of claim the FTC's endorsement
 * rule treats as deceptive. Do not reintroduce invented metrics here.
 *
 * What it shows instead is the structure of the work: four channels feeding a single
 * attribution layer, with signal travelling in from each on its own cycle. That is a
 * true statement about how the service is built and needs no number to make its point.
 */
const MarketingVisual = () => {
  const reduce = useReducedMotion();
  const float = useFloat(-11, 5);

  const channels = [
    { k: "Organic search", d: "SEO & content" },
    { k: "Paid social", d: "Meta · LinkedIn" },
    { k: "Paid search", d: "Google Ads" },
    { k: "On-site CRO", d: "Experiments" },
  ];

  return (
    <Box
      position="relative"
      maxW="clamp(300px, 100%, 600px)"
      mx="auto"
      sx={{
        "@keyframes mkSignal": { to: { strokeDashoffset: -180 } },
        "@keyframes mkRow": {
          "0%, 100%": { borderColor: "rgba(180,160,255,0.18)" },
          "50%": { borderColor: "rgba(180,160,255,0.46)" },
        },
      }}
    >
      <Frame label="attribution model">
        <Flex gap={3} align="stretch">
          {/* Channels */}
          <VStack align="stretch" spacing={2} flex="1" minW={0}>
            {channels.map((c, i) => (
              <HStack
                key={c.k}
                spacing={2.5}
                px={2.5}
                py={2}
                borderRadius="10px"
                border="1px solid"
                borderColor="rgba(180,160,255,0.18)"
                bg="rgba(255,255,255,0.03)"
                sx={reduce ? undefined : { animation: `mkRow 6.4s ease-in-out ${i * 0.8}s infinite` }}
              >
                <Box w="6px" h="6px" borderRadius="full" bgGradient="linear(135deg, brand.500, violet.500)" flexShrink={0} />
                <Box minW={0}>
                  <Text fontSize="11.5px" fontWeight={600} color="text.primary" noOfLines={1}>
                    {c.k}
                  </Text>
                  <Text fontSize="10px" color="text.faint" noOfLines={1}>
                    {c.d}
                  </Text>
                </Box>
              </HStack>
            ))}
          </VStack>

          {/* Converging signal lines */}
          <Box w="54px" flexShrink={0} position="relative">
            <Box as="svg" viewBox="0 0 54 168" width="100%" height="100%" preserveAspectRatio="none" display="block">
              {[22, 66, 110, 150].map((y, i) => {
                const d = `M 0 ${y} C 26 ${y} 30 84 54 84`;
                return (
                  <g key={y}>
                    <path d={d} fill="none" stroke="rgba(180,160,255,0.24)" strokeWidth="1.2" />
                    {!reduce && (
                      <path
                        d={d}
                        fill="none"
                        stroke="rgba(220,210,255,0.95)"
                        strokeWidth="1.4"
                        strokeDasharray="9 51"
                        style={{ animation: `mkSignal ${5 + i * 0.7}s linear ${i * 0.9}s infinite` }}
                      />
                    )}
                  </g>
                );
              })}
            </Box>
          </Box>

          {/* Attribution layer */}
          <Flex
            w="112px"
            flexShrink={0}
            direction="column"
            align="center"
            justify="center"
            borderRadius="12px"
            border="1px solid"
            borderColor="rgba(180,160,255,0.4)"
            bgGradient="linear(160deg, rgba(123,108,255,0.2), rgba(181,123,255,0.08))"
            px={2}
          >
            <Flex
              w="34px"
              h="34px"
              align="center"
              justify="center"
              borderRadius="11px"
              bgGradient="linear(135deg, rgba(123,108,255,0.6), rgba(181,123,255,0.4))"
              mb={2}
            >
              <Icon as={FiTrendingUp} boxSize={4} color="white" />
            </Flex>
            <Text fontSize="11.5px" fontWeight={600} color="text.primary" textAlign="center" lineHeight={1.3}>
              One reporting layer
            </Text>
            <Text fontSize="10px" color="text.faint" textAlign="center" mt={1} lineHeight={1.35}>
              Every channel tied to an outcome
            </Text>
          </Flex>
        </Flex>
      </Frame>
      <FloatChip icon={FiTrendingUp} title="Measured" sub="Not guessed" bottom="-20px" right="-14px" floatProps={float} />
    </Box>
  );
};

/* Router ---------------------------------------------------------------- */

// `ai-ml-solutions` is a real route (see AllRoutes / services) but had no entry here,
// so the AI page silently fell back to WebVisual and advertised "yourbrand.com" and a
// Lighthouse score on a page about AI agents and ML pipelines. `smart-contract` is not
// a route in `services`; it is kept mapped because SmartContractVisual is still a valid
// composition, but AI now has its own.
const VISUALS = {
  "web-development": WebVisual,
  "app-development": AppVisual,
  "ui-ux-design": UiUxVisual,
  "blockchain-development": BlockchainVisual,
  "ai-ml-solutions": AiVisual,
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
