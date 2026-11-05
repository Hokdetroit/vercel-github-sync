import type { MetadataRoute } from 'next'
import { INDEXING_ENABLED, SITE_URL } from '@/lib/routes'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: INDEXING_ENABLED ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
