import styles from './crm.module.css'

/*
 * Both charts are illustrative models (labelled as such on the page), generated
 * deterministically so server and client render identical paths. Lines draw with
 * scroll through the `--d` custom property set on each chart.
 */

const wobble = (i: number) => Math.sin(i * 1.7) * 11 + Math.sin(i * 0.63 + 1) * 7 + Math.sin(i * 3.1) * 4

/* ---------- Chart 1: leads handled per month as automations are switched on ---------- */

const C1 = { x0: 120, x1: 1140, top: 60, bottom: 560, max: 500, weeks: 48 }
const STEPS = [
  { week: 8, lift: 70, label: ['MISSED-CALL', 'TEXT-BACK'] },
  { week: 18, lift: 95, label: ['NURTURE', 'SEQUENCES'] },
  { week: 29, lift: 80, label: ['APPOINTMENT', 'REMINDERS'] },
  { week: 39, lift: 110, label: ['AI', 'RECEPTION'] },
]

const leadsAt = (w: number) => {
  let v = 70 + w * 0.9
  for (const s of STEPS) if (w >= s.week) v += s.lift * Math.min(1, (w - s.week + 1) / 4)
  return Math.max(20, v + wobble(w))
}
const c1x = (w: number) => C1.x0 + (w / C1.weeks) * (C1.x1 - C1.x0)
const c1y = (v: number) => C1.bottom - (v / C1.max) * (C1.bottom - C1.top)
const C1_PATH = Array.from({ length: C1.weeks + 1 }, (_, w) => `${w ? 'L' : 'M'}${c1x(w).toFixed(1)} ${c1y(leadsAt(w)).toFixed(1)}`).join('')

export function LeadsChart() {
  return (
    <figure className={styles.chart} style={{ '--d': 'clamp(0, calc(var(--p) * 2.6 - 0.15), 1)' } as React.CSSProperties}>
      <figcaption className={styles.chartHead}>
        <span className={styles.chartTitle}>Each workflow adds capacity without adding headcount.</span>
        <span className={styles.chartSub}>Illustrative: leads handled per month by a three-person team.</span>
      </figcaption>
      <svg viewBox="0 0 1200 640" className={styles.chartSvg} role="img" aria-label="Illustrative line chart: leads handled per month rise from about 70 to about 470 as missed-call text-back, nurture sequences, appointment reminders and AI reception are switched on.">
        <line x1={C1.x0} y1={C1.top - 30} x2={C1.x0} y2={C1.bottom} className={styles.axis} />
        <line x1={C1.x0} y1={C1.bottom} x2={C1.x1 + 20} y2={C1.bottom} className={styles.axis} />
        {[100, 200, 300, 400, 500].map((v) => (
          <g key={v}>
            <line x1={C1.x0 - 14} y1={c1y(v)} x2={C1.x0} y2={c1y(v)} className={styles.axis} />
            <text x={C1.x0 - 26} y={c1y(v) + 5} textAnchor="end" className={styles.tick}>
              {v}
            </text>
          </g>
        ))}
        {[0, 12, 24, 36, 48].map((w) => (
          <text key={w} x={c1x(w)} y={C1.bottom + 34} textAnchor="middle" className={styles.tick}>
            {w === 0 ? 'MONTH 0' : `${w / 4}`}
          </text>
        ))}
        <text x={40} y={(C1.top + C1.bottom) / 2} transform={`rotate(-90 40 ${(C1.top + C1.bottom) / 2})`} textAnchor="middle" className={styles.axisLabel}>
          LEADS HANDLED / MONTH
        </text>

        <path d={`${C1_PATH} L${C1.x1} ${C1.bottom} L${C1.x0} ${C1.bottom} Z`} className={styles.chartArea} />
        <path d={C1_PATH} pathLength={1} className={`${styles.draw} ${styles.lineBlue}`} />

        {STEPS.map((s, i) => {
          const x = c1x(s.week)
          const y = c1y(leadsAt(s.week))
          const labelY = y - 110 - (i % 2) * 40
          return (
            <g key={s.week} className={styles.note} style={{ '--at': s.week / C1.weeks } as React.CSSProperties}>
              <line x1={x} y1={labelY + 12} x2={x} y2={y - 6} className={styles.axis} />
              <circle cx={x} cy={y} r={6} className={styles.dot} />
              {s.label.map((line, j) => (
                <text key={line} x={x} y={labelY - 18 * (s.label.length - 1 - j)} textAnchor="middle" className={styles.noteText}>
                  {line}
                </text>
              ))}
            </g>
          )
        })}
      </svg>
    </figure>
  )
}

/* ---------- Chart 2: share of new leads still waiting for a first reply ---------- */

const C2 = { x0: 120, x1: 1100, top: 60, bottom: 470, hours: 48 }
const c2x = (h: number) => C2.x0 + (h / C2.hours) * (C2.x1 - C2.x0)
const c2y = (pct: number) => C2.bottom - (pct / 100) * (C2.bottom - C2.top)

