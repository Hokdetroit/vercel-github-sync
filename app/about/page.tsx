import { CardGrid, ClosingCta, PageHero, Section, Sheet } from '@/components/site/sections'
import styles from '@/components/site/site.module.css'
import { href, routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('about')

const PILLARS = [
  { title: 'CRM', body: 'Contacts, pipelines and every conversation in one record.' },
  { title: 'AI agents', body: 'Reception, follow-up and conversation support you configure and review.' },
  { title: 'Automation', body: 'Multi-step workflows that keep work moving between tools and teams.' },
  { title: 'Workforce operations', body: 'Coordinate the people and tasks behind the work.' },
  { title: 'Websites', body: 'Pages and funnels that route leads straight into your CRM.' },
  { title: 'Healthcare systems', body: 'The Medical Suite, HIPAA-ready with a Business Associate Agreement available.' },
]

const AUDIENCES = [
  'Real estate',
  'Mortgage',
  'Medical and wellness',
  'Home services',
  'Agencies',
  'E-commerce',
  'Restaurants',
  'Events',
  'Professional services',
]

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        routeId="about"
        eyebrow="About Studio Escrow"
        title="One connected business operating system."
        sub="Studio Escrow brings CRM, AI agents, automation, workforce operations, websites and healthcare systems together, so your business runs from one place."
      />
      <Sheet>
        <Section
          id="what-title"
          title="What Studio Escrow is"
          intro="A connected business operating system. Instead of stitching separate tools together, every part of your operation shares the same data and workflows."
        >
          <CardGrid items={PILLARS} columns={3} />
        </Section>

        <Section
          id="who-title"
          title="Who it serves"
          intro="Industry-specific setups connect your pipeline, communications and workflows."
        >
          <ul className={`${styles.list} ${styles.checkGrid}`} data-reveal="true">
            {AUDIENCES.map((audience) => (
              <li key={audience} className="ma3IoW_h5">
                {audience}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="hok-title" title="Built by House of Karma">
          <div className={styles.prose} data-reveal="true">
            <p className="ma3IoW_bodyL">
              Studio Escrow is built by House of Karma, the team that also delivers its done-for-you buildouts: branding,
              websites, CRM setup and lead-source connections.
            </p>
          </div>
        </Section>
      </Sheet>
      <ClosingCta
        title="See how it fits your business."
        strong="Book a demo with our team."
        secondary={{ href: href('features'), label: 'Explore features' }}
      />
    </main>
  )
}
