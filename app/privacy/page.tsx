import { LegalPage } from '@/components/site/legal-page'
import { routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('privacy')

export default function PrivacyPage() {
  return <LegalPage routeId="privacy" />
}
