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
/* deterministic pseudo-random so SSR + client match */
function rand(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
/* scattered — varied angle + radius so logos are spread, not a ring */
const positions = Array.from({ length: logosPerWave }, (_, i) => {
  const angle = rand(i * 3 + 1) * Math.PI * 2;
  const radius = 150 + rand(i * 3 + 2) * 380;
  const rot = (rand(i * 3 + 3) - 0.5) * 24;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.82, rot];
});

/* Prefer local SVGs (already in /public/assets/integrations) to avoid
   dozens of remote requests that jank the scroll-driven animation. */
const LOCAL_SLUGS = new Set([
  "salesforce",
  "hubspot",
  "shopify",
  "slack",
  "stripe",
  "zapier",
  "mailchimp",
  "quickbooks",
  "google-ads",
  "google-analytics",
  "instagram",
  "facebook",
  "tiktok",
  "youtube",
  "wordpress",
  "google",
  "notion",
  "figma",
  "discord",
  "cloudflare",
  "semrush",
  "zillow",
  "linktree",
  "meta",
  "google-calendar",
  "google-forms",
  "google-sheets",
  "google-tag-manager",
]);
function localLogo(slug: string) {
  return LOCAL_SLUGS.has(slug) ? `/assets/integrations/${slug}.svg` : logoUrl(slug);
}

export function StudioHero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(false);

  /* scroll-driven dispersal of the orbit cards — gated on pause like the
     working Features hero so the rAF loop stops when the user pauses. */
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!root.current || (paused && !media.matches)) return;
      const rect = root.current.getBoundingClientRect();
      const progress = media.matches
        ? 0
        : Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      root.current.style.setProperty("--flight", String(progress));
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
  }, [paused]);

  /* autoplay the hero background video muted on mount */
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.play().catch(() => setError(true));
  }, []);

  function togglePause() {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  }

  return (
    <section ref={root} className={s.heroFlight} aria-label="AI Studio hero">
      <div className={s.heroStage}>
        {/* autoplaying background video */}
        <div className={s.heroVideo} aria-hidden="true">
          <video
            ref={video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/ai-studio/studio-poster.jpg"
            aria-label="AI Studio background film"
            onError={() => setError(true)}
          >
            <source src="/ai-studio/studio-film.mp4" type="video/mp4" />
          </video>
        </div>

        {/* top bar */}
        <div className={s.heroTop}>
          <span>STUDIO ESCROW / AI STUDIO</span>
          <button onClick={togglePause} aria-pressed={paused} className={s.heroPause}>
            {paused ? <Play size={14} /> : <Pause size={14} />} {paused ? "Resume" : "Pause"}
          </button>
        </div>

        {/* orbit cards */}
        <div className={s.heroOrbit} aria-hidden="true">
          {orbit.map(([name, slug], i) => (
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
                  src={localLogo(slug)}
                  alt=""
                  width={36}
                  height={36}
                  decoding="async"
                  loading="lazy"
                  style={
                    slug === "openai"
                      ? { background: "var(--paper)", borderRadius: 8, padding: 5 }
                      : undefined
                  }
                />
              ) : null}
              <ArrowUpRight size={11} />
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

        {error && (
          <p className={s.heroVideoError}>
            Unable to start playback.{" "}
            <a href="/ai-studio/studio-film.mp4">Open the video directly</a>.
          </p>
        )}
      </div>
    </section>
  );
}
