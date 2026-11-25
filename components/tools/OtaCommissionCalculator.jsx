'use client';

import { useEffect, useId, useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import styles from './OtaCommissionCalculator.module.css';

/**
 * OTA commission calculator, rendered by app/tools/ota-commission-calculator/page.tsx.
 *
 * It implements the method published in "Hotel Direct Booking Website: How to Reduce OTA
 * Commission" (/blog/hotel-direct-booking-website-reduce-ota-commission, updated 8 Nov
 * 2026), and nothing more:
 *
 *   saving per year  = room nights moved × (ADR × commission − direct cost per room night)
 *   net saving       = saving per year − yearly cost of the direct channel
 *   break-even       = yearly cost of the direct channel ÷ saving per room night
 *
 * Room nights moved come from the visitor's own figures:
 *   room nights sold = rooms × 365 × occupancy
 *   OTA room nights  = room nights sold × share booked through OTAs
 *   nights moved     = OTA room nights × share the hotel expects to move
 *
 * The tool adds interactivity, not claims. Every number is an input, the defaults are
 * labelled as examples in the UI, and no benchmark, published range or forecast is built in.
 *
 * Privacy: inputs live in component state only. Nothing is written to storage, the URL or
 * analytics. The fields sit outside any <form>, so GA4's form tracking never sees them, and
 * data-clarity-mask keeps the values out of Clarity session recordings.
 *
 * Everything outside the components is pure and exported, so the arithmetic, parsing and
 * wording can be tested with plain Node.
 */

export const NIGHTS_PER_YEAR = 365;

/** Symbol only: switching currency relabels the amounts and converts nothing. */
export const CURRENCIES = [
  { code: 'USD', name: 'US dollar', symbol: 'US$' },
  { code: 'NZD', name: 'New Zealand dollar', symbol: 'NZ$' },
  { code: 'AUD', name: 'Australian dollar', symbol: 'A$' },
  { code: 'AED', name: 'UAE dirham', symbol: 'AED ' },
  { code: 'GBP', name: 'Pound sterling', symbol: '£' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'INR', name: 'Indian rupee', symbol: '₹' },
];

const DEFAULT_CURRENCY = 'USD';

/**
 * Example inputs, labelled "Example inputs — replace with your own" in the UI.
 *
 * ADR, commission, direct cost, share moved and yearly cost are the illustrative
 * assumptions from the guide's worked example (150, 20%, 5 a night, 10%, 6,000 a year).
 * Rooms, occupancy and OTA share are placeholders, chosen only so the example produces
 * whole room nights. None of them is a benchmark; do not describe them as typical.
 */
export const EXAMPLE_INPUTS = Object.freeze({
  rooms: 40,
  occupancy: 60,
  otaShare: 50,
  adr: 150,
  commission: 20,
  moveShare: 10,
  directCost: 5,
  yearlyCost: 6000,
});

/** Field order is the on-screen order. `max` is a sanity limit, not a realism limit. */
export const FIELDS = [
  {
    key: 'rooms',
    group: 'hotel',
    kind: 'count',
    whole: true,
    max: 10000,
    label: 'Rooms',
    hint: 'The rooms you sell, as a whole number.',
    emptyError: 'Enter the number of rooms you sell.',
    maxError: 'Enter 10,000 rooms or fewer.',
  },
  {
    key: 'occupancy',
    group: 'hotel',
    kind: 'percent',
    max: 100,
    label: 'Average occupancy',
    hint: 'Share of your available room nights sold across the year.',
    emptyError: 'Enter your average occupancy, from 0 to 100.',
  },
  {
    key: 'otaShare',
    group: 'hotel',
    kind: 'percent',
    max: 100,
    label: 'Share booked through OTAs',
    hint: 'Share of the room nights you sell that come through OTAs.',
    emptyError: 'Enter the share booked through OTAs, from 0 to 100.',
  },
  {
    key: 'adr',
    group: 'rate',
    kind: 'money',
    max: 1000000,
    label: 'Average daily rate (ADR)',
    hint: 'Average room revenue per occupied room night.',
    emptyError: 'Enter your average daily rate.',
    maxError: 'Enter 1,000,000 or less.',
  },
  {
    key: 'commission',
    group: 'rate',
    kind: 'percent',
    max: 100,
    label: 'OTA commission',
    hint: 'The rate in your OTA contract or extranet, not an average.',
    emptyError: 'Enter your OTA commission rate, from 0 to 100.',
  },
  {
    key: 'moveShare',
    group: 'direct',
    kind: 'percent',
    max: 100,
    label: 'OTA room nights you expect to move to direct',
    hint: 'Your own estimate. The calculator doesn’t predict it.',
    emptyError: 'Enter the share you expect to move, from 0 to 100.',
  },
  {
    key: 'directCost',
    group: 'direct',
    kind: 'money',
    max: 1000000,
    label: 'Direct cost per room night',
    hint: 'Card fees, any per-booking engine fee and perks for direct guests.',
    emptyError: 'Enter the direct cost per room night, or 0 if there is none.',
    maxError: 'Enter 1,000,000 or less.',
  },
  {
    key: 'yearlyCost',
    group: 'direct',
    kind: 'money',
    max: 100000000,
    label: 'Yearly cost of the direct channel',
    hint: 'Website, booking-engine subscription, marketing and staff time.',
    emptyError: 'Enter the yearly cost of the direct channel, or 0 if there is none.',
    maxError: 'Enter 100,000,000 or less.',
  },
];

const GROUPS = [
  { id: 'hotel', legend: 'Your hotel' },
  { id: 'rate', legend: 'Rate and commission' },
  { id: 'direct', legend: 'Moving bookings to direct' },
];

const PERCENT_KEYS = FIELDS.filter((field) => field.kind === 'percent').map((field) => field.key);
const MINUS = '−';
const DASH = '—';

/* ── The method ─────────────────────────────────────────────────────────────── */

/**
 * The published method, step by step. Percentages are 0–100. Returns null unless every
 * input is a finite number of 0 or more and every percentage is 100 or less.
 * `breakEvenNights` is null when a room night moved saves nothing (no break-even exists).
 */
export function calculateOtaSavings(inputs) {
  if (!inputs) return null;
  for (const field of FIELDS) {
    const value = inputs[field.key];
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return null;
    if (PERCENT_KEYS.includes(field.key) && value > 100) return null;
  }
  const { rooms, occupancy, otaShare, adr, commission, moveShare, directCost, yearlyCost } = inputs;

  const nightsSold = rooms * NIGHTS_PER_YEAR * (occupancy / 100);
  const otaNights = nightsSold * (otaShare / 100);
  const commissionPerNight = adr * (commission / 100);
  const commissionPaid = otaNights * commissionPerNight;
  const nightsMoved = otaNights * (moveShare / 100);
  const savingPerNight = commissionPerNight - directCost;
  const grossSaved = nightsMoved * commissionPerNight;
  const directCostOfMoved = nightsMoved * directCost;
  const saving = nightsMoved * savingPerNight;
  const netSaving = saving - yearlyCost;
  const breakEvenNights = savingPerNight > 0 ? yearlyCost / savingPerNight : null;
  const breakEvenShare =
    breakEvenNights !== null && otaNights > 0 ? (breakEvenNights / otaNights) * 100 : null;

  return {
    nightsSold,
    otaNights,
    commissionPerNight,
    commissionPaid,
    nightsMoved,
    savingPerNight,
    grossSaved,
    directCostOfMoved,
    saving,
    netSaving,
    breakEvenNights,
    breakEvenShare,
  };
}

/** True when floating-point noise is all that separates `value` from a whole number. */
export function nearlyWhole(value) {
  return Math.abs(value - Math.round(value)) <= Math.max(1e-9, Math.abs(value) * 1e-12);
}

/** Break-even nights as a whole number, rounded up: you cannot move part of a night. */
export function wholeNightsUp(nights) {
  if (typeof nights !== 'number' || !Number.isFinite(nights) || nights < 0) return null;
  return nearlyWhole(nights) ? Math.round(nights) : Math.ceil(nights);
}

/* ── Parsing what the visitor types ─────────────────────────────────────────── */

const CURRENCY_PREFIX = /^(?:US\$|NZ\$|A\$|AED|\$|£|€|₹)/i;

/**
 * Turns typed text into a plain decimal string: strips spaces, a leading currency symbol
 * and a trailing %, then reads separators. With both "," and "." the last one is the
 * decimal point (1,234.50 or 1.234,50); a lone comma is grouping when it groups digits
 * (6,000 or 1,00,000) and a decimal comma when one or two digits follow it (149,50).
 */
export function normaliseNumberText(raw) {
  let text = String(raw).replace(/[\s_']/g, '').replace(CURRENCY_PREFIX, '').replace(/%$/, '');
  const comma = text.lastIndexOf(',');
  const dot = text.lastIndexOf('.');
  if (comma !== -1 && dot !== -1) {
    text = dot > comma ? text.replace(/,/g, '') : text.replace(/\./g, '').replace(',', '.');
  } else if (comma !== -1) {
    if (/^\d{1,3}(?:,\d{3})+$/.test(text) || /^\d{1,2}(?:,\d{2})*,\d{3}$/.test(text)) {
      text = text.replace(/,/g, '');
    } else if (/^\d*,\d{1,2}$/.test(text)) {
      text = text.replace(',', '.');
    }
  }
  return text;
}

const EXAMPLE_TEXT = Object.fromEntries(
  FIELDS.map((field) => [
    field.key,
    new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(EXAMPLE_INPUTS[field.key]),
  ]),
);

/** Returns `{ value }` for a valid entry, or `{ error }` with the message to show. */
export function parseField(raw, field) {
  const text = String(raw ?? '').trim();
  if (text === '') return { error: field.emptyError };
  const unsigned = text.replace(/\s/g, '').replace(CURRENCY_PREFIX, '');
  if (/^[-−–—]/.test(unsigned)) {
    return { error: 'This can’t be negative. Enter 0 or more.' };
  }
  const cleaned = normaliseNumberText(text);
  const value = /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(cleaned) ? Number(cleaned) : Number.NaN;
  if (!Number.isFinite(value)) {
    return { error: `Enter a number using digits, for example ${EXAMPLE_TEXT[field.key]}.` };
  }
  if (field.whole && !Number.isInteger(value)) return { error: 'Enter a whole number.' };
  if (value > field.max) return { error: field.maxError || 'Enter a percentage from 0 to 100.' };
  return { value };
}

/* ── Formatting ─────────────────────────────────────────────────────────────── */

function numberFormats(locale) {
  return {
    whole: new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
    cents: new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    upTo2: new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }),
    oneDp: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
  };
}

/* Built once. en-IN gives rupee amounts lakh grouping (12,34,567); every other currency
   uses en-GB. The default currency is USD, so server and client render the same text. */
const FORMATS = { 'en-GB': numberFormats('en-GB'), 'en-IN': numberFormats('en-IN') };

/**
 * Formatting helpers for one currency. Yearly amounts show whole units; per-night amounts
 * show cents only when they have them (US$25, US$17.50). A value that rounds to zero
 * never shows a minus sign.
 */
export function createFormat(currencyCode) {
  const currency = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  const nf = FORMATS[currency.code === 'INR' ? 'en-IN' : 'en-GB'];
  const hasCents = (value) => Math.round(Math.abs(value) * 100) % 100 !== 0;
  const amount = (value, digits) => {
    const negative = value < 0 && Math.round(Math.abs(value) * 10 ** digits) > 0;
    const text = (digits ? nf.cents : nf.whole).format(Math.abs(value));
    return `${negative ? MINUS : ''}${currency.symbol}${text}`;
  };
  return {
    currency,
    money: (value) => amount(value, 0),
    perNight: (value) => amount(value, hasCents(value) ? 2 : 0),
    less: (value) => (Math.round(Math.abs(value)) > 0 ? amount(-Math.abs(value), 0) : amount(0, 0)),
    nights: (value) => nf.whole.format(value),
    count: (value) => nf.whole.format(value),
    percent: (value) => `${nf.upTo2.format(value)}%`,
    share: (value) => `${nf.oneDp.format(value)}%`,
    /** How a valid entry is redisplayed when its field loses focus. */
    input: (value, kind) => {
      if (kind === 'count') return nf.whole.format(value);
      if (kind === 'money') return (hasCents(value) ? nf.cents : nf.whole).format(value);
      return nf.upTo2.format(value);
    },
  };
}

/* ── Everything the UI shows, derived from the raw field text ──────────────── */

function breakEvenParts(inputs, r, f) {
  if (!r) {
    return {
      value: DASH,
      formula: 'yearly cost of the direct channel ÷ saving per room night',
      note: '',
    };
  }
  if (r.breakEvenNights === null) {
    return {
      value: 'Not reachable',
      formula: `${f.perNight(r.savingPerNight)} saved per room night moved`,
      note: 'A direct booking costs at least as much as the commission it replaces, so no number of room nights covers the yearly cost.',
    };
  }
  const nights = wholeNightsUp(r.breakEvenNights);
  const roundedUp = !nearlyWhole(r.breakEvenNights);
  let note = '';
  if (r.breakEvenShare !== null) {
    note =
      r.breakEvenShare > 100
        ? 'More than all of your OTA room nights.'
        : `${f.share(r.breakEvenShare)} of your OTA room nights. You entered ${f.percent(inputs.moveShare)}.`;
  }
  return {
    value: `${f.count(nights)} room ${nights === 1 ? 'night' : 'nights'}`,
    formula: `${f.money(inputs.yearlyCost)} ÷ ${f.perNight(r.savingPerNight)} per night${roundedUp ? ', rounded up' : ''}`,
    note,
  };
}

function verdictText(r, f, missing) {
  if (!r) return `Results appear when every field holds a valid number. Missing or invalid: ${missing}.`;
  if (r.otaNights === 0) return 'With no room nights booked through OTAs, there is no commission to save.';
  if (r.savingPerNight <= 0) {
    return `A direct booking costs at least as much per room night as the ${f.perNight(r.commissionPerNight)} commission it replaces, so moving bookings saves nothing at these inputs.`;
  }
  if (r.nightsMoved === 0) {
    return 'With no room nights moved to direct, there is no saving to set against the yearly cost.';
  }
  const net = Math.round(r.netSaving);
  if (net > 0) {
    return `Moving ${f.nights(r.nightsMoved)} room nights a year to direct would cover the yearly cost of the direct channel and leave ${f.money(r.netSaving)}.`;
  }
  if (net === 0) {
    return `Moving ${f.nights(r.nightsMoved)} room nights a year to direct would cover the yearly cost of the direct channel, with nothing left over.`;
  }
  return `At these inputs the direct channel costs ${f.money(-r.netSaving)} a year more than it saves.`;
}

function exampleNoteText(count) {
  const total = FIELDS.length;
  if (count === total) return 'These results use the example inputs. Replace them with your own figures.';
  if (count === 0) return 'These results use your own inputs.';
  return `${count} of ${total} inputs ${count === 1 ? 'is still an example' : 'are still examples'}.`;
}

function workingRows(inputs, r, f, breakEven) {
  const ok = Boolean(r);
  return [
    {
      key: 'nightsSold',
      label: 'Room nights sold per year',
      formula: ok
        ? `${f.count(inputs.rooms)} rooms × 365 × ${f.percent(inputs.occupancy)} occupancy`
        : 'rooms × 365 × occupancy',
      value: ok ? f.nights(r.nightsSold) : DASH,
    },
    {
      key: 'otaNights',
      label: 'Room nights booked through OTAs',
      formula: ok
        ? `${f.nights(r.nightsSold)} × ${f.percent(inputs.otaShare)} through OTAs`
        : 'room nights sold × share booked through OTAs',
      value: ok ? f.nights(r.otaNights) : DASH,
    },
    {
      key: 'commissionPaid',
      label: 'Commission paid to OTAs per year',
      formula: ok
        ? `${f.nights(r.otaNights)} × ${f.perNight(inputs.adr)} ADR × ${f.percent(inputs.commission)}`
        : 'OTA room nights × ADR × commission',
      value: ok ? f.money(r.commissionPaid) : DASH,
    },
    {
      key: 'nightsMoved',
      label: 'Room nights moved to direct',
      formula: ok
        ? `${f.nights(r.otaNights)} × ${f.percent(inputs.moveShare)} moved`
        : 'OTA room nights × share moved',
      value: ok ? f.nights(r.nightsMoved) : DASH,
    },
    {
      key: 'savingPerNight',
      label: 'Saving per room night moved',
      formula: ok
        ? `${f.perNight(inputs.adr)} × ${f.percent(inputs.commission)} − ${f.perNight(inputs.directCost)} direct cost`
        : 'ADR × commission − direct cost per room night',
      value: ok ? f.perNight(r.savingPerNight) : DASH,
    },
    {
      key: 'grossSaved',
      label: 'Gross commission saved',
      formula: ok
        ? `${f.nights(r.nightsMoved)} × ${f.perNight(inputs.adr)} × ${f.percent(inputs.commission)}`
        : 'room nights moved × ADR × commission',
      value: ok ? f.money(r.grossSaved) : DASH,
    },
    {
      key: 'directCostOfMoved',
      label: 'Less direct cost of those nights',
      formula: ok
        ? `${f.nights(r.nightsMoved)} × ${f.perNight(inputs.directCost)}`
        : 'room nights moved × direct cost per room night',
      value: ok ? f.less(r.directCostOfMoved) : DASH,
      kind: 'deduction',
    },
    {
      key: 'saving',
      label: 'Saving after direct booking costs',
      formula: ok
        ? `${f.nights(r.nightsMoved)} × ${f.perNight(r.savingPerNight)} per night`
        : 'room nights moved × saving per room night',
      value: ok ? f.money(r.saving) : DASH,
      kind: 'subtotal',
    },
    {
      key: 'yearlyCost',
      label: 'Less yearly cost of the direct channel',
      formula: 'your input: website, booking engine, marketing, staff time',
      value: ok ? f.less(inputs.yearlyCost) : DASH,
      kind: 'deduction',
    },
    {
      key: 'netSaving',
      label: 'Net saving per year',
      formula: ok
        ? `${f.money(r.saving)} − ${f.money(inputs.yearlyCost)}`
        : 'saving after direct booking costs − yearly cost',
      value: ok ? f.money(r.netSaving) : DASH,
      kind: 'total',
    },
    {
      key: 'breakEven',
      label: 'Break-even: room nights to move',
      formula: breakEven.formula,
      value: breakEven.value,
    },
  ];
}

/**
 * Pure: raw field text + currency → every string the calculator renders. The component
 * only lays these out, so this is what the Node tests exercise.
 */
export function deriveView(values, currencyCode) {
  const f = createFormat(currencyCode);
  const parsed = Object.fromEntries(FIELDS.map((field) => [field.key, parseField(values?.[field.key], field)]));
  const invalid = FIELDS.filter((field) => parsed[field.key].error);
  const inputs = invalid.length
    ? null
    : Object.fromEntries(FIELDS.map((field) => [field.key, parsed[field.key].value]));
  const r = calculateOtaSavings(inputs);
  const exampleKeys = FIELDS.filter((field) => parsed[field.key].value === EXAMPLE_INPUTS[field.key]).map(
    (field) => field.key,
  );
  const missing = invalid.map((field) => field.label).join(', ');
  const breakEven = breakEvenParts(inputs, r, f);
  const headline = r ? f.money(r.netSaving) : DASH;

  return {
    format: f,
    parsed,
    invalid,
    inputs,
    result: r,
    exampleKeys,
    exampleNote: exampleNoteText(exampleKeys.length),
    headline,
    headlineFormula: r
      ? `${f.nights(r.nightsMoved)} nights × (${f.perNight(inputs.adr)} × ${f.percent(inputs.commission)} − ${f.perNight(inputs.directCost)}) − ${f.money(inputs.yearlyCost)}`
      : 'room nights moved × (ADR × commission − direct cost per room night) − yearly cost',
    verdict: verdictText(r, f, missing),
    keyStats: [
      {
        key: 'commissionPaid',
        label: 'Commission paid to OTAs per year',
        value: r ? f.money(r.commissionPaid) : DASH,
        formula: r
          ? `${f.nights(r.otaNights)} OTA room nights × ${f.perNight(inputs.adr)} × ${f.percent(inputs.commission)}`
          : 'OTA room nights × ADR × commission',
        note: '',
      },
      { key: 'breakEven', label: 'Break-even', ...breakEven },
    ],
    rows: workingRows(inputs, r, f, breakEven),
    announcement: r
      ? `Net saving per year ${headline}. Break-even ${breakEven.value}.`
      : `Results appear when every field holds a valid number. Missing or invalid: ${missing}.`,
  };
}

/* ── Components ─────────────────────────────────────────────────────────────── */

const EXAMPLE_VALUES = Object.freeze(
  Object.fromEntries(FIELDS.map((field) => [field.key, createFormat(DEFAULT_CURRENCY).input(EXAMPLE_INPUTS[field.key], field.kind)])),
);

function NumberField({ id, field, value, error, isExample, currency, onChange, onBlur }) {
  const hintId = `${id}-hint`;
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        <span>
          {field.label}
          {currency ? <span className={styles.srOnly}> ({currency.code})</span> : null}
        </span>
        <span className={styles.tag} data-hidden={isExample ? undefined : 'true'}>
          Example
        </span>
      </label>
      <div className={styles.control} data-invalid={error ? 'true' : undefined}>
        {currency ? (
          <span className={`${styles.affix} ${styles.prefix}`} aria-hidden="true">
            {currency.symbol.trim()}
          </span>
        ) : null}
        <input
          id={id}
          className={styles.input}
          type="text"
          inputMode={field.whole ? 'numeric' : 'decimal'}
          autoComplete="off"
          spellCheck={false}
          maxLength={16}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={hintId}
        />
        {field.kind === 'percent' ? (
          <span className={`${styles.affix} ${styles.suffix}`} aria-hidden="true">
            %
          </span>
        ) : null}
      </div>
      <p id={hintId} className={error ? styles.error : styles.hint}>
        {error ? (
          <>
            <span className={styles.srOnly}>Error: </span>
            {error}
          </>
        ) : (
          field.hint
        )}
      </p>
    </div>
  );
}

