import type { CSSProperties } from "react";
import { Bot } from "lucide-react";
import { href } from "@/lib/routes";
import { logoUrl } from "@/components/features/feature-data";
import { FOLLOW_UP_ROWS, AI_SOURCE } from "./content";
import styles from "../crm/crm.module.css";
import { CountUp, InView } from "../crm/in-view";
import { ScrollProgress } from "../crm/scroll-progress";
import { Spark } from "../crm/spark";

const Cite = ({ n }: { n: number }) => (
  <sup className={styles.cite}>
    <a href={`#ai-cite-${n}`} aria-label={`Source ${n}`}>
      [{n}]
    </a>
  </sup>
);

export { AIAgentHero as Hero } from "./ai-agent-hero";

function Marker({ x, y, at }: { x: number; y: number; at: number }) {
  return (
    <span
      className={styles.marker}
      style={{ left: `${x}%`, top: `${y}%`, "--at": at } as CSSProperties}
      aria-hidden="true"
    >
      <Spark />
    </span>
  );
}

export function WhatPanel() {
  return (
    <section
      id="ai-overview"
      className={`${styles.panel} ${styles.panelWhat}`}
      aria-labelledby="ai-what-title"
    >
      <svg
        className={styles.panelLine}
        viewBox="0 0 1600 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
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
        <h2 id="ai-what-title" className={styles.h2Split}>
          <span>What they</span>
          <span className={styles.indent}>do</span>
        </h2>
        <p className={styles.panelText}>
          Studio Escrow AI agents triage, respond, resolve and escalate conversations across every
          channel — chat, call, email and social — then hand off to your team with full context.
        </p>
      </div>
      <p className={`${styles.panelText} ${styles.whatAside}`}>
        A new message, an after-hours call or a repeat question starts the next step automatically:
        a reply, a booking, a lookup or an escalation to the right person on your team.
      </p>
    </section>
  );
}

