import React from "react";
import { SimpleGrid, Box, Image, Text, Heading, HStack, Icon, Link as CLink } from "@chakra-ui/react";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { team } from "../../utils/Constant";
import { Section, SectionHeading, GlassCard, Reveal } from "../common";

const Team = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="The people"
        title="Meet the team behind"
        highlight="the work"
        subtitle="A small, senior team of designers, engineers, and strategists who genuinely care about your product."
        mb={{ base: 10, md: 14 }}
      />
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
        {team.map((m, i) => (
          <Reveal key={m.name} delay={(i % 4) * 0.07}>
            <GlassCard h="full" p={6} textAlign="center" role="group">
              <Box position="relative" w="120px" h="120px" mx="auto" mb={5}>
                <Box position="absolute" inset="-6px" borderRadius="full" bgGradient="linear(135deg, brand.500, violet.500)" opacity={0.5} filter="blur(10px)" transition="opacity .3s" _groupHover={{ opacity: 0.9 }} />
                <Image src={m.avatar} alt={m.name} w="120px" h="120px" borderRadius="full" objectFit="cover" position="relative" border="2px solid" borderColor="border.strong" />
              </Box>
              <Heading as="h3" fontSize="lg" fontWeight={600}>{m.name}</Heading>
              <Text color="accent.solid" fontSize="sm" mt={1}>{m.role}</Text>
              <HStack justify="center" spacing={3} mt={4}>
                {[FaLinkedinIn, FaXTwitter].map((Ic, idx) => (
                  <CLink key={idx} href="#" aria-label="social" w="34px" h="34px" display="grid" placeItems="center" borderRadius="full" border="1px solid" borderColor="border.subtle" color="text.muted" _hover={{ color: "white", borderColor: "brand.400", bg: "rgba(111,147,255,0.12)" }}>
                    <Icon as={Ic} boxSize={3.5} />
                  </CLink>
                ))}
              </HStack>
            </GlassCard>
          </Reveal>
        ))}
      </SimpleGrid>
    </Section>
  );
};

export default Team;
