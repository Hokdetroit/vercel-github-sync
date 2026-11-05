'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import items from './medical-integrations.json'
import s from './medical-ecosystem.module.css'

const featured = [0, 2, 10, 24, 25, 18, 13, 14, 8, 1, 19, 34].map(i => items[i])
const groups = ['All connections', 'Attract', 'Book & care', 'Payments', 'Connect & retain']

export function MedicalEcosystem() {
  const stage = useRef<HTMLElement>(null)
  const [selected, setSelected] = useState(items[0])
  const [group, setGroup] = useState(groups[0])
  const [query, setQuery] = useState('')
  useEffect(() => {
    const node = stage.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const progress = reduced.matches ? 1 : Math.max(0, Math.min(1, (window.innerHeight * .65 - rect.top) / (window.innerHeight * .9)))
      node.style.setProperty('--spread', String(progress))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', schedule)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); reduced.removeEventListener('change', schedule) }
  }, [])
  const filtered = items.filter(item => (group === groups[0] || item.group === group) && `${item.name} ${item.category} ${item.summary}`.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className={s.ecosystem}>
      <section id="medical-connections" ref={stage} className={s.stage} aria-labelledby="ecosystem-title">
        <div className={s.sticky}>
          <header className={s.heading}><span className={s.eyebrow}>Your tools. One connected ecosystem.</span><h2 id="ecosystem-title">Great care starts with<br />better connections.</h2><p>Keep the clinical software you trust. Connect the marketing, booking and follow-up around it.</p></header>
          <div className={s.constellation}>
            <div className={s.logoField}>{featured.map((item, i) => {
              const left = i < 6
              const row = Math.floor((i % 6) / 2)
              const column = i % 2
              return <button key={item.name} type="button" className={s.logoTile} style={{ '--x': `${(left ? -1 : 1) * (column === 0 ? 420 : 260)}px`, '--y': `${(row - 1) * 126}px`, '--angle': `${(i % 2 ? 1 : -1) * 5}deg` } as CSSProperties} onMouseEnter={() => setSelected(item)} onFocus={() => setSelected(item)} onClick={() => { setSelected(item); if (window.matchMedia('(max-width: 760px)').matches) document.getElementById('integration-detail')?.scrollIntoView({ block: 'center' }) }} aria-label={`Learn about ${item.name}`} aria-pressed={selected.name === item.name} aria-controls="integration-detail"><img src={item.logo} alt="" width={100} height={42} /><span>{item.name}</span></button>
            })}</div>
            <article id="integration-detail" className={s.detail} aria-live="polite" aria-atomic="true"><span className={s.eyebrow}>{selected.category}</span><h3>{selected.name}</h3><p>{selected.summary}</p><p className={s.detailBody}>{selected.description}</p><span className={s.connector}>Connected with Studio Escrow</span></article>
          </div>
          <div className={s.stageFooter}><span>Scroll to explore · Hover, focus or tap a logo</span><a href="#integration-directory">Browse all {items.length} connections ↓</a></div>
        </div>
      </section>
      <section className={s.directory} id="integration-directory" aria-labelledby="directory-title">
        <div className={s.directoryHeading}><div><span className={s.eyebrow}>Find your existing tools</span><h2 id="directory-title">Your practice, connected.</h2></div><label className={s.search}>Search integrations<input type="search" placeholder="Try Nextech, Cherry, Meta…" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
        <div className={s.filters} aria-label="Integration categories">{groups.map(value => <button key={value} type="button" aria-pressed={group === value} onClick={() => setGroup(value)}>{value}</button>)}</div>
        <p className={s.count} role="status">{filtered.length} connections{query ? ` matching “${query}”` : ''}</p>
        <div className={s.cards}>{filtered.map(item => <details key={item.name} className={s.card}><summary><span className={s.cardLogo}>{item.logo ? <img src={item.logo} alt="" width={120} height={48} loading="lazy" /> : <span>{item.name}</span>}</span><span className={s.cardCategory}>{item.group}</span><span className={s.cardTitle}>{item.name}<span aria-hidden="true">+</span></span><span className={s.summary}>{item.summary}</span></summary><p>{item.description}</p></details>)}</div>
        {!filtered.length && <p className={s.empty}>No connections found. Try another name or choose All connections.</p>}
        <p className={s.note}>Connections and descriptions are listed in the <a href="https://studioescrow.cloud/medical-suite/integrations">Medical Suite integration directory</a>. Availability, sync fields, vendor access and setup requirements must be confirmed for your practice. HIPAA compliance depends on configuration, appropriate agreements and how data is used; advertising tools should not receive protected health information.</p>
      </section>
    </div>
  )
}
