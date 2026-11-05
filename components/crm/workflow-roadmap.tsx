'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { STAGES, type StageId } from './content'
import styles from './crm.module.css'
import { MOTION_QUERY, useScrollFrame } from './scroll-progress'
import { Spark } from './spark'

const ITEMS = STAGES.flatMap((stage) => stage.milestones.map((text) => ({ stage: stage.id, text })))

/**
 * Pinned, dark section: background image, stage copy and tabs stay fixed while the
 * milestone list scrolls past a center line. Items brighten as they cross the focus line
 * and the active stage follows whichever milestone was last passed.
 */
export function WorkflowRoadmap() {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState<StageId>('capture')

  useScrollFrame(() => {
    const vh = window.innerHeight
    const mobile = window.innerWidth < 900
    const focus = vh * (mobile ? 0.72 : 0.55)
    const reduced = window.matchMedia(MOTION_QUERY).matches
    let current: StageId = ITEMS[0].stage

    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      if (center < focus + vh * 0.05) current = ITEMS[i].stage
      const distance = Math.abs(center - focus) / (vh * 0.55)
      const fade = Math.min(1, Math.max(0, (distance - 0.5) / 0.5))
      el.style.opacity = reduced ? '1' : (1 - fade * 0.92).toFixed(3)
    })

    setActive((prev) => (prev === current ? prev : current))
  })

  const jumpTo = (stage: StageId) => {
    const index = ITEMS.findIndex((item) => item.stage === stage)
    const el = itemRefs.current[index]
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5
    window.scrollTo({ top, behavior: window.matchMedia(MOTION_QUERY).matches ? 'auto' : 'smooth' })
  }

  return (
    <section className={styles.rm} aria-labelledby="rm-title">
      <h2 id="rm-title" className="sr-only">
        How CRM and automations work together
      </h2>
      <div className={styles.rmSticky}>
        {STAGES.map((stage, i) => (
          <div key={stage.id} className={styles.rmBg} data-active={stage.id === active} aria-hidden="true">
            <Image src={stage.image} alt="" fill sizes="100vw" priority={i === 0} className={styles.rmBgImg} />
          </div>
        ))}
        <div className={styles.rmShade} aria-hidden="true" />
        <div className={styles.rmLine} aria-hidden="true" />

        <nav className={styles.rmTabs} aria-label="Workflow stages">
          {STAGES.map((stage) => (
            <button
              key={stage.id}
              type="button"
              className={styles.rmTab}
              aria-current={stage.id === active ? 'step' : undefined}
              onClick={() => jumpTo(stage.id)}
            >
              <span className={styles.rmTabLine} aria-hidden="true" />
              <span>{stage.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.rmCopy} aria-live="polite">
          {STAGES.map((stage) => (
            <div key={stage.id} className={styles.rmCopyItem} data-active={stage.id === active} aria-hidden={stage.id !== active}>
              <h3 className={styles.rmTitle}>{stage.title}</h3>
              <p className={styles.rmBody}>{stage.body}</p>
            </div>
          ))}
        </div>
      </div>

      <ol className={styles.rmList}>
        {ITEMS.map((item, i) => (
          <li
            key={item.text}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            className={styles.rmItem}
            data-first={i === 0 || ITEMS[i - 1].stage !== item.stage ? 'true' : undefined}
          >
            <span className={styles.rmMarker} aria-hidden="true">
              <Spark />
            </span>
            <span className="sr-only">{STAGES.find((s) => s.id === item.stage)?.label}: </span>
            {item.text}
          </li>
        ))}
      </ol>
    </section>
  )
}
