'use client'

import React, { useEffect, useState, useRef } from "react";
import {
  Box, Flex, Button, HStack, Text, Icon, useDisclosure,
  Drawer, DrawerBody, DrawerContent, DrawerOverlay, DrawerHeader,
  Popover, PopoverTrigger, PopoverContent, VStack, SimpleGrid,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { FiChevronDown, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import NextLink from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import usePathname from "@/lib/useSitePathname";
import { navbarOptions, NavbarservicesOptions, CONTACT, caseStudiesNav } from "../../utils/Constant/navigation";
import { solutionLinks as solutionList } from "../../utils/Constant/solutionLinks";
import Logo from "../common/Logo";
import mobile from "./MobileNavigation.module.css";
import { useBooking } from "../../context/BookingContext";
import { trackEvent, EVENTS } from "../../utils/analytics";

/**
 * PORTED from src/Layout/Navbar.jsx. Changes are mechanical and listed here in full:
 *
 *   react-router-dom                     →  next/navigation + next/link
 *     import { Link } from 'react-router-dom'   →  import NextLink from 'next/link'
 *     <X as={Link} to="/y">                     →  <X as={NextLink} href="/y">
 *     useNavigate() → navigate('/y')            →  useRouter() → router.push('/y')
 *     useLocation().pathname                    →  usePathname()
 *
 *   Chakra <Image src={icon}>             →  next/image with the import passed directly
 *     Per D27. `s.icon` is a static import OBJECT in Next (a string in Vite), so
 *     next/image reads intrinsic width/height from it. The originals already hardcoded
 *     htmlWidth/htmlHeight to the same values (20/20 desktop, 18/18 mobile); those are
 *     now supplied by the import plus an explicit render size.
 *
 * Everything else — every style prop, every framer-motion object, every string — is
 * character-for-character identical to the source.
 */

const MotionBox = motion.create(Box);

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
    aria-hidden="true"
    data-nav-highlight=""
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
  const menu = useDisclosure();
  const route = usePathname();
  const closeMenu = menu.onClose;
  useEffect(() => { const frame = requestAnimationFrame(closeMenu); return () => cancelAnimationFrame(frame); }, [route, closeMenu]);
  return (
    <Popover trigger="hover" openDelay={80} closeDelay={220} placement="bottom" gutter={10} isLazy isOpen={menu.isOpen} onOpen={menu.onOpen} onClose={menu.onClose} returnFocusOnClose={false}>
      <PopoverTrigger>
        <Box
          as="button"
          type="button"
          aria-label="Services"
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
        onClickCapture={e => { if (e.target.closest("a,button")) menu.onClose(); }}
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
              as={NextLink}
              href={s.path}
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
                <NextImage src={s.icon} alt={`${s.option} service icon`} width={20} height={20} style={{ width: "20px", height: "20px" }} />
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
          <Text fontSize="14px" color="text.muted">Not sure what you need? Let&apos;s figure it out together.</Text>
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
  const menu = useDisclosure();
  const route = usePathname();
  const closeMenu = menu.onClose;
  useEffect(() => { const frame = requestAnimationFrame(closeMenu); return () => cancelAnimationFrame(frame); }, [route, closeMenu]);
  return (
    <Popover trigger="hover" openDelay={80} closeDelay={220} placement="bottom" gutter={10} isLazy isOpen={menu.isOpen} onOpen={menu.onOpen} onClose={menu.onClose} returnFocusOnClose={false}>
      <PopoverTrigger>
        <Box
          as="button"
          type="button"
          aria-label="Case Studies"
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
        onClickCapture={e => { if (e.target.closest("a,button")) menu.onClose(); }}
        w="min(860px, calc(100vw - 32px))"
        bg="#0f0f1a"
        border="1px solid" borderColor="border.subtle"
        borderRadius="20px"
        boxShadow="0 40px 80px -28px rgba(0,0,0,0.85)"
        p={3} overflow="hidden"
        _focus={{ outline: "none", boxShadow: "0 40px 80px -28px rgba(0,0,0,0.85)" }}
      >
        <Flex align="stretch" gap={3}>
          <Box flex="1 1 0" minW={0}>
            <Text px={4} pt={1} pb={2} fontSize="11px" letterSpacing="0.12em" textTransform="uppercase" color="text.faint">Case studies</Text>
            <SimpleGrid columns={2} spacing={2}>
              {caseStudiesNav.map((s) => (
                <VStack
                  key={s.slug}
                  as={NextLink}
                  href={`/case-studies/${s.slug}`}
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
          </Box>
          <Box flex="0 0 290px" minW={0} pl={3} borderLeft="1px solid" borderColor="border.subtle">
            <Text px={3} pt={1} pb={2} fontSize="11px" letterSpacing="0.12em" textTransform="uppercase" color="text.faint">Solutions we build</Text>
            <VStack align="stretch" spacing={0.5}>
              {solutionList.map((sol) => (
                <HStack
                  key={sol.slug}
                  as={NextLink}
                  href={`/solutions/${sol.slug}`}
                  justify="space-between" spacing={3} px={3} py="7px"
                  borderRadius="10px" cursor="pointer"
                  transition="all .2s" role="group"
                  border="1px solid transparent"
                  _hover={{ bg: "rgba(180,160,255,0.08)", borderColor: "rgba(180,160,255,0.25)", textDecoration: "none" }}
                >
                  <HStack spacing={1} minW={0}>
                    <Text fontSize="13px" fontWeight={600} color="text.primary" noOfLines={1}>{sol.name}</Text>
                    <Icon as={FiArrowUpRight} flexShrink={0} fontSize="12px" color="text.faint" opacity={0} transition="all .2s" _groupHover={{ opacity: 1, color: "accent.solid", transform: "translate(2px,-2px)" }} />
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Flex>
        <Flex mt={2} px={4} py={3} borderRadius="14px" align="center" justify="space-between" gap={3}
          bgGradient="linear(135deg, rgba(123,108,255,0.14), rgba(181,123,255,0.14))"
          border="1px solid" borderColor="rgba(180,160,255,0.2)"
        >
          <Text fontSize="14px" color="text.muted">See all results &amp; outcomes</Text>
          <HStack spacing={2} flexShrink={0}>
            <Button size="sm" variant="outlineGlow" rightIcon={<FiArrowRight />} onClick={() => navigate("/solutions")}>All solutions</Button>
            <Button size="sm" variant="gradient" rightIcon={<FiArrowRight />} onClick={() => navigate("/case-studies")}>All studies</Button>
          </HStack>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

const NavLinkItem = ({ item, index, hovered, setHovered }) => {
  const pathname = usePathname();
  const active = pathname === item.path;
  const showHighlight = hovered === index || (hovered === null && active);
  return (
    <Box
      as={NextLink}
      href={item.path}
      aria-current={active ? "page" : undefined}
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
  const menuTrigger = useRef(null);
  const reduceMotion = useReducedMotion();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onOpen: openBooking } = useBooking();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const navigate = (to) => router.push(to);
  const servicesActive = pathname.startsWith("/service");
  const caseStudiesActive = pathname.startsWith("/case-studies");
  const solutionsActive = pathname.startsWith("/solutions");

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
    const frame = requestAnimationFrame(() => {
      onClose();
      setServicesOpen(false);
      setHovered(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, onClose]);

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
      data-site-nav=""
      data-home-nav={["/", "/about", "/contact", "/portfolio", "/pricing", "/us", "/ca", "/ae", "/nz", "/au", "/in", "/europe"].includes(pathname) || pathname.startsWith("/service/") || pathname.startsWith("/case-studies") ? "" : undefined}
      position="sticky"
      top={0}
      zIndex={1000}
      transition="all .3s ease"
      bg={scrolled ? "rgba(8,8,13,0.82)" : "rgba(8,8,13,0.35)"}
      backdropFilter="blur(16px)"
      borderBottom="1px solid"
      borderColor={scrolled ? "border.subtle" : "transparent"}
    >
      <Flex h={scrolled ? "62px" : "74px"} maxW="1800px" mx="auto" px={{ base: 5, md: 8 }} align="center" justify="space-between" transition="height .3s ease">
        <Logo size="nav" priority />

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
              data-nav-appointment
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
          <button type="button" className={mobile.pill} onClick={() => openBooking("navbar-mobile-pill")}>Book a call</button>
          <button ref={menuTrigger} type="button" className={mobile.trigger} aria-label="Open menu" aria-expanded={isOpen} aria-controls={isOpen ? 'mobile-navigation' : undefined} onClick={onOpen}>
            <span>Menu</span><span className={mobile.bars} aria-hidden="true"><i /><i /></span>
          </button>
        </HStack>
      </Flex>

      {/* Scroll progress bar */}
      <Box position="absolute" bottom={0} left={0} right={0} h="2px" bg="transparent">
        <Box h="full" bgGradient="linear(90deg, brand.500, violet.500)" style={{ width: `${progress * 100}%` }} transition="width .1s linear" boxShadow="0 0 10px rgba(180,160,255,0.7)" />
      </Box>

      {/* Mobile drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full" finalFocusRef={menuTrigger}>
        <DrawerOverlay bg="rgba(8,8,13,.6)" />
        <DrawerContent bg="#F4F2FF" color="#08080D" maxW={{base:'100%',md:'520px'}} h="100dvh" motionProps={reduceMotion ? {transition:{duration:0}} : undefined}>
          <DrawerHeader p={0}>
            <div className={mobile.top}><span>FUTURISE SOLUTIONS<small>DESIGN / ENGINEERING / POSSIBILITY</small></span><button type="button" onClick={onClose} aria-label="Close menu"><span>Close</span><b aria-hidden="true">×</b></button></div>
          </DrawerHeader>
          <DrawerBody p={0} id="mobile-navigation" className={mobile.body}>
            <p className={mobile.eyebrow}>EXPLORE FUTURISE</p>
            <nav className={mobile.links} aria-label="Mobile navigation">
              {navbarOptions.map((item,i) => item.option === 'Services' ? (
                <div key={item.option} className={mobile.serviceGroup}>
                  <button type="button" className={mobile.navRow} aria-expanded={servicesOpen} aria-controls="mobile-services" onClick={()=>setServicesOpen(v=>!v)} data-active={servicesActive}>
                    <span className={mobile.number}>{String(i+1).padStart(2,'0')}</span><span>Services</span><b className={mobile.plus} data-open={servicesOpen} aria-hidden="true">+</b>
                  </button>
                  <div id="mobile-services" hidden={!servicesOpen} className={mobile.serviceList}>
                    {NavbarservicesOptions.map(service=><NextLink key={service.path} href={service.path} onClick={onClose} aria-current={pathname===service.path?'page':undefined}><span><strong>{service.option}</strong><small>{service.desc}</small></span><span aria-hidden="true">↗</span></NextLink>)}
                  </div>
                </div>
              ) : (
                <NextLink key={item.path} href={item.path} onClick={onClose} className={mobile.navRow} aria-current={pathname===item.path?'page':undefined}><span className={mobile.number}>{String(i+1).padStart(2,'0')}</span><span>{item.option}</span><b aria-hidden="true">↗</b></NextLink>
              ))}
              <NextLink href="/case-studies" onClick={onClose} className={mobile.navRow} aria-current={caseStudiesActive?'page':undefined}><span className={mobile.number}>08</span><span>Case Studies</span><b aria-hidden="true">↗</b></NextLink>
              <NextLink href="/solutions" onClick={onClose} className={mobile.navRow} aria-current={solutionsActive?'page':undefined}><span className={mobile.number}>09</span><span>Solutions</span><b aria-hidden="true">↗</b></NextLink>
            </nav>
            <div className={mobile.contact}>
              <p>HAVE SOMETHING IN MIND?</p>
              <button type="button" onClick={()=>{onClose();openBooking("navbar-mobile");}}>Book a strategy call <span aria-hidden="true">↗</span></button>
              <a href={`mailto:${CONTACT.email}`} onClick={()=>trackEvent(EVENTS.EMAIL_CLICK,{location:"navbar-drawer"})}>{CONTACT.email}</a>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
