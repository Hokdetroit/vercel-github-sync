import { noscriptNavLinks, routes } from '@/lib/routes'

/** Mount point for the existing mega menu (public/assets/mega-menu/mega-menu.js). */
export function SiteHeader() {
  return (
    <header data-se-megamenu="true" suppressHydrationWarning>
      <noscript>
        <nav aria-label="Main">
          {noscriptNavLinks.map((id) => (
            <a key={id} href={routes[id].path}>
              {id === 'home' ? 'Studio Escrow' : routes[id].name}
            </a>
          ))}
        </nav>
      </noscript>
    </header>
  )
}
