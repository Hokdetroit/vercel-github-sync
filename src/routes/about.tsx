import { createFileRoute } from "@tanstack/react-router";
import { routes } from "@/lib/routes";

export const Route = createFileRoute("/about")({
  head: () => {
    const meta = routes["about"];
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

import { AboutPage } from "@/components/about/about-page";

function PageComponent() {
  return <AboutPage />;
}
