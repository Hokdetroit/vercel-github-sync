import { CardGrid, ClosingCta, PageHero, Section, Sheet } from '@/components/site/sections'
import styles from '@/components/site/site.module.css'
import { href, routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('complianceSecurity')

// TODO: verify each statement with legal before launch

export default function ComplianceSecurityPage() {
  return (
    <main id="main">
      <PageHero
        routeId="complianceSecurity"
        eyebrow="Compliance and security"
        title="How we approach your data."
        sub="An overview of data protection, access controls and the HIPAA-ready Medical Suite."
      />
      <Sheet>
        {/* TODO: verify each statement with legal before launch */}
        <Section id="data-title" title="Data protection" intro="Your business data is handled with protection in mind across the platform.">
          <CardGrid
            columns={3}
            items={[
              { title: 'Encrypted communications', body: 'Patient communications in the Medical Suite are encrypted.' },
              { title: 'One system of record', body: 'Keeping data in one connected platform reduces copies spread across separate tools.' },
              { title: 'Review before you launch', body: 'Confirm how your data is stored and handled for your plan during onboarding.' },
            ]}
          />
        </Section>

        {/* TODO: verify each statement with legal before launch */}
        <Section id="access-title" title="Access controls" intro="Decide who on your team can see and change what.">
          <CardGrid
            columns={3}
            items={[
              { title: 'Team access', body: 'Give each team member access to the parts of the platform they need.' },
              { title: 'Account oversight', body: 'Agencies and consultants can run client accounts from one dashboard.' },
              { title: 'Your configuration', body: 'Your team configures access settings for your business.' },
            ]}
          />
        </Section>

        {/* TODO: verify each statement with legal before launch */}
        <Section id="baa-title" title="Medical Suite and BAA">
          <div className={styles.prose} data-reveal="true">
            <p className="ma3IoW_bodyL">
              The Medical Suite is HIPAA-ready. A Business Associate Agreement is available for Medical Suite.
            </p>
            <p className="ma3IoW_bodyM ma3IoW_grey">
              It works alongside your existing EHR, with secure scheduling and encrypted patient communications.
            </p>
          </div>
        </Section>

        {/* TODO: verify each statement with legal before launch */}
        <Section id="responsibility-title" title="Responsibility model">
          <div className={styles.prose} data-reveal="true">
            <p className="ma3IoW_bodyL">Each practice remains responsible for its own HIPAA compliance program.</p>
            <p className="ma3IoW_bodyM ma3IoW_grey">
              Studio Escrow provides HIPAA-ready tools. How they are configured and used, and the policies around them, are
              the responsibility of each practice.
            </p>
          </div>
        </Section>
      </Sheet>
      <ClosingCta
        title="Questions about compliance?"
        strong="Talk it through with our team."
        secondary={{ href: href('contact'), label: 'Contact us' }}
      />
    </main>
  )
}
