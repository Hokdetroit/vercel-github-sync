'use client'

import { type CSSProperties, type ReactNode, useRef } from 'react'
import styles from './crm.module.css'
import { clamp01, useScrollFrame } from './scroll-progress'

const ACTIVE_QUERY = '(min-width: 900px) and (prefers-reduced-motion: no-preference)'
const HOLD = 0.2

/**
 * Pins a full-viewport track while vertical scrolling slides its panels horizontally.
 * Progress is shared with every panel through the `--p` custom property, so lines and
 * charts inside the panels can draw themselves in sync with the scroll.
 */
export function HorizontalScroll({
  panels,
  viewports,
  children,
  label,
}: {
  panels: number
  /** Total height of the scroll runway, in viewport heights. */
  viewports: number
  children: ReactNode
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useScrollFrame(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia(ACTIVE_QUERY).matches) {
      el.style.setProperty('--p', '1')
      return
    }
    const rect = el.getBoundingClientRect()
    const runway = rect.height - window.innerHeight
    const p = clamp01(-rect.top / Math.max(1, runway))
    // Hold the first and last panel still briefly so their content can animate in place.
    const t = clamp01((p - HOLD) / (1 - HOLD * 2))
    const eased = t * t * (3 - 2 * t)
    el.style.setProperty('--p', p.toFixed(4))
    el.style.setProperty('--t', eased.toFixed(4))
  })

  return (
    <div
      ref={ref}
      className={styles.hs}
      role="region"
      aria-label={label}
      style={
        {
          '--p': 0,
          '--t': 0,
          '--runway': viewports,
          '--panels': panels,
          '--shift': `${(-(panels - 1) / panels) * 100}%`,
        } as CSSProperties
      }
    >
      <div className={styles.hsSticky}>
        <div className={styles.hsTrack}>{children}</div>
      </div>
    </div>
  )
}
