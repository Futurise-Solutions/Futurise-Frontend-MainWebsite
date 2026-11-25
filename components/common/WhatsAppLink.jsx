'use client';
// The site's normalised pathname hook: ISR renders the home page as "/index", and a raw
// usePathname() would put that in the server-rendered href and mismatch on hydration.
import usePathname from '../../lib/useSitePathname';
import { whatsappHref } from '../../utils/Constant/navigation';
import { trackEvent, EVENTS } from '../../utils/analytics';
export default function WhatsAppLink({ context = 'page', location, className, children, onClick, ...rest }) {
  const pathname = usePathname();
  return <a {...rest} className={className} href={whatsappHref(pathname, context)} target="_blank" rel="noopener noreferrer" onClick={e => { trackEvent(EVENTS.WHATSAPP_CLICK, { location }); onClick?.(e); }}>{children}</a>;
}
