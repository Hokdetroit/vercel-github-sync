import { LeadsChart, ResponseChart } from '@/components/crm/charts'
import styles from '@/components/crm/crm.module.css'
import { HorizontalScroll } from '@/components/crm/horizontal-scroll'
import {
  Band,
  ChartPanel,
  ContactBubbles,
  ConnectedWorkspace,
  Hero,
  Statement,
  Stats,
  TimingIntro,
  WhatPanel,
  WhyPanel,
} from '@/components/crm/sections'
import { WorkflowRoadmap } from '@/components/crm/workflow-roadmap'
import { routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('crmAutomations')

export default function CrmAutomationsPage() {
  return (
    <main id="main" className={styles.page}>
      <Hero />
      <HorizontalScroll panels={2} viewports={3} label="What CRM and automations do">
        <WhatPanel />
        <WhyPanel />
      </HorizontalScroll>
      <ConnectedWorkspace />
      <Stats />
      <Statement />
      <WorkflowRoadmap />
      <TimingIntro />
      <HorizontalScroll panels={2} viewports={4} label="Illustrative automation charts">
        <ChartPanel>
          <LeadsChart />
        </ChartPanel>
        <ChartPanel>
          <ResponseChart />
          <p className={styles.chartNote}>Illustrative model for explanation only. Not measured customer data.</p>
        </ChartPanel>
      </HorizontalScroll>
      <Band />
      <ContactBubbles />
    </main>
  )
}
