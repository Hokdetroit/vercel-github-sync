'use client'

import { useRef, useState, type CSSProperties } from 'react'
import { ArrowDown, ArrowRight, Check, Mail, MessageSquare, CalendarDays, Phone, UserRound, FileText, Pause, Play } from 'lucide-react'
import { useScrollFrame, clamp01, MOTION_QUERY } from './scroll-progress'
import s from './crm-hero.module.css'

const cards = [
  { title: 'A new inquiry', detail: 'Website form', Icon: UserRound, x: -440, y: -95, r: -12 },
  { title: 'An unanswered email', detail: 'Your inbox', Icon: Mail, x: 420, y: -130, r: 9 },
  { title: 'A missed call', detail: 'Business phone', Icon: Phone, x: -460, y: 75, r: 7 },
  { title: 'A booking request', detail: 'Your calendar', Icon: CalendarDays, x: 460, y: 55, r: -9 },
  { title: 'A conversation', detail: 'SMS messages', Icon: MessageSquare, x: -320, y: 235, r: -7 },
  { title: 'A proposal to send', detail: 'Your documents', Icon: FileText, x: 320, y: 225, r: 12 },
]
const chapters = ['Everything starts somewhere.', 'Bring the whole story together.', 'Let the next step take care of itself.']

export function CRMHero() {
  const root = useRef<HTMLElement>(null)
  const [chapter, setChapter] = useState(0)
  const [paused, setPaused] = useState(false)
  useScrollFrame(() => {
    if (!root.current) return
    const reduced = window.matchMedia(MOTION_QUERY).matches
    if (paused && !reduced) return
    const bounds = root.current.getBoundingClientRect()
    const progress = reduced ? 1 : clamp01(-bounds.top / Math.max(1, bounds.height - window.innerHeight))
    root.current.style.setProperty('--journey', progress.toFixed(4))
    setChapter(progress < .3 ? 0 : progress < .7 ? 1 : 2)
  })
  return <section ref={root} className={s.hero} aria-labelledby="crm-title">
    <div className={s.stage}>
      <header className={s.intro}><span className={s.eyebrow}>Your business. Finally in sync.</span><h1 id="crm-title">CRM &amp; Automations.<br/><span>From scattered to connected.</span></h1><p>Every lead. Every conversation. One connected story.<br/>Scroll to see your next step fall into place.</p></header>
      <div className={s.scene} aria-label="Illustration of business channels connecting to one CRM record">
        <img className={s.art} src="/features/crm-workspace.png" alt="" width={1536} height={1024} fetchPriority="high"/>
        <div className={s.scatter} aria-hidden="true">{cards.map(({title, detail, Icon, x, y, r})=><div key={title} className={s.card} style={{'--x':`${x}px`,'--y':`${y}px`,'--rotate':`${r}deg`} as CSSProperties}><span className={s.icon}><Icon size={20}/></span><div><strong>{title}</strong><span>{detail}</span></div></div>)}</div>
        <div className={s.record}><div className={s.recordTop}><span className={s.recordMark}>SE</span><span>One connected CRM</span><span className={s.example}>Example</span></div><div className={s.contact}><span className={s.avatar}>JL</span><div><strong>Jordan Lee</strong><span>New inquiry · Consultation</span></div><span className={s.status}>Open</span></div><div className={s.timeline}><span><Check size={15}/> Contact captured</span><span><Check size={15}/> Conversation linked</span><span><Check size={15}/> Next action assigned</span></div><div className={s.recordBottom}><span>Context stays with the customer.</span><ArrowRight size={16}/></div></div>
        <div className={s.workflow}><span className={s.workflowLabel}>Your configured workflow takes it from here</span><div className={s.steps}>{['Welcome email', 'Booking invitation', 'Team notified'].map((label,i)=><div key={label} className={s.step} style={{'--step':i} as CSSProperties}><span className={s.stepNumber}>{i+1}</span>{label}{i<2&&<ArrowRight size={16}/>}</div>)}</div><span className={s.disclaimer}>Illustrative sequence. Actions depend on your rules, permissions and consent.</span></div>
      </div>
      <footer className={s.controls}><div className={s.chapter}><span className={s.dots} aria-hidden="true">{chapters.map((_,i)=><i key={i} data-active={i===chapter}/>)}</span><span>{chapters[chapter]}</span></div><div className={s.actions}><button onClick={()=>setPaused(value=>!value)} aria-label={paused?'Resume hero animation':'Pause hero animation'} aria-pressed={paused}>{paused?<Play size={16}/>:<Pause size={16}/>}</button><a href="#crm-overview">Explore the platform <ArrowDown size={16}/></a></div></footer>
    </div>
  </section>
}
