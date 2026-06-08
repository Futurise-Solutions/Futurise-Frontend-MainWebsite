import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Box, Input, Textarea, Button, VStack, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";

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
      .sendForm("service_aklnuiw", "template_gk2kprc", form.current, "FntxJE6K20dcaUpvs")
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
