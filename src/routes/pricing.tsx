import { createFileRoute } from "@tanstack/react-router";
import { MirroredPage } from "@/components/site/mirrored-page";
import { routes } from "@/lib/routes";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: routes.pricing.title },
      { name: "description", content: routes.pricing.description },
      { property: "og:title", content: routes.pricing.title },
      { property: "og:description", content: routes.pricing.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return <MirroredPage src="/mirror-pages/pricing.html" title="Pricing | Studio Escrow" />;
}
