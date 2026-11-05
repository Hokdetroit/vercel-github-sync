import { createFileRoute } from "@tanstack/react-router";
import { routes } from "@/lib/routes";

export const Route = createFileRoute("/mortgage-suite")({
  head: () => {
    const meta = routes["mortgageSuite"];
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

import { MortgagePage } from '@/components/mortgage/mortgage-page'
import { routeMetadata } from '@/lib/routes'



function PageComponent() {
  return <MortgagePage />
}

