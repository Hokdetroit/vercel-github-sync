import { createFileRoute } from "@tanstack/react-router";
import { routes } from "@/lib/routes";

export const Route = createFileRoute("/ai-agents")({
  head: () => {
    const meta = routes["aiAgents"];
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

import { AiConversationsChart, AiResponseChart } from "@/components/ai-agents/charts";
import styles from "@/components/crm/crm.module.css";
import { HorizontalScroll } from "@/components/crm/horizontal-scroll";
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
} from "@/components/ai-agents/sections";
import { AiAgentRoadmap } from "@/components/ai-agents/workflow-roadmap";

function PageComponent() {
  return (
    <main id="main" className={styles.page}>
      <Hero />
      <HorizontalScroll panels={2} viewports={3} label="What AI agents do">
        <WhatPanel />
        <WhyPanel />
      </HorizontalScroll>
      <ConnectedWorkspace />
      <Stats />
      <Statement />
      <AiAgentRoadmap />
      <TimingIntro />
      <HorizontalScroll panels={2} viewports={4} label="Illustrative AI agent charts">
        <ChartPanel>
          <AiConversationsChart />
        </ChartPanel>
        <ChartPanel>
          <AiResponseChart />
          <p className={styles.chartNote}>
            Illustrative model for explanation only. Not measured customer data.
          </p>
        </ChartPanel>
      </HorizontalScroll>
      <Band />
      <ContactBubbles />
    </main>
  );
}
