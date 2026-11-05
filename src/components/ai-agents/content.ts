/*
 * Content for the AI Agents page. Mirrors the CRM page's content shape so the
 * same scroll-driven layout, charts and roadmap components can render it.
 */

export const AI_SOURCE = {
  label: "Salesforce. State of the Connected Customer, 2024.",
  title: "Customers expect fast, always-on responses",
  url: "https://www.salesforce.com/research/state-of-the-connected-customer/",
};

/** Manual inbox vs. automated AI-agent follow-up. Widths drive the comparison bars. */
export const FOLLOW_UP_ROWS = [
  { label: "New chat message", manual: "2–30 min", manualWidth: 58, auto: "instant", autoWidth: 3 },
  {
    label: "After-hours call",
    manual: "next morning",
    manualWidth: 82,
    auto: "answered live",
    autoWidth: 4,
  },
  {
    label: "Repeat question",
    manual: "queued",
    manualWidth: 70,
    auto: "resolved now",
    autoWidth: 6,
  },
  {
    label: "Booking request",
    manual: "manual check",
    manualWidth: 64,
    auto: "auto-scheduled",
    autoWidth: 8,
  },
  {
    label: "Review reply",
    manual: "rarely sent",
    manualWidth: 100,
    auto: "drafted instantly",
    autoWidth: 5,
  },
] as const;

export type StageId = "triage" | "respond" | "resolve" | "escalate";

export interface Stage {
  id: StageId;
  label: string;
  title: string;
  body: string;
  /** CSS gradient used as the pinned roadmap backdrop (no external image needed). */
  gradient: string;
  milestones: string[];
}

export const STAGES: Stage[] = [
  {
    id: "triage",
    label: "Triage",
    title: "Triage",
    body: "Every inquiry — chat, call, email, DM or form — routes to one AI agent that categorizes it, pulls the relevant context and decides what happens next, so nothing waits in a separate inbox.",
    gradient: "linear-gradient(135deg, #0b2a3a 0%, #087f83 100%)",
    milestones: [
      "Route chat, calls, emails and messages into one agent.",
      "Categorize each inquiry by intent and urgency.",
      "Tag every conversation by source and topic.",
      "Pull the relevant contact and account context instantly.",
    ],
  },
  {
    id: "respond",
    label: "Respond",
    title: "Respond",
    body: "The agent drafts and sends the first reply in seconds using your approved knowledge, then pauses the moment a person steps in, so your team picks up a live conversation instead of a cold lead.",
    gradient: "linear-gradient(135deg, #102a4e 0%, #2a6cf6 100%)",
    milestones: [
      "Draft first replies from your approved knowledge base.",
      "Send confirmations, answers and scheduling links instantly.",
      "Pause automation the moment a teammate takes over.",
      "Keep every reply consistent with your brand voice.",
    ],
  },
  {
    id: "resolve",
    label: "Resolve",
    title: "Resolve",
    body: "Repeatable tasks — booking, status lookups, FAQs, follow-ups — complete themselves end to end. The agent updates the CRM record and moves the conversation forward without a person touching it.",
    gradient: "linear-gradient(135deg, #241a4a 0%, #6a3af6 100%)",
    milestones: [
      "Complete bookings, lookups and FAQs automatically.",
      "Update the CRM record after every action.",
      "Trigger follow-up sequences until the inquiry is closed.",
      "Report on resolution rate by channel and topic.",
    ],
  },
  {
    id: "escalate",
    label: "Escalate",
    title: "Escalate",
    body: "When judgment is needed, the agent hands off to the right person with the full context attached, notifies your team and waits — so AI handles the volume and your people handle the moments that matter.",
    gradient: "linear-gradient(135deg, #3a2a14 0%, #f69a3a 100%)",
    milestones: [
      "Escalate to a human when confidence or rules require it.",
      "Attach the full conversation and context to the handoff.",
      "Notify the right owner the moment a hot inquiry needs them.",
      "Keep a human in the loop for every sensitive decision.",
    ],
  },
];
