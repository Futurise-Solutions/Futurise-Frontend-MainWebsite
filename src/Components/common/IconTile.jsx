import { Box, Flex } from "@chakra-ui/react";

/**
 * Premium icon tile with an always-on lavender glow halo — matches the
 * highlighted service card in the design reference. Used consistently for
 * service / feature / capability icons across the site.
 *
 * Pass the icon (an <Image> or react-icon <Icon>) as children.
 * `role="group"` on an ancestor card enables the subtle hover lift.
 */
const IconTile = ({ children, size = "56px", radius = "16px", ...rest }) => (
  <Box position="relative" w={size} h={size} flexShrink={0} {...rest}>
    {/* soft glow halo (always visible) */}
    <Box
      position="absolute"
      inset="-26%"
      borderRadius="50%"
      bg="radial-gradient(circle, rgba(150,120,255,0.55) 0%, rgba(123,108,255,0.18) 45%, transparent 70%)"
      filter="blur(8px)"
      pointerEvents="none"
      transition="opacity .3s"
      opacity={0.85}
      _groupHover={{ opacity: 1 }}
    />
    {/* dark tile */}
    <Flex
      position="relative"
      w={size}
      h={size}
      borderRadius={radius}
      align="center"
      justify="center"
      bg="bg.canvas"
      border="1px solid"
      borderColor="rgba(180,160,255,0.45)"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 26px -10px rgba(123,108,255,0.6)"
      transition="transform .3s ease"
      _groupHover={{ transform: "scale(1.06)" }}
    >
      {children}
    </Flex>
  </Box>
);

export default IconTile;
