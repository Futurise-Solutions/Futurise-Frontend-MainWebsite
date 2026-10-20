'use client';
import usePathname from '@/lib/useSitePathname';
import Link from 'next/link';
import RegionalGlobe,{regions} from './RegionalGlobe';
import s from './RegionalPages.module.css';
export default function RegionalHero({children}){const code=usePathname().slice(1),region=regions[code]||regions.us;return <header className={s.hero}><div className={s.top}><span>FUTURISE / {region.name.toUpperCase()}</span><span>LOCAL CONTEXT. GLOBAL CRAFT.</span></div><div className={s.layout}><div className={s.copy}>{children}</div><RegionalGlobe region={code}/></div><nav className={s.directory} aria-label="Explore our markets">{Object.entries(regions).map(([slug,m])=><Link key={slug} href={`/${slug}`} aria-current={slug===code?'page':undefined}>{m.name} ↗</Link>)}</nav></header>}
