'use client'

import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Flex, HStack, Text, IconButton, Circle, Image } from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import PredefinedChips from "./PredefinedChips";
import { predefinedAnswers } from "./predefinedQA";
import { matchKeyword } from "./keywordMatcher";
import { sendChatMessage } from "../../api/chat";

let idSeq = 0;
const nextId = () => `m_${++idSeq}`;

const GREETING = {
  id: nextId(),
  role: "assistant",
  text: "Hi! 👋 I'm Futurise Assistant. Ask me about our services, pricing, or how to get started — or tap a question below.",
};

/**
 * The chat window. Holds the conversation in useState (cleared on refresh — no
 * storage, per the SEO/perf rules) and runs the answer cascade:
 *   1. Predefined chip  → instant answer, 0 API calls
 *   2. Backend AI       → POST /api/chat
 *   3. Keyword matcher  → if AI is unavailable (quota / error / offline)
 *   4. Contact fallback → if nothing matches
 */
const ChatWidget = ({ onClose }) => {
  const [messages, setMessages] = useState([GREETING]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const hasUserMessage = messages.some((m) => m.role === "user");

  // Auto-scroll to the newest message / typing indicator.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  const push = useCallback(
    (msg) => setMessages((prev) => [...prev, { id: nextId(), ...msg }]),
    []
  );

  const runFallback = useCallback(
    (question) => {
      const kw = matchKeyword(question);
      if (kw) push({ role: "assistant", text: kw });
      else push({ role: "assistant", isFallback: true });
    },
    [push]
  );

  const handleSend = useCallback(
    async (question) => {
      // 1. Echo the user's message.
      push({ role: "user", text: question });

      // 2. Predefined chip → instant answer, no network call.
      if (predefinedAnswers[question]) {
        push({ role: "assistant", text: predefinedAnswers[question] });
        return;
      }

      // 3. Ask the backend AI (send the recent turns as context).
      setIsTyping(true);
      const history = messages
        .filter((m) => !m.isFallback && m.text)
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.text }));

      try {
        const res = await sendChatMessage(question, history);
        if (res.source === "ai" && res.answer) {
          push({ role: "assistant", text: res.answer });
        } else {
          runFallback(question); // quota_exceeded | error
        }
      } catch {
        runFallback(question); // network down
      } finally {
        setIsTyping(false);
      }
    },
    [messages, push, runFallback]
  );

  return (
    <Flex
      direction="column"
      w={{ base: "calc(100vw - 32px)", sm: "380px" }}
      h={{ base: "420px", sm: "560px" }}
      maxH={{ base: "calc(100dvh - 90px)", sm: "calc(100vh - 116px)" }}
      overflow="hidden"
      borderRadius="20px"
      bg="rgba(13,13,22,0.95)"
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor="border.strong"
      boxShadow="0 24px 70px -20px rgba(0,0,0,0.7)"
    >
      {/* ── Header ── */}
      <Flex
        align="center"
        justify="space-between"
        px={4}
        py={3}
        borderBottom="1px solid"
        borderColor="border.subtle"
        bg="rgba(255,255,255,0.02)"
        flexShrink={0}
      >
        <HStack spacing={3}>
          <Circle
            size="38px"
            border="1px solid"
            borderColor="border.subtle"
            overflow="hidden"
            p="0"
          >
            <Image
              src="/logo-mark-180.png"
              alt="Futurise Assistant Logo"
              boxSize="100%"
              htmlWidth="180"
              htmlHeight="180"
              loading="lazy"
              decoding="async"
              objectFit="cover"
            />
          </Circle>
          <Box>
            <Text fontSize="14px" fontWeight={600} color="text.primary" lineHeight="1.1">
              Futurise Assistant
            </Text>
            <HStack spacing="6px" mt="3px">
              <Circle size="7px" bg="#34d399" />
              <Text fontSize="11px" color="text.faint">
                Online
              </Text>
            </HStack>
          </Box>
        </HStack>
        <IconButton
          aria-label="Close chat"
          icon={<FiX size={18} />}
          variant="ghostLink"
          size="sm"
          borderRadius="full"
          onClick={onClose}
        />
      </Flex>

      {/* ── Conversation (scrollable) ── */}
      <Box ref={scrollRef} flex="1" overflowY="auto" overflowX="hidden">
        <MessageList messages={messages} isTyping={isTyping} />
      </Box>

      {/* ── Chips + input ── */}
      <Box flexShrink={0}>
        {!hasUserMessage && <PredefinedChips onSelect={handleSend} />}
        <MessageInput onSend={handleSend} disabled={isTyping} />
      </Box>
    </Flex>
  );
};

export default ChatWidget;
