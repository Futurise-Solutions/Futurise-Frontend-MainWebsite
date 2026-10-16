'use client'
import { Container, Heading, SimpleGrid, Text, Link as ChakraLink, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { solutionLinks, countrySolutionOrder, marketNames, variantMarkets, solutionHref } from "@/utils/Constant/solutionLinks";

const HEADINGS = {
  eu: "What we build for European teams",
  in: "What we build for Indian businesses",
  us: "What we build for US companies",
  ca: "What we build for Canadian businesses",
  nz: "What we build for New Zealand businesses",
  ae: "What we build for UAE businesses",
  au: "What we build for Australian businesses",
};

/** Every country page lists every solution, in the order that sells in that market. No hooks. */
export default function CountrySolutions({ market }) {
  const order = countrySolutionOrder[market];
  const names = marketNames[market];
  if (!order || !names) return null;
  const bySlug = Object.fromEntries(solutionLinks.map((s) => [s.slug, s]));
  const heading = HEADINGS[market] || `What we build for ${names.label} businesses`;
  return (
    <Container maxW="container.site" px={{ base: 5, md: 8 }} pb={{ base: 12, md: 16 }}>
      <Heading as="h2" fontSize={{ base: "22px", md: "28px" }} lineHeight={1.2} mb={3}>
        {heading}
      </Heading>
      <Text color="text.muted" fontSize="15px" mb={5}>
        Specialist systems we&apos;ve built and delivered. Each is shown live on a call.
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3}>
        {order.map((slug) => (
          <ChakraLink
            key={slug}
            as={Link}
            href={solutionHref(slug, market)}
            p={4}
            borderRadius="14px"
            border="1px solid"
            borderColor="border.subtle"
            bg="bg.surface"
            color="text.primary"
            fontSize="14px"
            fontWeight={500}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            _hover={{ borderColor: "brand.400", bg: "bg.surfaceHover", textDecoration: "none" }}
            transition="border-color .2s, background .2s"
          >
            <span>
              {bySlug[slug].name}
              {variantMarkets[slug]?.includes(market) && (
                <Text as="span" ml={2} fontSize="11px" color="text.faint" letterSpacing="0.08em" textTransform="uppercase">
                  {names.short} page
                </Text>
              )}
            </span>
            <Icon as={FiArrowUpRight} color="accent.solid" flexShrink={0} />
          </ChakraLink>
        ))}
      </SimpleGrid>
    </Container>
  );
}
