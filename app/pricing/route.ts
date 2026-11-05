import { serveMirroredPage } from '@/lib/mirror'
import { routes } from '@/lib/routes'

export const dynamic = 'force-static'

export function GET() {
  return serveMirroredPage(routes.pricing.mirrorFile, routes.pricing.path)
}
