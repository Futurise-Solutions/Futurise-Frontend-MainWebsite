import { Text } from "@chakra-ui/react";

const textVariants = {
  heading: {
    fontSize: { base: "32px", md: "40px", lg: "52px" },
    fontWeight: "500",
    lineHeight: { base: "40px", md: "60px", lg: "100px" },
  },
  subheading: {
    fontSize: { base: "16px", md: "18px", lg: "20px" },
    fontWeight: "400",
    lineHeight: { base: "20px", md: "22px", lg: "25px" },
  },
  subheading1: {
    fontSize: { base: "18px", md: "25px", lg: "28px" },
    fontWeight: "400",
    lineHeight: { base: "24px", md: "28px", lg: "32px" },
  },
};

export const CustomText = ({ variant = "heading", children, styles }) => {
  const variantStyles = textVariants[variant];
  return (
    <Text {...variantStyles} style={styles}>
      {children}
    </Text>
  );
};
