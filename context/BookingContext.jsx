'use client'

import { createContext, useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { trackEvent, EVENTS } from "../utils/analytics";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Which CTA opened the modal, so the booking conversion can be attributed back to the
  // button that earned it rather than reported as one undifferentiated total.
  const [source, setSource] = useState("unknown");

  // Manual open/close only — auto-popup removed, iframe removed (X-Frame-Options: DENY).
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

  return (
    <BookingContext.Provider value={{ isOpen, onOpen: openBooking, onClose: closeBooking, source }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
