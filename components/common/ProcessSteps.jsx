import styles from './CommercialPages.module.css';
const steps=['Free discovery call','Fixed-scope quote','Design & build in two-week sprints','Launch & ongoing support'];
/** "How a project runs" section, shared by the solution base and market pages. Server component. */
export default function ProcessSteps(){
 return <section id="process" className={styles.articleSection}><p className={styles.eyebrow}>Process</p><h2>How a project runs</h2><ol className={styles.ruledList}>{steps.map((title,i)=><li key={title}><p className={styles.eyebrow}>0{i+1}</p><h3>{title}</h3></li>)}</ol><p>MVPs typically take 6 to 12 weeks; larger platforms 3 to 6 months.</p></section>;
}
