import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { CustomText } from ".././utils/Texts";
import { CustomButton } from ".././utils/Buttons";
import ClientTestimonials from "../Components/ContactCusCpmponents/ClientTestimonials ";
import ServicesWorldwide from "../Components/ContactCusCpmponents/ServicesWorldwide ";
import { contactUsBanner } from "../assests";

const ContactUs = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
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
                <form className="form">
                  <VStack spacing={4} align="stretch">
                    <Flex
                      flexDir={{ base: "column", md: "row" }}
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <Input placeholder="Name" size="lg" variant="outline" />
                      <Input
                        placeholder="Company"
                        size="lg"
                        variant="outline"
                      />
                    </Flex>
                    <Input placeholder="Email" size="lg" variant="outline" />
                    <Input
                      placeholder="Phone Number"
                      size="lg"
                      variant="outline"
                    />
                    <Textarea
                      placeholder="About Your Project"
                      size="lg"
                      variant="outline"
                    />
                    <CustomButton
                      px={"5rem"}
                      text="Send Message"
                      variant="primary"
                      size="lg"
                      m={isMobile ? "auto" : "none"}
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
