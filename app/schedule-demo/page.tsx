import { LeadForm } from '@/components/site/lead-form'
import { PageHero, Sheet } from '@/components/site/sections'
import styles from '@/components/site/site.module.css'
import { routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('scheduleDemo')

export default function ScheduleDemoPage() {
  return (
    <main id="main">
      <PageHero
        routeId="scheduleDemo"
        eyebrow="Book a demo"
        title="See Studio Escrow with your business in mind."
        sub="Tell us about your business and the tools you use today. We will walk you through the plan and setup that fits."
      />
      <Sheet>
        <section className="lP4odW_usage" aria-labelledby="demo-form-title">
          <div className={`ma3IoW_container ${styles.split}`}>
            <div className={styles.prose} data-reveal="true">
              <h2 id="demo-form-title" className="ma3IoW_h2">
                Request your demo
              </h2>
              <p className="ma3IoW_bodyM ma3IoW_grey">
                Share a few details and the Studio Escrow team will follow up to schedule a walkthrough tailored to your
                industry.
              </p>
            </div>
            <div data-reveal="true">
              <LeadForm variant="demo" />
            </div>
          </div>
        </section>
      </Sheet>
    </main>
  )
}
