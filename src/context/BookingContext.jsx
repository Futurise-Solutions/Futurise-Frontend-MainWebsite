import { createContext, useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Manual open/close only — auto-popup removed, iframe removed (X-Frame-Options: DENY).
  const openBooking = () => onOpen();
  const closeBooking = () => onClose();

  return (
    <BookingContext.Provider value={{ isOpen, onOpen: openBooking, onClose: closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = () => useContext(BookingContext);
