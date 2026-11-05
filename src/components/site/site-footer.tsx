import { readFile } from "node:fs/promises";
import path from "node:path";

const SITE_FOOTER_CSS = "/assets/site-footer/site-footer.css";

async function getSiteFooterHtml(): Promise<string> {
  try {
    const file = path.resolve("public/mirror-partials/site-footer.html");
    return await readFile(file, "utf8");
  } catch {
    return "";
  }
}

export async function SiteFooter() {
  const html = await getSiteFooterHtml();
  return (
    <>
      <link rel="stylesheet" href={SITE_FOOTER_CSS} precedence="default" />
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
