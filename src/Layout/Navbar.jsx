import React, { useEffect, useState } from "react";
import {
  Box, Flex, Button, HStack, Image, Text, Icon, useDisclosure,
  IconButton, Drawer, DrawerBody, DrawerContent, DrawerOverlay, DrawerCloseButton,
  Popover, PopoverTrigger, PopoverContent, VStack, Collapse, SimpleGrid,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiChevronDown, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { navbarOptions, NavbarservicesOptions, CONTACT, whatsappLink } from "../utils/Constant";
import { caseStudiesNav } from "../utils/Constant/caseStudies";
import { Logo } from "../Components/common";
import { useBooking } from "../context/BookingContext";
import { trackEvent, EVENTS } from "../utils/analytics";

const MotionBox = motion(Box);

// ---- Desktop nav links with a shared moving highlight ----
// Desktop nav is defined here rather than from `navbarOptions` because two entries are
// dropdown triggers with no path of their own. Keep the two lists aligned — the mobile
// menu still renders from `navbarOptions`, so an item added to only one of them appears
// on one breakpoint and silently vanishes on the other.
const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: null, isServices: true },
  { label: "Case Studies", path: null, isCaseStudies: true },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Pricing", path: "/pricing" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Highlight = () => (
  <MotionBox
    layoutId="navHighlight"
    position="absolute"
    inset={0}
    borderRadius="full"
    bgGradient="linear(135deg, rgba(123,108,255,0.22), rgba(181,123,255,0.22))"
    border="1px solid"
    borderColor="rgba(180,160,255,0.4)"
    transition={{ type: "spring", stiffness: 380, damping: 30 }}
  />
);

