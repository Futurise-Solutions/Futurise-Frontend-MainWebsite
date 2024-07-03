import { Text } from "@chakra-ui/react";

const textVariants = {
  heading: {
    fontSize: { base: "32px", md: "40px", lg: "52px" },
    fontWeight: "500",
    lineHeight: { base: "40px", md: "60px", lg: "100px" },
  },
  heading1: {
    fontSize: { base: "28px", md: "38px", lg: "46px" },
    fontWeight: "500",
    lineHeight: { base: "30px", md: "40px", lg: "60px" },
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
    fontSize: { base: "18px", md: "25px", lg: "28px" },
    fontWeight: "500",
    lineHeight: { base: "24px", md: "28px", lg: "32px" },
  },
  subheading3: {
    fontSize: { base: "11px", md: "13px", lg: "16px" },
    fontWeight: "400",
    lineHeight: { base: "12px", md: "14px", lg: "18px" },
  },
  subheading4: {
    fontSize: { base: "16px", md: "20px", lg: "24px" },
    fontWeight: "600",
    lineHeight: { base: "16px", md: "20px", lg: "25px" },
  },
  subheading5: {
    fontSize: { base: "12px", md: "14px", lg: "18px" },
    fontWeight: "400",
    lineHeight: { base: "16px", md: "20px", lg: "25px" },
  },
  subheading6: {
    fontSize: { base: "30px", md: "48px", lg: "52px" },
    fontWeight: "700",
    lineHeight: { base: "40px", md: "50px", lg: "65px" },
  },
  subheading7: {
    fontSize: { base: "22px", md: "28px", lg: "32px" },
    fontWeight: "600",
    lineHeight: { base: "26px", md: "32px", lg: "40px" },
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

  },
  callout3: {
    fontSize: { base: "16px", md: "18px", lg: "20px" },
    fontWeight: "500",
    lineHeight: { base: "20px", md: "22px", lg: "25px" },
  },
  callout4: {
    fontSize: { base: "28px", md: "35px", lg: "40px" },
    fontWeight: "500",
    lineHeight: { base: "35px", md: "42px", lg: "48px" },
  },
  callout5: {
    fontSize: { base: "28px", md: "37px", lg: "48px" },
    fontWeight: "600",
    lineHeight: { base: "35px", md: "42px", lg: "48px" },
  },

};
export const CustomText = ({ variant = "heading", children, styles, ...args }) => {
  const variantStyles = textVariants[variant];
  return (
    <Text  {...variantStyles} style={styles} {...args}>
      {children}
    </Text>
  );
};
