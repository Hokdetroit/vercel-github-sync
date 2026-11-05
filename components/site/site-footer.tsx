import Script from 'next/script'
import { SITE_FOOTER_CSS, SITE_FOOTER_JS, getSiteFooterHtml } from '@/lib/mirror'

export async function SiteFooter() {
  const html = await getSiteFooterHtml()
  return (
    <>
      <link rel="stylesheet" href={SITE_FOOTER_CSS} precedence="default" />
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />
      <Script src={SITE_FOOTER_JS} strategy="afterInteractive" />
    </>
  )
}
