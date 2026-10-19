import { companyStats } from '../../utils/Constant';
import styles from './HomeProof.module.css';

export default function CompanyStats() {
  return <div className={styles.numbers}><dl className={styles.stats}>{companyStats.map(stat => <div key={stat.label}>
    <dt>{stat.label}</dt><dd>{stat.value}{stat.suffix && <span>{stat.suffix}</span>}</dd>
  </div>)}</dl></div>;
}
