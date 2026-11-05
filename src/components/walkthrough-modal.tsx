import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type WalkthroughKey = "ai-receptionist" | "unified-inbox";

type WalkthroughStep = {
  label: string;
  title: string;
  caption: string;
};

const AI_RECEPTIONIST_STEPS: WalkthroughStep[] = [
  {
    label: "Inbound call",
    title: "24/7 intake",
    caption:
      "A new lead calls after hours. AI Receptionist answers instantly and asks qualifying questions.",
  },
  {
    label: "Qualify",
    title: "Smart triage",
    caption: "It captures reason, urgency, and budget, then tags the contact in your CRM.",
  },
  {
    label: "Book",
    title: "Schedule on the spot",
    caption: "Eligible leads are offered the next open slot — straight onto your calendar.",
  },
  {
    label: "Follow up",
    title: "Hands the lead off",
    caption: "A summary + transcript route to Unified Inbox so your team picks it up warm.",
  },
];

const UNIFIED_INBOX_STEPS: WalkthroughStep[] = [
  {
    label: "SMS",
    title: "One stream",
    caption: "SMS, email, and social DMs land in a single thread per contact.",
  },
  {
    label: "Context",
    title: "Full history",
    caption: "Every message shows the contact's pipeline stage and prior activity inline.",
  },
  {
    label: "Reply",
    title: "Reply in channel",
    caption: "Respond without leaving the inbox — no more tab-switching.",
  },
  {
    label: "Automate",
    title: "Trigger workflows",
    caption: "Tag or move a deal and a nurture sequence starts automatically.",
  },
];

const WALKTHROUGHS: Record<WalkthroughKey, { heading: string; steps: WalkthroughStep[] }> = {
  "ai-receptionist": { heading: "AI Receptionist", steps: AI_RECEPTIONIST_STEPS },
  "unified-inbox": { heading: "Unified Inbox", steps: UNIFIED_INBOX_STEPS },
};

