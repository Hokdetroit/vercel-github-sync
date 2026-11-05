import type { MetadataRoute } from 'next'
import { allRoutes, canonicalUrl } from '@/lib/routes'

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.filter((r) => r.status === 'built').map((r) => ({ url: canonicalUrl(r.path) }))
}
