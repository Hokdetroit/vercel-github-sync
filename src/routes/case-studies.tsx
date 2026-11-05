import { createFileRoute } from "@tanstack/react-router";
import { routes } from "@/lib/routes";

export const Route = createFileRoute("/case-studies")({
  head: () => {
    const meta = routes["caseStudies"];
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

import { CardGrid, ClosingCta, PageHero, Section, Sheet } from "@/components/site/sections";
import { href, routeMetadata } from "@/lib/routes";

const PLACEHOLDERS = [1, 2, 3].map(() => ({
  title: "Case study coming soon",
  meta: "This story is being prepared.",
}));

function PageComponent() {
  return (
    <main id="main">
      <PageHero
        routeId="caseStudies"
        eyebrow="Case studies"
        title="Stories from businesses on Studio Escrow."
        sub="We are preparing case studies with the businesses we work with. They will be published here."
      />
      <Sheet>
        <Section id="cases-title" title="Latest case studies">
          <CardGrid items={PLACEHOLDERS} columns={3} tall />
        </Section>
      </Sheet>
      <ClosingCta
        title="Want to see it in action?"
        strong="Book a demo."
        secondary={{ href: href("features"), label: "Explore features" }}
      />
    </main>
  );
}
