import Image from 'next/image'
import { href } from '@/lib/routes'
import { MortgagePartners, MortgageIntegrations } from '@/components/mortgage/mortgage-ecosystem'
import { MortgageNurture } from '@/components/mortgage/mortgage-nurture'
import { RealEstateCalculator } from './real-estate-calculator'
import s from '@/components/mortgage/mortgage.module.css'

const features = [
  ['AI-assisted lead response', 'Meet the moment while interest is fresh.', 'Capture buyer and seller inquiries from your website, campaigns and open houses. Collect property preferences and moving timelines, then route the conversation to the right agent. Your licensed team provides advice and handles representation.'],
  ['Buyer & seller nurture', 'Stay in touch until they’re ready to move.', 'Build 30, 60 or 90-day journeys around each client’s plans. Share buying checklists, seller preparation tips and relevant market updates, with a personal check-in when the timing is right.'],
  ['iMessage & unified conversations', 'Every conversation. One familiar place.', 'Keep showing requests, listing questions and client follow-up connected to the contact record. Discuss device, provider, consent and setup requirements with our team before enabling a channel.'],
  ['Intent-based follow-up', 'Turn a signal into a thoughtful next step.', 'Use replies, listing-link clicks and appointment activity to create a call task or update your pipeline. Pause automated outreach when a client responds, and always respect consent and opt-outs.'],
  ['Listing marketing & referral relationships', 'Stay recognizable long after the closing.', 'Connect branded property campaigns, your website and open-house follow-up. Explore cinematic listing content through 24North, then keep past clients engaged with home anniversaries, useful updates and referral conversations.'],
]
const faqs = [
  ['Does this replace our MLS or transaction management system?', 'No. Real Estate Suite focuses on CRM, communications, lead nurturing and relationship automation. MLS, IDX and transaction platform connections depend on provider access, licensing and available APIs, and are scoped during setup.'],
  ['Can we build separate buyer and seller journeys?', 'Yes. Organize contacts by their stated goals, preferred properties and moving timeline. Build different messaging for buyers, sellers and past clients, with timing and outreach reviewed by your team.'],
  ['Are all integrations native?', 'No. Connections may use native integrations, Zapier or webhooks. Confirm supported events, fields, plans and permissions during implementation. Logos do not imply endorsement or that every feature is supported.'],
  ['Does AI provide real estate advice or make client decisions?', 'No. AI assists with initial context collection, draft communications and follow-up. Licensed professionals remain responsible for pricing advice, representation, disclosures and transaction decisions. Review automated messaging for accuracy, fair housing requirements and consent.'],
]

export function RealEstatePage() {
  return <main id="main" className={`${s.page} font-sans`}>
    <section className={s.hero}>
      <div className={s.breadcrumb}><span>Studio Escrow / Industry suites</span><a href="/mortgage-suite">Explore Mortgage Suite →</a></div>
      <span className={s.eyebrow}>Built for real estate agents, brokers & teams</span>
      <h1>Real Estate<span>Suite.</span></h1>
      <div className={s.heroBottom}><div><h2>Great connections.<br />Their next chapter.</h2><p>From the first showing to the next referral. Bring your buyer and seller leads, conversations and 30, 60 or 90-day nurture journeys into one connected real estate workspace.</p><div className={s.actions}><a className={s.primary} href={href('scheduleDemo')}>Build your real estate system <span aria-hidden="true">→</span></a><a className={s.textLink} href="#nurture">Explore the journey ↓</a></div></div><div className={s.heroImage}><Image src="/mortgage-suite/intro.png" alt="A transparent glass house with blue reflections" width={1024} height={768} priority sizes="(max-width: 760px) 100vw, 45vw" /><span>One home for every client relationship.</span></div></div>
      <div className={s.audience}><span>Independent agents</span><span>Real estate brokers</span><span>Teams & brokerages</span><span>Referral partners</span></div>
    </section>
    <MortgagePartners />
    <nav className={s.sectionNav} aria-label="Real Estate Suite sections"><a href="#nurture">The nurture journey</a><a href="#features">Your toolkit</a><a href="#integrations">Integrations</a><a href="#calculator">Explore the numbers</a></nav>
    <MortgageNurture industry="real-estate" />
    <section id="features" className={`${s.section} ${s.featureSection}`}><div className={s.sectionHeading}><span className={s.eyebrow}>Less chasing. More connecting.</span><h2>Every inquiry.<br />A personal next step.</h2><p>Open a capability to see how it fits into your real estate workflow.</p></div><div className={s.featureList}>{features.map(([title,subtitle,body],i) => <details key={title} open={i === 0}><summary><div><h3>{title}</h3><p>{subtitle}</p></div><span aria-hidden="true">+</span></summary><p>{body}</p></details>)}</div></section>
    <MortgageIntegrations industry="real-estate" />
    <RealEstateCalculator />
    <section className={s.cta}><span className={s.eyebrow}>Done for you. Built around you.</span><h2>Their next move starts<br />with a better connection.</h2><p>Map your lead sources, connect your tools and build a follow-up system around your buyers, sellers and past clients. We help with the setup, so you can focus on guiding the next move.</p><a className={s.lightButton} href={href('scheduleDemo')}>Let’s build your Real Estate Suite <span aria-hidden="true">→</span></a></section>
    <section className={`${s.section} ${s.faq}`}><div className={s.sectionHeading}><span className={s.eyebrow}>Good questions. Clear answers.</span><h2>Before your<br />next move.</h2></div><div>{faqs.map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
  </main>
}
