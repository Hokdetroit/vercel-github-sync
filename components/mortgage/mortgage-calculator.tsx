'use client'

import { useState } from 'react'
import s from './mortgage.module.css'
const money = (value:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value)

export function MortgageCalculator() {
  const [leads,setLeads]=useState(100)
  const [loan,setLoan]=useState(350000)
  const [bps,setBps]=useState(100)
  const [conversion,setConversion]=useState(1.5)
  const [lift,setLift]=useState(20)
  const projectedRate=Math.min(100,conversion*(1+lift/100))
  const current=leads*(conversion/100)*loan*(bps/10000)
  const projected=leads*(projectedRate/100)*loan*(bps/10000)
  const controls=[
    {id:'leads',label:'Monthly leads',value:leads,min:10,max:1000,step:10,display:String(leads),set:setLeads},
    {id:'loan',label:'Average loan amount',value:loan,min:50000,max:2000000,step:10000,display:money(loan),set:setLoan},
    {id:'bps',label:'Commission',value:bps,min:25,max:300,step:5,display:`${bps} bps`,set:setBps},
    {id:'conversion',label:'Current conversion rate',value:conversion,min:.5,max:20,step:.5,display:`${conversion}%`,set:setConversion},
    {id:'lift',label:'Assumed relative conversion improvement',value:lift,min:0,max:50,step:5,display:`${lift}%`,set:setLift},
  ]
  return <section id="calculator" className={`${s.section} ${s.calculator}`}><div className={s.sectionHeading}><span className={s.eyebrow}>Explore a possibility. Not a promise.</span><h2>What could better<br />follow-through mean?</h2><p>Put your own assumptions into the picture. This scenario calculator estimates gross commission revenue—not profit or guaranteed results.</p></div><div className={s.calculatorGrid}><div className={s.sliders}>{controls.map(c=><div key={c.id}><div><label htmlFor={`mortgage-${c.id}`}>{c.label}</label><output htmlFor={`mortgage-${c.id}`}>{c.display}</output></div><input id={`mortgage-${c.id}`} type="range" min={c.min} max={c.max} step={c.step} value={c.value} aria-valuetext={c.display} onChange={e=>c.set(Number(e.target.value))}/></div>)}</div><div className={s.calculatorResults} aria-live="polite" aria-atomic="true"><span className={s.eyebrow}>Estimated monthly gross commission</span><div className={s.comparison}><div><span>Current scenario</span><strong>{money(current)}</strong></div><span aria-hidden="true">→</span><div><span>With your assumed lift</span><strong>{money(projected)}</strong></div></div><div className={s.result}><span>Potential monthly difference</span><strong>{money(projected-current)}</strong><span>At a {projectedRate.toFixed(2)}% modeled conversion rate</span></div><p className={s.note}>Monthly leads × conversion rate × average loan amount × commission rate. 100 bps equals 1%. Excludes software costs, expenses, taxes, loan fallout and timing differences. Assumptions are yours to adjust.</p></div></div></section>
}
