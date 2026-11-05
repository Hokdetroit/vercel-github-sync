import { ClosingCta, PageHero, Section, Sheet } from '@/components/site/sections'
import styles from '@/components/site/site.module.css'
import { href, routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('compare')

const ROWS = [
  'CRM and contacts',
  'Messaging inbox',
  'Websites and funnels',
  'Calendars and booking',
  'Workflow automation',
  'AI tools',
  'Reporting',
  'Number of vendors and bills',
  'Setup and support',
]

export default function ComparePage() {
  return (
    <main id="main">
      <PageHero
        routeId="compare"
        eyebrow="Compare"
        title="One platform, or a stack of separate tools?"
        sub="A plain-language look at running your business on Studio Escrow versus using separate tools."
      />
      <Sheet>
        <Section id="compare-title" title="Studio Escrow vs. using separate tools">
          <div className="lP4odW_tableWrap" data-reveal="true">
            <table className="lP4odW_table">
              <caption className="sr-only">Studio Escrow compared with using separate tools</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: 'left' }}>
                    <span className="lP4odW_thName">Area</span>
                  </th>
                  <th scope="col" className="lP4odW_colFeatured">
                    <span className="lP4odW_thName">Studio Escrow</span>
                  </th>
                  <th scope="col">
                    <span className="lP4odW_thName">Separate tools</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row}>
                    <th scope="row">{row}</th>
                    <td className="lP4odW_colFeatured">
                      <span className={styles.tbc}>To be confirmed</span>
                    </td>
                    <td>
                      <span className={styles.tbc}>To be confirmed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </Sheet>
      <ClosingCta
        title="See the difference for yourself."
        strong="Book a demo."
        secondary={{ href: href('calculator'), label: 'Try the calculator' }}
      />
    </main>
  )
}
