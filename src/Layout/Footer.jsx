import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Box, SimpleGrid, Text, Input, Button, HStack, VStack, Flex, Icon, Image, Link as CLink, useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { Logo } from "../Components/common";
import { NavbarservicesOptions, Projects, CONTACT, SOCIAL_PROFILES } from "../utils/Constant";
import { COUNTRIES } from "../utils/Constant/countries";
import { trackEvent, EVENTS } from "../utils/analytics";

const footerWork = Projects.filter((p) => p.featured).slice(0, 4);

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

// Icons only. The URLs come from SOCIAL_PROFILES so the footer and schema.org `sameAs`
// can never drift apart again — they already had, with X linked here but absent there.
const socialIcons = {
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  "X (Twitter)": FaXTwitter,
};
const socials = SOCIAL_PROFILES.map((p) => ({ ...p, icon: socialIcons[p.label] }));

const Footer = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");

  const [isSubscribing, setIsSubscribing] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Enter a valid email address", status: "warning", duration: 3000, isClosable: true });
      return;
    }
    setIsSubscribing(true);
    emailjs
      .send(
        "service_jc2bgz1",
        "template_dfwoqsd",
        {
          subscriber_email: email,
          time: new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }),
        },
        "nURJDAbLK8UpUR46a"
      )
      .then(
        () => {
          trackEvent(EVENTS.NEWSLETTER_SUBSCRIBE, { location: "footer" });
          toast({ title: "You're subscribed!", description: "Thanks for joining the Futurise newsletter.", status: "success", duration: 4000, isClosable: true });
          setEmail("");
          setIsSubscribing(false);
        },
        () => {
          toast({ title: "Subscription failed.", description: "Please try again or email us directly.", status: "error", duration: 4000, isClosable: true });
          setIsSubscribing(false);
        }
      );
  };

  return (
    <Box as="footer" mt="auto" borderTop="1px solid" borderColor="border.subtle" bg="rgba(8,8,13,0.6)">
      <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
        {/* Complementary visual — selected work preview */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ base: "start", sm: "end" }}
          gap={3}
          mb={6}
        >
          <Text fontSize="sm" fontWeight={600} letterSpacing="0.08em" textTransform="uppercase" color="text.faint">
            Selected work
          </Text>
          <CLink
            as={Link}
            to="/portfolio"
            fontSize="sm"
            color="accent.solid"
            display="inline-flex"
            alignItems="center"
            gap={1}
            _hover={{ color: "text.primary" }}
          >
            View all projects <Icon as={FiArrowUpRight} />
          </CLink>
        </Flex>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={{ base: 12, md: 16 }}>
          {footerWork.map((project) => (
            <Box
              key={project.Heading}
              as={Link}
              to="/portfolio"
              role="group"
              position="relative"
              overflow="hidden"
              borderRadius="14px"
              border="1px solid"
              borderColor="border.subtle"
              h={{ base: "92px", md: "120px" }}
            >
              <Image
                src={project.img[0].src}
                alt={project.img[0].alt}
                loading="lazy"
                w="full"
                h="full"
                objectFit="cover"
                objectPosition="top"
                transition="transform .5s ease"
                _groupHover={{ transform: "scale(1.07)" }}
              />
              <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(8,8,13,0.85), rgba(8,8,13,0) 60%)" />
              <Text
                position="absolute"
                bottom={2}
                left={3}
                right={3}
                fontSize="xs"
                fontWeight={600}
                color="text.primary"
                noOfLines={1}
              >
                {project.clentName}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

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
                <Button type="submit" variant="gradient" px={5} aria-label="Subscribe" isLoading={isSubscribing}>
                  <Icon as={FiArrowRight} />
                </Button>
              </HStack>
            </Box>
          </VStack>

          {/* Company and Markets share one grid cell. The row is `lg: 5` with the brand
              spanning two, so a sixth column would crowd the whole row; stacking keeps
              Markets a properly labelled section and leaves the layout untouched as more
              countries are added. */}
          <VStack align="start" spacing={8}>
            <FooterCol title="Company">
              <FLink to="/">Home</FLink>
              <FLink to="/about">About Us</FLink>
              <FLink to="/portfolio">Portfolio</FLink>
              <FLink to="/pricing">Pricing</FLink>
              <FLink to="/case-studies">Case Studies</FLink>
              <FLink to="/contact">Contact</FLink>
            </FooterCol>

            <FooterCol title="Markets">
              {COUNTRIES.map((c) => (
                <FLink key={c.code} to={c.path}>{c.label}</FLink>
              ))}
            </FooterCol>
          </VStack>

          <FooterCol title="Services">
            {/* `to` matters: without it FLink falls back to a <span> with no href, so
                these were invisible to crawlers and passed no link equity. Listing all
                services rather than slice(0, 5), which silently dropped one. */}
            {NavbarservicesOptions.map((s) => (
              <FLink key={s.option} to={s.path}>{s.option}</FLink>
            ))}
          </FooterCol>

          <FooterCol title="Get in touch">
            <HStack spacing={3} align="start">
              <Icon as={FiMail} color="accent.solid" mt={1} />
              <CLink
                href={`mailto:${CONTACT.email}`}
                onClick={() => trackEvent(EVENTS.EMAIL_CLICK, { location: "footer" })}
                fontSize="15px" color="text.muted" _hover={{ color: "text.primary" }} transition="color .2s"
              >
                {CONTACT.email}
              </CLink>
            </HStack>
            <HStack spacing={3} align="start">
              <Icon as={FiMapPin} color="accent.solid" mt="3px" flexShrink={0} />
              <CLink
                href="https://maps.google.com/?q=Huddart+Parker+Building,+Wellington+Central,+Wellington+6011,+New+Zealand"
                isExternal
                fontSize="15px"
                color="text.muted"
                lineHeight={1.6}
                _hover={{ color: "text.primary" }}
                transition="color .2s"
              >
                Huddart Parker Building,<br />
                Wellington Central,<br />
                Wellington 6011, New Zealand
              </CLink>
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
          <HStack spacing={4} flexWrap="wrap" justify="center">
            <Text
              as={Link}
              to="/privacy"
              fontSize="sm"
              color="text.faint"
              _hover={{ color: "text.muted" }}
              transition="color .2s"
            >
              Privacy Policy
            </Text>
            <Text color="border.subtle" fontSize="sm">·</Text>
            <Text
              as={Link}
              to="/terms"
              fontSize="sm"
              color="text.faint"
              _hover={{ color: "text.muted" }}
              transition="color .2s"
            >
              Terms & Conditions
            </Text>
          </HStack>
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
                _hover={{ color: "white", borderColor: "brand.400", bg: "rgba(180,160,255,0.12)", transform: "translateY(-2px)" }}
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
