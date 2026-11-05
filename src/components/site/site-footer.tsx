


export async function SiteFooter() {
  const html = await getSiteFooterHtml()
  return (
    <>
      <link rel="stylesheet" href={SITE_FOOTER_CSS} precedence="default" />
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />
      
    </>
  )
}