const ServicesMenu = ({ onBook, active, hovered, setHovered, index }) => {
  const showHighlight = hovered === index || (hovered === null && active);
  return (
    <Popover trigger="hover" placement="bottom" gutter={18} openDelay={0} closeDelay={120}>
      <PopoverTrigger>
        <Box
          position="relative"
          px={4}
          py={2}
          borderRadius="full"
          cursor="pointer"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          {showHighlight && <Highlight />}
          <HStack spacing={1} position="relative" zIndex={1} role="group">
            <Text fontSize="15px" fontWeight={500} color={showHighlight ? "text.primary" : "text.muted"}>
              Services
            </Text>
            <Icon as={FiChevronDown} fontSize="14px" color={showHighlight ? "accent.solid" : "text.muted"} transition="transform .2s" _groupHover={{ transform: "rotate(180deg)" }} />
          </HStack>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        w="640px"
        bg="#0f0f1a"
        border="1px solid"
        borderColor="border.subtle"
        borderRadius="20px"
        boxShadow="0 40px 80px -28px rgba(0,0,0,0.85)"
        p={3}
        overflow="hidden"
        _focus={{ outline: "none", boxShadow: "0 40px 80px -28px rgba(0,0,0,0.85)" }}
      >
        <SimpleGrid columns={3} spacing={2}>
          {/* Real anchors, not click handlers. The services dropdown is the primary
              path to all six service pages, and rendering it as onClick divs meant
              those links did not exist for crawlers and could not be opened in a new
              tab or reached by keyboard. */}
          {NavbarservicesOptions.map((s) => (
            <VStack
              key={s.option}
              as={Link}
              to={s.path}
              align="start"
              spacing={2}
              p={4}
              borderRadius="14px"
              cursor="pointer"
              transition="all .2s"
              role="group"
              border="1px solid transparent"
              _hover={{ bg: "rgba(180,160,255,0.08)", borderColor: "rgba(180,160,255,0.25)", transform: "translateY(-2px)", textDecoration: "none" }}
            >
              <Flex w="40px" h="40px" align="center" justify="center" borderRadius="11px" bgGradient="linear(135deg, rgba(123,108,255,0.2), rgba(181,123,255,0.2))" border="1px solid" borderColor="rgba(180,160,255,0.25)">
                <Image src={s.icon} alt={`${s.option} service icon`} w="20px" h="20px" htmlWidth="20" htmlHeight="20" loading="lazy" decoding="async" />
              </Flex>
              <Box>
                <HStack spacing={1}>
                  <Text fontSize="14px" fontWeight={600} color="text.primary">{s.option}</Text>
                  <Icon as={FiArrowUpRight} fontSize="13px" color="text.faint" opacity={0} transition="all .2s" _groupHover={{ opacity: 1, color: "accent.solid", transform: "translate(2px,-2px)" }} />
                </HStack>
                <Text fontSize="12px" color="text.faint">{s.desc}</Text>
              </Box>
            </VStack>
          ))}
        </SimpleGrid>
        <Flex mt={2} px={4} py={3} borderRadius="14px" align="center" justify="space-between" bgGradient="linear(135deg, rgba(123,108,255,0.14), rgba(181,123,255,0.14))" border="1px solid" borderColor="rgba(180,160,255,0.2)">
          <Text fontSize="14px" color="text.muted">Not sure what you need? Let's figure it out together.</Text>
          {/* Opens the booking modal directly. It previously routed to /contact, which
              put a full page load between the visitor's highest-intent moment and the
              action, and buried the booking calendar one further click down. */}
          <Button size="sm" variant="gradient" rightIcon={<FiArrowRight />} onClick={() => onBook("services-dropdown")}>Book a call</Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

// ── Case Studies dropdown (mirrors ServicesMenu) ──────────────────────────────
const CaseStudiesMenu = ({ navigate, active, hovered, setHovered, index }) => {
  const showHighlight = hovered === index || (hovered === null && active);
  return (
    <Popover trigger="hover" placement="bottom" gutter={18} openDelay={0} closeDelay={120}>
      <PopoverTrigger>
        <Box
          position="relative" px={4} py={2}
          borderRadius="full" cursor="pointer"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          {showHighlight && <Highlight />}
          <HStack spacing={1} position="relative" zIndex={1} role="group">
            <Text fontSize="15px" fontWeight={500} color={showHighlight ? "text.primary" : "text.muted"}>
              Case Studies
            </Text>
            <Icon as={FiChevronDown} fontSize="14px" color={showHighlight ? "accent.solid" : "text.muted"} transition="transform .2s" _groupHover={{ transform: "rotate(180deg)" }} />
          </HStack>
        </Box>
      </PopoverTrigger>
      <PopoverContent
        w="520px"
        bg="#0f0f1a"
        border="1px solid" borderColor="border.subtle"
        borderRadius="20px"
        boxShadow="0 40px 80px -28px rgba(0,0,0,0.85)"
        p={3} overflow="hidden"
        _focus={{ outline: "none", boxShadow: "0 40px 80px -28px rgba(0,0,0,0.85)" }}
      >
        <SimpleGrid columns={2} spacing={2}>
          {caseStudiesNav.map((s) => (
            <VStack
              key={s.slug}
              as={Link}
              to={`/case-studies/${s.slug}`}
              align="start" spacing={2} p={4}
              borderRadius="14px" cursor="pointer"
              transition="all .2s" role="group"
              border="1px solid transparent"
              _hover={{ bg: "rgba(180,160,255,0.08)", borderColor: "rgba(180,160,255,0.25)", transform: "translateY(-2px)", textDecoration: "none" }}
            >
              <Box>
                <HStack spacing={1}>
                  <Text fontSize="13px" fontWeight={600} color="text.primary">{s.option}</Text>
                  <Icon as={FiArrowUpRight} fontSize="12px" color="text.faint" opacity={0} transition="all .2s" _groupHover={{ opacity: 1, color: "accent.solid", transform: "translate(2px,-2px)" }} />
                </HStack>
                <Text fontSize="11px" color="text.faint">{s.service} · {s.desc}</Text>
              </Box>
            </VStack>
          ))}
        </SimpleGrid>
        <Flex mt={2} px={4} py={3} borderRadius="14px" align="center" justify="space-between"
          bgGradient="linear(135deg, rgba(123,108,255,0.14), rgba(181,123,255,0.14))"
          border="1px solid" borderColor="rgba(180,160,255,0.2)"
        >
          <Text fontSize="14px" color="text.muted">See all results & outcomes</Text>
          <Button size="sm" variant="gradient" rightIcon={<FiArrowRight />} onClick={() => navigate("/case-studies")}>All studies</Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

const NavLinkItem = ({ item, index, hovered, setHovered }) => {
  const location = useLocation();
  const active = location.pathname === item.path;
  const showHighlight = hovered === index || (hovered === null && active);
  return (
    <Box
      as={Link}
      to={item.path}
      position="relative"
      px={4}
      py={2}
      borderRadius="full"
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      _hover={{ textDecoration: "none" }}
    >
      {showHighlight && <Highlight />}
      <Text position="relative" zIndex={1} fontSize="15px" fontWeight={500} color={showHighlight ? "text.primary" : "text.muted"} transition="color .2s">
        {item.label}
      </Text>
    </Box>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onOpen: openBooking } = useBooking();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const servicesActive = location.pathname.startsWith("/service");
  const caseStudiesActive = location.pathname.startsWith("/case-studies");

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 12);
      setProgress(h > 0 ? Math.min(top / h, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Robustly close the mobile drawer on every route change — covers link taps,
  // the in-drawer logo, service sub-items, and browser back/forward navigation.
  useEffect(() => {
    onClose();
    setServicesOpen(false);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll while the drawer is open so the page behind doesn't move.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      transition="all .3s ease"
      bg={scrolled ? "rgba(8,8,13,0.82)" : "rgba(8,8,13,0.35)"}
      backdropFilter="blur(16px)"
      borderBottom="1px solid"
      borderColor={scrolled ? "border.subtle" : "transparent"}
    >
      <Flex h={scrolled ? "62px" : "74px"} maxW="1240px" mx="auto" px={{ base: 5, md: 8 }} align="center" justify="space-between" transition="height .3s ease">
        <Logo />

        {/* Center nav pill */}
        <HStack
          spacing={1}
          display={{ base: "none", lg: "flex" }}
          px={2}
          py={1.5}
          borderRadius="full"
          bg="rgba(255,255,255,0.03)"
          border="1px solid"
          borderColor="border.subtle"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_ITEMS.map((item, i) =>
            item.isServices ? (
              <ServicesMenu key="services" onBook={openBooking} active={servicesActive} hovered={hovered} setHovered={setHovered} index={i} />
            ) : item.isCaseStudies ? (
              <CaseStudiesMenu key="case-studies" navigate={navigate} active={caseStudiesActive} hovered={hovered} setHovered={setHovered} index={i} />
            ) : (
              <NavLinkItem key={item.label} item={item} index={i} hovered={hovered} setHovered={setHovered} />
            )
          )}
        </HStack>

        <HStack spacing={3}>
          <Box display={{ base: "none", lg: "inline-flex" }} position="relative" role="group">
            <MotionBox
              position="absolute"
              inset="-3px"
              borderRadius="full"
              bgGradient="linear(135deg, brand.500, violet.500)"
              filter="blur(12px)"
              opacity={0.35}
              animate={{ opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              pointerEvents="none"
            />
            <Button
              position="relative"
              variant="gradient"
              size="sm"
              px={6}
              rightIcon={<FiArrowRight />}
              onClick={() => openBooking("navbar-desktop")}
              sx={{ "& svg": { transition: "transform .25s" }, _hover: { "& svg": { transform: "translateX(4px)" } } }}
            >
              Book appointment
            </Button>
          </Box>
          {/* WhatsApp is the default business channel in the UAE and India — two of the
              five priority markets — and on a phone it is the lowest-friction way to
              start a conversation. It previously lived only in the footer, a full page
              scroll away from where mobile visitors actually decide to act. */}
          <IconButton
            as="a"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: "navbar-mobile" })}
            display={{ base: "inline-flex", lg: "none" }}
            aria-label="Chat with Futurise Solutions on WhatsApp"
            icon={<FaWhatsapp />}
            variant="outlineGlow"
            size="md"
            color="#25D366"
            _hover={{ color: "#25D366", borderColor: "#25D366" }}
          />
          <IconButton
            display={{ base: "inline-flex", lg: "none" }}
            aria-label="Open menu"
            icon={<FiMenu />}
            variant="outlineGlow"
            size="md"
            onClick={onOpen}
          />
        </HStack>
      </Flex>

      {/* Scroll progress bar */}
      <Box position="absolute" bottom={0} left={0} right={0} h="2px" bg="transparent">
        <Box h="full" bgGradient="linear(90deg, brand.500, violet.500)" style={{ width: `${progress * 100}%` }} transition="width .1s linear" boxShadow="0 0 10px rgba(180,160,255,0.7)" />
      </Box>

      {/* Mobile drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay backdropFilter="blur(6px)" bg="rgba(0,0,0,0.5)" />
        <DrawerContent bg="navy.800" borderLeft="1px solid" borderColor="border.subtle">
          <Box position="absolute" top="-10%" right="-20%" w="260px" h="260px" bg="rgba(181,123,255,0.18)" filter="blur(80px)" rounded="full" pointerEvents="none" />
          <DrawerCloseButton mt={3} color="text.muted" zIndex={10} />
          <Box px={6} py={5} position="relative">
            <Logo />
          </Box>
          <DrawerBody px={6} position="relative">
            <AnimatePresence>
              <VStack align="stretch" spacing={1}>
                {navbarOptions
                  .filter((l) => l.option !== "Services")
                  .map((l, i) => (
                    <MotionBox
                      key={l.option}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06 }}
                    >
                      <Text
                        as={Link}
                        to={l.path}
                        onClick={onClose}
                        display="block"
                        py={3}
                        fontSize="lg"
                        fontWeight={500}
                        borderBottom="1px solid"
                        borderColor="border.subtle"
                        _hover={{ color: "accent.solid", pl: 2, textDecoration: "none" }}
                        transition="all .2s"
                      >
                        {l.option}
                      </Text>
                    </MotionBox>
                  ))}

                <MotionBox initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.17 }}>
                  <Box borderBottom="1px solid" borderColor="border.subtle">
                    <HStack justify="space-between" py={3} cursor="pointer" onClick={() => setServicesOpen((v) => !v)}>
                      <Text fontSize="lg" fontWeight={500}>Services</Text>
                      <Icon as={FiChevronDown} transform={servicesOpen ? "rotate(180deg)" : "none"} transition="transform .2s" />
                    </HStack>
                    <Collapse in={servicesOpen} animateOpacity>
                      <VStack align="stretch" spacing={0} pb={2}>
                        {NavbarservicesOptions.map((s) => (
                          <HStack
                            key={s.option}
                            spacing={3}
                            py={2.5}
                            pl={2}
                            cursor="pointer"
                            onClick={() => { navigate(s.path); onClose(); }}
                            _hover={{ color: "accent.solid", pl: 3 }}
                            transition="all .2s"
                          >
                            <Flex w="32px" h="32px" align="center" justify="center" borderRadius="9px" bg="rgba(180,160,255,0.12)">
                              <Image src={s.icon} alt={`${s.option} service icon`} w="18px" h="18px" htmlWidth="18" htmlHeight="18" loading="lazy" decoding="async" />
                            </Flex>
                            <Text fontSize="15px" color="text.muted">{s.option}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Collapse>
                  </Box>
                </MotionBox>

                {/* Mobile Case Studies accordion */}
                <MotionBox initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.21 }}>
                  <Box borderBottom="1px solid" borderColor="border.subtle">
                    <HStack justify="space-between" py={3} cursor="pointer"
                      onClick={() => navigate("/case-studies") & onClose()}
                    >
                      <Text fontSize="lg" fontWeight={500}>Case Studies</Text>
                      <Icon as={FiArrowUpRight} color="accent.solid" boxSize={4} />
                    </HStack>
                  </Box>
                </MotionBox>

                <MotionBox initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} pt={5}>
                  <Button w="full" variant="gradient" size="lg" rightIcon={<FiArrowRight />} onClick={() => { openBooking("navbar-mobile"); onClose(); }}>
                    Book appointment
                  </Button>
                  <Button
                    as="a"
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: "navbar-drawer" })}
                    w="full"
                    mt={3}
                    variant="outlineGlow"
                    size="lg"
                    leftIcon={<FaWhatsapp />}
                  >
                    Chat on WhatsApp
                  </Button>
                  <VStack spacing={1} mt={4}>
                    <Text
                      as="a"
                      href={`mailto:${CONTACT.email}`}
                      onClick={() => trackEvent(EVENTS.EMAIL_CLICK, { location: "navbar-drawer" })}
                      fontSize="sm" color="text.muted" _hover={{ color: "accent.solid" }} transition="color .2s"
                    >
                      {CONTACT.email}
                    </Text>
                    <Text
                      as="a"
                      href={`tel:${CONTACT.phoneHref}`}
                      onClick={() => trackEvent(EVENTS.PHONE_CLICK, { location: "navbar-drawer" })}
                      fontSize="sm" color="text.muted" _hover={{ color: "accent.solid" }} transition="color .2s"
                    >
                      {CONTACT.phoneDisplay}
                    </Text>
                  </VStack>
                </MotionBox>
              </VStack>
            </AnimatePresence>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
