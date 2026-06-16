import { useState, useEffect, lazy, Suspense } from "react";
import { Box, Flex, IconButton, Spinner } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX } from "react-icons/fi";

// The heavy chat UI is only fetched when the visitor first opens the widget —
// keeps it out of the initial page load entirely (perf/SEO rule).
const ChatWidget = lazy(() => import("./ChatWidget"));

const MotionBox = motion(Box);

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

  // Esc closes the window.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <MotionBox
            key="chat-window"
            position="fixed"
            zIndex={9999}
            bottom={{ base: 0, sm: "94px" }}
            right={{ base: 0, sm: "24px" }}
            left={{ base: 0, sm: "auto" }}
            top={{ base: 0, sm: "auto" }}
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
        icon={open ? <FiX size={22} /> : <FiMessageSquare size={22} />}
        onClick={() => setOpen((o) => !o)}
        position="fixed"
        bottom="24px"
        right="24px"
        zIndex={9999}
        display={{ base: open ? "none" : "flex", sm: "flex" }}
        boxSize="56px"
        fontSize="22px"
        borderRadius="full"
        variant="gradient"
        boxShadow="0 12px 30px -8px rgba(123,108,255,0.7)"
      />
    </>
  );
};

export default ChatBubble;
