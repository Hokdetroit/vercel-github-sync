import { createFileRoute } from "@tanstack/react-router";
import { routes } from "@/lib/routes";

export const Route = createFileRoute("/faq")({
  head: () => {
    const meta = routes["faq"];
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

import { ClosingCta, FaqGroup, PageHero, Sheet } from "@/components/site/sections";
import { faqGroups } from "@/lib/faq";
import { href, routeMetadata } from "@/lib/routes";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

function PageComponent() {
  return (
    <main id="main">
      <PageHero
        routeId="faq"
        eyebrow="FAQ"
        title="Questions, answered."
        sub="Pricing, the platform, AI tools, the Medical Suite and getting started."
      />
      <Sheet>
        {faqGroups.map((group) => (
          <FaqGroup key={group.id} id={group.id} title={group.title} items={group.items} />
        ))}
      </Sheet>
      <ClosingCta
        title="Still have questions?"
        strong="We will map it with you."
        secondary={{ href: href("contact"), label: "Contact us" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
