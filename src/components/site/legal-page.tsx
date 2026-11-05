import type { RouteId } from '@/lib/routes'
import { routes } from '@/lib/routes'
import { ClosingCta, PageHero, Sheet } from './sections'
import styles from './site.module.css'

export function LegalPage({ routeId }: { routeId: Extract<RouteId, 'privacy' | 'terms'> }) {
  const route = routes[routeId]
  return (
    <main id="main">
      <PageHero routeId={routeId} eyebrow="Legal" title={route.name} sub="Last updated: To be updated" />
      <Sheet>
        <div className="lP4odW_usage">
          <div className={`ma3IoW_container ${styles.legal}`}>
            <nav className={styles.toc} aria-label="Table of contents">
              <span className={styles.tocTitle}>On this page</span>
              <ol>
                <li>
                  <a href="#legal-text">{route.name}</a>
                </li>
              </ol>
            </nav>
            <section id="legal-text" className={styles.legalBody} aria-label={route.name}>
              <p className="ma3IoW_bodyL">Legal text to be migrated from the live site.</p>
            </section>
          </div>
        </div>
      </Sheet>
      <ClosingCta title="Questions about this policy?" strong="Talk to our team." secondary={{ href: routes.contact.path, label: 'Contact us' }} />
    </main>
  )
}
