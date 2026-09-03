import { Box, Container } from "@chakra-ui/react";

/**
 * Consistent vertical rhythm + max-width wrapper for every page section.
 * `bleed` renders full-width children (no container) for backgrounds.
 *
 * The default is the fluid `container.site` token rather than a literal 1200px — see the
 * note on `sizes` in theme/index.js for why. Pass an explicit `maxW` for sections that
 * should stay narrow (prose, forms); those are unaffected by the fluid width.
 */
const Section = ({ children, py, maxW = "container.site", containerProps, ...rest }) => (
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
