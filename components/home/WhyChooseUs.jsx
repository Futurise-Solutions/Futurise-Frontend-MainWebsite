import { cards } from '../../utils/Constant';
import styles from './HomeRefinements.module.css';

function PrincipleArt({ index }) {
  const illustrations = [
    <g key="expertise"><path d="M20 42L70 17L120 42L70 67Z M20 62L70 87L120 62 M20 82L70 107L120 82" /><path d="M70 32V52M60 42H80" strokeWidth="3" /></g>,
    <g key="collaboration"><circle cx="40" cy="60" r="25"/><circle cx="100" cy="60" r="25"/><path d="M52 60H88M70 42V78"/><circle cx="70" cy="60" r="5" fill="currentColor"/></g>,
    <g key="quality"><path d="M70 14L108 30V61Q108 87 70 108Q32 87 32 61V30Z"/><path d="M50 59L65 74L92 45" strokeWidth="3"/></g>,
    <g key="delivery"><circle cx="70" cy="60" r="43"/><path d="M70 25V60L94 74M64 7H76"/><circle cx="70" cy="60" r="4" fill="currentColor"/></g>,
    <g key="scale"><rect x="29" y="50" width="45" height="45" rx="2"/><path d="M57 50V22H112V77H74M88 47L112 22M94 22H112V40"/></g>,
    <g key="support"><path d="M32 41A42 42 0 0170 18A42 42 0 01109 43M109 27V44H92M109 78A42 42 0 0170 102A42 42 0 0131 77M31 93V76H48"/><path d="M52 60H88M70 42V78"/></g>,
  ];
  return <svg viewBox="0 0 140 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{illustrations[index % illustrations.length]}</svg>;
}

export default function WhyChooseUs() {
  return <section className={styles.why} aria-labelledby="why-heading">
    <p className={styles.eyebrow}>WHY FUTURISE / THE DIFFERENCE IS IN THE DETAILS</p>
    <div className={styles.whyIntro}><h2 id="why-heading">Built on trust,<br />delivered with care</h2><p>We obsess over the details that make a product successful, and the relationship that makes the project enjoyable.</p></div>
    <div className={styles.reasons}>{cards.map((card, i) => <article key={card.title} className={styles.reason}>
      <div className={styles.reasonHead}><span>0{i + 1}</span><PrincipleArt index={i}/></div>
      <h3>{card.title}</h3><p>{card.description}</p>
    </article>)}</div>
  </section>;
}
