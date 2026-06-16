import { useState } from "react";
import { HStack, Input, IconButton } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";

/** Text input + send button. Enter submits. Disabled while the AI is replying. */
const MessageInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  return (
    <HStack
      as="form"
      onSubmit={submit}
      spacing={2}
      p={3}
      borderTop="1px solid"
      borderColor="border.subtle"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask me anything…"
        variant="unstyled"
        px={4}
        py={2}
        h="42px"
        bg="bg.surface"
        borderRadius="full"
        border="1px solid"
        borderColor="border.subtle"
        fontSize="14px"
        color="text.primary"
        _placeholder={{ color: "text.faint" }}
        _focus={{ borderColor: "brand.400", bg: "bg.surfaceHover" }}
        autoComplete="off"
      />
      <IconButton
        type="submit"
        aria-label="Send message"
        icon={<FiSend />}
        variant="gradient"
        boxSize="42px"
        minW="42px"
        borderRadius="full"
        isDisabled={disabled || !value.trim()}
      />
    </HStack>
  );
};

export default MessageInput;
