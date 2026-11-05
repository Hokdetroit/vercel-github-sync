import type { Metadata } from 'next'
import { LinkButton } from '@/components/site/link-button'
import { href } from '@/lib/routes'

export const metadata: Metadata = {
  title: { absolute: 'Page Not Found | Studio Escrow' },
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <main id="main">
      <section className="lP4odW_hero" aria-labelledby="page-title">
        <div className="ma3IoW_container">
          <p className="lP4odW_eyebrow">404</p>
          <h1 id="page-title" className="ma3IoW_h1 lP4odW_heroTitle">
            This page could not be found.
          </h1>
          <p className="ma3IoW_bodyL lP4odW_heroSub">The link may be out of date, or the page may have moved.</p>
          <div className="lP4odW_closingActions" style={{ marginTop: 40 }}>
            <LinkButton href={href('home')}>Go to the homepage</LinkButton>
            <LinkButton href={href('contact')} variant="ghost">
              Contact us
            </LinkButton>
          </div>
        </div>
      </section>
    </main>
  )
}
