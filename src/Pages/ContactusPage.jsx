import React, { useEffect, useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import {
  Box,
  Flex,
  Input,
  Textarea,
  IconButton,
  VStack,
  HStack,
  useBreakpointValue,
  SlideFade,
  useToast,
} from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { CustomText } from ".././utils/Texts";
import { CustomButton } from ".././utils/Buttons";
import ClientTestimonials from "../Components/ContactCusCpmponents/ClientTestimonials ";
import ServicesWorldwide from "../Components/ContactCusCpmponents/ServicesWorldwide ";
import { contactUsBanner } from "../assests";

const ContactUs = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const form = useRef();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        'service_aklnuiw',      // Replace with your Service ID
        'template_gk2kprc',     // Replace with your Template ID
        form.current,
        'FntxJE6K20dcaUpvs'       // Replace with your Public Key
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          toast({
            title: "Message sent successfully!",
            description: "We'll contact you within a couple of hours.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          form.current.reset();
          setIsSubmitting(false);
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast({
            title: "Failed to send message.",
            description: "Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setIsSubmitting(false);
        }
      );
  };
  return (
    <Box pt={"5rem"} m="auto">
      <Box
        backgroundImage={`url(${contactUsBanner})`}
        bgRepeat={"no-repeat"}
        backgroundSize={"cover"}
        opacity={1}
        position={"relative"}
        overflow={"hidden"}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          h="1000px"
          w="100%"
          bg="black"
          zIndex={0}
          opacity={0.7}
        />
        <Flex
          w={"90%"}
          m={"auto"}
          direction={{ base: "column-reverse", md: "row" }}
          justifyContent="space-between"
          alignItems="start"
          zIndex={1000}
        >
          <Box
            textAlign={isMobile ? "center" : "left"}
            mt={4}
            mb={isMobile ? 8 : 0}
            zIndex={1000}
            w={isMobile ? "100%" : "40%"}
          >
            <SlideFade in offsetY={20}>
              <CustomText variant="callout5">
                Tell us about your Project
              </CustomText>
              <CustomText variant="subheading4" mt={4} color={"#59C6EE"}>
                We’ll contact you within a couple of hours to schedule a meeting
                to discuss your goals.
              </CustomText>
              <HStack
                mt={8}
                spacing={4}
                justifyContent={isMobile ? "center" : "flex-start"}
              >
                <IconButton
                  icon={<FaPhone />}
                  aria-label="Phone"
                  variant="outline"
                  isRound
                  size="lg"
                  colorScheme="blue"
                  _hover={{ bg: "blue.500", color: "white" }}
                />
                <IconButton
                  icon={<FaEnvelope />}
                  aria-label="Email"
                  variant="outline"
                  isRound
                  size="lg"
                  colorScheme="blue"
                  _hover={{ bg: "blue.500", color: "white" }}
                />
                <IconButton
                  icon={<FaMapMarkerAlt />}
                  aria-label="Location"
                  variant="outline"
                  isRound
                  size="lg"
                  colorScheme="blue"
                  _hover={{ bg: "blue.500", color: "white" }}
                />
              </HStack>
            </SlideFade>
          </Box>
          <Box
            zIndex={1000}
            w={isMobile ? "100%" : "55%"}
            position={"relative"}
            overflow={"hidden"}
          >
            <SlideFade in offsetY={20}>
              <Box overflow={"hidden"} borderRadius="md" boxShadow="xl">
                <Box
                  position="absolute"
                  top="0"
                  left="50%"
                  transform="translateX(-50%)"
                  width="100%"
                  height="100%"
                  bg="radial-gradient(50% 50% at 50% 50%, rgba(38, 145, 223, 0.40) 6.24%, rgba(38, 145, 223, 0) 100%)"
                ></Box>
                <form className="form"  ref={form} onSubmit={sendEmail}>
                  <VStack spacing={4} align="stretch">
                    <Flex
                      flexDir={{ base: "column", md: "row" }}
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <Input  name="user_name" placeholder="Name" size="lg" variant="outline" required />
                      <Input
                        name="company"
                        placeholder="Company"
                        size="lg"
                        variant="outline"
                      />
                    </Flex>
                    <Input name="user_email" placeholder="Email" size="lg" variant="outline"  required/>
                    <Input
                    name="phone"
                      placeholder="Phone Number"
                      size="lg"
                      variant="outline"
                    />
                    <Textarea
                    name="message"
                      placeholder="About Your Project"
                      size="lg"
                      variant="outline"
                      required
                    />
                    <CustomButton
                      px={"5rem"}
                      text={isSubmitting ? "Sending..." : "Send Message"}
                      variant="primary"
                      size="lg"
                      m={isMobile ? "auto" : "none"}
                      type="submit"
                      isDisabled={isSubmitting}
                    />
                  </VStack>
                </form>
              </Box>
            </SlideFade>
          </Box>
        </Flex>
      </Box>

      <ClientTestimonials />
      <ServicesWorldwide />
    </Box>
  );
};

export default ContactUs;
