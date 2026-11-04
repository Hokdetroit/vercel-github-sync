import { createFileRoute } from "@tanstack/react-router";

/**
 * Catch-all route serving the other Studio Escrow mirror pages as 1:1 clones.
 * Each mirror HTML in /public/mirror was copied to a `<name>-clone.html` with
 * missing media rewritten to the Webflow CDN. We load the matching clone in a
 * full-viewport iframe so every <script> (GSAP, Lenis, ScrollTrigger, video
 * lifecycle, inline animations) executes verbatim, exactly as the source.
 *
 * URL -> clone mapping:
 *   /about-us            -> /about-us-clone.html
 *   /blog/<slug>         -> /blog/<slug>-clone.html
 *   /case-studies/<slug> -> /case-studies/<slug>-clone.html
 */
export const Route = createFileRoute("/$")({
  head: ({ params }) => {
    const slug = params._splat ?? "";
    return {
      meta: [
        { title: `Studio Escrow — ${slug}` },
        {
          name: "description",
          content: "Studio Escrow — All-in-One CRM, AI & Business Automation.",
        },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: MirrorPage,
});

function MirrorPage() {
  const { _splat } = Route.useParams();
  const slug = (_splat ?? "").replace(/\/+$/, "");
  const src = `/${slug}-clone.html`;
  return (
    <iframe
      src={src}
      title={`Studio Escrow — ${slug}`}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
        margin: 0,
        padding: 0,
        display: "block",
      }}
      allow="autoplay; fullscreen; picture-in-picture"
    />
  );
}
