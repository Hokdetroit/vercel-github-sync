import { canonicalUrl, routes, type RouteId } from '@/lib/routes'
import styles from './site.module.css'

export function Breadcrumbs({ routeId }: { routeId: RouteId }) {
  const home = routes.home
  const page = routes[routeId]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: home.name, item: canonicalUrl(home.path) },
      { '@type': 'ListItem', position: 2, name: page.name, item: canonicalUrl(page.path) },
    ],
  }

  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      <ol>
        <li>
          <a href={home.path}>{home.name}</a>
          <span aria-hidden="true">{'>'}</span>
        </li>
        <li aria-current="page">{page.name}</li>
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  )
}
