"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { integrations, logoUrl } from "../features/feature-data";
import s from "./studio.module.css";

/* Orbit setup — same logic as FeatureUniverse but tuned for AI Studio */
const openingBrands = [
  "Stripe",
  "Anthropic Claude",
  "Salesforce",
  "Slack",
  "Shopify",
  "Zapier",
  "HubSpot",
  "ChatGPT / OpenAI",
];
const orbit = [
  ...openingBrands.map((name) => integrations.find((t) => t[0] === name)!),
  ...integrations.filter((t) => !openingBrands.includes(t[0])),
];
const logosPerWave = 20;
const positions = Array.from({ length: logosPerWave }, (_, i) => {
  const angle = (i / logosPerWave) * Math.PI * 2 - Math.PI / 2;
  return [Math.cos(angle) * 475, Math.sin(angle) * 410, i % 2 ? 5 : -5];
});

export function StudioHero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(false);

  /* scroll-driven dispersal + video expand */
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!root.current) return;
      const rect = root.current.getBoundingClientRect();
      const progress = media.matches
        ? 0
        : Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      root.current.style.setProperty("--flight", String(progress));

      /* expand the video as we approach the end of the hero */
      if (video.current && progress > 0.55) {
        video.current.style.setProperty("--expand", String(Math.min(1, (progress - 0.55) / 0.45)));
        if (!started && progress > 0.6) {
          setStarted(true);
          video.current.play().catch(() => setError(true));
        }
      }
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    media.addEventListener("change", scroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      media.removeEventListener("change", scroll);
    };
  }, [started]);

  async function play() {
    setStarted(true);
    try {
      await video.current?.play();
    } catch {
      setError(true);
    }
  }

  return (
    <section ref={root} className={s.heroFlight} aria-label="AI Studio hero">
      <div className={s.heroStage}>
        {/* top bar */}
        <div className={s.heroTop}>
          <span>STUDIO ESCROW / AI STUDIO</span>
          <button onClick={() => setPaused(!paused)} aria-pressed={paused} className={s.heroPause}>
            {paused ? <Play size={14} /> : <Pause size={14} />} {paused ? "Resume" : "Pause"}
          </button>
        </div>

        {/* orbit cards */}
        <div className={s.heroOrbit} aria-hidden="true">
          {orbit.map(([name, slug, category], i) => (
            <div
              key={name}
              className={s.heroOrbitCard}
              style={
                {
                  "--x": `${positions[i % logosPerWave][0]}px`,
                  "--y": `${positions[i % logosPerWave][1]}px`,
                  "--r": `${positions[i % logosPerWave][2]}deg`,
                  "--wave": Math.floor(i / logosPerWave),
                } as CSSProperties
              }
            >
              {slug ? (
                <img
                  src={logoUrl(slug)}
                  alt=""
                  width={70}
                  height={70}
                  decoding="async"
                  style={
                    slug === "openai"
                      ? { background: "var(--ink)", borderRadius: 16, padding: 10 }
                      : undefined
                  }
                />
              ) : null}
              <span>{name}</span>
              <span className={s.heroOrbitCategory}>{category}</span>
              <ArrowUpRight size={15} />
            </div>
          ))}
        </div>

        {/* center hero copy */}
        <div className={s.heroCopy}>
          <span className={s.eyebrow}>Intelligence, built into your business</span>
          <h1>
            AI Studio<span>.</span>
          </h1>
          <p>
            Less busywork.
            <br />
            More possibility.
          </p>
          <a href="#explore" className={s.primary}>
            Explore AI with us <ArrowDown size={17} />
          </a>
          <span className={s.heroMicro}>Built around your business. Not the other way around.</span>
        </div>

        {/* bottom bar */}
        <div className={s.heroBottom}>
          <span>CRM · MARKETING · AI · AUTOMATION</span>
          <a href="#explore">
            Scroll to explore <ArrowDown size={16} />
          </a>
        </div>

        {/* expanding video layer — sits behind copy, expands to fill hero on scroll */}
        <div className={s.heroVideo} aria-hidden={!started}>
          <video
            ref={video}
            controls={started}
            playsInline
            preload="none"
            poster="/ai-studio/studio-poster.jpg"
            aria-label="Original AI Studio promotional film"
            onError={() => setError(true)}
          >
            <source src="/ai-studio/studio-film.mp4" type="video/mp4" />
          </video>
          {!started && (
            <button type="button" className={s.heroPlay} onClick={play}>
              Watch the film <small>00:20</small>
            </button>
          )}
          {error && (
            <p className={s.heroVideoError}>
              Unable to start playback.{" "}
              <a href="/ai-studio/studio-film.mp4">Open the video directly</a>.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
