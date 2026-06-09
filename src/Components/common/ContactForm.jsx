import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Box, Input, Textarea, Button, VStack, SimpleGrid, Text, HStack, Heading, Divider, useToast } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const field = {
  bg: "rgba(255,255,255,0.05)",
  border: "1px solid",
  borderColor: "border.subtle",
  borderRadius: "12px",
  size: "lg",
  // Brand display font (Zangezi) used consistently across form controls, per brief.
  fontFamily: "'Zangezi', 'Aeonik Trial', sans-serif",
  letterSpacing: "0.01em",
  _placeholder: { color: "text.faint", fontFamily: "'Zangezi', 'Aeonik Trial', sans-serif" },
  _hover: { borderColor: "border.strong" },
  _focus: { borderColor: "brand.400", boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)" },
};

const ContactForm = () => {
  const form = useRef();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    emailjs
      .sendForm("service_jc2bgz1", "template_j9ap29a", form.current, "nURJDAbLK8UpUR46a")
      .then(
        () => {
          toast({
            title: "Message sent successfully!",
            description: "We’ll get back to you within a couple of hours.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          form.current.reset();
          setIsSubmitting(false);
        },
        () => {
          toast({
            title: "Failed to send message.",
            description: "Please try again or email us directly.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setIsSubmitting(false);
        }
      );
  };

  return (
    <Box
      as="form"
      ref={form}
      onSubmit={sendEmail}
      borderRadius="22px"
      border="1px solid"
      borderColor="border.subtle"
      bg="rgba(13,13,22,0.6)"
      backdropFilter="blur(14px)"
      p={{ base: 6, md: 8 }}
      boxShadow="0 24px 60px -28px rgba(0,0,0,0.7)"
    >
      <VStack spacing={4} align="stretch">
        {/* Header */}
        <Box>
          <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} fontWeight={700} color="text.primary" mb={1}>
            Share your Details
          </Heading>
          <HStack spacing={1} flexWrap="wrap">
            <Text fontSize="sm" color="text.muted">Fill out the form below or</Text>
            <HStack
              as="a"
              href="https://wa.me/917665013356?text=Hello"
              target="_blank"
              rel="noopener noreferrer"
              spacing={1}
              color="#25D366"
              fontWeight={500}
              fontSize="sm"
              _hover={{ color: "#1ebe5d", textDecoration: "none" }}
              transition="color .2s"
            >
              <FaWhatsapp size={16} />
              <Text fontSize="sm" fontWeight={500}>connect via WhatsApp</Text>
            </HStack>
          </HStack>
          <Divider mt={4} borderColor="border.subtle" />
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
          <Input name="user_name" placeholder="Your name" {...field} required />
          <Input name="company" placeholder="Company (optional)" {...field} />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
          <Input name="user_email" type="email" placeholder="Email address" {...field} required />
          <Input name="phone" placeholder="Phone (optional)" {...field} />
        </SimpleGrid>
        <Textarea name="message" placeholder="Tell us about your project…" minH="140px" {...field} required />
        <Button type="submit" variant="gradient" size="lg" rightIcon={<FiSend />} isLoading={isSubmitting} loadingText="Sending…">
          Send message
        </Button>
        <Text fontSize="xs" color="text.faint" textAlign="center">
          We respect your privacy. Your details are only used to respond to your enquiry.
        </Text>
      </VStack>
    </Box>
  );
};

export default ContactForm;
