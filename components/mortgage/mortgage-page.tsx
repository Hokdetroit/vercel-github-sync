import Image from 'next/image'
import { href } from '@/lib/routes'
import { MortgagePartners, MortgageIntegrations } from './mortgage-ecosystem'
import { MortgageNurture } from './mortgage-nurture'
import { MortgageCalculator } from './mortgage-calculator'
import s from './mortgage.module.css'

export function MortgagePage() {
  return <main id="main" className={`${s.page} font-sans`}>
    <section className={s.hero}>
      <div className={s.breadcrumb}><span>Studio Escrow / Industry suites</span><a href="/medical-suite">Explore Medical Suite →</a></div>
      <span className={s.eyebrow}>Built for mortgage brokers & loan officers</span>
      <h1>Mortgage<span>Suite.</span></h1>
      <div className={s.heroBottom}><div><h2>Good relationships.<br />Great follow-through.</h2><p>From the first inquiry to the next referral. Bring your leads, conversations and 30, 60 or 90-day nurture sequences into one connected mortgage workspace.</p><div className={s.actions}><a className={s.primary} href={href('scheduleDemo')}>Build your mortgage system <span aria-hidden="true">→</span></a><a className={s.textLink} href="#nurture">Explore the journey ↓</a></div></div><div className={s.heroImage}><Image src="/mortgage-suite/intro.png" alt="A transparent glass house with blue reflections" width={1024} height={768} priority sizes="(max-width: 760px) 100vw, 45vw" /><span>One home for every relationship.</span></div></div>
      <div className={s.audience}><span>Mortgage brokers</span><span>Independent loan officers</span><span>Lending teams</span><span>Referral partners</span></div>
    </section>
    <MortgagePartners />
    <nav className={s.sectionNav} aria-label="Mortgage Suite sections"><a href="#nurture">The nurture journey</a><a href="#features">Your toolkit</a><a href="#integrations">Integrations</a><a href="#calculator">Explore the numbers</a></nav>
    <MortgageNurture />
    <section id="features" className={`${s.section} ${s.featureSection}`}><div className={s.sectionHeading}><span className={s.eyebrow}>Less chasing. More connecting.</span><h2>Every signal.<br />A thoughtful next step.</h2><p>Open a capability to see how it fits into your mortgage workflow.</p></div><div className={s.featureList}>{[
      ['AI-assisted lead response', 'Start the conversation while interest is fresh.', 'Collect a prospect’s goals and purchase timeline, tag the inquiry and route it to the right loan officer. Your licensed team remains responsible for lending advice and decisions.'],
      ['Seasoning & refinance nurture', 'Stay present until the timing is right.', 'Build 30, 60 or 90-day sequences around the timeline your team sets. Educational emails, reminders and personal outreach work together. A scheduled date is a follow-up cue, not a determination of loan eligibility.'],
      ['iMessage & unified conversations', 'Keep the conversation, not another inbox.', 'Bring iMessage alongside your CRM communications. Discuss device, provider, consent and setup requirements with the team before enabling a channel.'],
      ['Intent-based triggers', 'Let engagement guide the follow-up.', 'Use replies, link clicks and appointment activity to flag interested contacts, update your pipeline and create a personal call task. Respect opt-outs and stop sequences when appropriate.'],
      ['Personal brand & referral relationships', 'Build recognition beyond the transaction.', 'Connect your website, branded content and partner outreach. Explore cinematic content through 24North, alongside post-close touchpoints and realtor introductions.'],
    ].map(([title,subtitle,body],i) => <details key={title} open={i === 0}><summary><div><h3>{title}</h3><p>{subtitle}</p></div><span aria-hidden="true">+</span></summary><p>{body}</p></details>)}</div></section>
    <MortgageIntegrations />
    <MortgageCalculator />
    <section className={s.cta}><span className={s.eyebrow}>Done for you. Built around you.</span><h2>Your next closing starts<br />with a better connection.</h2><p>Map your lead sources, connect your tools and design a follow-up system your team can actually use. We help with the buildout, so you can focus on the relationship.</p><a className={s.lightButton} href={href('scheduleDemo')}>Let’s build your Mortgage Suite <span aria-hidden="true">→</span></a></section>
    <section className={`${s.section} ${s.faq}`}><div className={s.sectionHeading}><span className={s.eyebrow}>Good questions. Clear answers.</span><h2>Before you<br />move forward.</h2></div><div>{[
      ['Does this replace our loan origination system?', 'No. Mortgage Suite focuses on CRM, communications, nurturing and relationship automation. LOS connections are scoped around your provider, account access and available APIs.'],
      ['Can we customize the nurture windows?', 'Yes. The 30, 60 and 90-day examples are starting points. Your team should set timing and messaging around each borrower’s situation, program requirements, consent and compliance review.'],
      ['Are all integrations native?', 'No. Connections use a mix of native integrations, Zapier and webhooks. Confirm supported events, fields, plans and permissions during implementation. Logos do not imply endorsement or that every feature is supported.'],
      ['Does AI determine eligibility or approve loans?', 'No. AI assists with communications and initial context collection. Your licensed team handles advice, eligibility, underwriting and all lending decisions.'],
    ].map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
  </main>
}
