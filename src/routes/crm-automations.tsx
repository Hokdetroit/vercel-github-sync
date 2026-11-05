import { createFileRoute } from "@tanstack/react-router";
import { routes } from "@/lib/routes";

export const Route = createFileRoute("/crm-automations")({
  head: () => {
    const meta = routes["crmAutomations"];
    return {
      meta: [
        { title: meta ? meta.title : "Studio Escrow" },
        { name: "description", content: meta ? meta.description : "" },
        { property: "og:title", content: meta ? meta.title : "Studio Escrow" },
        { property: "og:description", content: meta ? meta.description : "" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PageComponent,
});

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



function PageComponent() {
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

