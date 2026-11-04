import { ASSETS, INTEGRATIONS } from "@/lib/studio-escrow-assets";

const DEMO = "https://studioescrow.cloud/schedule-demo";

export const DEMO_URL = DEMO;

export const BADGES = [
  { src: ASSETS.badges.meta, label: "Meta" },
  { src: ASSETS.badges.google, label: "Google" },
  { src: ASSETS.badges.tiktok, label: "TikTok" },
  { src: ASSETS.badges.webflow, label: "Webflow" },
  { src: ASSETS.badges.omnisend, label: "Omnisend" },
  { src: ASSETS.badges["customer-io"], label: "Customer.io" },
  { src: ASSETS.badges.klaviyo, label: "Klaviyo" },
  { src: ASSETS.badges.legitscript, label: "Integrations" },
];

export const INDUSTRIES = [
  {
    n: "01",
    title: "Healthcare",
    label: "Healthcare",
    text: "Bring patient acquisition, secure communications, scheduling, reviews, and referral tracking into one platform. The Studio Escrow Medical Suite starts at $597/month per practice location and includes a BAA. It works alongside your existing EHR; your practice remains responsible for its HIPAA compliance program.",
    logo: ASSETS.partnerWhite.trimrx,
    href: "/medical-suite",
  },
  {
    n: "02",
    title: "Real Estate & Mortgage Brokers",
    label: "Real Estate & Mortgage Brokers",
    text: "Keep buyers, sellers, and borrowers moving from first inquiry to closing. Agents and loan officers get contact histories, visual pipelines, automated nurture sequences, and website lead capture in one dashboard, so no lead or file goes cold.",
    logos: [
      ASSETS.partnerWhite.graymatter,
      ASSETS.partnerWhite.lightbodies,
      ASSETS.partnerWhite.hyperfuel,
    ],
    href: "/mortgage-suite",
  },
  {
    n: "03",
    title: "Agencies",
    label: "Agencies",
    text: "Run client relationships, websites, funnels, campaigns, and automation from one platform. Studio Escrow gives agencies and consultants a connected workspace, with advanced workflows, AI Studio, Claude integration, and an affiliate manager available on Scale.",
    logos: [ASSETS.partnerWhite.saga, ASSETS.partnerWhite.rebrief],
    href: "https://studioescrow.cloud/agencies-consultants",
  },
  {
    n: "04",
    title: "Professional Services",
    label: "Professional Services",
    text: "Law firms, accountants, consultants, coaches, and advisors use Studio Escrow to capture inquiries, book consultations, automate reminders and follow-up, and keep every client conversation in one place.",
    href: "/features",
  },
  {
    n: "+",
    title: "And everyone else.",
    label: "Any business",
    text: "If your business runs on leads, clients, and follow-up, Studio Escrow fits. Start with the core CRM, scheduling, and messaging, then switch on the automations your team actually needs.",
    href: "/features",
  },
];

export const CAPS = [
  "CRM & Pipeline",
  "Unified Inbox",
  "Workflow Automation",
  "Websites & Funnels",
  "AI Studio",
  "AI Receptionist",
  "Booking & Calendars",
  "Medical Suite",
  "Email Marketing",
  "Reputation Management",
  "Document Signing",
  "Courses & Memberships",
  "Social Scheduling",
];

export const GALLERY = [
  {
    src: ASSETS.partnerWhite.eve,
    tag: "Sales · CRM",
    text: "Organize contacts, track opportunities, and move deals through visual pipelines. Keep calls, emails, notes, and tasks together in a complete contact timeline.",
  },
  {
    src: ASSETS.partnerWhite.july,
    tag: "Communications · Inbox",
    text: "Manage SMS, email, and supported social conversations in one inbox. Your team can see the context behind each message without switching between disconnected tools.",
  },
  {
    src: ASSETS.partnerWhite.society,
    tag: "Operations · Automation",
    text: "Build multi-step workflows triggered by forms, bookings, tags, dates, or payment events. Use conditions and wait steps to coordinate follow-up across channels.",
  },
  {
    src: ASSETS.partnerWhite.trimrx,
    tag: "Marketing · Websites",
    text: "Build landing pages, websites, and sales funnels with a drag-and-drop editor. Connect forms directly to your CRM and test different customer journeys.",
  },
  {
    src: ASSETS.partnerWhite.saga,
    tag: "Agencies",
    text: "Use AI Studio and the Claude integration to support content, conversations, and workflow creation. Available capabilities depend on your plan and configuration.",
  },
  {
    src: ASSETS.partnerWhite.mevo,
    tag: "AI · Receptionist",
    text: "Use an AI receptionist to answer inquiries, qualify leads, and book appointments. Configure the experience around your business and connect it to your CRM.",
  },
  {
    src: ASSETS.partnerWhite.wellvia,
    tag: "AI · Receptionist",
    text: "Let clients book directly into your calendar. Connect scheduling with reminders and follow-up workflows so appointments stay part of the customer journey.",
  },
  {
    src: ASSETS.partnerWhite.drwell,
    tag: "AI · Receptionist",
    text: "Medical Suite offers a HIPAA-ready CRM, secure communications, AI reception, review requests, and referral tracking, with a BAA. Your practice remains responsible for configuration and its own compliance program.",
  },
  {
    src: ASSETS.partnerWhite.graymatter,
    tag: "Marketing · Email",
    text: "Build email campaigns and automated nurture sequences. Segment contacts, personalize outreach, and keep campaign activity connected to the CRM.",
  },
  {
    src: ASSETS.partnerWhite.vehc,
    tag: "AI · Receptionist",
    text: "Request reviews automatically after service, monitor Google and Facebook feedback, and manage responses from one dashboard.",
  },
  {
    src: ASSETS.partnerWhite.olivara,
    tag: "Marketing · Email",
    text: "Send documents and contracts for electronic signature and track engagement. Keep the administrative steps of your sales process connected.",
  },
  {
    src: ASSETS.partnerWhite.lightbodies,
    tag: "Education · Memberships",
    text: "Create courses, membership experiences, and gated content. Connect your audience, communication, and customer journey in one platform.",
  },
  {
    src: ASSETS.partnerWhite.astrand,
    tag: "Marketing · Social",
    text: "Plan and schedule social content alongside your other marketing activity. Keep customer acquisition and follow-up connected to your business workspace.",
  },
];

