import { Box } from "@chakra-ui/react";

/**
 * Frosted-glass surface used for cards everywhere. Hover lift + gradient border glow.
 */
const GlassCard = ({ children, hover = true, ...rest }) => (
  <Box
    position="relative"
    bg="bg.surface"
    border="1px solid"
    borderColor="border.subtle"
    borderRadius="20px"
    backdropFilter="blur(12px)"
    overflow="hidden"
    transition="all .3s cubic-bezier(0.22,1,0.36,1)"
    _hover={
      hover
        ? {
            transform: "translateY(-6px)",
            borderColor: "rgba(111,147,255,0.45)",
            boxShadow: "0 24px 50px -24px rgba(79,123,255,0.45)",
            bg: "bg.surfaceHover",
          }
        : undefined
    }
    {...rest}
  >
    {children}
  </Box>
);

export default GlassCard;
