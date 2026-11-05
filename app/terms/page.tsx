import { LegalPage } from '@/components/site/legal-page'
import { routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('terms')

export default function TermsPage() {
  return <LegalPage routeId="terms" />
}
