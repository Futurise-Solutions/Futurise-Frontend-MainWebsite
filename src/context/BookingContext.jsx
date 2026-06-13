import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";

const BookingContext = createContext(null);

// Absolute milliseconds from app load when the modal auto-opens
const POPUP_SCHEDULE = [5_000, 30_000, 60_000];

export const BookingProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Ref so the interval callback always reads the live isOpen value
  const isOpenRef = useRef(false);
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  const openBooking = () => { setIframeLoaded(false); onOpen(); };
  const closeBooking = () => { setIframeLoaded(false); onClose(); };

  // Auto-popup: fires at 5 s, 30 s, 60 s from first render.
  // Continues across route changes. Skips (and consumes) a slot if the modal
  // is already open when that time is reached. Stops after all 3 slots.
  useEffect(() => {
    let slotIndex = 0;
    const start = Date.now();

    const tick = setInterval(() => {
      if (slotIndex >= POPUP_SCHEDULE.length) {
        clearInterval(tick);
        return;
      }
      if (Date.now() - start >= POPUP_SCHEDULE[slotIndex]) {
        if (!isOpenRef.current) {
          setIframeLoaded(false);
          onOpen();
        }
        slotIndex++;
      }
    }, 500);

    return () => clearInterval(tick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BookingContext.Provider value={{ isOpen, onOpen: openBooking, onClose: closeBooking, iframeLoaded, setIframeLoaded }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
