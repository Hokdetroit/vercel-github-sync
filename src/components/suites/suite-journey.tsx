'use client'

import { useState } from 'react'
import { suites, type SuiteKind } from './content'
import s from './suites.module.css'

export function SuiteJourney({ kind }: { kind: SuiteKind }) {
  const [active, setActive] = useState(0)
  const data = suites[kind]
  const step = data.steps[active]
  return <section className={s.journey} id="how-it-works" aria-labelledby="journey-title">
    <div className={s.sectionHeading}><p className={s.eyebrow}>One relationship. Every next step.</p><h2 id="journey-title">{data.journeyTitle}</h2><p>Explore a typical workflow. Your implementation is tailored to your team.</p></div>
    <div className={s.journeyLayout}>
      <div className={s.steps} aria-label="Workflow steps">{data.steps.map(([title, subtitle], index) => <button key={title} type="button" aria-pressed={active === index} aria-controls="journey-detail" onClick={() => setActive(index)}><span className={s.stepNumber}>0{index + 1}</span><span><strong>{title}</strong><span>{subtitle}</span></span><span aria-hidden="true">→</span></button>)}</div>
      <div id="journey-detail" className={s.journeyDetail} aria-live="polite" aria-atomic="true"><span className={s.detailNumber} aria-hidden="true">0{active + 1}</span><p className={s.eyebrow}>A connected workflow</p><h3>{step[2]}</h3><p>{step[3]}</p><div className={s.flow}><span>{active === 0 ? 'New inquiry' : data.steps[active - 1][0]}</span><span aria-hidden="true">↓</span><strong>{step[0]}</strong><span aria-hidden="true">↓</span><span>{active === 3 ? 'A lasting relationship' : data.steps[active + 1][0]}</span></div></div>
    </div>
  </section>
}
