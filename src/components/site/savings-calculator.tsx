'use client'

import { useState } from 'react'
import styles from './site.module.css'

// TODO: add verified default assumptions
const FIELDS = [
  { id: 'toolsCost', label: 'Monthly cost of your current tools', prefix: '$', hint: 'Add up every subscription you would replace.' },
  { id: 'hours', label: 'Hours per week spent switching between tools', hint: 'Across your whole team.' },
  { id: 'hourlyRate', label: 'Hourly cost of that time', prefix: '$' },
  { id: 'planCost', label: 'Monthly Studio Escrow cost you are considering', prefix: '$', hint: 'Use the figure from your quote, including usage.' },
] as const

type FieldId = (typeof FIELDS)[number]['id']

const WEEKS_PER_MONTH = 52 / 12
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function parse(value: string): number | null {
  if (value.trim() === '') return null
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? n : null
}

export function SavingsCalculator() {
  const [values, setValues] = useState<Record<FieldId, string>>({ toolsCost: '', hours: '', hourlyRate: '', planCost: '' })

  const toolsCost = parse(values.toolsCost)
  const hours = parse(values.hours)
  const hourlyRate = parse(values.hourlyRate)
  const planCost = parse(values.planCost)

  const timeCost = hours !== null && hourlyRate !== null ? hours * hourlyRate * WEEKS_PER_MONTH : null
  const currentTotal = toolsCost !== null ? toolsCost + (timeCost ?? 0) : null
  const difference = currentTotal !== null && planCost !== null ? currentTotal - planCost : null

  const show = (n: number | null) => (n === null ? '—' : currency.format(n))

  return (
    <div className={styles.calc}>
      <form className={styles.form} aria-labelledby="calc-inputs" onSubmit={(e) => e.preventDefault()}>
        <h2 id="calc-inputs" className="ma3IoW_h4">
          Your figures
        </h2>
        {FIELDS.map((field) => (
          <div key={field.id} className={styles.field}>
            <label className={styles.label} htmlFor={`calc-${field.id}`}>
              {field.label}
            </label>
            <div className={'prefix' in field ? styles.prefixed : undefined}>
              {'prefix' in field ? <span aria-hidden="true">{field.prefix}</span> : null}
              <input
                className={styles.input}
                id={`calc-${field.id}`}
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                value={values[field.id]}
                onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))}
                aria-describedby={'hint' in field ? `calc-${field.id}-hint` : undefined}
              />
            </div>
            {'hint' in field ? (
              <span className={styles.hint} id={`calc-${field.id}-hint`}>
                {field.hint}
              </span>
            ) : null}
          </div>
        ))}
      </form>

      <section className={styles.results} aria-labelledby="calc-results" aria-live="polite">
        <h2 id="calc-results" className="ma3IoW_h4">
          Your estimate
        </h2>
        <ul className={styles.resultList}>
          <li>
            <span className="ma3IoW_bodyM">Current tools per month</span>
            <span className={styles.resultValue}>{show(toolsCost)}</span>
          </li>
          <li>
            <span className="ma3IoW_bodyM">Time spent switching per month</span>
            <span className={styles.resultValue}>{show(timeCost)}</span>
          </li>
          <li>
            <span className="ma3IoW_bodyM">Studio Escrow per month</span>
            <span className={styles.resultValue}>{show(planCost)}</span>
          </li>
          <li className={styles.resultTotal}>
            <span className="ma3IoW_bodyM">Estimated monthly difference</span>
            <span className={styles.resultValue}>{show(difference)}</span>
          </li>
        </ul>
        <p className={styles.note}>
          <strong>Estimates only. Based on the figures you enter.</strong>
        </p>
      </section>
    </div>
  )
}
