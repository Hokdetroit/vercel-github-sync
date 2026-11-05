import { createFileRoute } from "@tanstack/react-router";
import { MirroredPage } from "@/components/site/mirrored-page";

/**
 * Studio Escrow homepage — 1:1 clone of the original Webflow export.
 *
 * The exported HTML, Webflow CSS, GSAP/Lenis/ScrollTrigger/SplitText JS and
 * the video lifecycle manager all live in /public. A self-contained copy
 * (`/index-clone.html`) was generated from the mirror with every missing
 * raster image / video rewritten to the Webflow CDN, so the hero video,
 * background videos, imagery and all scroll/section animations run exactly
 * as on the source site.
 *
 * It is loaded in a full-viewport iframe so the browser treats it as a real
 * document and executes every <script> verbatim (dangerouslySetInnerHTML
 * would inject but NOT execute scripts, which would kill all animations).
 */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Studio Escrow — All-in-One CRM, AI & Business Automation",
      },
      {
        name: "description",
        content:
          "Run your CRM, marketing, sales, communications, workflows, and AI in one connected platform. Explore Studio Escrow Growth, Scale, Medical, and Mortgage suites.",
      },
      {
        property: "og:title",
        content: "Studio Escrow — All-in-One CRM, AI & Business Automation",
      },
      {
        property: "og:description",
        content:
          "Run your CRM, marketing, sales, communications, workflows, and AI in one connected platform. Explore Studio Escrow Growth, Scale, Medical, and Mortgage suites.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <MirroredPage
      src="/index-clone.html"
      title="Studio Escrow — All-in-One CRM, AI & Business Automation"
    />
  );
}
