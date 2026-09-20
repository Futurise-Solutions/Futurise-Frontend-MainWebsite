'use client'

import { Wrap, WrapItem, Button } from "@chakra-ui/react";
import { predefinedChips } from "./predefinedQA";

/**
 * Quick-reply pills (Zomato-style). Shown only before the visitor's first
 * message. Clicking one answers instantly from predefinedQA — zero API calls.
 */
const PredefinedChips = ({ onSelect }) => (
  <Wrap spacing={2} px={4} pt={1} pb={3}>
    {predefinedChips.map((chip, idx) => (
      <WrapItem key={chip} display={idx >= 3 ? { base: "none", sm: "block" } : "block"}>
        <Button
          variant="outlineGlow"
          borderRadius="full"
          fontWeight={500}
          fontSize={{ base: "11px", sm: "12px" }}
          whiteSpace="normal"
          height="auto"
          minH={{ base: "26px", sm: "30px" }}
          py={{ base: "4px", sm: "6px" }}
          px={{ base: "10px", sm: "12px" }}
          onClick={() => onSelect(chip)}
        >
          {chip}
        </Button>
      </WrapItem>
    ))}
  </Wrap>
);

export default PredefinedChips;
