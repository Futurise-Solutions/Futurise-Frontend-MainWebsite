'use client'

import React, { useState } from "react";
import {
  Flex, Box, Heading, Text, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import { faqs } from "../../utils/Constant";
import Section from "../common/Section";
import Reveal from "../common/Reveal";
import { Eyebrow } from "../common/SectionHeading";

import dynamic from "next/dynamic";

/* PHASE 8: AuroraField is a purely DECORATIVE animated backdrop — three blurred radial
   washes, no text, aria-hidden by construction. It is the one component here that is
   correct to load with ssr: false: it contributes nothing a crawler reads, and it is
   absolutely positioned behind the content, so it reserves no space and cannot shift
   layout when it appears. */
const AuroraField = dynamic(() => import("@/components/common/AuroraField"), { ssr: false });

const Faqs = ({
  items = faqs,
  eyebrow = "FAQ",
  title = "Questions?",
  highlight = "We’ve got answers.",
  intro = "Everything you need to know about working with us. Can’t find what you’re looking for?",
}) => {
  // react-router-dom → next/navigation, kept as `navigate(to)` so call sites are verbatim.
  const router = useRouter();
  const navigate = (to) => router.push(to);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    // The FAQ is the last long read before the CTA — a two-column block of accordion
    // rows on flat canvas. The drifting light gives the end of the page somewhere to
    // rest without adding a fourth interstitial band to a page that already has three.
    <Section isolation="isolate" containerProps={{ position: "relative", zIndex: 2 }}>
      <AuroraField intensity="soft" />
      {/* Keep all FAQ content above the absolute decorative background. */}
      <Flex position="relative" zIndex={1} direction={{ base: "column", lg: "row" }} gap={{ base: 10, lg: 16 }} align="start">
        {/* Left */}
        <Box flex={{ lg: "0 0 38%" }} position={{ base: "static", lg: "sticky" }} top="125px" alignSelf="flex-start">
          <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <Heading mt={4} fontSize={{ base: "30px", md: "40px" }} lineHeight={1.15}>
              {title}{" "}
              <Box as="span" className="gradient-text">{highlight}</Box>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Text mt={4} color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7}>
              {intro}
            </Text>
          </Reveal>
          <Reveal delay={0.15}>
            <Button mt={6} variant="gradient" rightIcon={<FiArrowRight />} onClick={() => navigate("/contact")}>
              Talk to us
            </Button>
          </Reveal>
        </Box>

        {/* Right accordion — single Reveal wrapper prevents per-item re-animation bug */}
        <Box flex="1" w="full">
          <Reveal>
            <Accordion
              allowToggle
              index={openIndex}
              onChange={(idx) => setOpenIndex(idx)}
            >
              {items.map((faq, index) => (
                <AccordionItem
                  key={index}
                  border="1px solid"
                  borderColor="border.subtle"
                  borderRadius="4px"
                  mb={3}
                  bg="bg.surface"
                  overflow="hidden"
                  _hover={{ borderColor: "rgba(180,160,255,0.35)" }}
                  transition="border-color .2s"
                >
                  {/* Questions are wrapped in a heading (Chakra's documented accordion
                      pattern) so they form real document structure. Search and answer
                      engines match FAQ headings to queries; a plain <div> is invisible
                      to that. The heading wraps the button rather than sitting inside
                      it, since <button> only accepts phrasing content. */}
                  <Box as="h3" m={0}>
                    <AccordionButton py={6} px={{ base: 4, md: 6 }} gap={4} color="text.primary" _hover={{ bg: "rgba(123,108,255,.05)" }} _expanded={{ color: "#B57BFF", bg: "rgba(123,108,255,.07)" }}>
                      <Box as="span" aria-hidden="true" fontSize="10px" color="#B57BFF" fontWeight={400}>{String(index + 1).padStart(2, '0')}</Box>
                      <Box flex="1" textAlign="left" fontWeight={600} fontSize={{ base: "15px", md: "16px" }}>
                        {faq.question}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Box>
                  <AccordionPanel px={6} pb={5} color="text.muted" lineHeight={1.7}>
                    {faq.answer}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Box>
      </Flex>
    </Section>
  );
};

export default Faqs;
