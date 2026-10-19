'use client';
import useAutoScene from './useAutoScene';

import styles from './CapabilityStudy.module.css';
import ServiceDiagram from './ServiceDiagram';
import WorkflowArt from './WorkflowArt';

const studies = {
 'web-development': {kind:'web', title:'From interface to infrastructure', labels:['Interface','Application','Infrastructure'], notes:['A clear interface, built around the people using it.','Interactions connect to purposeful application logic.','A dependable foundation supports the whole experience.']},
 'app-development': {kind:'app', title:'One experience. Every screen.', labels:['Navigate','Interact','Connect'], notes:['A clear path through the mobile experience.','Touch, feedback and transitions work together.','The experience connects to the services behind it.']},
 'ui-ux-design': {kind:'design', title:'From exploration to a design system', labels:['Explore','Compose','Refine'], notes:['Explore the relationship between type, form and space.','Bring the parts together into a coherent visual language.','Refine the details into a consistent design system.']},
 'ai-ml-solutions': {kind:'ai', title:'Intelligence with a clear path', labels:['Context','Reasoning','Action'], notes:['Start with the information relevant to the task.','Connect context with a structured reasoning workflow.','Return a useful result, with a clear place for human review.']},
 'blockchain-development': {kind:'chain', title:'Connected by verifiable logic', labels:['Connect','Validate','Execute'], notes:['Connect the application to a wallet and network.','Check the conditions before execution.','Carry out the operation and surface its status.']},
 'digital-marketing': {kind:'growth', title:'A connected customer journey', labels:['Discover','Engage','Convert'], notes:['Help the right audience discover your business.','Give people a clear reason to explore further.','Make the next conversation easy to start.']},
 studio: {kind:'studio', title:'Different disciplines. One shared direction.', labels:['Strategy','Design','Engineering'], notes:['Define the problem, the people and the priorities.','Turn the direction into a considered experience.','Build, test and prepare the experience for launch.']},
};

export default function CapabilityStudy({service='studio',compact=false}) {
 const study=studies[service]||studies.studio;
 const {ref,active}=useAutoScene(3,2000);
 return <figure ref={ref} className={styles.study} data-compact={compact}>
  <div className={styles.top}><span>How it comes together</span><span aria-hidden="true">0{active+1} / 03</span></div>
  <div className={styles.art} role="img" aria-label={`${study.title}. ${study.labels[active]}: ${study.notes[active]}`}>{study.kind==='studio'?<WorkflowArt step={[0,1,3][active]}/>:<ServiceDiagram kind={study.kind} active={active}/>}</div>
  <figcaption><strong>{study.title}</strong><p>{study.notes[active]}</p></figcaption>
  <div className={styles.controls} aria-hidden="true">{study.labels.map((label,i)=><span key={label} data-active={i===active}>{label}</span>)}</div>
 </figure>;
}
