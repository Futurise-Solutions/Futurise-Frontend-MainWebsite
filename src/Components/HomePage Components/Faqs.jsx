import React from "react";
import {
  Flex, Box, Heading, Text, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { faqs } from "../../utils/Constant";
import { Section, Reveal, Eyebrow } from "../common";

const Faqs = () => {
  const navigate = useNavigate();
  return (
    <Section>
      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 10, lg: 16 }} align="start">
        {/* Left */}
        <Box flex={{ lg: "0 0 38%" }}>
          <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading mt={4} fontSize={{ base: "30px", md: "40px" }} lineHeight={1.15}>
              Questions?{" "}
              <Box as="span" className="gradient-text">We’ve got answers.</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text mt={4} color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7}>
              Everything you need to know about working with us. Can’t find what you’re looking for?
            </Text>
          </Reveal>
          <Reveal delay={0.15}>
            <Button mt={6} variant="gradient" rightIcon={<FiArrowRight />} onClick={() => navigate("/contact")}>
              Talk to us
            </Button>
          </Reveal>
        </Box>

        {/* Right accordion */}
        <Box flex="1" w="full">
          <Accordion allowToggle defaultIndex={[0]}>
            {faqs.map((faq, index) => (
              <Reveal key={index} delay={index * 0.04}>
                <AccordionItem
                  border="1px solid"
                  borderColor="border.subtle"
                  borderRadius="16px"
                  mb={3}
                  bg="bg.surface"
                  overflow="hidden"
                  _hover={{ borderColor: "rgba(111,147,255,0.35)" }}
                  transition="border-color .2s"
                >
                  <AccordionButton py={5} px={6} _hover={{ bg: "transparent" }} _expanded={{ color: "accent.solid" }}>
                    <Box flex="1" textAlign="left" fontWeight={600} fontSize={{ base: "15px", md: "16px" }}>
                      {faq.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel px={6} pb={5} color="text.muted" lineHeight={1.7}>
                    {faq.answer}
                  </AccordionPanel>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </Box>
      </Flex>
    </Section>
  );
};

export default Faqs;
