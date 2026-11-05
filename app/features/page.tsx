import { FeatureUniverse } from '@/components/features/feature-universe'
import { FeatureExplorer } from '@/components/features/feature-explorer'
import { FeatureIntegrations } from '@/components/features/feature-integrations'
import { MedicalFeature } from '@/components/features/medical-feature'
import { ConnectedSystem } from '@/components/features/connected-system'
import { AskAIShowcase } from '@/components/features/ask-ai-showcase'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { routeMetadata } from '@/lib/routes'
import s from '@/components/features/features.module.css'

export const metadata = routeMetadata('features')

export default function FeaturesPage() {
  return <main id="main" className={`${s.page} font-sans`}>
    <FeatureUniverse/>
    <nav className={s.sectionNav} aria-label="Features page sections"><a href="#feature-explorer">Explore the platform <ArrowUpRight size={15}/></a><a href="#connected">How it connects</a><a href="#ask-ai">Ask AI</a><a href="#medical">Medical Suite</a><a href="#connections">Integrations</a><a href="/pricing">Compare plans <ArrowUpRight size={15}/></a></nav>
    <FeatureExplorer/>
    <ConnectedSystem/>
    <AskAIShowcase/>
    <MedicalFeature/>
    <FeatureIntegrations/>
    <section className={s.suites}><span className={s.eyebrow}>One platform. Your world.</span><h2>Built for the way<br/>your industry works.</h2><div><a href="/mortgage-suite"><span>Mortgage Suite</span><p>From first inquiry to long-term borrower relationships.</p><ArrowUpRight/></a><a href="/real-estate-suite"><span>Real Estate Suite</span><p>Buyers, sellers and the next referral. Connected.</p><ArrowUpRight/></a></div></section>
    <section className={s.cta}><span className={s.eyebrow}>Make room for what comes next</span><h2>You bring the ambition.<br/>We’ll connect the pieces.</h2><p>Tell us what is slowing you down. We’ll map the tools, workflows and custom solutions around your business.</p><div><a className={s.primary} href="/schedule-demo">Build your workspace <ArrowUpRight size={18}/></a><a href="/pricing">Find your plan <ArrowRight size={17}/></a></div></section>
  </main>
}
