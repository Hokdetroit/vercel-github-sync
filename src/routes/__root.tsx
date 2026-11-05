import { Outlet, createRootRoute } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { reportVibeError } from "../lib/vibe-error-reporting";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { RevealObserver } from "@/components/site/reveal-observer";
import styles from "@/components/site/site.module.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Studio Escrow — All-in-One CRM, AI & Business Automation",
      },
      {
        name: "description",
        content:
          "Run your CRM, marketing, sales, communications, workflows, and AI in one connected platform.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  onError: (error: unknown) => {
    reportVibeError(error);
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className={`ma3IoW_page lP4odW_page qqicjq_variable ${styles.shell}`}>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <RevealObserver />
    </div>
  );
}
