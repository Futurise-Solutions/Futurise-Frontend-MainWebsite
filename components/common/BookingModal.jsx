'use client'

/**
 * Ported VERBATIM from src/Components/common/BookingModal.jsx.
 *
 * Only three things differ from the source: the 'use client' directive (it uses hooks,
 * framer-motion and window), and the two import paths below.
 *
 * 🔴 THIS FILE WAS MISSING UNTIL NOW, AND ITS ABSENCE BROKE THE SITE'S PRIMARY
 * CONVERSION PATH. BookingProvider, useBooking and every "Book a call" button were
 * ported in Phase 4, but the modal they open was not — app/layout.tsx referenced
 * <BookingModal /> only inside a comment describing the old App.jsx shell. So every
 * button called openBooking(), state flipped to isOpen: true, and nothing rendered,
 * because no component was subscribed to that state. No error, no warning — the click
 * simply did nothing.
 *
 * It is mounted in app/layout.tsx INSIDE <BookingProvider>. Mounting it outside gives it
 * a null context and the same silent failure in a new form.
 */
import {
  Box,
  Flex,
  Text,
  Icon,
  HStack,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import { trackEvent, EVENTS } from "@/utils/analytics";

const MotionBox = motion.create(Box);

/**
 * BookingModal — Premium CTA design (iframe-free)
 * -----------------------------------------------
 * The original design embedded calendar.app.google in an <iframe>.
 * Google sends X-Frame-Options: DENY on that URL, which causes
 * "refused to connect" on every browser (not just Mac/Safari).
 *
 * Fix: open the booking link in a new tab, which works universally.
 * The modal now serves as a high-converting "pre-click" frame that
 * describes the call and gives the user confidence before they book.
 */

const BOOKING_URL = "https://calendar.app.google/oZ5ENgnwaCWAchAv6";

const BENEFITS = [
  "Discuss your project goals & tech requirements",
  "Get a recommended tech stack for your idea",
  "Receive a clear build roadmap & timeline estimate",
  "No sales pitch — just honest, expert advice",
];

const BookingModal = () => {
  const { isOpen, onClose, source } = useBooking();

  const handleBook = () => {
    // The real conversion: the visitor has left for the booking calendar. Fired before
    // window.open so a popup blocker cannot swallow the measurement too.
    trackEvent(EVENTS.BOOKING_CALENDAR_OPEN, { location: source });
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      isCentered
      motionPreset="slideInBottom"
      trapFocus={false}
    >
      <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0,0,0,0.65)" />
      <ModalContent
        bg="#0d0d16"
        border="1px solid"
        borderColor="rgba(180,160,255,0.2)"
        borderRadius="24px"
        overflow="hidden"
        mx={4}
        position="relative"
      >
        {/* Background glow orbs */}
        <Box
          position="absolute"
          top="-60px"
          right="-40px"
          w="200px"
          h="200px"
          bg="rgba(123,108,255,0.12)"
          filter="blur(60px)"
          borderRadius="full"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          bottom="-40px"
          left="-30px"
          w="160px"
          h="160px"
          bg="rgba(181,123,255,0.1)"
          filter="blur(50px)"
          borderRadius="full"
          pointerEvents="none"
        />

        {/* Header */}
        <ModalHeader
          borderBottom="1px solid"
          borderColor="rgba(255,255,255,0.07)"
          pb={4}
          pr={{ base: "48px", md: "6" }}
          position="relative"
        >
          <HStack spacing={3}>
            <Flex
              w="40px"
              h="40px"
              borderRadius="12px"
              align="center"
              justify="center"
              bgGradient="linear(135deg, rgba(123,108,255,0.35), rgba(181,123,255,0.35))"
              border="1px solid"
              borderColor="rgba(180,160,255,0.35)"
            >
              <Icon as={FiCalendar} color="accent.solid" boxSize={5} />
            </Flex>
            <Box>
              <Text fontSize="md" fontWeight={700} color="text.primary">
                Book a Free Strategy Call
              </Text>
              <HStack spacing={1.5}>
                <Icon as={FiClock} boxSize={3} color="text.faint" />
                <Text fontSize="xs" color="text.faint" fontWeight={400}>
                  45 minutes · Futurise Solutions
                </Text>
              </HStack>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton top={4} right={4} color="text.muted" />

        {/* Body */}
        <ModalBody py={6} px={6} position="relative">
          <VStack spacing={6} align="stretch">
            {/* Description */}
            <Text fontSize="sm" color="text.muted" lineHeight={1.8}>
              Talk to our experts about your project. We'll give you a clear
              tech stack recommendation and build roadmap —{" "}
              <Box as="span" color="accent.solid" fontWeight={600}>
                completely free, no sales pitch.
              </Box>
            </Text>

            {/* What to expect */}
            <Box
              p={4}
              borderRadius="16px"
              bg="rgba(123,108,255,0.07)"
              border="1px solid"
              borderColor="rgba(180,160,255,0.15)"
            >
              <Text
                fontSize="11px"
                fontWeight={700}
                letterSpacing="0.1em"
                textTransform="uppercase"
                color="accent.solid"
                mb={3}
              >
                What You'll Get
              </Text>
              <VStack spacing={2.5} align="stretch">
                {BENEFITS.map((b) => (
                  <HStack key={b} spacing={2.5} align="flex-start">
                    <Icon
                      as={FiCheckCircle}
                      color="accent.solid"
                      boxSize={4}
                      mt="1px"
                      flexShrink={0}
                    />
                    <Text fontSize="13px" color="text.muted" lineHeight={1.6}>
                      {b}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            {/* CTA */}
            <MotionBox
              position="relative"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Glow behind button */}
              <Box
                position="absolute"
                inset="-4px"
                borderRadius="full"
                bgGradient="linear(135deg, brand.500, violet.500)"
                filter="blur(14px)"
                opacity={0.4}
                pointerEvents="none"
              />
              <Button
                w="full"
                size="lg"
                variant="gradient"
                rightIcon={<FiArrowRight />}
                onClick={handleBook}
                position="relative"
                fontSize="15px"
                py={6}
                sx={{
                  "& svg": { transition: "transform .25s" },
                  _hover: { "& svg": { transform: "translateX(5px)" } },
                }}
              >
                Open Booking Calendar
              </Button>
            </MotionBox>

            {/* Trust signal */}
            <Text
              textAlign="center"
              fontSize="12px"
              color="text.faint"
              lineHeight={1.6}
            >
              Opens Google Calendar · Secure · Free · No commitment
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BookingModal;
