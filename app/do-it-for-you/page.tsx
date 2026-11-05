import { CardGrid, ClosingCta, PageHero, Section, Sheet } from '@/components/site/sections'
import { href, routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('doItForYou')

const INCLUDED = [
  { title: 'Branding', body: 'Your brand applied across your pages and communications.' },
  { title: 'Website', body: 'A website that routes leads straight into your CRM.' },
  { title: 'CRM setup', body: 'Pipelines, contacts and stages configured for how you work.' },
  { title: 'Lead-source connections', body: 'The places your leads come from, connected to your pipeline.' },
  { title: 'AI agent setup', body: 'AI agents configured for reception, conversations and follow-up.' },
  { title: 'Workflow build', body: 'Multi-step workflows built so follow-up runs on its own.' },
]

const STEPS = [
  { index: '01', title: 'Discovery', body: 'We learn how your business runs and what you need from the platform.' },
  { index: '02', title: 'Build', body: 'We set up your branding, website, CRM, connections, agents and workflows.' },
  { index: '03', title: 'Launch', body: 'We test the setup with you and go live.' },
  { index: '04', title: 'Support', body: 'We help you adjust as your business grows.' },
]

const AUDIENCE = [
  { title: 'Busy owners', body: 'You want the platform working without building it yourself.' },
  { title: 'Teams switching tools', body: 'You are moving off a stack of disconnected tools and want a clean migration.' },
  { title: 'Specialized industries', body: 'Healthcare practices, loan officers and agencies that need setups built for their work.' },
]

export default function DoItForYouPage() {
  return (
    <main id="main">
      <PageHero
        routeId="doItForYou"
        eyebrow="Do it for you"
        title="We build it. You run your business."
        sub="Done-for-you implementation of Studio Escrow, quoted to the scope you need."
      />
      <Sheet>
        <Section id="included-title" title="What is included">
          <CardGrid items={INCLUDED} columns={3} />
        </Section>
        <Section id="steps-title" title="How it works">
          <CardGrid items={STEPS} columns={4} />
        </Section>
        <Section id="for-title" title="Who it is for">
          <CardGrid items={AUDIENCE} columns={3} />
        </Section>
      </Sheet>
      <ClosingCta
        title="Ready to hand it off?"
        strong="Scope your build with us."
        secondary={{ href: href('pricing'), label: 'See pricing' }}
      />
    </main>
  )
}
