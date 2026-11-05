import { SuitePage } from '@/components/suites/suite-page'
import { routeMetadata } from '@/lib/routes'

export const metadata = routeMetadata('medicalSuite')

export default function MedicalSuitePage() {
  return <SuitePage kind="medical" />
}
