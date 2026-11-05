import footerHtml from "./site-footer.html?raw";

const SITE_FOOTER_CSS = "/assets/site-footer/site-footer.css";

export function SiteFooter() {
  return (
    <>
      <link rel="stylesheet" href={SITE_FOOTER_CSS} precedence="default" />
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  );
}
