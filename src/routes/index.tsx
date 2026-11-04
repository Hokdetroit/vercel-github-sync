import { createFileRoute } from "@tanstack/react-router";
import {
  Nav,
  Hero,
  CapMarquee,
  Industries,
  Gallery,
  GrayLogos,
  Pillars,
  Integrations,
  Plans,
  Cycle,
  FeatureCards,
  Faq,
  FinalCta,
  Footer,
} from "@/lib/studio-escrow-sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio Escrow — One Platform. Every Business." },
      {
        name: "description",
        content:
          "Studio Escrow is one connected business platform — CRM, marketing, sales, automations, and AI in one login. Explore Growth, Scale, and Medical & Mortgage suites.",
      },
      { property: "og:title", content: "Studio Escrow — One Platform. Every Business." },
      {
        property: "og:description",
        content:
          "Your CRM, marketing, and AI, connected. One login, one dashboard — for every business that runs on leads, clients, and follow-up.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="se-page">
      <Nav />
      <main id="main-content">
        <Hero />
        <CapMarquee />
        <Industries />
        <Gallery />
        <GrayLogos />
        <Pillars />
        <Integrations />
        <Plans />
        <FeatureCards />
        <Cycle />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