export function WalkthroughModal({
  open,
  which,
  onOpenChange,
}: {
  open: boolean;
  which: WalkthroughKey | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = which ? WALKTHROUGHS[which] : null;
  const total = active ? active.steps.length : 0;

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    if (!open || !playing) {
      clearTimer();
      return;
    }
    clearTimer();
    timer.current = setInterval(() => {
      setStep((s) => (s + 1) % (total || 1));
    }, 3200);
    return clearTimer;
  }, [open, playing, total]);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setPlaying(true);
    }
  }, [open, which]);

  if (!active) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="walkthrough-modal">
          <p className="walkthrough-error">No walkthrough available.</p>
        </DialogContent>
      </Dialog>
    );
  }

  const current = active.steps[step] ?? active.steps[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="walkthrough-modal">
        <div className="walkthrough-shell">
          <header className="walkthrough-header">
            <div>
              <p className="walkthrough-kicker">Interactive walkthrough</p>
              <h2 className="walkthrough-heading">{active.heading}</h2>
            </div>
            <button
              type="button"
              className="walkthrough-play"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}
            >
              {playing ? "❚❚" : "►"}
            </button>
          </header>

          <div className={`walkthrough-stage stage-${which}`} aria-live="polite">
            {which === "ai-receptionist" ? (
              <ReceptionistScene step={step} />
            ) : (
              <InboxScene step={step} />
            )}
          </div>

          <div className="walkthrough-caption">
            <span className="walkthrough-caption-label">{current.label}</span>
            <h3 className="walkthrough-caption-title">{current.title}</h3>
            <p className="walkthrough-caption-text">{current.caption}</p>
          </div>

          <div className="walkthrough-controls">
            <div className="walkthrough-dots" role="tablist" aria-label="Walkthrough steps">
              {active.steps.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  role="tab"
                  aria-selected={i === step}
                  aria-label={s.label}
                  className={`walkthrough-dot ${i === step ? "is-active" : ""}`}
                  onClick={() => {
                    setStep(i);
                    setPlaying(false);
                  }}
                />
              ))}
            </div>
            <div className="walkthrough-progress">
              <div
                className="walkthrough-progress-bar"
                style={{ width: `${((step + 1) / total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ReceptionistScene({ step }: { step: number }) {
  const transcript = [
    [
      { who: "in", text: "Incoming call · 9:47 PM" },
      {
        who: "ai",
        text: "Thanks for calling Sage Health. I'm Aria, your virtual assistant. How can I help?",
      },
      { who: "lead", text: "I'd like to start the peptide program." },
    ],
    [
      { who: "ai", text: "Are you an existing patient or new to us?" },
      { who: "lead", text: "New patient." },
      { who: "ai", text: "Got it — and are you hoping to start within the next two weeks?" },
    ],
    [
      { who: "lead", text: "Yes, ideally next week." },
      { who: "ai", text: "Perfect. I have Tue 10:15 or Thu 2:30 open. Which works?" },
      { who: "lead", text: "Tuesday." },
    ],
    [
      { who: "ai", text: "Booked — Tue 10:15 with Dr. Patel." },
      { who: "ai", text: "Summary + transcript sent to your team. Anything else?" },
      { who: "in", text: "Call ended · lead routed to inbox" },
    ],
  ];
  const lines = transcript[step] ?? transcript[0];
  return (
    <div className="mock mock-phone">
      <div className="mock-phone-bar">
        <span className="mock-pill live">● Live call</span>
        <span className="mock-time">9:47 PM</span>
      </div>
      <div className="mock-phone-body">
        <div className="mock-avatar ai-avatar">Aria</div>
        <div className="mock-convo">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`mock-bubble ${l.who} step-${i}`}
              style={{ animationDelay: `${i * 0.18}s` }}
            >
              {l.text}
            </div>
          ))}
        </div>
        {step >= 2 && (
          <div
            className={`mock-booking ${step >= 3 ? "confirmed" : ""}`}
            style={{ animationDelay: "0.3s" }}
          >
            {step >= 3 ? "✓ Appointment confirmed" : "Selecting Tue 10:15…"}
          </div>
        )}
        <div className="mock-tag-row">
          <span className="mock-tag">New patient</span>
          <span className="mock-tag">Peptides</span>
          <span className="mock-tag">Hot lead</span>
        </div>
      </div>
    </div>
  );
}

function InboxScene({ step }: { step: number }) {
  const threads = [
    { name: "Maya R.", channel: "sms", preview: "Can we move our appt to 3?", unread: true },
    { name: "Tom K.", channel: "email", preview: "Re: onboarding docs", unread: true },
    { name: "Lina P.", channel: "ig", preview: "DM — pricing for peptide plan", unread: false },
  ];
  const selected = threads[step % threads.length] ?? threads[0];
  return (
    <div className="mock mock-inbox">
      <div className="mock-inbox-sidebar">
        <div className="mock-inbox-search">Search all channels…</div>
        <div className="mock-thread-list">
          {threads.map((t, i) => (
            <div
              key={t.name}
              className={`mock-thread ${i === step % threads.length ? "is-active" : ""}`}
            >
              <span className={`mock-thread-dot ch-${t.channel}`} />
              <div className="mock-thread-meta">
                <span className="mock-thread-name">{t.name}</span>
                <span className="mock-thread-prev">{t.preview}</span>
              </div>
              {t.unread ? <span className="mock-unread" /> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="mock-inbox-main">
        <div className="mock-inbox-topbar">
          <span className="mock-inbox-name">{selected.name}</span>
          <span className={`mock-inbox-channel ch-${selected.channel}`}>
            {selected.channel.toUpperCase()}
          </span>
        </div>
        <div className="mock-inbox-context">
          <span className="mock-context-pill">Pipeline · Discovery</span>
          <span className="mock-context-pill">Last seen · 2d</span>
        </div>
        <div className="mock-inbox-thread">
          <div className="mock-msg in">Hi! Is the peptide program covered by insurance?</div>
          <div className="mock-msg out">
            Great question — it's self-pay, but we offer 3-month bundles. Want me to send pricing?
          </div>
          <div className={`mock-msg in ${step >= 2 ? "reveal" : "hidden"}`}>Yes please 👍</div>
          <div className={`mock-msg out ${step >= 3 ? "reveal" : "hidden"}`}>
            Sent — and I've tagged you “pricing-sent” so our team follows up.
          </div>
        </div>
        {step >= 3 && (
          <div className="mock-workflow-banner" style={{ animationDelay: "0.2s" }}>
            <span className="mock-wf-dot" /> Workflow “Pricing follow-up” started for{" "}
            {selected.name}
          </div>
        )}
        <div className="mock-inbox-composer">
          <input readOnly placeholder="Reply in channel…" />
          <button type="button" aria-label="Send">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export function useWalkthrough() {
  const [open, setOpen] = useState(false);
  const [which, setWhich] = useState<WalkthroughKey | null>(null);

  const openWalkthrough = (key: WalkthroughKey) => {
    setWhich(key);
    setOpen(true);
  };

  const node =
    typeof document === "undefined"
      ? null
      : createPortal(
          <WalkthroughModal open={open} which={which} onOpenChange={setOpen} />,
          document.body,
        );

  return { openWalkthrough, modal: node };
}
