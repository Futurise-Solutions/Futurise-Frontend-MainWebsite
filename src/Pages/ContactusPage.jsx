import React from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Textarea,
  Button,
  IconButton,
  VStack,
  HStack,
  useBreakpointValue,
  SlideFade,
} from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { CustomText } from '.././utils/Texts';
import { CustomButton } from '.././utils/Buttons';
import ClientTestimonials from '../Components/ContactCusCpmponents/ClientTestimonials ';
import ServicesWorldwide from '../Components/ContactCusCpmponents/ServicesWorldwide ';

const ContactUs = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box pt={"5rem"} w="90%" m="auto">
      <Flex   direction={{ base: 'column-reverse', md: 'row' }} justifyContent="space-between" alignItems="start">
        <Box flex="1" textAlign={isMobile ? 'center' : 'left'} mt={4} mb={isMobile ? 8 : 0}>
       
          <SlideFade in offsetY={20}>
            <CustomText variant="callout5">
              Tell us about your Project
            </CustomText>
            <CustomText variant="subheading4" mt={4} color={"#59C6EE"}>
              We’ll contact you within a couple of hours to schedule a meeting to discuss your goals.
            </CustomText>
            <HStack mt={8} spacing={4} justifyContent={isMobile ? 'center' : 'flex-start'}>
              <IconButton
                icon={<FaPhone />}
                aria-label="Phone"
                variant="outline"
                isRound
                size="lg"
                colorScheme="blue"
                _hover={{ bg: 'blue.500', color: 'white' }}
              />
              <IconButton
                icon={<FaEnvelope />}
                aria-label="Email"
                variant="outline"
                isRound
                size="lg"
                colorScheme="blue"
                _hover={{ bg: 'blue.500', color: 'white' }}
              />
              <IconButton
                icon={<FaMapMarkerAlt />}
                aria-label="Location"
                variant="outline"
                isRound
                size="lg"
                colorScheme="blue"
                _hover={{ bg: 'blue.500', color: 'white' }}
              />
            </HStack>
          </SlideFade>
        </Box>
        <Box flex="1"  position={"relative"} overflow={"hidden"}>
          <SlideFade in offsetY={20}>
            <Box   overflow={"hidden"}  p={6} borderRadius="md" boxShadow="xl">
            <Box
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          width="100%"
          height="100%"
          bg="radial-gradient(50% 50% at 50% 50%, rgba(38, 145, 223, 0.40) 6.24%, rgba(38, 145, 223, 0) 100%)"
        ></Box>
              <form>
                <VStack spacing={4} align="stretch">
                 <Flex flexDir={{base:"column", md:"row"}} alignItems={"center"} justifyContent={"center"} gap={2}>
                 <Input placeholder="Name" size="lg" variant="outline" />
                 <Input placeholder="Company" size="lg" variant="outline" />
                 </Flex>
                  <Input placeholder="Email" size="lg" variant="outline" />
                  <Input placeholder="Phone Number" size="lg" variant="outline" />
                  <Textarea placeholder="About Your Project" size="lg" variant="outline" />
                  <CustomButton px={"5rem"} text="Send Message" variant="primary" size="lg" />
                </VStack>
              </form>
            </Box>
          </SlideFade>
        </Box>
      </Flex>

      <ClientTestimonials />
      <ServicesWorldwide />
    </Box>
  );
};

export default ContactUs;
