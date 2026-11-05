import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { RevealObserver } from '@/components/site/reveal-observer'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import styles from '@/components/site/site.module.css'
import { INDEXING_ENABLED, MEGA_MENU_CSS, MEGA_MENU_SRC, SITE_NAME, SITE_URL, builtPaths } from '@/lib/routes'

/*
 * Root layout for the React-built pages. The existing designed pages (/, /pricing) are served as mirrored HTML by route handlers and do not use this layout,
 * so the same stylesheets and scripts they load are linked here.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  robots: INDEXING_ENABLED ? undefined : { index: false, follow: false },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#317ea6',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__SE_BUILT_PATHS__=${JSON.stringify(builtPaths)};window.__SE_SITE__=${JSON.stringify(SITE_URL)}`,
          }}
        />
        <link rel="stylesheet" href="/_mirror_next/static/immutable/chunks/2yjvb1qlj83iz.css" />
        <link rel="stylesheet" href="/_mirror_next/static/immutable/chunks/10k9gw10-65bx.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" />
        <link rel="stylesheet" href={MEGA_MENU_CSS} />
        <link rel="stylesheet" href="/assets/page-transition/page-transition.css" />
      </head>
      <body className="antialiased">
        <div className={`ma3IoW_page lP4odW_page qqicjq_variable ${styles.shell}`}>
          <a href="#main" className={styles.skipLink}>
            Skip to content
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <RevealObserver />
        <Script src={MEGA_MENU_SRC} strategy="afterInteractive" />
        <Script src="/assets/page-transition/page-transition.js" strategy="afterInteractive" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