function CurrencyField({ id, value, onChange }) {
  const hintId = `${id}-hint`;
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        <span>Currency</span>
        {/* Keeps this label the same height as its neighbour's, which carries a tag. */}
        <span className={styles.tag} data-hidden="true" aria-hidden="true">
          Example
        </span>
      </label>
      <div className={styles.selectWrap}>
        <select
          id={id}
          className={styles.select}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={hintId}
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>
      </div>
      <p id={hintId} className={styles.hint}>
        Changes the symbol only. Nothing is converted.
      </p>
    </div>
  );
}

/** The page's booking CTA. Opens the booking modal, attributed to this tool. */
export function OtaCallButton({ children }) {
  const { onOpen } = useBooking();
  return (
    <button type="button" onClick={() => onOpen('tool:ota-calculator')}>
      {children}
    </button>
  );
}

export default function OtaCommissionCalculator() {
  const uid = useId();
  const [values, setValues] = useState(EXAMPLE_VALUES);
  const [touched, setTouched] = useState({});
  const [currencyCode, setCurrencyCode] = useState(DEFAULT_CURRENCY);
  const [interacted, setInteracted] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const view = deriveView(values, currencyCode);
  const { format, parsed } = view;

  // Screen readers hear the headline once typing pauses, not on every keystroke, and
  // nothing is announced on page load.
  useEffect(() => {
    if (!interacted) return undefined;
    const timer = setTimeout(() => setAnnouncement(view.announcement), 900);
    return () => clearTimeout(timer);
  }, [interacted, view.announcement]);

  const change = (key, text) => {
    setValues((current) => ({ ...current, [key]: text }));
    setInteracted(true);
  };

  const blur = (field) => {
    setTouched((current) => (current[field.key] ? current : { ...current, [field.key]: true }));
    const entry = parsed[field.key];
    if (entry.error) return;
    const tidy = format.input(entry.value, field.kind);
    setValues((current) => (current[field.key] === tidy ? current : { ...current, [field.key]: tidy }));
  };

  const reset = () => {
    setValues(EXAMPLE_VALUES);
    setTouched({});
    setInteracted(true);
  };

  const changeCurrency = (code) => {
    setCurrencyCode(code);
    setInteracted(true);
  };

  return (
    <div className={styles.calculator} data-clarity-mask="True">
      <div className={styles.layout}>
        <div className={styles.inputs}>
          <div className={styles.inputsHead}>
            <p className={styles.inputsNote}>
              <strong>Example inputs — replace with your own.</strong> A field tagged Example still holds
              its example value. None of them is a benchmark.
            </p>
            <button type="button" className={styles.reset} onClick={reset}>
              Reset to example inputs
            </button>
          </div>

          {GROUPS.map((group) => (
            <fieldset key={group.id} className={styles.group}>
              <legend className={styles.legend}>{group.legend}</legend>
              <div className={styles.fields}>
                {group.id === 'rate' ? (
                  <CurrencyField id={`${uid}-currency`} value={currencyCode} onChange={changeCurrency} />
                ) : null}
                {FIELDS.filter((field) => field.group === group.id).map((field) => {
                  const entry = parsed[field.key];
                  // An empty field is flagged once the visitor leaves it; anything typed is
                  // checked straight away.
                  const showError = entry.error && (touched[field.key] || values[field.key].trim() !== '');
                  return (
                    <NumberField
                      key={field.key}
                      id={`${uid}-${field.key}`}
                      field={field}
                      value={values[field.key]}
                      error={showError ? entry.error : ''}
                      isExample={entry.value === EXAMPLE_INPUTS[field.key]}
                      currency={field.kind === 'money' ? format.currency : null}
                      onChange={(text) => change(field.key, text)}
                      onBlur={() => blur(field)}
                    />
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <section className={styles.summary} aria-labelledby={`${uid}-summary`} data-selectable="true">
          <h3 id={`${uid}-summary`} className={styles.summaryTitle}>
            Your results
          </h3>
          <p className={styles.summaryNote}>{view.exampleNote}</p>
          <p className={styles.headlineLabel}>Net saving per year</p>
          <p className={styles.headline}>{view.headline}</p>
          <p className={styles.formula}>{view.headlineFormula}</p>
          <p className={styles.verdict}>{view.verdict}</p>
          <dl className={styles.keyStats}>
            {view.keyStats.map((stat) => (
              <div key={stat.key} className={styles.keyStat}>
                <dt className={styles.keyLabel}>{stat.label}</dt>
                <dd className={styles.keyValue}>{stat.value}</dd>
                <dd className={styles.keyFormula}>{stat.formula}</dd>
                {stat.note ? <dd className={styles.keyNote}>{stat.note}</dd> : null}
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section className={styles.working} aria-labelledby={`${uid}-working`} data-selectable="true">
        <h3 id={`${uid}-working`} className={styles.workingTitle}>
          The working, step by step
        </h3>
        <dl className={styles.steps}>
          {view.rows.map((row) => (
            <div key={row.key} className={styles.step} data-kind={row.kind}>
              <dt className={styles.stepLabel}>{row.label}</dt>
              <dd className={styles.stepFormula}>{row.formula}</dd>
              <dd className={styles.stepValue}>{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.footnote}>
          Figures are rounded for display; each step uses the unrounded numbers. The sums run in your
          browser, and nothing you enter is stored or sent anywhere.
        </p>
      </section>

      <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}
