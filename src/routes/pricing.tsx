import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <iframe
      src="/mirror-pages/pricing.html"
      title="Pricing | Studio Escrow"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
        margin: 0,
        padding: 0,
        display: "block",
        zIndex: 50,
      }}
      allow="autoplay; fullscreen; picture-in-picture"
    />
  );
}
