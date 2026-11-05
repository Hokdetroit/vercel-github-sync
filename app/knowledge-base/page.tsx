import { LinkButton } from '@/components/site/link-button'
import { CardGrid, ClosingCta, PageHero, Section, Sheet } from '@/components/site/sections'
import styles from '@/components/site/site.module.css'
import { href, routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('knowledgeBase')

const CATEGORIES = [
  'Getting Started',
  'CRM and Pipelines',
  'Communications',
  'Automations',
  'AI Tools',
  'Medical Suite',
].map((title) => ({ title, meta: 'Articles coming soon' }))

export default function KnowledgeBasePage() {
  return (
    <main id="main">
      <PageHero routeId="knowledgeBase" eyebrow="Knowledge base" title="How can we help?" sub="Guides and how-to articles for Studio Escrow.">
        <div className={styles.search} data-reveal="true">
          <label htmlFor="kb-search" className="sr-only">
            Search the knowledge base
          </label>
          <input
            id="kb-search"
            type="search"
            className={styles.input}
            placeholder="Search articles"
            aria-describedby="kb-search-hint"
          />
          <span id="kb-search-hint" className={styles.searchHint}>
            Search will be available once articles are published.
          </span>
        </div>
      </PageHero>
      <Sheet>
        <Section id="categories-title" title="Browse by category">
          <CardGrid items={CATEGORIES} columns={3} tall />
        </Section>
        <Section id="support-title" title="Need a hand?" intro="Our team can help with anything not covered here yet.">
          <div data-reveal="true">
            <LinkButton href={href('contact')}>Contact support</LinkButton>
          </div>
        </Section>
      </Sheet>
      <ClosingCta
        title="New to Studio Escrow?"
        strong="Start with a demo."
        secondary={{ href: href('faq'), label: 'Read the FAQ' }}
      />
    </main>
  )
}
