export const HBR_SOURCE = {
  label: 'Oldroyd, McElheran & Elkington. Harvard Business Review, 2011.',
  title: 'The Short Life of Online Sales Leads',
  url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads',
}

export const FOLLOW_UP_ROWS = [
  { label: 'New web lead', manual: '2–48 hrs', manualWidth: 62, auto: '< 1 min', autoWidth: 3 },
  { label: 'Missed call', manual: 'next day', manualWidth: 78, auto: 'instant text-back', autoWidth: 3 },
  { label: 'Appointment', manual: 'if remembered', manualWidth: 54, auto: 'on schedule', autoWidth: 9 },
  { label: 'Quote follow-up', manual: '3–7 days', manualWidth: 88, auto: 'same day', autoWidth: 14 },
  { label: 'Review request', manual: 'rarely sent', manualWidth: 100, auto: 'after every job', autoWidth: 7 },
] as const

export type StageId = 'capture' | 'nurture' | 'convert' | 'retain'

export interface Stage {
  id: StageId
  label: string
  title: string
  body: string
  image: string
  milestones: string[]
}

export const STAGES: Stage[] = [
  {
    id: 'capture',
    label: 'Capture',
    title: 'Capture',
    body: 'Forms, calls, texts, chat and every lead source feed one CRM. Each inquiry becomes a single contact record, tagged by source, so nothing waits in a separate inbox.',
    image: '/images/crm/capture.png',
    milestones: [
      'Route web forms, calls and messages into one contact record.',
      'Text back missed calls automatically.',
      'Tag every lead by source and campaign.',
      'Assign new leads to the right owner instantly.',
    ],
  },
  {
    id: 'nurture',
    label: 'Nurture',
    title: 'Nurture',
    body: 'Multi-step email and SMS sequences keep conversations warm and pause the moment someone replies, so your team picks up a real conversation rather than a cold list.',
    image: '/images/crm/nurture.png',
    milestones: [
      'Launch email and SMS sequences from any trigger.',
      'Pause automations the moment a contact replies.',
      'Send appointment confirmations and reminders.',
      'Create follow-up tasks when a lead goes quiet.',
    ],
  },
  {
    id: 'convert',
    label: 'Convert',
    title: 'Convert',
    body: 'Pipelines show every deal by stage. Moving a deal forward triggers the next step, from sending a quote to handing off to the right person on your team.',
    image: '/images/crm/convert.png',
    milestones: [
      'Move deals through custom pipeline stages.',
      'Trigger quotes, documents and handoffs on stage change.',
      'Notify your team the moment a hot lead engages.',
      'Report on conversion by source, stage and owner.',
    ],
  },
  {
    id: 'retain',
    label: 'Retain',
    title: 'Retain',
    body: 'After the sale, workflows request reviews, schedule check-ins and bring past customers back, so every closed deal keeps adding to your pipeline.',
    image: '/images/crm/retain.png',
    milestones: [
      'Request reviews automatically after a completed job.',
      'Schedule check-ins and renewal reminders.',
      'Re-engage past customers with targeted campaigns.',
      'Build the operating system your business is missing: one record, every workflow, always on.',
    ],
  },
]
