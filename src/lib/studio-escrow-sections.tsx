import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/lib/use-reveal";
import {
  ASSETS_REF as ASSETS,
  BADGES,
  INDUSTRIES,
  CAPS,
  GALLERY,
  GALLERY_IMAGES,
  GRAY_LOGOS,
  PILLARS,
  INTEG_LIST,
  INTEGRATIONS,
  PLANS,
  CARDS,
  FAQ,
  CYCLE,
  DEMO_URL,
} from "@/lib/studio-escrow-data";

export { DEMO_URL };

/* primitives */

export function Chevron() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="se-chev">
      <path
        d="m6 9 6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-se-border bg-se-ink/5 px-3 py-1 text-[11px] font-medium text-se-muted">
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  href = DEMO_URL,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="se-btn"
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="se-eyebrow">{children}</p>;
}

export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`se-reveal ${visible ? "is-visible" : ""} ${className ?? ""}`}>
      {children}
    </div>
  );
}

/* nav */

export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const groups: {
    id: string;
    label: string;
    cols: { h: string; items: { t: string; d: string; href: string }[] }[];
  }[] = [
    {
      id: "platform",
      label: "Platform",
      cols: [
        {
          h: "Grow & convert",
          items: [
            {
              t: "CRM & Automations",
              d: "Pipelines, contacts, and multi-step workflows",
              href: "https://studioescrow.cloud/crm-automations",
            },
            {
              t: "Unified Inbox",
              d: "SMS, email, and social in one thread",
              href: "https://studioescrow.cloud/unified-inbox",
            },
            {
              t: "Websites & Funnels",
              d: "Pages that route leads into your CRM",
              href: "https://studioescrow.cloud/website-funnel-builder",
            },
            {
              t: "Reputation",
              d: "Request, monitor, and reply to reviews",
              href: "https://studioescrow.cloud/reputation",
            },
          ],
        },
        {
          h: "AI & knowledge",
          items: [
            {
              t: "AI Studio",
              d: "Content, reporting, and workflow assistance",
              href: "https://studioescrow.cloud/ai-studio",
            },
            {
              t: "AI Agents",
              d: "Reception, follow-up, and conversations",
              href: "https://studioescrow.cloud/ai-agents",
            },
            {
              t: "Integrations",
              d: "Connect the tools you already use",
              href: "https://studioescrow.cloud/integrations",
            },
          ],
        },
      ],
    },
    {
      id: "solutions",
      label: "Solutions",
      cols: [
        {
          h: "By industry",
          items: [
            {
              t: "Medical Suite",
              d: "Scheduling and secure communications, with a BAA",
              href: "/medical-suite",
            },
            {
              t: "Real Estate",
              d: "Lead routing and nurture for agents and teams",
              href: "https://studioescrow.cloud/real-estate",
            },
            {
              t: "Mortgage Suite",
              d: "Scale plan plus a done-for-you buildout",
              href: "/mortgage-suite",
            },
            {
              t: "Agencies & Consultants",
              d: "Run client accounts from one dashboard",
              href: "https://studioescrow.cloud/agencies-consultants",
            },
          ],
        },
        {
          h: "Get set up",
          items: [
            {
              t: "Done-for-you setup",
              d: "Branding, website, and workflows built for you",
              href: DEMO_URL,
            },
            { t: "Compare plans", d: "Growth, Scale, and industry suites", href: "/pricing" },
          ],
        },
      ],
    },
    {
      id: "resources",
      label: "Resources",
      cols: [
        {
          h: "Learn",
          items: [
            {
              t: "Knowledge Base",
              d: "Guides and how-to articles",
              href: "https://studioescrow.cloud/knowledge-base",
            },
            { t: "All features", d: "The complete platform overview", href: "/features" },
            {
              t: "Integrations",
              d: "Supported apps and connections",
              href: "https://studioescrow.cloud/integrations",
            },
          ],
        },
        {
          h: "Company",
          items: [
            { t: "About", d: "", href: "https://studioescrow.cloud/about" },
            { t: "Careers", d: "", href: "https://studioescrow.cloud/careers" },
            { t: "Contact", d: "", href: "https://studioescrow.cloud/contact" },
            { t: "Privacy Policy", d: "", href: "https://studioescrow.cloud/privacy" },
            { t: "Terms of Service", d: "", href: "https://studioescrow.cloud/terms" },
          ],
        },
      ],
    },
  ];

  return (
    <header className="se-nav" data-se-megamenu>
      <a className="se-skip" href="#main-content">
        Skip to content
      </a>
      <div className="se-bar">
        <a className="se-brand" href="/" aria-label="Studio Escrow home" aria-current="page">
          <span className="se-mark" aria-hidden="true" />
          Studio Escrow
        </a>
        <nav className="se-desktop" aria-label="Main">
          <ul className="se-top-list">
            {groups.map((g) => (
              <li
                key={g.id}
                className="se-has-panel"
                data-menu={g.id}
                onMouseEnter={() => setOpen(g.id)}
                onMouseLeave={() => setOpen(null)}
              >
                <button
                  className="se-top"
                  type="button"
                  aria-expanded={open === g.id}
                  aria-controls={`panel-${g.id}`}
                >
                  {g.label}
                  <Chevron />
                </button>
                <div className="se-panel" id={`panel-${g.id}`} data-open={open === g.id}>
                  <div className="se-panel-grid">
                    {g.cols.map((col) => (
                      <div key={col.h} className="se-panel-col">
                        <p className="se-panel-h">{col.h}</p>
                        <ul className="se-panel-links">
                          {col.items.map((it) => (
                            <li key={it.t}>
                              <a
                                href={it.href}
                                target={it.href.startsWith("http") ? "_blank" : undefined}
                                rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="se-panel-link"
                              >
                                <span className="se-panel-t">{it.t}</span>
                                {it.d && <span className="se-panel-d">{it.d}</span>}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
            <li className="se-top-li">
              <a className="se-top se-top-link" href="/pricing">
                Pricing
              </a>
            </li>
          </ul>
        </nav>
        <div className="se-actions">
          <a
            className="se-login"
            href="https://the.studioescrow.cloud/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Log in
          </a>
          <a className="se-cta" href={DEMO_URL} target="_blank" rel="noopener noreferrer">
            Book a Demo
          </a>
          <button
            className="se-burger"
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="se-mobile">
          <a
            className="se-cta se-cta-full"
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Demo
          </a>
          <a
            className="se-login"
            href="https://the.studioescrow.cloud/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Log in
          </a>
        </div>
      )}
    </header>
  );
}

/* hero */

export function Hero() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [m, setM] = useState(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setM(Math.round(px * py * 6 * 10) / 10);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <section className="se-hero">
      <div className="se-hero-bg" aria-hidden="true" />
      <div className="se-hero-inner">
        <Reveal>
          <SectionLabel>One connected business platform</SectionLabel>
          <h1 className="se-hero-title">
            One&nbsp;Platform.
            <br />
            Every&nbsp;Business.
            <br />
            <span className="se-hero-accent">Your&nbsp;CRM,&nbsp;Marketing&nbsp;and&nbsp;AI.</span>
            <br />
            Connected.
          </h1>
        </Reveal>
        <div className="se-hero-price" ref={cardRef} style={{ transform: `rotate(${m}deg)` }}>
          <span className="se-hero-price-num">$97</span>
          <span className="se-hero-price-sub">Growth plan / month</span>
        </div>
        <Reveal>
          <p className="se-hero-text">
            CRM. Marketing. Sales. Automations. AI. One login, one dashboard.
          </p>
          <PrimaryButton>Book a Demo</PrimaryButton>
        </Reveal>
        <div className="se-hero-badges">
          {BADGES.map((b) => (
            <span key={b.label} className="se-hero-badge">
              <img src={b.src} alt="" loading="lazy" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* capabilities marquee */

export function CapMarquee() {
  const list = [...CAPS, ...CAPS];
  return (
    <section className="se-cap-marquee" aria-label="Platform capabilities">
      <div className="se-cap-track">
        {list.map((c, i) => (
          <span key={i} className="se-cap-pill">
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}

/* industries */

export function Industries() {
  return (
    <section className="se-section se-industries">
      <div className="se-container">
        <Reveal>
          <SectionLabel>Integrations</SectionLabel>
          <h2 className="se-h2">Built for Your Business</h2>
          <p className="se-lead">
            Four industries we know inside out. One platform that works for any business that runs
            on leads, clients, and follow-up.
          </p>
        </Reveal>
        <div className="se-ind-grid">
          {INDUSTRIES.map((it) => (
            <a
              key={it.n}
              href={it.href}
              target={it.href.startsWith("http") ? "_blank" : undefined}
              rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="se-ind"
            >
              <span className="se-ind-n">{it.n}</span>
              <span className="se-ind-sr">{it.label}</span>
              <span className="se-ind-title">{it.title}</span>
              <p className="se-ind-text">{it.text}</p>
              {it.logo && <img className="se-ind-logo" src={it.logo} alt="" loading="lazy" />}
              {it.logos && (
                <div className="se-ind-logos">
                  {it.logos.map((l, i) => (
                    <img key={i} src={l} alt="" loading="lazy" />
                  ))}
                </div>
              )}
              <span className="se-ind-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* gallery */

export function Gallery() {
  return (
    <section className="se-section se-gallery">
      <div className="se-container">
        <Reveal>
          <SectionLabel>Visual inspiration gallery</SectionLabel>
          <h2 className="se-h2">See every feature</h2>
          <p className="se-lead">
            Tour the CRM, messaging, AI, scheduling, and automation tools in one place.
          </p>
        </Reveal>
        <div className="se-gallery-grid">
          {GALLERY.map((g, i) => (
            <Reveal key={i}>
              <article className="se-gallery-card">
                <div className="se-gallery-img">
                  <img src={g.src} alt="" loading="lazy" />
                </div>
                <span className="se-gallery-tag">{g.tag}</span>
                <p className="se-gallery-text">{g.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="se-gallery-strip">
          {GALLERY_IMAGES.map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* gray logos */

export function GrayLogos() {
  return (
    <section className="se-section se-gray">
      <div className="se-container">
        <div className="se-gray-row">
          {GRAY_LOGOS.map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* pillars */

export function Pillars() {
  return (
    <section className="se-section se-pillars">
      <div className="se-container">
        <Reveal>
          <SectionLabel>One connected platform</SectionLabel>
          <h2 className="se-h2">Your whole business, in one platform</h2>
        </Reveal>
        <div className="se-pillar-grid">
          {PILLARS.map((p) => (
            <Reveal key={p.title}>
              <article className="se-pillar">
                <img src={p.src} alt="" loading="lazy" className="se-pillar-icon" />
                <h3 className="se-pillar-title">{p.title}</h3>
                <div className="se-pillar-chips">
                  {p.chips.map((c) => (
                    <Pill key={c}>{c}</Pill>
                  ))}
                </div>
                <p className="se-pillar-lead">{p.lead}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* integrations */

export function Integrations() {
  return (
    <section className="se-section se-integ">
      <div className="se-container">
        <Reveal>
          <SectionLabel>Integrations</SectionLabel>
          <h2 className="se-h2">Plugs into the tools your business already runs on</h2>
          <p className="se-lead">
            Payments, ads, social, lending CRMs and everyday productivity apps connect to Studio
            Escrow, so leads, bookings and payments land in one place.
          </p>
        </Reveal>
        <div className="se-tabs">
          {[
            "All",
            "Marketing & Ad",
            "Social",
            "CRM & Lending",
            "Payments",
            "Productivity & Web",
          ].map((t) => (
            <span key={t} className={t === "All" ? "se-tab is-active" : "se-tab"}>
              {t}
            </span>
          ))}
        </div>
        <div className="se-integ-grid">
          {INTEG_LIST.map((it) => (
            <span key={it.slug} className="se-integ-item">
              <img src={INTEGRATIONS[it.slug]} alt="" loading="lazy" />
              {it.name}
            </span>
          ))}
        </div>
        <p className="se-integ-count">
          <strong>33+</strong> native integrations and connections
        </p>
        <div style={{ marginTop: 24 }}>
          <a className="se-link" href="/features">
            Explore the platform →
          </a>
        </div>
      </div>
    </section>
  );
}

/* plans */

export function Plans() {
  return (
    <section className="se-section se-plans">
      <div className="se-container">
        <Reveal>
          <SectionLabel>Plans for every stage</SectionLabel>
          <div className="se-plan-grid">
            {PLANS.map((p) => (
              <article key={p.name} className="se-plan">
                <span className="se-plan-sub">{p.sub}</span>
                <h3 className="se-plan-name">{p.name}</h3>
                <p className="se-plan-price">
                  {p.price} <span className="se-plan-unit">{p.unit}</span>
                </p>
                <p className="se-plan-text">{p.text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* cycle */

export function Cycle() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % CYCLE.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="se-section se-cycle">
      <div className="se-container">
        <Reveal>
          <SectionLabel>How it works</SectionLabel>
          <h2 className="se-h2">Turn every conversation into a better agent.</h2>
          <p className="se-lead">
            Bring your knowledge and tools together, follow every conversation, and use what you
            learn to improve your agent.
          </p>
        </Reveal>
        <div className="se-cycle-stage">
          <div className="se-cycle-scene" data-stage={stage}>
            <span className="se-cycle-orb" />
            <span className="se-cycle-ring" />
          </div>
          <div className="se-cycle-copy">
            <div className="se-cycle-steps">
              {CYCLE.map((c, i) => (
                <div
                  key={c.title}
                  className={i === stage ? "se-cycle-step is-active" : "se-cycle-step"}
                >
                  <span className="se-cycle-step-n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="se-cycle-step-t">{c.title}</h3>
                    <p className="se-cycle-step-text">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="se-cycle-controls">
              {CYCLE.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  className={i === stage ? "is-active" : ""}
                  onClick={() => setStage(i)}
                  aria-label={`Stage: ${c.title}`}
                >
                  {c.title.replace(".", "")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* feature cards */

export function FeatureCards() {
  return (
    <section className="se-section se-cards">
      <div className="se-container">
        <Reveal>
          <SectionLabel>One connected platform</SectionLabel>
          <h2 className="se-h2">Your entire business. One connected platform.</h2>
        </Reveal>
        <div className="se-card-grid">
          {CARDS.map((c) => (
            <Reveal key={c.title}>
              <article className="se-card">
                <img src={ASSETS.quote} alt="" className="se-card-quote" loading="lazy" />
                <p className="se-card-text">{c.text}</p>
                <span className="se-card-title">{c.title}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* faq */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="se-section se-faq">
      <div className="se-container">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="se-h2">Your Studio Escrow Questions, Answered</h2>
        </Reveal>
        <div className="se-faq-list">
          {FAQ.map((f, i) => (
            <div key={f.q} className={open === i ? "se-faq-item is-open" : "se-faq-item"}>
              <button
                className="se-faq-q"
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {f.q}
                <Chevron />
              </button>
              <div className="se-faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* final cta + footer */

export function FinalCta() {
  return (
    <section className="se-section se-final">
      <div className="se-container se-final-inner">
        <Reveal>
          <h2 className="se-h2">Your entire business. One connected platform.</h2>
          <p className="se-lead">Bring your CRM, marketing, sales, and AI together.</p>
          <PrimaryButton>Book a Demo</PrimaryButton>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="se-footer">
      <div className="se-container se-footer-inner">
        <a className="se-brand se-footer-brand" href="/" aria-label="Studio Escrow home">
          <span className="se-mark" aria-hidden="true" />
          Studio Escrow
        </a>
        <div className="se-footer-cols">
          <div className="se-footer-col">
            <p className="se-footer-h">Industries</p>
            <div className="se-footer-links">
              <a href="/medical-suite">Medical Suite</a>
              <a
                href="https://studioescrow.cloud/real-estate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Real Estate
              </a>
              <a href="/">Home Services</a>
              <a
                href="https://studioescrow.cloud/agencies-consultants"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agencies
              </a>
            </div>
          </div>
          <div className="se-footer-col">
            <p className="se-footer-h">Site map</p>
            <div className="se-footer-links">
              <a href="/features">Features</a>
              <a
                href="https://studioescrow.cloud/knowledge-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Knowledge Base
              </a>
              <a href="https://studioescrow.cloud/about" target="_blank" rel="noopener noreferrer">
                About Us
              </a>
              <a
                href="https://studioescrow.cloud/careers"
                target="_blank"
                rel="noopener noreferrer"
              >
                Careers
              </a>
            </div>
          </div>
          <div className="se-footer-col">
            <p className="se-footer-h">Secure</p>
            <div className="se-footer-links">
              <a
                href="https://studioescrow.cloud/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              <a href="https://studioescrow.cloud/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="se-container se-footer-bottom">
        <a
          className="se-link"
          href="https://studioescrow.cloud/contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
        <a
          className="se-link"
          href="https://the.studioescrow.cloud/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log in
        </a>
        <p>© 2026 Studio Escrow. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