export const GALLERY_IMAGES = [
  ASSETS.partnerImage.eve,
  ASSETS.partnerImage.july,
  ASSETS.partnerImage.society,
  ASSETS.partnerImage.trimrx,
  ASSETS.partnerImage.saga,
  ASSETS.partnerImage.mevo,
  ASSETS.partnerImage.wellvia,
  ASSETS.partnerImage.drwell,
  ASSETS.partnerImage.graymatter,
  ASSETS.partnerImage.verve,
  ASSETS.partnerImage.olivara,
  ASSETS.partnerImage.lightbodies,
  ASSETS.social,
];

export const GRAY_LOGOS = [
  ASSETS.partnerGray.drwell,
  ASSETS.partnerGray.trimrx,
  ASSETS.partnerGray.wellvia,
  ASSETS.partnerGray.anagen,
  ASSETS.partnerGray.eve,
  ASSETS.partnerGray.mevo,
  ASSETS.partnerGray.nexari,
  ASSETS.partnerGray.beek,
  ASSETS.partnerGray.framework,
];

export const PILLARS = [
  {
    src: ASSETS.icon.paid,
    title: "CRM & Automation",
    chips: [
      "Meta",
      "Google",
      "TikTok",
      "Lead capture",
      "Smart lists",
      "Pipelines",
      "Reporting",
      "Multi-step workflow automation",
    ],
    lead: "Capture Leads. Automate Follow-Up. Grow Your Pipeline.",
  },
  {
    src: ASSETS.icon.creative,
    title: "AI Studio",
    chips: ["AI receptionist", "AI conversations", "Content generation", "Claude integration"],
    lead: "AI Tools for Reception, Content and Follow-Up",
  },
  {
    src: ASSETS.icon["email-sms"],
    title: "Email & SMS",
    chips: ["Automated follow-up", "Campaigns", "Smart segmentation", "Unified inbox"],
    lead: "Every Conversation, Connected to Your CRM",
  },
  {
    src: ASSETS.icon["lp-cro"],
    title: "Websites & Funnels",
    chips: ["Drag-and-drop builder", "Landing pages", "A/B Testing", "CRM-connected forms"],
    lead: "Turn Website Visits Into Connected Customer Journeys",
  },
  {
    src: ASSETS.icon.influencer,
    title: "Business Operations",
    chips: [
      "Booking & calendars",
      "Documents & contracts",
      "Payments & invoices",
      "Reviews & reporting",
    ],
    lead: "Your Daily Operations, Together in One Dashboard",
  },
];

export const INTEG_LIST: { slug: string; name: string }[] = [
  { slug: "stripe", name: "Stripe" },
  { slug: "google", name: "Google" },
  { slug: "linkedin", name: "LinkedIn" },
  { slug: "salesforce", name: "Salesforce" },
  { slug: "bonzo", name: "Bonzo" },
  { slug: "tiktok", name: "TikTok" },
  { slug: "semrush", name: "Semrush" },
  { slug: "mailchimp", name: "Mailchimp" },
  { slug: "google-sheets", name: "Google Sheets" },
  { slug: "google-analytics", name: "Google Analytics" },
  { slug: "figma", name: "Figma" },
  { slug: "zapier", name: "Zapier" },
  { slug: "shopify", name: "Shopify" },
  { slug: "quickbooks", name: "QuickBooks" },
  { slug: "lendingpad", name: "LendingPad" },
  { slug: "followupboss", name: "Follow Up Boss" },
  { slug: "youtube", name: "YouTube" },
  { slug: "notion", name: "Notion" },
  { slug: "linktree", name: "Linktree" },
  { slug: "google-forms", name: "Google Forms" },
  { slug: "google-calendar", name: "Google Calendar" },
  { slug: "cloudflare", name: "Cloudflare" },
  { slug: "instagram", name: "Instagram" },
  { slug: "slack", name: "Slack" },
  { slug: "facebook", name: "Facebook" },
  { slug: "ringcentral", name: "RingCentral" },
  { slug: "zillow", name: "Zillow" },
  { slug: "wordpress", name: "WordPress" },
  { slug: "meta", name: "Meta" },
  { slug: "hubspot", name: "HubSpot" },
  { slug: "google-tag-manager", name: "Google Tag Manager" },
  { slug: "google-ads", name: "Google Ads" },
  { slug: "discord", name: "Discord" },
];

