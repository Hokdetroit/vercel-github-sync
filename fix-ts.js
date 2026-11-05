import fs from "node:fs";

// 1. Fix src/routes/__root.tsx - TanStack Router uses createRootRoute
let rootTs = fs.readFileSync("src/routes/__root.tsx", "utf8");
rootTs = rootTs.replace(/createFileRoute\("__root"\)/, "createRootRoute()");
rootTs = rootTs.replace(/import \{ Outlet, createFileRoute \} from "@tanstack\/react-router";/, "import { Outlet, createRootRoute } from \"@tanstack/react-router\";");
fs.writeFileSync("src/routes/__root.tsx", rootTs);

// 2. Fix src/lib/routes.ts - remove leftover Metadata
let routesTs = fs.readFileSync("src/lib/routes.ts", "utf8");
routesTs = routesTs.replace(/: Metadata/g, "");
fs.writeFileSync("src/lib/routes.ts", routesTs);

// 3. Fix img props in workflow-roadmap.tsx, mortgage-page.tsx, real-estate-page.tsx
const filesToCleanImg = [
  "src/components/crm/workflow-roadmap.tsx",
  "src/components/mortgage/mortgage-page.tsx",
  "src/components/real-estate/real-estate-page.tsx"
];
for (const f of filesToCleanImg) {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, "utf8");
    content = content.replace(/\sfill=\{true\}/g, "");
    content = content.replace(/\sfill/g, "");
    content = content.replace(/\spriority=\{true\}/g, "");
    content = content.replace(/\spriority/g, "");
    fs.writeFileSync(f, content);
  }
}

// 4. Fix src/components/site/site-footer.tsx - remove import from "@/lib/mirror"
if (fs.existsSync("src/components/site/site-footer.tsx")) {
  let footerContent = fs.readFileSync("src/components/site/site-footer.tsx", "utf8");
  footerContent = footerContent.replace(/import .* from ['"]@\/lib\/mirror['"];?/g, "");
  fs.writeFileSync("src/components/site/site-footer.tsx", footerContent);
}

console.log("All targeted TS fixes applied.");
