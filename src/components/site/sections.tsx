import type { CSSProperties, ReactNode } from 'react'
import { href, type RouteId } from '@/lib/routes'
import { Breadcrumbs } from './breadcrumbs'
import { LinkButton } from './link-button'
import styles from './site.module.css'

/** Blue hero — same markup as the /pricing hero. */
export function PageHero({
  routeId,
  eyebrow,
  title,
  sub,
  children,
}: {
  routeId: RouteId
  eyebrow: string
  title: ReactNode
  sub?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="lP4odW_hero" aria-labelledby="page-title">
      <div className="ma3IoW_container">
        <Breadcrumbs routeId={routeId} />
        <p className="lP4odW_eyebrow" data-reveal="true">
          {eyebrow}
        </p>
        <h1 id="page-title" className="ma3IoW_h1 lP4odW_heroTitle" data-reveal="true">
          {title}
        </h1>
        {sub ? (
          <p className="ma3IoW_bodyL lP4odW_heroSub" data-reveal="true">
            {sub}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  )
}

/** White rounded sheet that overlaps the hero. */
export function Sheet({ children }: { children: ReactNode }) {
  return (
    <div className="ma3IoW_sheet">
      <div className={styles.sheetBody}>{children}</div>
    </div>
  )
}

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="lP4odW_usage" aria-labelledby={id}>
      <div className="ma3IoW_container">
        <div className="lP4odW_sectionHead" data-reveal="true">
          <h2 id={id} className="ma3IoW_h2">
            {title}
          </h2>
          {intro ? <p className="ma3IoW_bodyM ma3IoW_grey">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  )
}

export interface CardItem {
  title: string
  body?: ReactNode
  index?: string
  meta?: ReactNode
}

export function CardGrid({ items, columns = 4, tall = false }: { items: CardItem[]; columns?: 3 | 4; tall?: boolean }) {
  return (
    <ul className={`lP4odW_usageGrid ${columns === 3 ? styles.grid3 : ''}`}>
      {items.map((item, i) => (
        <li
          key={item.title + i}
          className={`lP4odW_usageItem ${tall ? styles.cardTall : ''}`}
          style={{ '--i': i } as CSSProperties}
          data-reveal="true"
        >
          <div className={styles.stack}>
            {item.index ? <span className={styles.cardIndex}>{item.index}</span> : null}
            <h3 className="ma3IoW_h5">{item.title}</h3>
            {item.body ? <p className="ma3IoW_bodyM ma3IoW_grey">{item.body}</p> : null}
          </div>
          {item.meta ? <div className={styles.cardMuted}>{item.meta}</div> : null}
        </li>
      ))}
    </ul>
  )
}

/** Closing CTA — same markup as the /pricing closing section. Always links to /schedule-demo. */
export function ClosingCta({
  title,
  strong,
  secondary,
  showDemo = true,
}: {
  title: string
  strong: string
  secondary?: { href: string; label: string }
  showDemo?: boolean
}) {
  return (
    <section className="lP4odW_closing" aria-labelledby="closing-title">
      <div className="ma3IoW_container lP4odW_closingInner" data-reveal="true">
        <h2 id="closing-title" className="ma3IoW_h2">
          {title} <strong>{strong}</strong>
        </h2>
        <div className="lP4odW_closingActions">
          {showDemo ? <LinkButton href={href('scheduleDemo')}>Book a demo</LinkButton> : null}
          {secondary ? (
            <LinkButton href={secondary.href} variant="ghost">
              {secondary.label}
            </LinkButton>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export interface FaqEntry {
  q: string
  a: string
}

/** Accordion — same markup as the /pricing FAQ. */
export function FaqGroup({ id, title, items }: { id: string; title: string; items: FaqEntry[] }) {
  return (
    <section className="lP4odW_faq" aria-labelledby={id}>
      <div className="ma3IoW_container lP4odW_faqGrid">
        <h2 id={id} className="ma3IoW_h2" data-reveal="true">
          {title}
        </h2>
        <div className="lP4odW_faqList" data-reveal="true">
          {items.map((item) => (
            <details key={item.q} className="lP4odW_faqItem">
              <summary>
                <span className="ma3IoW_h5">{item.q}</span>
                <span className="lP4odW_faqIcon" aria-hidden="true" />
              </summary>
              <p className="ma3IoW_bodyM ma3IoW_grey">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
