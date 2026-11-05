import { href } from "@/lib/routes";
import { MortgagePartners, MortgageIntegrations } from "../mortgage/mortgage-ecosystem";
import { AboutJourney } from "./about-journey";
import { AboutCalculator } from "./about-calculator";
import s from "../mortgage/mortgage.module.css";

export function AboutPage() {
  return (
    <main id="main" className={`${s.page} font-sans`}>
      <section className={s.hero}>
        <div className={s.breadcrumb}>
          <span>Studio Escrow / About</span>
          <a href={href("features")}>Explore the platform →</a>
        </div>
        <span className={s.eyebrow}>About Studio Escrow</span>
        <h1>
          One<span>system.</span>
        </h1>
        <div className={s.heroBottom}>
          <div>
            <h2>
              Built from a real business.
              <br />
              Made for yours.
            </h2>
            <p>
              Studio Escrow is a connected business operating system. CRM, AI agents, automation,
              workforce operations, websites and healthcare systems — all in one place, sharing one
              record per customer. We build the platform and deliver the buildout.
            </p>
            <div className={s.actions}>
              <a className={s.primary} href={href("scheduleDemo")}>
                Book a demo <span aria-hidden="true">→</span>
              </a>
              <a className={s.textLink} href="#journey">
                Our story ↓
              </a>
            </div>
          </div>
          <div className={s.heroImage}>
            <img
              src="/mortgage-suite/intro.png"
              alt="A transparent glass house with blue reflections"
              width={1024}
              height={768}
              sizes="(max-width: 760px) 100vw, 45vw"
            />
            <span>One record. One platform.</span>
          </div>
        </div>
        <div className={s.audience}>
          <span>Real estate</span>
          <span>Mortgage</span>
          <span>Medical & wellness</span>
          <span>Home services</span>
          <span>Agencies</span>
          <span>E-commerce</span>
        </div>
      </section>

      <MortgagePartners />

      <nav className={s.sectionNav} aria-label="About sections">
        <a href="#journey">Our story</a>
        <a href="#infrastructure">Infrastructure</a>
        <a href="#integrations">Integrations</a>
        <a href="#calculator">Explore the numbers</a>
      </nav>

      <AboutJourney />

      <section id="infrastructure" className={`${s.section} ${s.featureSection}`}>
        <div className={s.sectionHeading}>
          <span className={s.eyebrow}>One platform. Every layer connected.</span>
          <h2>
            The infrastructure
            <br />
            behind one record.
          </h2>
          <p>Open a layer to see how it fits into the connected operating system.</p>
        </div>
        <div className={s.featureList}>
          {[
            [
              "Unified CRM",
              "One record per customer.",
              "Contacts, pipelines and every conversation live together. No more switching between tools to find context — it is all on the contact, in the order it happened.",
            ],
            [
              "AI agents",
              "Repeatable conversations, handled.",
              "AI agents triage, respond, resolve and escalate around the clock. You configure the guardrails and review the work; your team stays in control of decisions.",
            ],
            [
              "Automation engine",
              "Multi-step workflows that keep moving.",
              "Capture, nurture, convert and retain automatically. Triggers, conditions and actions connect your tools and teams so nothing stalls waiting for a manual handoff.",
            ],
            [
              "Workforce operations",
              "Coordinate the people behind the work.",
              "Tasks, assignments and accountability across your team. See who is doing what, what is overdue, and what needs attention next.",
            ],
            [
              "Websites & funnels",
              "Leads route straight into your CRM.",
              "Pages and funnels built on the same platform, so a form submission becomes a contact, a pipeline entry and a workflow trigger in one step.",
            ],
            [
              "Healthcare systems",
              "The Medical Suite, HIPAA-ready.",
              "Patient CRM, AI receptionist, scheduling, intake and follow-up in a managed suite with a Business Associate Agreement available.",
            ],
          ].map(([title, subtitle, body], i) => (
            <details key={title} open={i === 0}>
              <summary>
                <div>
                  <h3>{title}</h3>
                  <p>{subtitle}</p>
                </div>
                <span aria-hidden="true">+</span>
              </summary>
              <p>{body}</p>
            </details>
          ))}
        </div>
      </section>

      <MortgageIntegrations industry="healthcare" />

      <AboutCalculator />

      <section className={s.cta}>
        <span className={s.eyebrow}>Built by House of Karma</span>
        <h2>
          We build the platform.
          <br />
          We deliver the buildout.
        </h2>
        <p>
          Studio Escrow is built by House of Karma — the same team that delivers done-for-you
          buildouts: branding, websites, CRM setup, lead-source connections, AI agent setup and
          workflow builds. You get the software and the team to set it up.
        </p>
        <a className={s.lightButton} href={href("scheduleDemo")}>
          Let's build your system <span aria-hidden="true">→</span>
        </a>
      </section>

      <section className={`${s.section} ${s.faq}`}>
        <div className={s.sectionHeading}>
          <span className={s.eyebrow}>Good questions. Clear answers.</span>
          <h2>
            About
            <br />
            Studio Escrow.
          </h2>
        </div>
        <div>
          {[
            [
              "What is Studio Escrow?",
              "A connected business operating system. CRM, AI agents, automation, workforce operations, websites and healthcare systems in one platform, sharing one record per customer.",
            ],
            [
              "Who built it?",
              "Studio Escrow is built by House of Karma, the team that also delivers its done-for-you buildouts — branding, websites, CRM setup and lead-source connections.",
            ],
            [
              "Do I have to set it up myself?",
              "No. Done-for-you implementation is part of the offering. We handle branding, website, CRM setup, lead-source connections, AI agent setup and workflow builds.",
            ],
            [
              "Is it secure enough for healthcare?",
              "The Medical Suite is HIPAA-ready with a Business Associate Agreement available. Data protection and access controls are part of how the platform is built.",
            ],
            [
              "Does it replace all my tools?",
              "It replaces the disconnected ones. Where a specialist tool is still needed, Studio Escrow connects to it through native integrations, Zapier or webhooks.",
            ],
            [
              "How do I get started?",
              "Book a demo. Tell us about your business and the tools you use today, and we will walk you through the right setup.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
