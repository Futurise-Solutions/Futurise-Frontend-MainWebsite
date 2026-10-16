'use client';
import { processSteps } from '../../utils/Constant';
import ScrollStory from './ScrollStory';
import WorkflowArt from './WorkflowArt';
export default function ProcessExplorer(){return <ScrollStory items={processSteps.map(step=>({title:step.title,content:<p>{step.content}</p>}))} renderVisual={active=><WorkflowArt step={active}/>} label="From discovery to support"/>;}
