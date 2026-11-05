'use client'

import { useState } from 'react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { integrations, logoUrl } from './feature-data'
import { FeatureIcon } from './feature-universe'
import s from './features.module.css'

export function FeatureIntegrations() {
  const [filter,setFilter] = useState('All connections')
  const [query,setQuery] = useState('')
  const [selected,setSelected] = useState<string[]|null>(null)
  const [failed,setFailed] = useState<string[]>([])
  const visible = integrations.filter(([name,,group])=>(filter==='All connections'||filter===group)&&name.toLowerCase().includes(query.toLowerCase()))
  return <section id="connections" className={s.integrations}>
    <div className={s.sectionIntro}><div><span className={s.eyebrow}>Keep what you love. Connect the rest.</span><h2>Your tools.<br/><span>Better together.</span></h2></div><p>Native connections, automation platforms and custom APIs. Let’s map the right connection—not promise a one-click fit.</p></div>
    <div className={s.toolbar}><div className={s.filters}>{['All connections',...new Set(integrations.map(i=>i[2]))].map(c=><button key={c} onClick={()=>setFilter(c)} aria-pressed={c===filter}>{c}</button>)}</div><label className={s.search}><Search size={18}/><span className={s.srOnly}>Search integrations</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find your tools…"/></label></div>
    <p className={s.count} aria-live="polite">{visible.length} connections to explore</p>
    {selected&&<div className={s.connectionDetail} role="status"><div><strong>{selected[0]} · {selected[2]}</strong><p>We’ll confirm available APIs or native connectors, account permissions, supported events, sync direction and any third-party costs during setup. This listing is not a guarantee of native integration or healthcare suitability.</p><a href="/schedule-demo">Discuss this connection <ArrowUpRight size={16}/></a></div><button onClick={()=>setSelected(null)} aria-label="Close integration details"><X size={20}/></button></div>}
    <div className={s.integrationGrid}>{visible.map(([name,slug,group])=><button key={name} aria-pressed={selected?.[0]===name} onClick={()=>setSelected([name,slug,group])}>{slug&&!failed.includes(slug)?<img src={logoUrl(slug)} alt="" width={38} height={38} loading="lazy" onError={()=>setFailed(f=>[...f,slug])}/>:<FeatureIcon index={group==='Communication'?2:group==='AI & automation'?4:1}/>}<span>{name}</span><ArrowUpRight size={14}/></button>)}</div>
    {!visible.length&&<p>No tools match your search. Try a different name or category.</p>}
    <p className={s.note}>Brand marks belong to their respective owners; inclusion does not imply partnership or endorsement. Logos sourced from theSVG.org. Category artwork represents capabilities, not third-party brand marks. All connections require scope review.</p>
  </section>
}
