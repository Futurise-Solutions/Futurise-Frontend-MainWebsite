import React, { useState } from "react";
import {
  Box, SimpleGrid, Text, Input, Button, HStack, VStack, Flex, Icon, Link as CLink, useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { Logo } from "../Components/common";
import { NavbarservicesOptions } from "../utils/Constant";

const FooterCol = ({ title, children }) => (
  <VStack align="start" spacing={3}>
    <Text fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint">
      {title}
    </Text>
    {children}
  </VStack>
);

const FLink = ({ to, children, onClick }) => (
  <Text
    as={to ? Link : "span"}
    to={to}
    onClick={onClick}
    fontSize="15px"
    color="text.muted"
    cursor="pointer"
    _hover={{ color: "text.primary" }}
    transition="color .2s"
  >
    {children}
  </Text>
);

const socials = [
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
  { icon: FaXTwitter, label: "X", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaFacebookF, label: "Facebook", href: "#" },
];

const Footer = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Enter a valid email address", status: "warning", duration: 3000, isClosable: true });
      return;
    }
    toast({ title: "You're subscribed!", description: "Thanks for joining the Futurise newsletter.", status: "success", duration: 4000, isClosable: true });
    setEmail("");
  };

  return (
    <Box as="footer" mt="auto" borderTop="1px solid" borderColor="border.subtle" bg="rgba(6,10,24,0.6)">
      <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={{ base: 10, lg: 8 }}>
          {/* Brand + newsletter */}
          <VStack align="start" spacing={5} gridColumn={{ lg: "span 2" }} pr={{ lg: 8 }}>
            <Logo size="lg" />
            <Text color="text.muted" fontSize="15px" maxW="340px" lineHeight={1.7}>
              We design and build web, mobile, and Web3 products that help ambitious brands grow. Let’s build the future, together.
            </Text>
            <Box as="form" onSubmit={subscribe} w="full" maxW="360px">
              <Text fontSize="sm" fontWeight={600} mb={2}>Subscribe to our newsletter</Text>
              <HStack spacing={2}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  bg="rgba(255,255,255,0.04)"
                  border="1px solid"
                  borderColor="border.subtle"
                  borderRadius="full"
                  _placeholder={{ color: "text.faint" }}
                  _focus={{ borderColor: "brand.400", boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)" }}
                />
                <Button type="submit" variant="gradient" px={5} aria-label="Subscribe">
                  <Icon as={FiArrowRight} />
                </Button>
              </HStack>
            </Box>
          </VStack>

          <FooterCol title="Company">
            <FLink to="/">Home</FLink>
            <FLink to="/about">About Us</FLink>
            <FLink to="/portfolio">Portfolio</FLink>
            <FLink to="/contact">Contact</FLink>
          </FooterCol>

          <FooterCol title="Services">
            {NavbarservicesOptions.slice(0, 5).map((s) => (
              <FLink key={s.option} onClick={() => navigate(s.path)}>{s.option}</FLink>
            ))}
          </FooterCol>

          <FooterCol title="Get in touch">
            <HStack spacing={3} align="start">
              <Icon as={FiMail} color="accent.solid" mt={1} />
              <FLink>support@futurisetechnologies.com</FLink>
            </HStack>
            <HStack spacing={3} align="start">
              <Icon as={FiPhone} color="accent.solid" mt={1} />
              <FLink>+1 (123) 456-7890</FLink>
            </HStack>
            <HStack spacing={3} align="start">
              <Icon as={FiMapPin} color="accent.solid" mt={1} />
              <Text fontSize="15px" color="text.muted">Serving clients worldwide</Text>
            </HStack>
          </FooterCol>
        </SimpleGrid>

        <Flex
          mt={{ base: 12, md: 16 }}
          pt={6}
          borderTop="1px solid"
          borderColor="border.subtle"
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={4}
        >
          <Text fontSize="sm" color="text.faint">
            © {new Date().getFullYear()} Futurise Solutions. All rights reserved.
          </Text>
          <HStack spacing={3}>
            {socials.map((s) => (
              <CLink
                key={s.label}
                href={s.href}
                aria-label={s.label}
                isExternal
                w="38px"
                h="38px"
                display="grid"
                placeItems="center"
                borderRadius="full"
                border="1px solid"
                borderColor="border.subtle"
                color="text.muted"
                transition="all .25s"
                _hover={{ color: "white", borderColor: "brand.400", bg: "rgba(111,147,255,0.12)", transform: "translateY(-2px)" }}
              >
                <Icon as={s.icon} />
              </CLink>
            ))}
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
