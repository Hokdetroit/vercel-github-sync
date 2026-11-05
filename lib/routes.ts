import type { Metadata } from 'next'

/**
 * Single source of truth for every built route. Header (mega menu), footer,
 * breadcrumbs, sitemap, canonical tags and link rewriting all read from here.
 */

export const SITE_URL = 'https://studioescrow.cloud'

/** Version both assets together to prevent stale styles from mismatching the menu markup. */
const MEGA_MENU_VERSION = '7'
export const MEGA_MENU_SRC = `/assets/mega-menu/mega-menu.js?v=${MEGA_MENU_VERSION}`
export const MEGA_MENU_CSS = `/assets/mega-menu/mega-menu.css?v=${MEGA_MENU_VERSION}`
export const SITE_NAME = 'Studio Escrow'

export const INDEXING_ENABLED = process.env.INDEXING_ENABLED === 'true'

export type RouteStatus = 'built'

export interface SiteRoute {
  path: string
  name: string
  title: string
  description: string
  status: RouteStatus
  /** "mirror" = existing designed page served from the original HTML; "app" = React page. */
  source: 'mirror' | 'app'
  mirrorFile?: string
}

export const routes = {
  home: {
    path: '/',
    name: 'Home',
    title: 'Studio Escrow — All-in-One CRM, AI & Business Automation',
    description:
      'Run your CRM, marketing, sales, communications, workflows, and AI in one connected platform. Explore Studio Escrow Growth, Scale, Medical, and Mortgage suites.',
    status: 'built',
    source: 'mirror',
    mirrorFile: 'index',
  },
  features: {
    path: '/features',
    name: 'Features',
    title: 'Features | Studio Escrow',
    description:
      'Explore Studio Escrow CRM, marketing, AI and automation in an interactive feature universe. Discover custom Medical Suite EMRs, patient portals, dashboards and integrations.',
    status: 'built',
    source: 'app',
  },
  pricing: {
    path: '/pricing',
    name: 'Pricing',
    title: 'Pricing | Studio Escrow',
    description:
      'Compare Studio Escrow Growth, Scale, Medical Suite, and Mortgage Suite plans. Simple monthly pricing with usage-based services billed separately.',
    status: 'built',
    source: 'mirror',
    mirrorFile: 'pricing',
  },
  crmAutomations: {
    path: '/crm-automations',
    name: 'CRM & Automations',
    title: 'CRM & Automations | Studio Escrow',
    description:
      'Contacts, pipelines and every conversation in one CRM, with multi-step workflows that capture, nurture, convert and retain customers automatically.',
    status: 'built',
    source: 'app',
  },
  aiStudio: {
    path: '/ai-studio',
    name: 'AI Studio',
    title: 'AI Studio | Studio Escrow',
    description: 'Explore Ask AI, no-code tools, business knowledge and connected agent workflows. See how AI Studio brings your CRM and automation together.',
    status: 'built',
    source: 'app',
  },
  medicalSuite: {
    path: '/medical-suite',
    name: 'Medical Suite',
    title: 'Medical Suite | Studio Escrow',
    description: 'Connect patient CRM, AI receptionist, scheduling, intake and follow-up with a managed, HIPAA-ready Medical Suite for your practice.',
    status: 'built',
    source: 'app',
  },
  mortgageSuite: {
    path: '/mortgage-suite',
    name: 'Mortgage Suite',
    title: 'Mortgage Suite | Studio Escrow',
    description: 'Connect lead capture, CRM, AI-assisted response, long-term nurture and referral follow-up with a done-for-you Mortgage Suite.',
    status: 'built',
    source: 'app',
  },
  realEstateSuite: {
    path: '/real-estate-suite',
    name: 'Real Estate Suite',
    title: 'Real Estate Suite | Studio Escrow',
    description: 'Connect buyer and seller leads, real estate CRM, AI-assisted follow-up, listing campaigns and past-client referrals in one done-for-you workspace.',
    status: 'built',
    source: 'app',
  },
  scheduleDemo: {
    path: '/schedule-demo',
    name: 'Book a Demo',
    title: 'Book a Demo | Studio Escrow',
    description:
      'Book a Studio Escrow demo. Tell us about your business and the tools you use today, and we will walk you through the right setup.',
    status: 'built',
    source: 'app',
  },
  contact: {
    path: '/contact',
    name: 'Contact',
    title: 'Contact | Studio Escrow',
    description: 'Get in touch with the Studio Escrow team with questions about the platform, plans, or getting set up.',
    status: 'built',
    source: 'app',
  },
  about: {
    path: '/about',
    name: 'About',
    title: 'About | Studio Escrow',
    description:
      'Studio Escrow is a connected business operating system for CRM, AI agents, automation, workforce operations, websites and healthcare systems.',
    status: 'built',
    source: 'app',
  },
  caseStudies: {
    path: '/case-studies',
    name: 'Case Studies',
    title: 'Case Studies | Studio Escrow',
    description: 'Case studies from businesses running on Studio Escrow. New stories are being prepared and will be published here.',
    status: 'built',
    source: 'app',
  },
  faq: {
    path: '/faq',
    name: 'FAQ',
    title: 'FAQ | Studio Escrow',
    description:
      'Answers to common questions about Studio Escrow pricing, the platform, AI tools, the Medical Suite, and getting started.',
    status: 'built',
    source: 'app',
  },
  complianceSecurity: {
    path: '/compliance-security',
    name: 'Compliance and Security',
    title: 'Compliance and Security | Studio Escrow',
    description:
      'How Studio Escrow approaches data protection and access controls, plus the HIPAA-ready Medical Suite with a Business Associate Agreement available.',
    status: 'built',
    source: 'app',
  },
  doItForYou: {
    path: '/do-it-for-you',
    name: 'Do It For You',
    title: 'Do It For You | Studio Escrow',
    description:
      'Done-for-you Studio Escrow implementation: branding, website, CRM setup, lead-source connections, AI agent setup and workflow builds.',
    status: 'built',
    source: 'app',
  },
  knowledgeBase: {
    path: '/knowledge-base',
    name: 'Knowledge Base',
    title: 'Knowledge Base | Studio Escrow',
    description:
      'Studio Escrow help center. Guides for getting started, CRM and pipelines, communications, automations, AI tools and the Medical Suite.',
    status: 'built',
    source: 'app',
  },
  enterprisePricing: {
    path: '/enterprise-pricing',
    name: 'Enterprise Pricing',
    title: 'Enterprise Pricing | Studio Escrow',
    description:
      'Custom Studio Escrow pricing for larger teams and multi-location groups, with custom integrations, portals and dedicated onboarding.',
    status: 'built',
    source: 'app',
  },
  calculator: {
    path: '/calculator',
    name: 'Savings Calculator',
    title: 'Savings Calculator | Studio Escrow',
    description:
      'Estimate what consolidating your tools into Studio Escrow could look like, based entirely on the figures you enter.',
    status: 'built',
    source: 'app',
  },
  compare: {
    path: '/compare',
    name: 'Compare',
    title: 'Compare | Studio Escrow',
    description: 'A plain-language look at running your business on Studio Escrow versus using separate, disconnected tools.',
    status: 'built',
    source: 'app',
  },
  privacy: {
    path: '/privacy',
    name: 'Privacy Policy',
    title: 'Privacy Policy | Studio Escrow',
    description: 'The Studio Escrow privacy policy.',
    status: 'built',
    source: 'app',
  },
  terms: {
    path: '/terms',
    name: 'Terms of Service',
    title: 'Terms of Service | Studio Escrow',
    description: 'The Studio Escrow terms of service.',
    status: 'built',
    source: 'app',
  },
} as const satisfies Record<string, SiteRoute>

