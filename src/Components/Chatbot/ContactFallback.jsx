import { Box, Text, VStack, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { useBooking } from "../../context/BookingContext";
import { whatsappLink } from "../../utils/Constant";
import { trackEvent, EVENTS } from "../../utils/analytics";

/**
 * Last-resort answer: shown when both the AI and the keyword matcher fail to
 * find a specific answer. Gives the visitor three direct ways to reach us.
 */
const ContactFallback = () => {
  const booking = useBooking();
  const openBooking = booking?.onOpen;

  return (
    <Box
      p={4}
      borderRadius="14px"
      border="1px solid"
      borderColor="border.subtle"
      bg="bg.surface"
    >
      <Text fontSize="14px" color="text.muted" mb={3}>
        I couldn&apos;t find a specific answer. Here&apos;s how to reach us directly:
      </Text>
      <VStack spacing={2} align="stretch">
        <Button
          as="a"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: "chatbot-fallback" })}
          size="sm"
          variant="outlineGlow"
          leftIcon={<FaWhatsapp />}
        >
          Chat on WhatsApp
        </Button>
        <Button
          size="sm"
          variant="gradient"
          leftIcon={<FiCalendar />}
          onClick={() => openBooking?.("chatbot-fallback")}
          isDisabled={!openBooking}
        >
          Book a Free Call
        </Button>
        <Button
          as={RouterLink}
          to="/contact"
          size="sm"
          variant="ghostLink"
          rightIcon={<FiArrowRight />}
        >
          Send us a message
        </Button>
      </VStack>
    </Box>
  );
};

export default ContactFallback;
