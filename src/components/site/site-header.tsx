import { useEffect } from "react";
import { MEGA_MENU_CSS, MEGA_MENU_SRC, noscriptNavLinks, routes } from "@/lib/routes";

type MenuWindow = Window & {
  __SE_BUILT_PATHS__?: string[];
  __seMegaMenuInit?: () => void;
};

/** Mount point for the existing mega menu (public/assets/mega-menu/mega-menu.js). */
export function SiteHeader() {
  useEffect(() => {
    const menuWindow = window as MenuWindow;
    menuWindow.__SE_BUILT_PATHS__ = Object.values(routes).map((route) => route.path);
    if (menuWindow.__seMegaMenuInit) {
      menuWindow.__seMegaMenuInit();
      return;
    }
    if (!document.getElementById("studio-escrow-menu-script")) {
      const script = document.createElement("script");
      script.id = "studio-escrow-menu-script";
      script.src = MEGA_MENU_SRC;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <header data-se-megamenu="true" suppressHydrationWarning>
      <link rel="stylesheet" href={MEGA_MENU_CSS} precedence="default" />
      <noscript>
        <nav aria-label="Main">
          {noscriptNavLinks.map((id) => (
            <a key={id} href={routes[id].path}>
              {id === "home" ? "Studio Escrow" : routes[id].name}
            </a>
          ))}
        </nav>
      </noscript>
    </header>
  );
}
