'use client'

import { useState, useEffect, lazy, Suspense } from "react";
import { Box, Flex, IconButton, Spinner, Text, Icon } from "@chakra-ui/react";
/* ⚠️ `keyframes` comes from @emotion/react, NOT @chakra-ui/react.
   The source imported it from "@chakra-ui/react", which worked on the old app's
   Chakra ^2.8.2 because that version re-exported Emotion's helper. The port resolved
   to 2.10.10, which DROPPED the re-export, so the original import throws at build:
   "Export keyframes doesn't exist in target module".

   This is the same function — Chakra only ever re-exported Emotion's — so the animation
   is unchanged. The error stayed hidden until now because ChatBubble was never mounted;
   it surfaced the moment it was added to app/layout.tsx. */
import { keyframes } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { trackEvent, EVENTS } from "../../utils/analytics";

const pulseGlow = keyframes`
  0% { box-shadow: 0 12px 30px -8px rgba(123,108,255,0.7); }
  50% { box-shadow: 0 12px 36px 2px rgba(123,108,255,0.95), 0 0 0 4px rgba(123,108,255,0.2); }
  100% { box-shadow: 0 12px 30px -8px rgba(123,108,255,0.7); }
`;

const RobotIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "inline-block", verticalAlign: "middle", transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
    {...props}
  >
    <path d="M12 2V5" />
    <rect x="3" y="11" width="2" height="4" rx="1" />
    <rect x="19" y="11" width="2" height="4" rx="1" />
    <rect x="5" y="6" width="14" height="14" rx="4" />
    <circle cx="9" cy="12" r="1.5" fill="currentColor" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" />
    <path d="M9 16h6" />
  </svg>
);




// The heavy chat UI is only fetched when the visitor first opens the widget —
// keeps it out of the initial page load entirely (perf/SEO rule).
const ChatWidget = lazy(() => import("./ChatWidget"));

const MotionBox = motion.create(Box);

/** Shown for the brief moment while the ChatWidget chunk is being fetched. */
const LoadingPanel = () => (
  <Flex
    w={{ base: "100vw", sm: "380px" }}
    h={{ base: "100dvh", sm: "560px" }}
    maxH={{ base: "100dvh", sm: "calc(100vh - 116px)" }}
    align="center"
    justify="center"
    bg="rgba(13,13,22,0.95)"
    backdropFilter="blur(20px)"
    border="1px solid"
    borderColor="border.strong"
    borderRadius={{ base: 0, sm: "20px" }}
  >
    <Spinner color="accent.solid" />
  </Flex>
);

/**
 * Floating trigger button (bottom-right) that toggles the chat window.
 * Lazy-loaded in App.jsx so it never touches the initial bundle / crawlable DOM.
 */