export { INTEGRATIONS };

export const PLANS = [
  {
    name: "Growth",
    sub: "Monthly",
    price: "$97",
    unit: "/ month",
    text: "Core CRM, communications, websites, calendars, and workflows. Confirm current inclusions and usage charges before subscribing.",
  },
  {
    name: "Scale",
    sub: "Monthly",
    price: "$197",
    unit: "/ month",
    text: "Advanced workflows, AI Studio, and Claude integration. Confirm team limits and AI usage allowances with Studio Escrow.",
  },
  {
    name: "Medical Suite",
    sub: "Monthly",
    price: "$597",
    unit: "/ location",
    text: "HIPAA-ready CRM, secure communications, and a BAA. Works alongside your EHR; your practice remains responsible for compliance.",
  },
];

export const CARDS = [
  {
    title: "CRM & Pipeline",
    text: "See every lead, conversation, and deal in one place. Visual pipelines show your team what needs attention next, so nothing slips through the cracks.",
  },
  {
    title: "Unified Inbox",
    text: "SMS, email, and supported social messages land in one shared inbox, each tied to the right contact. Fewer tabs, faster replies.",
  },
  {
    title: "Workflow Automations",
    text: "Forms, bookings, tags, and payments kick off follow-up automatically. Multi-step workflows handle the routine work so your team can focus on people.",
  },
  {
    title: "Medical Suite",
    text: "Patient acquisition, scheduling, secure messaging, and reviews in one connected stack. Includes a BAA and works alongside your EHR, not instead of it.",
  },
  {
    title: "Mortgage Suite",
    text: "The Scale plan plus optional done-for-you setup by House of Karma: branding, a website, lead-source connections, AI agents, and mortgage workflows, built for you.",
  },
  {
    title: "Websites & Funnels",
    text: "Launch websites, landing pages, and funnels that feed straight into your CRM. Every new inquiry lands in the right pipeline with follow-up already running.",
  },
];

export const FAQ = [
  {
    q: "What does Studio Escrow cost?",
    a: "Growth is $97/month, Scale is $197/month, and Medical Suite is $597/month per practice location. Mortgage Suite combines Scale at $197/month with a separate one-time buildout starting at $3,000. Messaging, calling, AI usage, and implementation may carry additional charges. Confirm your total cost, limits, and terms before subscribing; no annual savings or unlimited usage is promised here.",
  },
  {
    q: "Which industries is Studio Escrow built for?",
    a: "Studio Escrow supports real estate, mortgage, medical and wellness, home services, agencies, e-commerce, restaurants, events, and professional services. Industry-specific setups connect your pipeline, communications, and workflows.",
  },
  {
    q: "What can the AI tools do?",
    a: "Studio Escrow advertises AI tools for reception, conversations, follow-up, content, reporting, and workflow assistance. Scale includes AI Studio and Claude integration. Confirm availability, usage allowances, and charges for your plan. Configure the tools for your business and review AI outputs; they do not replace professional judgment.",
  },
  {
    q: "What is included in the Medical Suite?",
    a: "Medical Suite includes a HIPAA-ready CRM, BAA, encrypted patient communications, AI receptionist, secure scheduling, review generation, and referral tracking. It complements your EHR. Each practice remains responsible for its own comprehensive HIPAA compliance program.",
  },
  {
    q: "How do I get started?",
    a: "Book a demo to choose your plan and setup. Then connect your brand, import contacts, configure pipelines, and activate your workflows. Migration and implementation needs vary by business; do not cancel existing tools until your new setup is tested.",
  },
  {
    q: "What is the Mortgage Suite?",
    a: "The Mortgage Suite is a done-for-you CRM and marketing setup for loan officers, built by House of Karma. It can include branding, a website, CRM setup, lead connections, trained AI agents, and mortgage nurture workflows. Scale is $197/month; buildouts start at $3,000.",
  },
];

export const CYCLE = [
  { title: "Build.", text: "Bring your knowledge, tools, and guidance together." },
  { title: "Observe.", text: "See how every conversation performs." },
  { title: "Improve.", text: "Turn what you learn into a better agent." },
];

export const ASSETS_REF = ASSETS;
