import { MortgagePage } from '@/components/mortgage/mortgage-page'
import { routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('mortgageSuite')

export default function MortgageSuitePage() {
  return <MortgagePage />
}