const ChatBubble = () => {
  const [open, setOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Opening the chat is an intent signal, not a lead — tracked so the widget's
  // contribution to enquiries can be judged rather than assumed. Only the opening
  // transition is recorded; closing is not a conversion event.
  const toggleChat = (next) => {
    setOpen((wasOpen) => {
      const willOpen = typeof next === "boolean" ? next : !wasOpen;
      if (willOpen && !wasOpen) trackEvent(EVENTS.CHATBOT_OPEN, { location: "chat-bubble" });
      return willOpen;
    });
  };

  // Esc closes the window.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Manage prompt bubble show/hide timeline:
  // 10s open -> 15s close, 25s open -> 30s close, 65s open -> 85s close
  useEffect(() => {
    if (open || dismissed) {
      setShowPrompt(false);
      return;
    }

    const timers = [];

    // Timer 1: Open at 10s
    timers.push(
      setTimeout(() => {
        if (!open && !dismissed) setShowPrompt(true);
      }, 10000)
    );

    // Timer 2: Close at 15s
    timers.push(
      setTimeout(() => {
        setShowPrompt(false);
      }, 15000)
    );

    // Timer 3: Open again at 25s
    timers.push(
      setTimeout(() => {
        if (!open && !dismissed) setShowPrompt(true);
      }, 25000)
    );

    // Timer 4: Close at 30s
    timers.push(
      setTimeout(() => {
        setShowPrompt(false);
      }, 30000)
    );

    // Timer 5: Open again at 65s
    timers.push(
      setTimeout(() => {
        if (!open && !dismissed) setShowPrompt(true);
      }, 65000)
    );

    // Timer 6: Close at 85s
    timers.push(
      setTimeout(() => {
        setShowPrompt(false);
      }, 85000)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [open, dismissed]);

  // Reset dismissed state when widget is opened, so the cycle can restart if they close it later
  useEffect(() => {
    if (open) {
      setDismissed(false);
    }
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {showPrompt && (
          <MotionBox
            key="prompt-bubble"
            position="fixed"
            bottom={{ base: "20px", sm: "31px" }}
            right={{ base: "72px", sm: "92px" }}
            zIndex={9998}
            initial={{ opacity: 0, x: 40, scale: 0.8 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              y: [0, -4, 0],
            }}
            exit={{ opacity: 0, x: 40, scale: 0.8 }}
            transition={{
              x: { type: "spring", stiffness: 80, damping: 15 },
              scale: { duration: 0.3 },
              opacity: { duration: 0.3 },
              y: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              },
            }}
            bg="rgba(13,13,22,0.95)"
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor="border.strong"
            borderRadius="full"
            px={5}
            py={2.5}
            boxShadow="0 12px 30px -10px rgba(0,0,0,0.5)"
            display="flex"
            alignItems="center"
            gap={2.5}
            cursor="pointer"
            onClick={() => toggleChat(true)}
            sx={{
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                right: "-6px",
                width: "12px",
                height: "12px",
                backgroundColor: "rgba(13,13,22,0.95)",
                borderRight: "1px solid",
                borderTop: "1px solid",
                borderColor: "border.strong",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: -1,
                borderTopRightRadius: "3px"
              }
            }}
          >
            <motion.span
              animate={{ rotate: [0, 20, -15, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              style={{ display: "inline-block", originX: 0.7, originY: 0.7, fontSize: "18px" }}
            >
              👋
            </motion.span>
            <Text fontSize="13px" fontWeight={500} color="text.primary" mr={1} userSelect="none">
              Hey! Need help??
            </Text>
            <IconButton
              aria-label="Close prompt"
              icon={<FiX size={12} />}
              size="xs"
              variant="ghost"
              color="text.muted"
              _hover={{ color: "text.primary", bg: "rgba(255,255,255,0.08)" }}
              borderRadius="full"
              onClick={(e) => {
                e.stopPropagation();
                setShowPrompt(false);
                setDismissed(true);
              }}
            />
          </MotionBox>
        )}
        {open && (
          <MotionBox
            key="chat-window"
            position="fixed"
            zIndex={9999}
            bottom={{ base: "74px", sm: "94px" }}
            right={{ base: "16px", sm: "24px" }}
            left={{ base: "16px", sm: "auto" }}
            top="auto"
            transformOrigin="bottom right"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense fallback={<LoadingPanel />}>
              <ChatWidget onClose={() => setOpen(false)} />
            </Suspense>
          </MotionBox>
        )}
      </AnimatePresence>

      <IconButton
        aria-label={open ? "Close chat" : "Open chat"}
        icon={open ? <Icon as={FiX} boxSize={{ base: "18px", sm: "22px" }} /> : <Icon as={RobotIcon} boxSize={{ base: "24px", sm: "30px" }} />}
        onClick={() => toggleChat()}
        position="fixed"
        bottom={{ base: "16px", sm: "24px" }}
        right={{ base: "16px", sm: "24px" }}
        zIndex={9999}
        display="flex"
        boxSize={{ base: "46px", sm: "56px" }}
        borderRadius="full"
        variant="gradient"
        boxShadow="0 12px 30px -8px rgba(123,108,255,0.7)"
        animation={open ? undefined : `${pulseGlow} 2.5s infinite ease-in-out`}
        transition="all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
        _hover={{
          transform: "translateY(-4px) scale(1.05)",
          boxShadow: "0 20px 40px -6px rgba(123,108,255,0.9)",
          animation: "none",
          "& svg": { transform: "rotate(10deg) scale(1.1)" }
        }}
        _active={{ transform: "translateY(-1px) scale(0.98)" }}
      />
    </>
  );
};

export default ChatBubble;
