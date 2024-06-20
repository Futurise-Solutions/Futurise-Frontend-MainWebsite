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
  subheading2: {
    fontSize: { base: "16px", md: "18px", lg: "20px" },
    fontWeight: "500",
    lineHeight: { base: "20px", md: "22px", lg: "25px" },
  },
  callout: {
    fontSize: { base: "15px", md: "20px", lg: "22px" },
    fontWeight: "600",
    lineHeight: { base: "20px", md: "22px", lg: "26px" },
  },
  callout1: {
    fontSize: { base: "20px", md: "24px", lg: "28px" },
    fontWeight: "700",
    lineHeight: { base: "21px", md: "27px", lg: "32px" },
  },
  callout2: {
    fontSize: { base: "11px", md: "15px", lg: "18px" },
    fontWeight: "300",
    lineHeight: { base: "19px", md: "24px", lg: "28px" },
  }
};

export const CustomText = ({ variant = "heading", children, styles }) => {
  const variantStyles = textVariants[variant];
  return (
    <Text {...variantStyles} style={styles}>
      {children}
    </Text>
  );
};
