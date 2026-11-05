import type { CSSProperties } from 'react'
import { href } from '@/lib/routes'
import { logoUrl } from '@/components/features/feature-data'
import { FOLLOW_UP_ROWS, HBR_SOURCE } from './content'
import styles from './crm.module.css'
import { CountUp, InView } from './in-view'
import { ScrollProgress } from './scroll-progress'
import { Spark } from './spark'

const Cite = ({ n }: { n: number }) => (
  <sup className={styles.cite}>
    <a href={`#cite-${n}`} aria-label={`Source ${n}`}>
      [{n}]
    </a>
  </sup>
)

export { CRMHero as Hero } from './crm-hero'

function Marker({ x, y, at }: { x: number; y: number; at: number }) {
  return (
    <span className={styles.marker} style={{ left: `${x}%`, top: `${y}%`, '--at': at } as CSSProperties} aria-hidden="true">
      <Spark />
    </span>
  )
}

export function WhatPanel() {
  return (
    <section id="crm-overview" className={`${styles.panel} ${styles.panelWhat}`} aria-labelledby="what-title">
      <svg className={styles.panelLine} viewBox="0 0 1600 1000" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 424C40 440 60 448 80 448M480 448C600 448 640 500 690 560C740 620 790 648 880 648L1560 648C1585 648 1600 652 1600 656"
          pathLength={1}
          className={`${styles.draw} ${styles.drawPanel}`}
        />
      </svg>
      <Marker x={5} y={44.8} at={0.03} />
      <Marker x={30} y={44.8} at={0.12} />
      <Marker x={55} y={64.8} at={0.55} />

      <div className={styles.whatLead}>
        <h2 id="what-title" className={styles.h2Split}>
          <span>What it</span>
          <span className={styles.indent}>does</span>
        </h2>
        <p className={styles.panelText}>
          Studio Escrow keeps contacts, pipelines and every conversation in one connected CRM, then runs multi-step
          workflows on top of it.
        </p>
      </div>
      <p className={`${styles.panelText} ${styles.whatAside}`}>
        A form fill, a missed call or a stage change starts the next step automatically: a text, a task, an email or
        a handoff to the right person on your team.
      </p>
    </section>
  )
}

