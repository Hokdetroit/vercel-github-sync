"use client";

import { useRef, useState, type CSSProperties } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Mail,
  MessageSquare,
  CalendarDays,
  Phone,
  Instagram,
  Star,
  FileText,
  Pause,
  Play,
} from "lucide-react";
import { useScrollFrame, clamp01, MOTION_QUERY } from "../crm/scroll-progress";
import s from "../crm/crm-hero.module.css";

const cards = [
  {
    title: "A new chat message",
    detail: "Website chat",
    Icon: MessageSquare,
    x: -440,
    y: -95,
    r: -12,
  },
  { title: "An after-hours call", detail: "Business phone", Icon: Phone, x: 420, y: -130, r: 9 },
  { title: "An unanswered email", detail: "Your inbox", Icon: Mail, x: -460, y: 75, r: 7 },
  { title: "A booking request", detail: "Your calendar", Icon: CalendarDays, x: 460, y: 55, r: -9 },
  { title: "A social DM", detail: "Instagram", Icon: Instagram, x: -320, y: 235, r: -7 },
  { title: "A review to answer", detail: "Google", Icon: Star, x: 320, y: 225, r: 12 },
];
const chapters = [
  "Inquiries arrive from everywhere.",
  "One agent brings it together.",
  "The next step takes care of itself.",
];

export function AIAgentHero() {
  const root = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);
  const [paused, setPaused] = useState(false);
  useScrollFrame(() => {
    if (!root.current) return;
    const reduced = window.matchMedia(MOTION_QUERY).matches;
    if (paused && !reduced) return;
    const bounds = root.current.getBoundingClientRect();
    const progress = reduced
      ? 1
      : clamp01(-bounds.top / Math.max(1, bounds.height - window.innerHeight));
    root.current.style.setProperty("--journey", progress.toFixed(4));
    setChapter(progress < 0.3 ? 0 : progress < 0.7 ? 1 : 2);
  });
  return (
    <section ref={root} className={s.hero} aria-labelledby="ai-title">
      <div className={s.stage}>
        <header className={s.intro}>
          <span className={s.eyebrow}>Your conversations. Finally always on.</span>
          <h1 id="ai-title">
            AI Agents.
            <br />
            <span>From scattered to solved.</span>
          </h1>
          <p>
            Every channel. Every conversation. One connected agent.
            <br />
            Scroll to see the next step fall into place.
          </p>
        </header>
        <div
          className={s.scene}
          aria-label="Illustration of conversations across channels converging into one AI agent"
        >
          <div className={s.scatter} aria-hidden="true">
            {cards.map(({ title, detail, Icon, x, y, r }) => (
              <div
                key={title}
                className={s.card}
                style={{ "--x": `${x}px`, "--y": `${y}px`, "--rotate": `${r}deg` } as CSSProperties}
              >
                <span className={s.icon}>
                  <Icon size={20} />
                </span>
                <div>
                  <strong>{title}</strong>
                  <span>{detail}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={s.record}>
            <div className={s.recordTop}>
              <span className={s.recordMark}>AI</span>
              <span>One connected agent</span>
              <span className={s.example}>Preview</span>
            </div>
            <div className={s.contact}>
              <span className={s.avatar}>JL</span>
              <div>
                <strong>Jordan Lee</strong>
                <span>New inquiry · Chat</span>
              </div>
              <span className={s.status}>Triaged</span>
            </div>
            <div className={s.timeline}>
              <span>
                <Check size={15} /> Inquiry triaged
              </span>
              <span>
                <Check size={15} /> Context retrieved
              </span>
              <span>
                <Check size={15} /> Response drafted
              </span>
            </div>
            <div className={s.recordBottom}>
              <span>Context stays with the conversation.</span>
              <ArrowRight size={16} />
            </div>
          </div>
          <div className={s.workflow}>
            <span className={s.workflowLabel}>Your configured AI agent takes it from here</span>
            <div className={s.steps}>
              {["Triage inquiry", "Draft response", "Team notified"].map((label, i) => (
                <div key={label} className={s.step} style={{ "--step": i } as CSSProperties}>
                  <span className={s.stepNumber}>{i + 1}</span>
                  {label}
                  {i < 2 && <ArrowRight size={16} />}
                </div>
              ))}
            </div>
            <span className={s.disclaimer}>
              Illustrative preview. No live AI calls or changes to your CRM.
            </span>
          </div>
        </div>
        <footer className={s.controls}>
          <div className={s.chapter}>
            <span className={s.dots} aria-hidden="true">
              {chapters.map((_, i) => (
                <i key={i} data-active={i === chapter} />
              ))}
            </span>
            <span>{chapters[chapter]}</span>
          </div>
          <div className={s.actions}>
            <button
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? "Resume hero animation" : "Pause hero animation"}
              aria-pressed={paused}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <a href="#ai-overview">
              Explore the agents <ArrowDown size={16} />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
