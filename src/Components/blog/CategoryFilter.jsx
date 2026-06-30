import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Box, Text } from "@chakra-ui/react";

const MotionBox = motion(Box);

/**
 * CategoryFilter — Premium Glassmorphism Pill Bar
 * -----------------------------------------------
 * Visual upgrade of the original HStack/Button pill row.
 * - Framer Motion `layoutId` creates a smooth sliding active indicator.
 * - Glassmorphism outer container: frosted glass + subtle border.
 * - Active state: brand gradient with glow — matches Futurise design tokens.
 * - Inactive: translucent with hover glow.
 * - Horizontal scroll on mobile, hidden scrollbar.
 * - Same prop API: categories, active, onChange — NO logic change.
 */
const CategoryFilter = ({ categories = [], active = "All", onChange }) => {
  const options = ["All", ...categories];

  return (
    <Box
      overflowX="auto"
      py={1}
      sx={{
        "&::-webkit-scrollbar": { height: "0px" },
        scrollbarWidth: "none",
      }}
    >
      {/* Glassmorphism container */}
      <Box
        display="inline-flex"
        minW="max-content"
        p="5px"
        borderRadius="full"
        bg="rgba(255,255,255,0.04)"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="rgba(255,255,255,0.09)"
        boxShadow="inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px -8px rgba(0,0,0,0.4)"
        gap="2px"
      >
        <LayoutGroup id="blog-category-filter">
          {options.map((cat) => {
            const isActive = active === cat;
            return (
              <Box
                key={cat}
                position="relative"
                flexShrink={0}
                borderRadius="full"
                cursor="pointer"
                onClick={() => onChange?.(cat)}
              >
                {/* Sliding active highlight — Framer Motion layoutId for smooth transition */}
                {isActive && (
                  <MotionBox
                    layoutId="cat-highlight"
                    position="absolute"
                    inset={0}
                    borderRadius="full"
                    bgGradient="linear(135deg, brand.500, violet.500)"
                    boxShadow="0 4px 20px -6px rgba(123,108,255,0.7), 0 0 0 1px rgba(180,160,255,0.3)"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}

                {/* Pill label */}
                <Text
                  position="relative"
                  zIndex={1}
                  px={{ base: 3, md: 4 }}
                  py="7px"
                  fontSize={{ base: "12px", md: "13px" }}
                  fontWeight={isActive ? 600 : 500}
                  letterSpacing="0.01em"
                  color={isActive ? "white" : "text.muted"}
                  borderRadius="full"
                  transition="color .2s ease"
                  _hover={{
                    color: isActive ? "white" : "text.primary",
                    bg: isActive ? "transparent" : "rgba(180,160,255,0.08)",
                  }}
                  whiteSpace="nowrap"
                  userSelect="none"
                >
                  {cat}
                </Text>
              </Box>
            );
          })}
        </LayoutGroup>
      </Box>
    </Box>
  );
};

export default CategoryFilter;
