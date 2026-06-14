import React from "react";
import { Button, HStack } from "@chakra-ui/react";

/** Horizontal pill bar for filtering blogs by category. */
const CategoryFilter = ({ categories = [], active = "All", onChange }) => {
  const options = ["All", ...categories];
  return (
    <HStack
      spacing={2}
      overflowX="auto"
      py={1}
      sx={{
        "&::-webkit-scrollbar": { height: "0px" },
        scrollbarWidth: "none",
      }}
    >
      {options.map((cat) => {
        const isActive = active === cat;
        return (
          <Button
            key={cat}
            size="sm"
            flexShrink={0}
            borderRadius="full"
            onClick={() => onChange?.(cat)}
            transition="all .2s"
            {...(isActive
              ? {
                  bgGradient: "linear(135deg, brand.500, violet.500)",
                  color: "white",
                  boxShadow: "0 4px 20px -8px rgba(123,108,255,0.6)",
                  _hover: { bgGradient: "linear(135deg, brand.500, violet.500)", transform: "translateY(-1px)" },
                }
              : {
                  variant: "outlineGlow",
                  color: "text.muted",
                })}
          >
            {cat}
          </Button>
        );
      })}
    </HStack>
  );
};

export default CategoryFilter;
