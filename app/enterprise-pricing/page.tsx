import { CardGrid, ClosingCta, PageHero, Section, Sheet } from '@/components/site/sections'
import { href, routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('enterprisePricing')

const AUDIENCE = [
  { title: 'Larger teams', body: 'Organizations that need more than a standard plan provides.' },
  { title: 'Multi-location groups', body: 'Practices and businesses operating across several locations.' },
  { title: 'Complex stacks', body: 'Teams with existing systems that need to connect cleanly.' },
]

const CUSTOM = [
  { title: 'Multi-location', body: 'Structure accounts, pipelines and reporting across locations.' },
  { title: 'Custom integrations', body: 'Connect the systems your teams already depend on.' },
  { title: 'Custom portals', body: 'Portals shaped around your customers, clients or patients.' },
  { title: 'Dedicated onboarding', body: 'A guided rollout planned with your team.' },
]

export default function EnterprisePricingPage() {
  return (
    <main id="main">
      <PageHero
        routeId="enterprisePricing"
        eyebrow="Enterprise pricing"
        title="Pricing built around your organization."
        sub="Custom plans for larger teams and multi-location groups, scoped with you."
      />
      <Sheet>
        <Section id="who-title" title="Who it is for">
          <CardGrid items={AUDIENCE} columns={3} />
        </Section>
        <Section id="custom-title" title="What can be customized">
          <CardGrid items={CUSTOM} columns={4} />
        </Section>
      </Sheet>
      <ClosingCta
        title="Let's scope your plan."
        strong="Book a demo with our team."
        secondary={{ href: href('pricing'), label: 'See standard plans' }}
      />
    </main>
  )
}
