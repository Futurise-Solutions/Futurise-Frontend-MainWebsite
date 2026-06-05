import { Button } from "@chakra-ui/react";

/** Maps the legacy variant names onto the new theme button variants. */
const variantMap = {
  primary: "gradient",
  secondary: "outlineGlow",
  tertiary: "outlineGlow",
};

export const CustomButton = ({ variant = "primary", text, onClick, ...props }) => {
  return (
    <Button
      variant={variantMap[variant] || "gradient"}
      h={{ base: "42px", md: "46px", lg: "50px" }}
      px={{ base: 6, md: 8 }}
      mt="1rem"
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
};