export function WhyPanel() {
  return (
    <section className={`${styles.panel} ${styles.panelWhy}`} aria-labelledby="why-title">
      <h2 id="why-title" className={styles.h2}>
        Why it matters now
      </h2>
      <div className={styles.twoCol}>
        <p className={styles.panelText}>
          Speed decides who wins the lead. Businesses that respond within an hour are nearly seven times as likely to
          qualify a lead as those that wait even an hour longer
          <Cite n={1} />. Yet the average first response still takes days, not minutes.
        </p>
        <p className={styles.panelText}>
          Most of that delay is not a people problem. It is a handoff problem: inquiries arrive after hours, mid-job
          and across separate inboxes. Automations answer in seconds and route the lead, so your team starts from a
          live conversation.
        </p>
      </div>

      <div className={styles.window}>
        <p className={styles.windowTitle}>Lead Follow-Up Window</p>
        <p className={styles.mono}>Manual inbox vs. automated workflow</p>
        <ul className={styles.rows}>
          {FOLLOW_UP_ROWS.map((row, i) => (
            <li key={row.label} className={styles.row} style={{ '--i': i } as CSSProperties}>
              <span className={styles.rowLabel}>{row.label}</span>
              <span className={styles.rowBars}>
                <span className={styles.barAuto} style={{ '--w': `${row.autoWidth}%` } as CSSProperties} />
                <span className={styles.rowAuto}>{row.auto}</span>
                <span className={styles.barManual} style={{ '--w': `${row.manualWidth}%` } as CSSProperties} />
                <span className={styles.rowManual}>{row.manual}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className={styles.footnote}>Illustrative timings. Blue: automated workflow. Grey: manual inbox.</p>
      </div>
    </section>
  )
}

export function Stats() {
  return (
    <section className={styles.stats} aria-label="Lead response statistics">
      <div className={styles.stat}>
        <p className={styles.statFigure}>
          <CountUp to={42} /> <span>Hours</span>
        </p>
        <h2 className={styles.statLabel}>Average Response Time</h2>
        <div className={styles.statCols}>
          <p className={styles.panelText}>
            Among companies that answered an online inquiry within 30 days, the average first response took 42 hours
            <Cite n={1} />.
          </p>
          <p className={styles.panelText}>
            Forty-two hours is two business days of a lead comparing your competitors, filling out their forms and
            taking their calls. By the time someone gets back to them, the decision is often already made.
          </p>
        </div>
      </div>

      <div className={`${styles.stat} ${styles.statOffset}`}>
        <p className={styles.statFigure}>
          <CountUp to={7} />
          <span>&times;</span>
        </p>
        <h2 className={styles.statLabel}>More Likely to Qualify</h2>
        <p className={`${styles.panelText} ${styles.statAside}`}>
          Contacting a lead within the hour made companies nearly seven times as likely to have a meaningful
          conversation with a decision maker. The interest is there. The follow-up is not.
          <Cite n={1} />
        </p>
      </div>

      <div className={styles.citations}>
        <p>Citations:</p>
        <ol>
          <li id="cite-1">
            {HBR_SOURCE.label}{' '}
            <a href={HBR_SOURCE.url} target="_blank" rel="noopener noreferrer">
              {HBR_SOURCE.title}
            </a>
            .
          </li>
        </ol>
      </div>
    </section>
  )
}

export function Statement() {
  return (
    <ScrollProgress as="section" className={styles.statement} labelledBy="statement-title">
      <div className={styles.statementInner}>
        <h2 id="statement-title" className={styles.statementTitle}>
            {"We're not waiting on the inbox. We're automating it."}
        </h2>
        <p className={styles.statementSub}>
          Workflows that answer, route and remind in seconds, so your team spends its time on the conversations that
          close.
        </p>
      </div>
      <svg className={styles.statementLine} viewBox="0 0 1280 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 188L720 188C820 188 860 150 900 90C940 30 980 4 1080 4L1280 4" pathLength={1} className={`${styles.draw} ${styles.drawEnter}`} />
      </svg>
    </ScrollProgress>
  )
}

export function ConnectedWorkspace() {
  return <section className={styles.visualStory} aria-labelledby="crm-connected-title">
    <img src="/features/crm-team.png" alt="Two business professionals collaborating over a laptop in a sunlit office" width={1536} height={1024} loading="lazy" />
    <div className={styles.visualCopy}>
      <span className={styles.visualEyebrow}>Connected tools. More human conversations.</span>
      <h2 id="crm-connected-title">Less switching tabs.<br/>More moving forward.</h2>
      <p>Keep the tools your team knows. Connect conversations, bookings and payments to the same customer story, so the next person always knows where to pick up.</p>
      <div className={styles.logoRow}>{[['Slack','slack'],['Stripe','stripe'],['HubSpot','hubspot'],['Zapier','zapier']].map(([name,slug])=><div key={slug}><img src={logoUrl(slug)} alt="" width={32} height={32} loading="lazy"/><span>{name}</span></div>)}</div>
      <p className={styles.integrationNote}>Integration options depend on your plan, connected accounts and workflow configuration.</p>
      <a href="/features#connected">Explore how everything connects →</a>
    </div>
  </section>
}

export function TimingIntro() {
  return (
    <section className={styles.timing} aria-labelledby="timing-title">
      <h2 id="timing-title" className={styles.timingTitle}>
        Leads keep coming, just not always at a good time
      </h2>
      <p className={styles.timingText}>
        Inquiries arrive after hours, mid-appointment and on weekends. Automations answer in seconds, route each lead
        to the right person and keep following up until someone replies, so timing stops deciding who wins the deal.
      </p>
    </section>
  )
}

export function ChartPanel({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.panel} ${styles.panelChart}`}>{children}</div>
}

export function Band() {
  return (
    <section className={styles.band} aria-labelledby="band-title">
      <h2 id="band-title" className={styles.bandTitle}>
        Towards hands-free operations
      </h2>
      <p className={styles.bandText}>
        {
          "Automation doesn't replace the people who run your business. It handles the repetitive steps, the reminders, the routing and the first reply, so your team can focus on the work only they can do. Start with one workflow, then add the next when you're ready."
        }
      </p>
      <div className={styles.bandLinks}>
        <p>
          <a href={href('features')}>Read more</a> about every
          <br />
          platform feature
        </p>
        <p>
          <a href={href('doItForYou')}>Read more</a> about having our team
          <br />
          build your workflows for you
        </p>
      </div>
    </section>
  )
}

const BUBBLES = [
  { text: 'Curious about...', rot: -2, x: -4 },
  { text: 'your pipeline, workflows, or setup?', rot: 2.5, x: 2 },
  { text: 'Feel free to reach out!', rot: -3, x: -9 },
] as const

export function ContactBubbles() {
  return (
    <section className={styles.bubbles} aria-label="Contact">
      <InView className={styles.bubbleStack} threshold={0.3}>
        <span className={`${styles.blob} ${styles.blobA}`} aria-hidden="true" />
        <span className={`${styles.blob} ${styles.blobB}`} aria-hidden="true" />
        <span className={`${styles.blob} ${styles.blobC}`} aria-hidden="true" />
        {BUBBLES.map((b, i) => (
          <p key={b.text} className={styles.bubble} style={{ '--rot': `${b.rot}deg`, '--x': `${b.x}%`, '--i': i } as CSSProperties}>
            {b.text}
          </p>
        ))}
        <p className={styles.bubble} style={{ '--rot': '2deg', '--x': '8%', '--i': 3 } as CSSProperties}>
          <a href={href('scheduleDemo')} className={styles.bubbleLink}>
            Click here to book a demo!
          </a>
        </p>
      </InView>
    </section>
  )
}
