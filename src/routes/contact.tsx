import { createFileRoute } from "@tanstack/react-router";
import { routes } from "@/lib/routes";

export const Route = createFileRoute("/contact")({
  head: () => {
    const meta = routes["contact"];
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

import { LeadForm } from '@/components/site/lead-form'
import { ClosingCta, PageHero, Sheet } from '@/components/site/sections'
import styles from '@/components/site/site.module.css'
import { href, routeMetadata } from '@/lib/routes'



function PageComponent() {
  return (
    <main id="main">
      <PageHero
        routeId="contact"
        eyebrow="Contact"
        title="Get in touch."
        sub="Questions about the platform, plans or getting set up? Send us a message."
      />
      <Sheet>
        <section className="lP4odW_usage" aria-labelledby="contact-form-title">
          <div className={`ma3IoW_container ${styles.split}`}>
            <div className={styles.prose} data-reveal="true">
              <h2 id="contact-form-title" className="ma3IoW_h2">
                Send a message
              </h2>
              <ul className={styles.details}>
                <li>
                  <span className={styles.label}>Email</span>
                  <span className="ma3IoW_bodyM ma3IoW_grey">Contact details to be confirmed.</span>
                </li>
                <li>
                  <span className={styles.label}>Phone</span>
                  <span className="ma3IoW_bodyM ma3IoW_grey">Contact details to be confirmed.</span>
                </li>
              </ul>
            </div>
            <div data-reveal="true">
              <LeadForm variant="contact" />
            </div>
          </div>
        </section>
      </Sheet>
      <ClosingCta title="Want to see the platform?" strong="Book a walkthrough." secondary={{ href: href('faq'), label: 'Read the FAQ' }} />
    </main>
  )
}

