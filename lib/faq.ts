import type { FaqEntry } from '@/components/site/sections'

/** Verbatim from the existing homepage and /pricing FAQ sections. No new answers. */
export const faqGroups: { id: string; title: string; items: FaqEntry[] }[] = [
  {
    id: 'faq-pricing',
    title: 'Pricing',
    items: [
      {
        q: 'What does Studio Escrow cost?',
        a: 'Growth is $97/month, Scale is $197/month, and Medical Suite is $597/month per practice location. Mortgage Suite combines Scale at $197/month with a separate one-time buildout starting at $3,000. Messaging, calling, AI usage, and implementation may carry additional charges. Confirm your total cost, limits, and terms before subscribing; no annual savings or unlimited usage is promised here.',
      },
      {
        q: 'Which plan should I start with?',
        a: 'Most businesses start on Growth for the core CRM, inbox, websites and automation. Move to Scale when you want advanced workflows and AI Studio. Healthcare practices and loan officers should look at the dedicated suites.',
      },
      {
        q: 'Are there usage charges beyond the monthly price?',
        a: 'Yes. Messaging, calling, AI usage and implementation may carry additional charges. Confirm your total cost, limits and allowances with Studio Escrow before subscribing.',
      },
      {
        q: 'Can I change plans later?',
        a: 'Yes. You can move between plans as your business grows. Talk to the Studio Escrow team to plan the switch so your workflows carry over cleanly.',
      },
    ],
  },
  {
    id: 'faq-platform',
    title: 'Platform',
    items: [
      {
        q: 'Which industries is Studio Escrow built for?',
        a: 'Studio Escrow supports real estate, mortgage, medical and wellness, home services, agencies, e-commerce, restaurants, events, and professional services. Industry-specific setups connect your pipeline, communications, and workflows.',
      },
      {
        q: 'What is the Mortgage Suite?',
        a: 'The Mortgage Suite is a done-for-you CRM and marketing setup for loan officers, built by House of Karma. It can include branding, a website, CRM setup, lead connections, trained AI agents, and mortgage nurture workflows. Scale is $197/month; buildouts start at $3,000.',
      },
      {
        q: 'What does the Mortgage Suite buildout include?',
        a: 'House of Karma builds your branding, website, CRM setup and lead-source connections on the Scale plan. Buildouts start at $3,000 as a one-time cost, alongside Scale at $197 per month.',
      },
    ],
  },
  {
    id: 'faq-ai',
    title: 'AI Tools',
    items: [
      {
        q: 'What can the AI tools do?',
        a: 'Studio Escrow advertises AI tools for reception, conversations, follow-up, content, reporting, and workflow assistance. Scale includes AI Studio and Claude integration. Confirm availability, usage allowances, and charges for your plan. Configure the tools for your business and review AI outputs; they do not replace professional judgment.',
      },
    ],
  },
  {
    id: 'faq-medical',
    title: 'Medical Suite',
    items: [
      {
        q: 'What is included in the Medical Suite?',
        a: 'Medical Suite includes a HIPAA-ready CRM, BAA, encrypted patient communications, AI receptionist, secure scheduling, review generation, and referral tracking. It complements your EHR. Each practice remains responsible for its own comprehensive HIPAA compliance program.',
      },
      {
        q: 'How is the Medical Suite priced for multiple locations?',
        a: 'The Medical Suite is $597 per month for each practice location, and every location is covered by a BAA. It works alongside your existing EHR, and your practice remains responsible for its HIPAA compliance program.',
      },
    ],
  },
  {
    id: 'faq-getting-started',
    title: 'Getting Started',
    items: [
      {
        q: 'How do I get started?',
        a: 'Book a demo to choose your plan and setup. Then connect your brand, import contacts, configure pipelines, and activate your workflows. Migration and implementation needs vary by business; do not cancel existing tools until your new setup is tested.',
      },
    ],
  },
]
