'use client';
import {useBooking} from '../../context/BookingContext';
/** Opens the booking modal. `source` is the analytics label for the CTA that earned the booking. */
export default function BookDemoButton({source,children,className}){
 const {onOpen}=useBooking();
 return <button type="button" className={className} onClick={()=>onOpen(source)}>{children}</button>;
}
