import { createFileRoute } from "@tanstack/react-router";
import { routes } from "@/lib/routes";

export const Route = createFileRoute("/calculator")({
  head: () => {
    const meta = routes["calculator"];
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

import { SavingsCalculator } from "@/components/site/savings-calculator";
import { ClosingCta, PageHero, Sheet } from "@/components/site/sections";
import { href, routeMetadata } from "@/lib/routes";

function PageComponent() {
  return (
    <main id="main">
      <PageHero
        routeId="calculator"
        eyebrow="Savings calculator"
        title="Estimate the cost of separate tools."
        sub="Enter your own figures to compare what you spend today with a connected platform."
      />
      <Sheet>
        <section className="lP4odW_usage" aria-label="Calculator">
          <div className="ma3IoW_container" data-reveal="true">
            <SavingsCalculator />
          </div>
        </section>
      </Sheet>
      <ClosingCta
        title="Want a real number?"
        strong="We will build your quote with you."
        secondary={{ href: href("pricing"), label: "See pricing" }}
      />
    </main>
  );
}
