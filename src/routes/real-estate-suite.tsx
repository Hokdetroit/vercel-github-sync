import { createFileRoute } from "@tanstack/react-router";
import { routes } from "@/lib/routes";

export const Route = createFileRoute("/real-estate-suite")({
  head: () => {
    const meta = routes["realEstateSuite"];
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

import { RealEstatePage } from '@/components/real-estate/real-estate-page'
import { routeMetadata } from '@/lib/routes'



function PageComponent() {
  return <RealEstatePage />
}

