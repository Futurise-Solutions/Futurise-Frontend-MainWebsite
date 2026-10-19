'use client';
import { lazy, Suspense } from 'react';
import { useBooking } from '@/context/BookingContext';
const BookingModal = lazy(() => import('./BookingModal'));
export default function BookingLoader() {
  const { isOpen } = useBooking();
  return isOpen ? <Suspense fallback={null}><BookingModal /></Suspense> : null;
}
