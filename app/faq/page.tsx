import { ClosingCta, FaqGroup, PageHero, Sheet } from '@/components/site/sections'
import { faqGroups } from '@/lib/faq'
import { href, routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('faq')

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
  ),
}

export default function FaqPage() {
  return (
    <main id="main">
      <PageHero
        routeId="faq"
        eyebrow="FAQ"
        title="Questions, answered."
        sub="Pricing, the platform, AI tools, the Medical Suite and getting started."
      />
      <Sheet>
        {faqGroups.map((group) => (
          <FaqGroup key={group.id} id={group.id} title={group.title} items={group.items} />
        ))}
      </Sheet>
      <ClosingCta
        title="Still have questions?"
        strong="We will map it with you."
        secondary={{ href: href('contact'), label: 'Contact us' }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}
