import { Text } from "@chakra-ui/react";

/**
 * Legacy typography helper kept for backward-compat with older components.
 * Scale rebuilt with modern, readable line-heights (the original used
 * oversized 100px line-heights that broke layouts).
 */
const textVariants = {
  heading: {
    fontFamily: "heading",
    fontSize: { base: "30px", md: "40px", lg: "46px" },
    fontWeight: "700",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
  heading1: {
    fontFamily: "heading",
    fontSize: { base: "26px", md: "34px", lg: "40px" },
    fontWeight: "700",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  subheading: {
    fontSize: { base: "15px", md: "16px", lg: "18px" },
    fontWeight: "400",
    lineHeight: 1.6,
    color: "text.muted",
  },
  subheading1: {
    fontSize: { base: "16px", md: "18px", lg: "20px" },
    fontWeight: "400",
    lineHeight: 1.6,
    color: "text.muted",
  },
  subheading2: {
    fontSize: { base: "18px", md: "22px", lg: "24px" },
    fontWeight: "600",
    lineHeight: 1.35,
  },
  subheading3: {
    fontSize: { base: "13px", md: "14px", lg: "15px" },
    fontWeight: "400",
    lineHeight: 1.6,
    color: "text.muted",
  },
  subheading4: {
    fontSize: { base: "16px", md: "18px", lg: "20px" },
    fontWeight: "600",
    lineHeight: 1.4,
  },
  subheading5: {
    fontSize: { base: "13px", md: "14px", lg: "15px" },
    fontWeight: "400",
    lineHeight: 1.7,
    color: "text.muted",
  },
  subheading6: {
    fontFamily: "heading",
    fontSize: { base: "32px", md: "44px", lg: "56px" },
    fontWeight: "700",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  subheading7: {
    fontSize: { base: "20px", md: "24px", lg: "28px" },
    fontWeight: "600",
    lineHeight: 1.3,
  },
  callout: {
    fontSize: { base: "15px", md: "18px", lg: "20px" },
    fontWeight: "600",
    lineHeight: 1.4,
  },
  callout1: {
    fontSize: { base: "18px", md: "20px", lg: "22px" },
    fontWeight: "600",
    lineHeight: 1.35,
  },
  callout2: {
    fontSize: { base: "14px", md: "16px", lg: "17px" },
    fontWeight: "400",
    lineHeight: 1.7,
    color: "text.muted",
  },
  callout3: {
    fontSize: { base: "15px", md: "16px", lg: "18px" },
    fontWeight: "400",
    lineHeight: 1.6,
    color: "text.muted",
  },
  callout4: {
    fontFamily: "heading",
    fontSize: { base: "26px", md: "32px", lg: "38px" },
    fontWeight: "700",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  callout5: {
    fontFamily: "heading",
    fontSize: { base: "28px", md: "38px", lg: "46px" },
    fontWeight: "700",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
  callout6: {
    fontSize: { base: "18px", md: "20px", lg: "22px" },
    fontWeight: "500",
    lineHeight: 1.5,
  },
  callout7: {
    fontFamily: "heading",
    fontSize: { base: "30px", md: "40px", lg: "48px" },
    fontWeight: "700",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
};

export const CustomText = ({ variant = "heading", children, styles, ...args }) => {
  const variantStyles = textVariants[variant] || textVariants.heading;
  return (
    <Text {...variantStyles} style={styles} {...args}>
      {children}
    </Text>
  );
};
