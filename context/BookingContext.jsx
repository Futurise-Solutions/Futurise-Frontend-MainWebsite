'use client'

import { createContext, useContext, useEffect, useState } from "react";
import usePathname from "../lib/useSitePathname";
import { useDisclosure } from "@chakra-ui/react";
import { trackEvent, EVENTS } from "../utils/analytics";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Which CTA opened the modal, so the booking conversion can be attributed back to the
  // button that earned it rather than reported as one undifferentiated total.
  const [source, setSource] = useState("unknown");

  // Manual open/close only, no auto-popup. The modal embeds the Google appointment page
  // inline once the visitor clicks "Choose your time" (see BookingModal.jsx).
  //
  // Most call sites are `onClick={openBooking}`, which hands React's synthetic event in
  // as the first argument. Accept a string only, so an unlabelled call degrades to
  // "unknown" instead of stringifying a SyntheticEvent into the analytics payload.
  const openBooking = (from) => {
    const label = typeof from === "string" && from ? from : "unknown";
    setSource(label);
    trackEvent(EVENTS.BOOKING_MODAL_OPEN, { location: label });
    onOpen();
  };
  const closeBooking = () => onClose();

  // Deep link: any URL ending in #book-a-call opens the modal, then the hash is stripped so
  // a refresh or back/forward does not reopen it. Runs on mount, on hashchange and on every
  // pathname change. The hash is removed before opening, so one navigation cannot open twice
  // even though several triggers may fire for it.
  const pathname = usePathname();
  useEffect(() => {
    const check = () => {
      if (window.location.hash !== "#book-a-call") return;
      window.history.replaceState(null, "", pathname + window.location.search);
      openBooking("link:" + pathname);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <BookingContext.Provider value={{ isOpen, onOpen: openBooking, onClose: closeBooking, source }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