export function WhyPanel() {
  return (
    <section className={`${styles.panel} ${styles.panelWhy}`} aria-labelledby="ai-why-title">
      <h2 id="ai-why-title" className={styles.h2}>
        Why it matters now
      </h2>
      <div className={styles.twoCol}>
        <p className={styles.panelText}>
          Speed decides who wins the conversation. Customers increasingly expect an immediate
          response, any hour of the day
          <Cite n={1} />. Yet most teams still answer in hours, not seconds, because inquiries
          arrive after hours and across separate inboxes.
        </p>
        <p className={styles.panelText}>
          Most of that delay is not a people problem. It is a coverage problem. AI agents answer in
          seconds, around the clock, and route the conversation, so your team starts from a live
          exchange instead of a backlog.
        </p>
      </div>

      <div className={styles.window}>
        <p className={styles.windowTitle}>First-Response Window</p>
        <p className={styles.mono}>Manual inbox vs. AI agent</p>
        <ul className={styles.rows}>
          {FOLLOW_UP_ROWS.map((row, i) => (
            <li key={row.label} className={styles.row} style={{ "--i": i } as CSSProperties}>
              <span className={styles.rowLabel}>{row.label}</span>
              <span className={styles.rowBars}>
                <span
                  className={styles.barAuto}
                  style={{ "--w": `${row.autoWidth}%` } as CSSProperties}
                />
                <span className={styles.rowAuto}>{row.auto}</span>
                <span
                  className={styles.barManual}
                  style={{ "--w": `${row.manualWidth}%` } as CSSProperties}
                />
                <span className={styles.rowManual}>{row.manual}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className={styles.footnote}>Illustrative timings. Blue: AI agent. Grey: manual inbox.</p>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className={styles.stats} aria-label="AI agent response statistics">
      <div className={styles.stat}>
        <p className={styles.statFigure}>
          <CountUp to={60} /> <span>Seconds</span>
        </p>
        <h2 className={styles.statLabel}>First Response Time</h2>
        <div className={styles.statCols}>
          <p className={styles.panelText}>
            Around the clock, an AI agent can reply to a new inquiry in under a minute — while a
            manual inbox averages hours or waits until morning.
          </p>
          <p className={styles.panelText}>
            Customers increasingly expect an immediate response
            <Cite n={1} />. Sixty seconds is the difference between a live conversation and a lead
            that has already moved on to a competitor.
          </p>
        </div>
      </div>

      <div className={`${styles.stat} ${styles.statOffset}`}>
        <p className={styles.statFigure}>
          <CountUp to={3} />
          <span>&times;</span>
        </p>
        <h2 className={styles.statLabel}>More Conversations Per Person</h2>
        <p className={`${styles.panelText} ${styles.statAside}`}>
          By handling triage, answers and repeatable tasks, an AI agent lets each person on your
          team cover more conversations — focusing their time on the judgment calls only they can
          make.
          <Cite n={1} />
        </p>
      </div>

      <div className={styles.citations}>
        <p>Citations:</p>
        <ol>
          <li id="ai-cite-1">
            {AI_SOURCE.label}{" "}
            <a href={AI_SOURCE.url} target="_blank" rel="noopener noreferrer">
              {AI_SOURCE.title}
            </a>
            .
          </li>
        </ol>
      </div>
    </section>
  );
}

export function Statement() {
  return (
    <ScrollProgress as="section" className={styles.statement} labelledBy="ai-statement-title">
      <div className={styles.statementInner}>
        <h2 id="ai-statement-title" className={styles.statementTitle}>
          {"We're not replacing your team. We're giving it more reach."}
        </h2>
        <p className={styles.statementSub}>
          AI agents that answer, triage and resolve in seconds, so your people spend their time on
          the conversations that close.
        </p>
      </div>
      <svg
        className={styles.statementLine}
        viewBox="0 0 1280 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 188L720 188C820 188 860 150 900 90C940 30 980 4 1080 4L1280 4"
          pathLength={1}
          className={`${styles.draw} ${styles.drawEnter}`}
        />
      </svg>
    </ScrollProgress>
  );
}

export function ConnectedWorkspace() {
  return (
    <section className={styles.visualStory} aria-labelledby="ai-connected-title">
      <div
        className={styles.visualStoryImg}
        aria-hidden="true"
        style={{
          width: "100%",
          height: 540,
          borderRadius: 28,
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--blue) 22%, var(--paper)) 0%, color-mix(in srgb, var(--ink) 8%, var(--paper)) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Bot size={120} strokeWidth={1.1} style={{ color: "var(--blue)", opacity: 0.85 }} />
      </div>
      <div className={styles.visualCopy}>
        <span className={styles.visualEyebrow}>Connected context. More human handoffs.</span>
        <h2 id="ai-connected-title">
          Less repeating yourself.
          <br />
          More getting through.
        </h2>
        <p>
          Give each agent your knowledge base, CRM history and connected tools. The agent answers
          with your context, then hands off to a person with the full story attached, so the next
          step never starts from zero.
        </p>
        <div className={styles.logoRow}>
          {[
            ["Slack", "slack"],
            ["Stripe", "stripe"],
            ["HubSpot", "hubspot"],
            ["Zapier", "zapier"],
          ].map(([name, slug]) => (
            <div key={slug}>
              <img src={logoUrl(slug)} alt="" width={32} height={32} loading="lazy" />
              <span>{name}</span>
            </div>
          ))}
        </div>
        <p className={styles.integrationNote}>
          Integration options depend on your plan, connected accounts and agent configuration.
        </p>
        <a href="/features#connected">Explore how everything connects →</a>
      </div>
    </section>
  );
}

export function TimingIntro() {
  return (
    <section className={styles.timing} aria-labelledby="ai-timing-title">
      <h2 id="ai-timing-title" className={styles.timingTitle}>
        Conversations keep coming, just not always on your hours
      </h2>
      <p className={styles.timingText}>
        Inquiries arrive after hours, mid-appointment and on weekends. AI agents answer in seconds,
        route each conversation to the right place and keep following up until someone is needed, so
        coverage stops deciding who wins the deal.
      </p>
    </section>
  );
}

export function ChartPanel({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.panel} ${styles.panelChart}`}>{children}</div>;
}

export function Band() {
  return (
    <section className={styles.band} aria-labelledby="ai-band-title">
      <h2 id="ai-band-title" className={styles.bandTitle}>
        Towards always-on coverage
      </h2>
      <p className={styles.bandText}>
        {
          "An AI agent doesn't replace the people who run your business. It handles the repetitive conversations, the first replies, the routing and the after-hours coverage, so your team can focus on the work only they can do. Start with one agent, then add the next when you're ready."
        }
      </p>
      <div className={styles.bandLinks}>
        <p>
          <a href={href("features")}>Read more</a> about every
          <br />
          platform feature
        </p>
        <p>
          <a href={href("doItForYou")}>Read more</a> about having our team
          <br />
          build your agents for you
        </p>
      </div>
    </section>
  );
}

const BUBBLES = [
  { text: "Curious about...", rot: -2, x: -4 },
  { text: "AI agents, workflows, or setup?", rot: 2.5, x: 2 },
  { text: "Feel free to reach out!", rot: -3, x: -9 },
] as const;

export function ContactBubbles() {
  return (
    <section className={styles.bubbles} aria-label="Contact">
      <InView className={styles.bubbleStack} threshold={0.3}>
        <span className={`${styles.blob} ${styles.blobA}`} aria-hidden="true" />
        <span className={`${styles.blob} ${styles.blobB}`} aria-hidden="true" />
        <span className={`${styles.blob} ${styles.blobC}`} aria-hidden="true" />
        {BUBBLES.map((b, i) => (
          <p
            key={b.text}
            className={styles.bubble}
            style={{ "--rot": `${b.rot}deg`, "--x": `${b.x}%`, "--i": i } as CSSProperties}
          >
            {b.text}
          </p>
        ))}
        <p
          className={styles.bubble}
          style={{ "--rot": "2deg", "--x": "8%", "--i": 3 } as CSSProperties}
        >
          <a href={href("scheduleDemo")} className={styles.bubbleLink}>
            Click here to book a demo!
          </a>
        </p>
      </InView>
    </section>
  );
}
