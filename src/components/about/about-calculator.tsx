"use client";

import { useState } from "react";
import s from "../mortgage/mortgage.module.css";

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

/**
 * Tool-consolidation calculator — reuses the MortgageCalculator slider/results
 * layout but estimates software spend saved by consolidating onto Studio Escrow.
 */
export function AboutCalculator() {
  const [tools, setTools] = useState(8);
  const [costPerTool, setCostPerTool] = useState(120);
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(45);
  const [retention, setRetention] = useState(15);

  const currentSpend = tools * costPerTool * 12;
  const platformSpend = 12 * 497; // illustrative Scale plan
  const softwareSaved = Math.max(0, currentSpend - platformSpend);
  const laborSaved = hours * rate * 12;
  const recoveredRevenue = (retention / 100) * currentSpend * 0.4;
  const totalSaved = softwareSaved + laborSaved + recoveredRevenue;

  const controls = [
    {
      id: "tools",
      label: "Tools you pay for today",
      value: tools,
      min: 2,
      max: 25,
      step: 1,
      display: String(tools),
      set: setTools,
    },
    {
      id: "cost",
      label: "Average cost per tool / month",
      value: costPerTool,
      min: 20,
      max: 500,
      step: 10,
      display: money(costPerTool),
      set: setCostPerTool,
    },
    {
      id: "hours",
      label: "Manual hours / month on busywork",
      value: hours,
      min: 0,
      max: 120,
      step: 5,
      display: `${hours} hrs`,
      set: setHours,
    },
    {
      id: "rate",
      label: "Loaded hourly cost",
      value: rate,
      min: 20,
      max: 200,
      step: 5,
      display: money(rate),
      set: setRate,
    },
    {
      id: "retention",
      label: "Assumed revenue lift from better follow-up",
      value: retention,
      min: 0,
      max: 50,
      step: 5,
      display: `${retention}%`,
      set: setRetention,
    },
  ];

  return (
    <section id="calculator" className={`${s.section} ${s.calculator}`}>
      <div className={s.sectionHeading}>
        <span className={s.eyebrow}>Explore a possibility. Not a promise.</span>
        <h2>
          What could one
          <br />
          connected platform mean?
        </h2>
        <p>
          Put your own assumptions into the picture. This scenario calculator estimates potential
          annual savings from consolidating tools and reclaiming manual time — not guaranteed
          results.
        </p>
      </div>
      <div className={s.calculatorGrid}>
        <div className={s.sliders}>
          {controls.map((c) => (
            <div key={c.id}>
              <div>
                <label htmlFor={`about-${c.id}`}>{c.label}</label>
                <output htmlFor={`about-${c.id}`}>{c.display}</output>
              </div>
              <input
                id={`about-${c.id}`}
                type="range"
                min={c.min}
                max={c.max}
                step={c.step}
                value={c.value}
                aria-valuetext={c.display}
                onChange={(e) => c.set(Number(e.target.value))}
              />
            </div>
          ))}
        </div>
        <div className={s.calculatorResults} aria-live="polite" aria-atomic="true">
          <span className={s.eyebrow}>Estimated annual impact</span>
          <div className={s.comparison}>
            <div>
              <span>Current tool spend</span>
              <strong>{money(currentSpend)}</strong>
            </div>
            <span aria-hidden="true">→</span>
            <div>
              <span>On Studio Escrow</span>
              <strong>{money(platformSpend)}</strong>
            </div>
          </div>
          <div className={s.result}>
            <span>Potential annual difference</span>
            <strong>{money(totalSaved)}</strong>
            <span>
              Software savings {money(softwareSaved)} · reclaimed labor {money(laborSaved)} ·
              recovered revenue {money(recoveredRevenue)}
            </span>
          </div>
          <p className={s.note}>
            Software spend × 12 minus an illustrative platform plan, plus reclaimed manual hours at
            your loaded rate, plus an assumed revenue lift from better follow-up. Excludes taxes,
            onboarding and migration effort. Assumptions are yours to adjust.
          </p>
        </div>
      </div>
    </section>
  );
}
