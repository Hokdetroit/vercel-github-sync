'use client'

import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react'

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

const MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/** Calls `onFrame` on every animation frame while scrolling or resizing. */
export function useScrollFrame(onFrame: () => void) {
  const frame = useRef(onFrame)
  frame.current = onFrame

  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      frame.current()
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
}

type Mode = 'enter' | 'exit'

/**
 * Exposes scroll position as a `--p` custom property (0 → 1).
 * "enter": 0 when the element's top reaches the viewport bottom, 1 when it reaches 30% from the top.
 * "exit": 0 while the element's top is at the viewport top, 1 once it has scrolled fully past.
 */
export function ScrollProgress({
  mode = 'enter',
  className,
  style,
  children,
  as: Tag = 'div',
  id,
  labelledBy,
}: {
  mode?: Mode
  className?: string
  style?: CSSProperties
  children: ReactNode
  as?: 'div' | 'section'
  id?: string
  labelledBy?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useScrollFrame(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia(MOTION_QUERY).matches) {
      el.style.setProperty('--p', '1')
      return
    }
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight
    const p = mode === 'enter' ? (vh - rect.top) / (vh * 0.7) : -rect.top / Math.max(1, rect.height)
    el.style.setProperty('--p', clamp01(p).toFixed(4))
  })

  return (
    <Tag
      ref={ref as never}
      id={id}
      aria-labelledby={labelledBy}
      className={className}
      style={{ '--p': mode === 'enter' ? 1 : 0, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

export { clamp01, MOTION_QUERY }
