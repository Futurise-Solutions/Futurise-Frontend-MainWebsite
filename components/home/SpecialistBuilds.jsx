import Link from 'next/link';
import { solutions, solutionList, numberToWords } from '../../utils/Constant/solutions';
import styles from './SpecialistBuilds.module.css';
import proof from './HomeProof.module.css';

export default function SpecialistBuilds() {
  return <section className={styles.builds} aria-labelledby="builds-title">
    <div className={styles.heading}>
      <div>
        <p className={proof.eyebrow}>SPECIALIST BUILDS</p>
        <h2 id="builds-title">Systems we’ve designed and shipped.</h2>
        <p className={styles.intro}>{numberToWords(Object.keys(solutions).length)} kinds of software we’ve designed or built for clients, most of them under NDA. Each is shown live on a call.</p>
      </div>
      <Link className={styles.all} href="/solutions">All solutions <span aria-hidden="true">↗</span></Link>
    </div>
    <ul className={styles.grid}>
      {solutionList.map(solution => <li key={solution.slug}>
        <Link href={`/solutions/${solution.slug}`} className={styles.card}>
          <span className={styles.name}>{solution.name}</span>
          <span className={styles.market}>{solution.market}</span>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </Link>
      </li>)}
    </ul>
  </section>;
}
