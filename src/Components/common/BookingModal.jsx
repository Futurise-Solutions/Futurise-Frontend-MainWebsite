import {
  Box,
  Flex,
  Text,
  Icon,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import { useBooking } from "../../context/BookingContext";

const BookingModal = () => {
  const { isOpen, onClose, iframeLoaded, setIframeLoaded } = useBooking();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="blur(8px)" bg="rgba(0,0,0,0.6)" />
      <ModalContent
        bg="bg.card"
        border="1px solid"
        borderColor="border.subtle"
        borderRadius="20px"
        overflow="hidden"
        mx={4}
      >
        <ModalHeader
          borderBottom="1px solid"
          borderColor="border.subtle"
          pb={4}
        >
          <HStack spacing={3}>
            <Flex
              w="36px"
              h="36px"
              borderRadius="10px"
              align="center"
              justify="center"
              bgGradient="linear(135deg, rgba(123,108,255,0.3), rgba(181,123,255,0.3))"
              border="1px solid"
              borderColor="rgba(180,160,255,0.3)"
            >
              <Icon as={FiCalendar} color="accent.solid" boxSize={4} />
            </Flex>
            <Box>
              <Text fontSize="md" fontWeight={700}>
                Book a free strategy call
              </Text>
              <Text fontSize="xs" color="text.faint" fontWeight={400}>
                45 minutes · Futurise Solutions
              </Text>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton top={4} right={4} color="text.muted" />
        <ModalBody p={0}>
          <Box
            px={5}
            py={4}
            borderBottom="1px solid"
            borderColor="border.subtle"
          >
            <Text fontSize="sm" color="text.muted" lineHeight={1.75}>
              {
                "Book a free 45-minute strategy call with the Futurise Solutions team. We'll discuss your project goals, recommend the right tech stack, and give you a clear build roadmap — whether it's an AI agent, SaaS platform, web app, or mobile app. No sales pitch. Just a focused conversation about your idea."
              }
            </Text>
          </Box>

          <Box position="relative" h={{ base: "480px", md: "580px" }}>
            {!iframeLoaded && (
              <Flex
                position="absolute"
                inset={0}
                align="center"
                justify="center"
                direction="column"
                gap={3}
                bg="bg.card"
                zIndex={1}
              >
                <Spinner
                  color="accent.solid"
                  size="xl"
                  thickness="3px"
                  speed="0.8s"
                />
                <Text fontSize="sm" color="text.faint">
                  Loading calendar…
                </Text>
              </Flex>
            )}
            <Box
              as="iframe"
              sx={{
                backgroundColor: "#fff",
                display: "block",
              }}
              src="https://calendar.app.google/oZ5ENgnwaCWAchAv6"
              w="full"
              h="full"
              border="none"
              title="Book a strategy call with Futurise Solutions"
              onLoad={() => setIframeLoaded(true)}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BookingModal;
