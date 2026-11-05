'use client'

import { useState } from 'react'
import s from '@/components/mortgage/mortgage.module.css'
const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

export function RealEstateCalculator() {
  const [leads, setLeads] = useState(100)
  const [price, setPrice] = useState(450000)
  const [commission, setCommission] = useState(2)
  const [conversion, setConversion] = useState(1.5)
  const [lift, setLift] = useState(20)
  const projectedRate = Math.min(100, conversion * (1 + lift / 100))
  const current = leads * conversion / 100 * price * commission / 100
  const projected = leads * projectedRate / 100 * price * commission / 100
  const controls = [
    { id: 'leads', label: 'Monthly leads', value: leads, min: 10, max: 1000, step: 10, display: String(leads), set: setLeads },
    { id: 'price', label: 'Average sale price', value: price, min: 50000, max: 3000000, step: 10000, display: money(price), set: setPrice },
    { id: 'commission', label: 'Your side’s negotiated commission', value: commission, min: 0, max: 5, step: 0.1, display: `${commission.toFixed(1)}%`, set: setCommission },
    { id: 'conversion', label: 'Current lead-to-close rate', value: conversion, min: 0.5, max: 20, step: 0.5, display: `${conversion}%`, set: setConversion },
    { id: 'lift', label: 'Assumed relative conversion improvement', value: lift, min: 0, max: 50, step: 5, display: `${lift}%`, set: setLift },
  ]
  return <section id="calculator" className={`${s.section} ${s.calculator}`}><div className={s.sectionHeading}><span className={s.eyebrow}>Explore a possibility. Not a promise.</span><h2>What could better<br />follow-through mean?</h2><p>Model your own lead flow, sale price and negotiated commission. This scenario estimates gross commission revenue—not take-home income or guaranteed results.</p></div><div className={s.calculatorGrid}><div className={s.sliders}>{controls.map(c => <div key={c.id}><div><label htmlFor={`real-estate-${c.id}`}>{c.label}</label><output htmlFor={`real-estate-${c.id}`}>{c.display}</output></div><input id={`real-estate-${c.id}`} type="range" min={c.min} max={c.max} step={c.step} value={c.value} aria-valuetext={c.display} onChange={e => c.set(Number(e.target.value))} /></div>)}</div><div className={s.calculatorResults} aria-live="polite" aria-atomic="true"><span className={s.eyebrow}>Estimated monthly gross commission</span><div className={s.comparison}><div><span>Current scenario</span><strong>{money(current)}</strong></div><span aria-hidden="true">→</span><div><span>With your assumed lift</span><strong>{money(projected)}</strong></div></div><div className={s.result}><span>Potential monthly difference</span><strong>{money(projected-current)}</strong><span>At a {projectedRate.toFixed(2)}% modeled conversion rate</span></div><p className={s.note}>Monthly leads × lead-to-close rate × average sale price × your side’s commission rate. Commission is negotiable; the example is not a standard or recommended rate. Excludes brokerage splits, referral fees, expenses, taxes, failed transactions and closing delays.</p></div></div></section>
}
