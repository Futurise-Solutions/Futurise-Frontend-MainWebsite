import { Box, Container } from "@chakra-ui/react";

/**
 * Consistent vertical rhythm + max-width wrapper for every page section.
 * `bleed` renders full-width children (no container) for backgrounds.
 */
const Section = ({ children, py, maxW = "1200px", containerProps, ...rest }) => (
  <Box
    as="section"
    py={py || { base: "64px", md: "96px" }}
    position="relative"
    {...rest}
  >
    <Container maxW={maxW} px={{ base: 5, md: 8 }} {...containerProps}>
      {children}
    </Container>
  </Box>
);

export default Section;
