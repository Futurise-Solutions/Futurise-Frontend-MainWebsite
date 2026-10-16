'use client';
import {useEffect,useRef} from 'react';

// Preserve reading order while packing unequal cards into rows; no masonry dependency.
export default function MasonryGrid({children,className}){
 const ref=useRef(null);
 useEffect(()=>{
  const grid=ref.current;
  let frame=0;
  const update=()=>{
   frame=0;
   const css=getComputedStyle(grid),row=8,gap=parseFloat(css.rowGap);
   for(const item of grid.children){
    const content=item.firstElementChild;
    if(content&&Number.isFinite(row)&&Number.isFinite(gap))item.style.gridRowEnd=`span ${Math.ceil((content.getBoundingClientRect().height+gap)/(row+gap))}`;
   }
   grid.dataset.masonryReady='true';
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  const observer=new ResizeObserver(schedule);
  observer.observe(grid);
  for(const item of grid.children)if(item.firstElementChild)observer.observe(item.firstElementChild);
  schedule();
  return()=>{observer.disconnect();cancelAnimationFrame(frame)};
 },[children]);
 return <div ref={ref} className={className}>{children}</div>;
}
