"use client";

import { useEffect, useRef, useState } from "react";
import s from "../mortgage/mortgage.module.css";

/**
 * Company story timeline — reuses the MortgageNurture sticky-preview layout
 * (scroll-driven step list + pinned workspace card) but tells the Studio Escrow
 * company story instead of a nurture sequence.
 */
export function AboutJourney() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);

  const steps = [
    {
      time: "2019 · The beginning",
      title: "A single agency, drowning in tabs.",
      body: "House of Karma started as a service business running on a dozen disconnected tools. Leads fell through cracks, follow-up was manual, and no two systems agreed on who a customer was.",
      channel: "The problem",
      status: "Disconnected",
      message:
        "Every team had their own spreadsheet, inbox and calendar. Nothing talked to anything else.",
      next: "Stop stitching tools together and build one connected system.",
    },
    {
      time: "2020–2022 · The build",
      title: "We built the platform we wished we had.",
      body: "CRM, communications, automation and AI were brought into one record. What started as an internal tool became the operating system behind every client we onboarded.",
      channel: "The build",
      status: "Connected",
      message:
        "One record per contact. One pipeline. Every conversation, task and workflow in the same place.",
      next: "Open the platform to the businesses we serve.",
    },
    {
      time: "2023–2024 · The suites",
      title: "Industry-specific setups, done for you.",
      body: "Mortgage, real estate, medical and wellness each got a tailored suite — lead capture, nurture, compliance-aware workflows and AI-assisted follow-up, configured around how each industry actually works.",
      channel: "The suites",
      status: "Tailored",
      message:
        "Mortgage Suite, Real Estate Suite, Medical Suite — each with the right pipeline, channels and guardrails.",
      next: "Add AI agents that handle repeatable conversations around the clock.",
    },
    {
      time: "2025 · Today",
      title: "One connected business operating system.",
      body: "Studio Escrow now brings CRM, AI agents, automation, workforce operations, websites and healthcare systems together. We build the platform and deliver the buildout — branding, sites, CRM setup and lead-source connections.",
      channel: "Today",
      status: "Operating system",
      message:
        "Run your CRM, marketing, sales, communications, workflows and AI from one connected platform.",
      next: "Book a demo and see how it fits your business.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-30% 0px -69% 0px", threshold: 0 },
    );
    root.current?.querySelectorAll("[data-step]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = steps[active];

  return (
    <section id="journey" ref={root} className={s.nurture}>
      <div className={s.sectionHeading}>
        <span className={s.eyebrow}>How Studio Escrow came to be</span>
        <h2>
          Built from a real
          <br />
          business, not a whiteboard.
        </h2>
        <p>
          Scroll through the story — from a single agency fighting disconnected tools to one
          connected operating system.
        </p>
      </div>
      <div className={s.journeyGrid}>
        <div className={s.journeySteps}>
          {steps.map((step, i) => (
            <article
              id={`about-step-${i}`}
              key={i}
              data-step={i}
              data-active={active === i}
              className={s.journeyStep}
            >
              <span className={s.eyebrow}>{step.time}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <span className={s.stepLabel}>{String(i + 1).padStart(2, "0")} / 04</span>
            </article>
          ))}
        </div>
        <div className={s.stickyPreview}>
          <div className={s.workspaceHeader}>
            <span>Studio Escrow</span>
            <span className={s.exampleTag}>Company timeline</span>
          </div>
          <div className={s.contact}>
            <span className={s.avatar}>SE</span>
            <div>
              <strong>Studio Escrow</strong>
              <p>Connected business OS</p>
            </div>
          </div>
          <div className={s.status}>
            <span>Stage</span>
            <strong>{current.status}</strong>
          </div>
          <div className={s.message} key={active}>
            <span className={s.eyebrow}>{current.channel}</span>
            <p>{current.message}</p>
          </div>
          <div className={s.nextAction}>
            <span className={s.eyebrow}>Next step</span>
            <p>{current.next}</p>
          </div>
          <div className={s.progressNav} aria-label="Timeline steps">
            {steps.map((step, i) => (
              <a
                key={i}
                href={`#about-step-${i}`}
                aria-label={`View step ${i + 1}: ${step.channel}`}
                aria-current={active === i ? "step" : undefined}
                onClick={(event) => {
                  if (matchMedia("(max-width: 760px)").matches) event.preventDefault();
                  setActive(i);
                }}
              >
                <span />
              </a>
            ))}
          </div>
          <p className={s.note}>
            The Studio Escrow story. Timelines are approximate; the platform continues to evolve.
          </p>
        </div>
      </div>
    </section>
  );
}
