import { Wrap, WrapItem, Button } from "@chakra-ui/react";
import { predefinedChips } from "./predefinedQA";

/**
 * Quick-reply pills (Zomato-style). Shown only before the visitor's first
 * message. Clicking one answers instantly from predefinedQA — zero API calls.
 */
const PredefinedChips = ({ onSelect }) => (
  <Wrap spacing={2} px={4} pt={1} pb={3}>
    {predefinedChips.map((chip) => (
      <WrapItem key={chip}>
        <Button
          variant="outlineGlow"
          borderRadius="full"
          fontWeight={500}
          fontSize="12px"
          whiteSpace="normal"
          height="auto"
          minH="30px"
          py="6px"
          px="12px"
          onClick={() => onSelect(chip)}
        >
          {chip}
        </Button>
      </WrapItem>
    ))}
  </Wrap>
);

export default PredefinedChips;