export type RouteId = keyof typeof routes

export const allRoutes: SiteRoute[] = Object.values(routes)

export const builtPaths: string[] = allRoutes.filter((r) => r.status === 'built').map((r) => r.path)

export const href = (id: RouteId): string => routes[id].path

export const canonicalUrl = (path: string): string => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)

/** Pages that are not built yet in this project resolve to the same path on the live site. */
export const resolvePath = (path: string): string => (builtPaths.includes(path) ? path : `${SITE_URL}${path}`)

export const footerLinks: { id: RouteId; label: string }[] = [
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'doItForYou', label: 'Do It For You' },
  { id: 'caseStudies', label: 'Case Studies' },
  { id: 'faq', label: 'FAQ' },
  { id: 'knowledgeBase', label: 'Knowledge Base' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'complianceSecurity', label: 'Compliance and Security' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'terms', label: 'Terms' },
]

/** Fallback nav shown inside <noscript> before the mega menu script mounts. */
export const noscriptNavLinks: RouteId[] = ['home', 'features', 'pricing', 'scheduleDemo']

export function routeMetadata(id: RouteId): Metadata {
  const route = routes[id]
  return {
    title: { absolute: route.title },
    description: route.description,
    alternates: { canonical: canonicalUrl(route.path) },
    openGraph: { title: route.title, description: route.description, url: canonicalUrl(route.path) },
  }
}
