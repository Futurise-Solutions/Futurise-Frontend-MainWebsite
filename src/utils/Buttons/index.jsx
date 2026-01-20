import { Button } from "@chakra-ui/react";

const variants = {
  primary: {
    bg: "transparent",
    color: "#07ABE8",
    border: "1px solid #07ABE8",
    _hover: {
      bg: "linear-gradient(90deg, #015371 0%, #8ADEFE 100%)",
      color: "white",
    },
  },
  secondary: {
    bg: "gray.500",
    color: "white",
    border: "none",
    _hover: {
      bg: "gray.600",
    },
  },
  tertiary: {
    bg: "transparent",
    color: "blue.500",
    border: "1px solid",
    borderColor: "blue.500",
    _hover: {
      bg: "blue.50",
    },
  },
};

export const CustomButton = ({ variant = "primary", text, onClick , ...props}) => {
  const variantStyles = variants[variant];

  return (
    <Button
      {...variantStyles}
      w={{ base: "120px", md: "140px", lg: "160px", xl: "180px" }}
      h={{ base: "35px", md: "40px", lg: "45px", xl: "50px" }}
      borderRadius="full"
      mt="1rem"
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
};
