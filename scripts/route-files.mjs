// Each static sitemap route and the files whose edits change that page.
// Shared by route-dates.mjs (sitemap dates) and indexnow.mjs (which pages to
// announce after a deploy).
const SERVICE_CONTENT = "lib/service-content.ts"

export const routes = {
  "": ["app/(en)/page.tsx", "app/(en)/layout.tsx", "components/home-client.tsx"],
  "/about": ["app/(en)/about", "components/pages/about-page.tsx", SERVICE_CONTENT],
  "/blog": ["app/(en)/blog/page.tsx", "components/blog-index-content.tsx", "components/blog-shell.tsx"],
  "/no/blog": ["app/(no)/blog/page.tsx", "components/blog-index-content.tsx", "components/blog-shell.tsx"],
  "/contact": ["app/(en)/contact", "components/pages/contact-page.tsx", SERVICE_CONTENT],
  "/privacy": ["app/(en)/privacy", "components/pages/privacy-page.tsx"],
  "/individual-therapy": ["app/(en)/individual-therapy", "components/pages/individual-therapy-page.tsx", SERVICE_CONTENT],
  "/couples-therapy": ["app/(en)/couples-therapy", "components/pages/couples-therapy-page.tsx", SERVICE_CONTENT],
  "/couples-intensive": ["app/(en)/couples-intensive", "components/pages/couples-intensive-page.tsx", SERVICE_CONTENT],
  "/family-support": ["app/(en)/family-support", "components/pages/family-support-page.tsx"],
  "/co-founder-coaching": ["app/(en)/co-founder-coaching", "components/pages/cofounder-session-page.tsx"],
  "/executive-founder-work": ["app/(en)/executive-founder-work", "components/pages/executive-founder-work-page.tsx", SERVICE_CONTENT],
  "/online-therapy-norway": ["app/(no)/online-therapy-norway"],
  "/instruments": ["app/(en)/instruments/page.tsx", "app/(en)/instruments/og", "components/instruments"],
  "/instruments/conflict": ["app/(en)/instruments/conflict/page.tsx", "app/(en)/instruments/conflict/og", "components/instruments"],
  "/no": ["app/(no)/page.tsx", "app/(no)/layout.tsx", "components/home-client.tsx"],
  "/no/parterapi": ["app/(no)/parterapi", "components/pages/couples-therapy-page.tsx", SERVICE_CONTENT],
  "/no/parintensiv": ["app/(no)/parintensiv", "components/pages/couples-intensive-page.tsx", SERVICE_CONTENT],
  "/no/individuell-terapi": ["app/(no)/individuell-terapi", "components/pages/individual-therapy-page.tsx", SERVICE_CONTENT],
  "/no/familieterapi": ["app/(no)/familieterapi", "components/pages/family-support-page.tsx"],
  "/no/ledere-og-grundere": ["app/(no)/ledere-og-grundere", "components/pages/executive-founder-work-page.tsx", SERVICE_CONTENT],
  "/no/om-oss": ["app/(no)/om-oss", "components/pages/about-page.tsx", SERVICE_CONTENT],
  "/no/kontakt": ["app/(no)/kontakt", "components/pages/contact-page.tsx", SERVICE_CONTENT],
  "/no/personvern": ["app/(no)/personvern", "components/pages/privacy-page.tsx"],
}
