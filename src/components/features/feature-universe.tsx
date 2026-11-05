'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react'
import { integrations, logoUrl } from './feature-data'
import s from './features.module.css'

export function FeatureIcon({ index, className = '' }: { index: number; className?: string }) {
  return <span aria-hidden="true" className={`${s.artIcon} ${className}`} style={{ backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 100}%` }} />
}
const openingBrands = ['Stripe', 'Anthropic Claude', 'Salesforce', 'Slack', 'Shopify', 'Zapier', 'HubSpot', 'ChatGPT / OpenAI']
const orbit = [...openingBrands.map(name => integrations.find(tool => tool[0] === name)!), ...integrations.filter(tool => !openingBrands.includes(tool[0]))]
const logosPerWave = 20
const positions = Array.from({ length: logosPerWave }, (_, index) => {
  const angle = (index / logosPerWave) * Math.PI * 2 - Math.PI / 2
  return [Math.cos(angle) * 475, Math.sin(angle) * 410, index % 2 ? 5 : -5]
})

export function FeatureUniverse() {
  const root = useRef<HTMLElement>(null)
  const [paused,setPaused] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 760px)')
    let frame = 0
    const update = () => {
      frame = 0
      if (!root.current || (paused && !media.matches)) return
      const rect = root.current.getBoundingClientRect()
      const progress = media.matches ? 0 : Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-window.innerHeight)))
      root.current.style.setProperty('--flight',String(progress))
    }
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll',scroll,{passive:true})
    window.addEventListener('resize',scroll)
    media.addEventListener('change',scroll)
    return () => { cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);media.removeEventListener('change',scroll) }
  },[paused])
  return <section ref={root} className={s.flight} aria-label="Explore the Studio Escrow feature universe">
    <div className={s.flightStage}>
      <div className={s.flightTop}><span>STUDIO ESCROW / THE PLATFORM</span><button onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused ? <Play size={14}/> : <Pause size={14}/>} {paused ? 'Resume depth' : 'Pause depth'}</button></div>
      <div className={s.orbit} aria-hidden="true">{orbit.map(([name,slug,category],i)=><div key={name} className={s.orbitCard} style={{'--x':`${positions[i%logosPerWave][0]}px`,'--y':`${positions[i%logosPerWave][1]}px`,'--r':`${positions[i%logosPerWave][2]}deg`,'--wave':Math.floor(i/logosPerWave)} as CSSProperties}>{slug ? <img src={logoUrl(slug)} alt="" width={70} height={70} decoding="async" style={slug === 'openai' ? {background:'var(--f-ink)',borderRadius:16,padding:10} : undefined}/> : <FeatureIcon index={category==='Developer'?1:4}/>}<span>{name}</span><span className={s.orbitCategory}>{category}</span><ArrowUpRight size={15}/></div>)}</div>
      <div className={s.heroCopy}><span className={s.eyebrow}>A whole universe. One workspace.</span><h1>Less friction.<br/><span>More possibility.</span></h1><p>Every conversation, workflow and next big idea.<br className={s.desktopBreak}/> Finally, working together.</p><a href="#feature-explorer" className={s.primary}>Explore your possibilities <ArrowDown size={17}/></a><span className={s.micro}>Built around your business. Not the other way around.</span></div>
      <div className={s.flightBottom}><span>CRM · MARKETING · AI · AUTOMATION</span><a href="#feature-explorer">Scroll to explore <ArrowDown size={16}/></a></div>
    </div>
  </section>
}
