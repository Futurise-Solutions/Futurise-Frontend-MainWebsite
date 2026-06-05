import { Box, Heading, Text, HStack } from "@chakra-ui/react";
import Reveal from "./Reveal";

/** Eyebrow chip used above headings across the site. */
export const Eyebrow = ({ children, ...rest }) => (
  <HStack
    spacing={2}
    display="inline-flex"
    px={3}
    py={1.5}
    borderRadius="full"
    bg="rgba(111,147,255,0.1)"
    border="1px solid"
    borderColor="rgba(111,147,255,0.25)"
    {...rest}
  >
    <Box w="6px" h="6px" borderRadius="full" bgGradient="linear(135deg, brand.400, violet.500)" />
    <Text
      fontSize="xs"
      fontWeight={600}
      letterSpacing="0.16em"
      textTransform="uppercase"
      color="accent.solid"
    >
      {children}
    </Text>
  </HStack>
);

/**
 * Standard section header: eyebrow + gradient-accented title + subtitle.
 * align="center" | "left"
 */
const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  maxW = "640px",
  ...rest
}) => {
  const isCenter = align === "center";
  return (
    <Reveal
      from="up"
      textAlign={isCenter ? "center" : "left"}
      mx={isCenter ? "auto" : 0}
      maxW={maxW}
      {...rest}
    >
      {eyebrow && (
        <Box mb={4}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Box>
      )}
      <Heading
        as="h2"
        fontSize={{ base: "30px", md: "40px", lg: "46px" }}
        lineHeight={1.12}
      >
        {title}{" "}
        {highlight && <Box as="span" className="gradient-text">{highlight}</Box>}
      </Heading>
      {subtitle && (
        <Text mt={4} color="text.muted" fontSize={{ base: "md", md: "lg" }} lineHeight={1.7}>
          {subtitle}
        </Text>
      )}
    </Reveal>
  );
};

export default SectionHeading;
