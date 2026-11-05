import Image from 'next/image'
import { href } from '@/lib/routes'
import { suites, type SuiteKind } from './content'
import { SuiteJourney } from './suite-journey'
import { MedicalEcosystem } from './medical-ecosystem'
import s from './suites.module.css'

export function SuitePage({ kind }: { kind: SuiteKind }) {
  const data = suites[kind]
  return (
    <main id="main" className={`${s.page} font-sans`}>
      <section className={s.hero} aria-labelledby="suite-title">
        <div className={s.heroTop}><span>Studio Escrow / Industry suites</span><a href={kind === 'medical' ? '/mortgage-suite' : '/medical-suite'}>Explore {kind === 'medical' ? 'Mortgage' : 'Medical'} Suite <span aria-hidden="true">→</span></a></div>
        <p className={s.eyebrow}>{data.eyebrow}</p>
        <h1 id="suite-title">{data.name}<br /><span>Suite.</span></h1>
        <div className={s.heroBottom}>
          <p>{data.tagline}</p>
          <div><p>{data.intro}</p><div className={s.actions}><a className={s.primary} href={href('scheduleDemo')}>Book a Demo <span aria-hidden="true">→</span></a><a className={s.textLink} href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a></div></div>
        </div>
      </section>
      <div className={s.audience} aria-label="Built for">{data.audience.map(item => <span key={item}>{item}</span>)}</div>
      <section className={s.overview}>
        <div className={s.overviewCopy}><p className={s.eyebrow}>Less friction. More connection.</p><h2>{data.heading}</h2><p>{data.description}</p><a className={s.textLink} href="#capabilities">Explore the suite <span aria-hidden="true">↓</span></a></div>
        <div className={s.art}><Image src={data.image} alt={data.imageAlt} width={1024} height={768} sizes="(max-width: 760px) 100vw, 50vw" /><span>{kind === 'medical' ? 'Care, connected.' : 'Relationships, connected.'}</span></div>
      </section>
      <section id="capabilities" className={s.capabilities}>
        <div className={s.sectionHeading}><p className={s.eyebrow}>The tools behind the experience</p><h2>Everything works<br />better together.</h2></div>
        <div className={s.features}>{data.features.map(([title, body]) => <article key={title}><span className={s.featureMark} aria-hidden="true">→</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>
      <SuiteJourney kind={kind} />
      {kind === 'medical' ? <MedicalEcosystem /> : <section className={s.connections}>
        <div className={s.sectionHeading}><p className={s.eyebrow}>Your channels, connected</p><h2>{data.connectionTitle}</h2><p>{data.connectionBody}</p><a className={s.textLink} href={data.connectionLink}>{data.connectionLabel} <span aria-hidden="true">→</span></a></div>
        <div className={s.connectionGrid}>{data.connections.map(item => <div key={item}><span aria-hidden="true">↔</span>{item}</div>)}</div>
      </section>}
      <section className={s.band}><p className={s.eyebrow}>Done for you. Not left to you.</p><h2>{data.bandTitle}</h2><p>{data.bandBody}</p><a className={s.lightButton} href={href('doItForYou')}>Meet your implementation team <span aria-hidden="true">→</span></a></section>
      <section className={s.faq}><div><p className={s.eyebrow}>A few things worth knowing</p><h2>Good questions.<br />Clear answers.</h2></div><div>{data.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    </main>
  )
}
