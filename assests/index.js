// Only the lightweight icon/logo assets that are actually rendered are exported here.
// The large legacy illustration SVGs/JPEGs (multi-MB each) were removed from the bundle
// during the redesign — reusable CSS gradients and react-icons are used instead.

// Service icons (hover variants — used on service cards & strengths)
export { default as webDevHover } from "./HomeAssest/webDevHover.svg";
export { default as AppDevHover } from "./HomeAssest/AppDevHover.svg";
export { default as DigitalMarketingHover } from "./HomeAssest/DigitalMarketingHover.svg";
export { default as AiMlHover } from "./HomeAssest/AiMlHover.svg";
export { default as UIUXHover } from "./HomeAssest/UIUXHover.svg";
export { default as BlockchainHover } from "./HomeAssest/BlockChainHover.svg";

// Navbar service icons are imported directly by utils/Constant/navigation.js, so the
// layout bundle does not pull in this whole module.

// Why-choose-us icons (hover variants)
export { default as clientIconHover } from "./HomeAssest/clientIconHover.svg";
export { default as expertiseiconHover } from "./HomeAssest/expertiseiconHover.svg";
export { default as postIconHover } from "./HomeAssest/postIconHover.svg";
export { default as qualityIconHover } from "./HomeAssest/qualityIconHover.svg";
export { default as timeIconHover } from "./HomeAssest/timeIconHover.svg";


// Partner logos (SVG wordmarks)
export { default as logoHomies }       from "./PartnerLogos/logo-homies.svg";
export { default as logoMarty }        from "./PartnerLogos/logo-marty.svg";
export { default as logoDavidTishbi }  from "./PartnerLogos/logo-david-tishbi.svg";
export { default as logoEstate }       from "./PartnerLogos/logo-estate.svg";
export { default as logoGdt }          from "./PartnerLogos/logo-gdt.svg";
export { default as logoPlatinumPeak } from "./PartnerLogos/logo-platinum-peak.svg";
// Each client's own logo file, taken straight from their repository — not redrawn.
// Downscaled to 126px tall (3x the 42px the strip renders at, so they stay sharp on
// high-DPI screens) and encoded to WebP with the alpha channel intact.
//
//   Infinity Bay  public/Logo/logo-mark.png            — used as supplied
//   Dhanlaxmi     public/brand/logo-mark-light.png     — the client's own light variant
//   Palm Vision   out/brand/palmvision-mark.webp       — white background keyed out
//
// Two notes on the exceptions. Dhanlaxmi ships two files and their own Logo.tsx swaps to
// the light one on dark grounds, because the brown mark measures ~1.3:1 against near-black
// and is effectively invisible; this is that same file, not a recolour. Palm Vision ships
// a full lockup and a mark, and neither has an alpha channel (yuv420p, white matte baked
// in) — that white is keyed out here, leaving the navy, the gold and the artwork exactly
// as drawn. The mark is used rather than the lockup for the same reason their own
// Header.tsx uses it: at the 42px this strip renders, the lockup's wordmark and "UDAIPUR
// EST. 2006" tagline collapse into an unreadable smudge, while the shield stays legible.
export { default as logoInfinityBay }  from "./PartnerLogos/logo-infinity-bay.webp";
export { default as logoDhanlaxmi }    from "./PartnerLogos/logo-dhanlaxmi.webp";
export { default as logoPalmvision }   from "./PartnerLogos/logo-palmvision.webp";

// Original transparent wordmark, 354x120 PNG. Navbar renders at up to 48px tall.
// Served losslessly by Logo so the small Solutions lettering stays crisp.
export { default as logo } from "./New-logo-3x.png";

// Portfolio project screenshots (real client work — optimized WebP, lazy-loaded where rendered)
export { default as propertyDashboard1 } from "./Project Images/propertyDashbaord1.webp";
export { default as propertyDashboard2 } from "./Project Images/propertyDashbaord2.webp";
export { default as realState1 } from "./Project Images/realState1.webp";
export { default as realState2 } from "./Project Images/realState2.webp";
export { default as realState3 } from "./Project Images/realState3.webp";
export { default as marty1 } from "./Project Images/marty1.webp";
export { default as marty2 } from "./Project Images/marty2.webp";
export { default as marty3 } from "./Project Images/marty3.webp";
export { default as crypto1 } from "./Project Images/CryptoDashboard1.webp";
export { default as crypto2 } from "./Project Images/CryptoDashboard2.webp";
export { default as jewel1 } from "./Project Images/jewel1.webp";
export { default as jewel2 } from "./Project Images/jewel2.webp";
export { default as jewel3 } from "./Project Images/jewel3.webp";
export { default as hotel1 } from "./Project Images/hotelBooking1.webp";
export { default as hotel2 } from "./Project Images/hotelBooking2.webp";
export { default as hotel3 } from "./Project Images/hotelBooking3.webp";
// NOTE: source filename is misspelled "infiity" (missing an "n"); the export name is correct.
// This is the only one of the four original Infinity Bay captures still in use — the
// product-categories grid. The other three were superseded by fresh captures of the
// client's current build (below); their source files are kept on disk but no longer
// imported, so Vite leaves them out of the bundle.
export { default as infinityBay3 } from "./Project Images/infiitybay3.webp";

// Captured from each client's own production build, served locally and screenshotted at
// 1400x900 — the slider's aspect ratio — so the thumbnails are the real shipped UI rather
// than a mockup or a generated stand-in. Encoded to sit inside the 15-84 kB band the
// existing project images already occupy.
export { default as infinityBayHome }   from "./Project Images/infinitybay-home.webp";
export { default as infinityBayTruck }  from "./Project Images/infinitybay-truck.webp";
export { default as infinityBayReveal } from "./Project Images/infinitybay-reveal.webp";
export { default as dhanlaxmi1 }        from "./Project Images/dhanlaxmi1.webp";
export { default as dhanlaxmi2 }        from "./Project Images/dhanlaxmi2.webp";
export { default as dhanlaxmi3 }        from "./Project Images/dhanlaxmi3.webp";
export { default as palmvision1 }       from "./Project Images/palmvision1.webp";
export { default as palmvision2 }       from "./Project Images/palmvision2.webp";
export { default as palmvision3 }       from "./Project Images/palmvision3.webp";

// Art-directed atmosphere plates (generated, then hand-optimised to WebP).
// Deliberately abstract: they carry mood and depth between text-heavy sections without
// pretending to be product screenshots. Real client work still carries every proof
// section — these never stand in for evidence.
export { default as marketReach }       from "./Visuals/market-reach.webp";
// Second pass. These two punctuate the pages that ran longest without a visual:
// /case-studies and /pricing-guide carried no image at all, and the six service pages
// ran ~7600px of text and cards each. Deliberately shared across routes rather than
// generated per page — one plate already in a visitor's cache is worth more than a
// unique one they have to download.
export { default as precisionLayers }   from "./Visuals/precision-layers.webp";
export { default as signalBraid }       from "./Visuals/signal-braid.webp";