const CURVES = [
  { id: 'manual', label: 'MANUAL INBOX', tau: 26, floor: 0, className: styles.lineGrey, median: 18, medianLabel: '18 HRS' },
  { id: 'reminders', label: 'SHARED INBOX + REMINDERS', tau: 8.66, floor: 4, className: styles.lineInk, median: 6, medianLabel: '6 HRS' },
  { id: 'auto', label: 'STUDIO ESCROW WORKFLOW', tau: 0.03, floor: 2, className: styles.lineBlue, median: 0.02, medianLabel: '< 1 MIN' },
]

const curvePath = (tau: number, floor: number, seed: number) =>
  Array.from({ length: C2.hours * 4 + 1 }, (_, i) => {
    const h = i / 4
    const pct = h === 0 ? 100 : Math.min(100, floor + (100 - floor) * Math.exp(-h / tau) + Math.sin(i * 0.9 + seed) * 0.7)
    return `${i ? 'L' : 'M'}${c2x(h).toFixed(1)} ${c2y(pct).toFixed(1)}`
  }).join('')

const CURVE_PATHS = CURVES.map((c, i) => curvePath(c.tau, c.floor, i * 2))

export function ResponseChart() {
  return (
    <figure className={styles.chart} style={{ '--d': 'clamp(0, calc((var(--p) - 0.5) * 2.6), 1)' } as React.CSSProperties}>
      <figcaption className={styles.chartHead}>
        <span className={styles.chartTitle}>Automated follow-up closes the response gap.</span>
        <span className={styles.chartSub}>Illustrative: share of new leads still waiting for a first reply.</span>
        <span className={styles.chartLegend}><span className={styles.lineGrey}>Manual inbox</span><span className={styles.lineInk}>Shared inbox + reminders</span><span className={styles.lineBlue}>Studio Escrow workflow</span></span>
      </figcaption>
      <svg viewBox="0 0 1200 560" className={styles.chartSvg} role="img" aria-label="Illustrative chart: half of leads in a manual inbox wait about 18 hours for a reply, about 6 hours with reminders, and under a minute with a Studio Escrow workflow.">
        <line x1={C2.x0} y1={C2.top - 30} x2={C2.x0} y2={C2.bottom + 60} className={styles.axis} />
        <line x1={0} y1={C2.bottom} x2={1200} y2={C2.bottom} className={styles.axis} />
        {[20, 40, 60, 80, 100].map((v) => (
          <g key={v}>
            <line x1={C2.x0 - 14} y1={c2y(v)} x2={C2.x0} y2={c2y(v)} className={styles.axis} />
            <text x={C2.x0 - 26} y={c2y(v) + 5} textAnchor="end" className={styles.tick}>
              {v}
            </text>
          </g>
        ))}
        {Array.from({ length: 9 }, (_, i) => i * 6).map((h) => (
          <g key={h}>
            <line x1={c2x(h)} y1={C2.bottom} x2={c2x(h)} y2={C2.bottom + 14} className={styles.axis} />
            {h > 0 && (
              <text x={c2x(h)} y={C2.bottom + 40} textAnchor="middle" className={styles.tick}>
                {h}
              </text>
            )}
          </g>
        ))}
        <text x={C2.x0 + 10} y={C2.bottom + 78} className={styles.axisLabel}>
          HOURS SINCE INQUIRY
        </text>
        <text x={40} y={(C2.top + C2.bottom) / 2} transform={`rotate(-90 40 ${(C2.top + C2.bottom) / 2})`} textAnchor="middle" className={styles.axisLabel}>
          % OF LEADS WAITING
        </text>

        <line x1={C2.x0} y1={c2y(50)} x2={C2.x1 + 40} y2={c2y(50)} className={`${styles.dotted} ${styles.note}`} style={{ '--at': 0.2 } as React.CSSProperties} />

        {CURVES.map((c, i) => (
          <path key={c.id} d={CURVE_PATHS[i]} pathLength={1} className={`${styles.draw} ${styles.thin} ${c.className}`} />
        ))}

        {CURVES.map((c, i) => {
          const x = c2x(c.median)
          const endPct = Math.min(100, c.floor + (100 - c.floor) * Math.exp(-C2.hours / c.tau))
          return (
            <g key={c.id} className={`${styles.note} ${c.className}`} style={{ '--at': 0.35 + i * 0.15 } as React.CSSProperties}>
              <line x1={x} y1={c2y(50)} x2={x} y2={C2.bottom} className={styles.seriesStroke} />
              <circle cx={x} cy={c2y(50)} r={6} className={styles.seriesFill} />
              <circle cx={x} cy={C2.bottom} r={6} className={styles.seriesFill} />
              <text x={x + 14} y={c2y(50) + (c.id === 'auto' ? -44 : 70) + i * 0} className={styles.seriesText}>
                MEDIAN,
              </text>
              <text x={x + 14} y={c2y(50) + (c.id === 'auto' ? -26 : 88)} className={styles.seriesText}>
                {c.medianLabel}
              </text>
              <text
                x={C2.x1 + 60}
                y={c.id === 'auto' ? c2y(endPct) - 14 : c.id === 'reminders' ? c2y(endPct) - 48 : c2y(endPct) - 40}
                textAnchor="end"
                className={styles.seriesText}
              >
                {c.label}
              </text>
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
