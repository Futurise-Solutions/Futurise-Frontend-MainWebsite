import { VStack, Box } from "@chakra-ui/react";
import TypingIndicator from "./TypingIndicator";
import ContactFallback from "./ContactFallback";

/** A single chat bubble — gradient + right-aligned for the user, glass surface
 *  + left-aligned for the assistant. */
const Bubble = ({ role, children }) => {
  const isUser = role === "user";
  return (
    <Box
      alignSelf={isUser ? "flex-end" : "flex-start"}
      maxW="85%"
      px="14px"
      py="10px"
      borderRadius="16px"
      borderBottomRightRadius={isUser ? "4px" : "16px"}
      borderBottomLeftRadius={isUser ? "16px" : "4px"}
      bgGradient={isUser ? "linear(135deg, brand.500, violet.500)" : undefined}
      bg={isUser ? undefined : "bg.surface"}
      border={isUser ? "none" : "1px solid"}
      borderColor={isUser ? "transparent" : "border.subtle"}
      color={isUser ? "white" : "text.primary"}
      fontSize="14px"
      lineHeight="1.55"
      whiteSpace="pre-wrap"
      wordBreak="break-word"
      boxShadow={isUser ? "0 8px 20px -12px rgba(123,108,255,0.7)" : "none"}
    >
      {children}
    </Box>
  );
};

/** Renders the full conversation plus the typing indicator. */
const MessageList = ({ messages, isTyping }) => (
  <VStack align="stretch" spacing={3} px={4} py={4}>
    {messages.map((m) =>
      m.isFallback ? (
        <Box key={m.id} alignSelf="flex-start" maxW="92%" w="100%">
          <ContactFallback />
        </Box>
      ) : (
        <Bubble key={m.id} role={m.role}>
          {m.text}
        </Bubble>
      )
    )}

    {isTyping && (
      <Box
        alignSelf="flex-start"
        bg="bg.surface"
        border="1px solid"
        borderColor="border.subtle"
        borderRadius="16px"
        borderBottomLeftRadius="4px"
      >
        <TypingIndicator />
      </Box>
    )}
  </VStack>
);

export default MessageList;
