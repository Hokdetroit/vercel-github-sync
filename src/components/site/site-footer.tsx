import { Link } from "@tanstack/react-router";

/**
 * Universal Studio Escrow footer.
 *
 * Solid ink background, full viewport height, with an oversized
 * "Studio Escrow" wordmark anchored to the bottom. Replaces the
 * previous raw-HTML footer on every page that uses the site shell.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      {/* Top region — sparse nav */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-24 sm:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <FooterColumn
            title="Platform"
            links={[
              { label: "Features", to: "/features" },
              { label: "Pricing", to: "/pricing" },
              { label: "AI Studio", to: "/ai-studio" },
              { label: "Case Studies", to: "/case-studies" },
            ]}
          />
          <FooterColumn
            title="Suites"
            links={[
              { label: "Medical Suite", to: "/medical-suite" },
              { label: "Mortgage Suite", to: "/mortgage-suite" },
              { label: "Real Estate", to: "/real-estate-suite" },
              { label: "CRM Automations", to: "/crm-automations" },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
              { label: "Schedule Demo", to: "/schedule-demo" },
              { label: "FAQ", to: "/faq" },
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              { label: "Privacy Policy", to: "/privacy" },
              { label: "Terms of Service", to: "/terms" },
              { label: "Compliance", to: "/compliance-security" },
              { label: "Knowledge Base", to: "/knowledge-base" },
            ]}
          />
        </div>
      </div>

      {/* Bottom region — oversized wordmark */}
      <div className="relative px-6 pb-10 sm:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <div className="flex flex-col gap-6 border-t border-white/15 pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium tracking-wide text-white/60">Studio Escrow</span>
              <span className="text-xs text-white/40">
                © {year} Studio Escrow. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <a
                href="https://www.linkedin.com/company/roveia-health/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://studioescrow.cloud/contact"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                Contact
              </a>
              <a
                href="https://the.studioescrow.cloud/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                Log in
              </a>
            </div>
          </div>

          {/* Oversized wordmark — fills the bottom edge */}
          <h2
            aria-hidden="true"
            className="select-none text-[clamp(64px,18vw,260px)] font-semibold leading-[0.85] tracking-[-0.065em] text-white/90"
          >
            Studio Escrow
          </h2>
        </div>
      </div>
    </footer>
  );
}

type FooterLink = { label: string; to: string };

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm text-white/70 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
