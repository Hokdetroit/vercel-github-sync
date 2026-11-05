import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { routes } from "@/lib/routes";
import { Check, Minus, ArrowRight, ChevronDown, Plus } from "lucide-react";
import s from "@/components/pricing/pricing.module.css";

export const Route = createFileRoute("/pricing")({
  head: () => {
    const meta = routes.pricing;
    return {
      meta: [
        { title: meta ? meta.title : "Pricing | Studio Escrow" },
        { name: "description", content: meta ? meta.description : "" },
        { property: "og:title", content: meta ? meta.title : "Pricing | Studio Escrow" },
        { property: "og:description", content: meta ? meta.description : "" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PricingPage,
});

interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  unit: string;
  setup?: string;
  audience: string;
  featured?: boolean;
  perLocation?: boolean;
  features: string[];
  cta: { label: string; href: string };
}

const PLANS: Plan[] = [
  {
    id: "growth",
    name: "Growth",
    tagline: "The connected foundation",
    price: 97,
    unit: "/ month",
    audience: "For solo operators and small teams replacing a stack of disconnected tools.",
    features: [
      "Core CRM and contact management",
      "Unified inbox for SMS, email and social",
      "Websites, funnels and forms",
      "Calendars and online booking",
      "Workflow automation",
    ],
    cta: {
      label: "Start with Growth",
      href: "https://studioescrow.cloud/schedule-demo",
    },
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Automation and AI at full speed",
    price: 197,
    unit: "/ month",
    featured: true,
    audience: "For growing teams that want AI working alongside them every day.",
    features: [
      "Everything in Growth",
      "Advanced multi-step workflows",
      "AI Studio for agents and content",
      "Claude integration",
      "Priority onboarding guidance",
    ],
    cta: {
      label: "Choose Scale",
      href: "https://studioescrow.cloud/schedule-demo",
    },
  },
  {
    id: "medical",
    name: "Medical Suite",
    tagline: "HIPAA-ready practice growth",
    price: 597,
    unit: "/ location / month",
    perLocation: true,
    audience: "For clinics, med spas and multi-location practices.",
    features: [
      "HIPAA-ready CRM and patient pipeline",
      "Secure patient communications",
      "Business Associate Agreement (BAA)",
      "Works alongside your existing EHR",
      "Reminders, reviews and reactivation",
    ],
    cta: {
      label: "Explore Medical Suite",
      href: "/medical-suite",
    },
  },
  {
    id: "mortgage",
    name: "Mortgage Suite",
    tagline: "Done-for-you for loan officers",
    price: 197,
    unit: "/ month",
    setup: "+ one-time buildout from $3,000",
    audience: "For loan officers, brokerages and realtor partnerships.",
    features: [
      "Everything in Scale",
      "Branding, website and CRM built for you",
      "Lead-source connections",
      "Trained AI agents for borrowers",
      "Mortgage nurture and milestone workflows",
    ],
    cta: {
      label: "Explore Mortgage Suite",
      href: "/mortgage-suite",
    },
  },
];

type TableValue = boolean | string;

interface ComparisonRow {
  name: string;
  growth: TableValue;
  scale: TableValue;
  medical: TableValue;
  mortgage: TableValue;
}

interface ComparisonGroup {
  group: string;
  rows: ComparisonRow[];
}

const COMPARISON: ComparisonGroup[] = [
  {
    group: "Platform",
    rows: [
      { name: "CRM and pipelines", growth: true, scale: true, medical: true, mortgage: true },
      {
        name: "Unified conversations inbox",
        growth: true,
        scale: true,
        medical: true,
        mortgage: true,
      },
      {
        name: "Websites, funnels and forms",
        growth: true,
        scale: true,
        medical: true,
        mortgage: true,
      },
      { name: "Calendars and booking", growth: true, scale: true, medical: true, mortgage: true },
      {
        name: "Workflow automation",
        growth: "Core",
        scale: "Advanced",
        medical: "Advanced",
        mortgage: "Advanced",
      },
    ],
  },
  {
    group: "AI",
    rows: [
      { name: "AI Studio", growth: false, scale: true, medical: true, mortgage: true },
      { name: "Claude integration", growth: false, scale: true, medical: true, mortgage: true },
      {
        name: "Industry-trained AI agents",
        growth: false,
        scale: false,
        medical: "Patient",
        mortgage: "Borrower",
      },
    ],
  },
  {
    group: "Industry & Compliance",
    rows: [
      {
        name: "HIPAA-ready configuration",
        growth: false,
        scale: false,
        medical: true,
        mortgage: false,
      },
      {
        name: "Business Associate Agreement",
        growth: false,
        scale: false,
        medical: true,
        mortgage: false,
      },
      {
        name: "EHR-compatible workflows",
        growth: false,
        scale: false,
        medical: true,
        mortgage: false,
      },
      {
        name: "Mortgage nurture workflows",
        growth: false,
        scale: false,
        medical: false,
        mortgage: true,
      },
    ],
  },
  {
    group: "Setup",
    rows: [
      { name: "Self-serve setup", growth: true, scale: true, medical: true, mortgage: false },
      {
        name: "Done-for-you buildout by House of Karma",
        growth: "Add-on",
        scale: "Add-on",
        medical: "Add-on",
        mortgage: "From $3,000",
      },
    ],
  },
];

const PLAN_COLUMNS = [
  { id: "growth", name: "Growth", price: "$97 / mo" },
  { id: "scale", name: "Scale", price: "$197 / mo" },
  { id: "medical", name: "Medical Suite", price: "$597 / loc" },
  { id: "mortgage", name: "Mortgage Suite", price: "$197 / mo" },
] as const;

const USAGE_ITEMS = [
  {
    title: "Messaging",
    body: "SMS and email sending is billed by usage on top of your plan.",
  },
  {
    title: "Calling",
    body: "Voice minutes and phone numbers are charged as you use them.",
  },
  {
    title: "AI usage",
    body: "AI agent conversations and generation draw from usage allowances.",
  },
  {
    title: "Implementation",
    body: "Optional done-for-you setup is quoted to the scope you need.",
  },
];

const FAQS = [
  {
    q: "Which plan should I start with?",
    a: "Most businesses start on Growth for the core CRM, inbox, websites and automation. Move to Scale when you want advanced workflows and AI Studio. Healthcare practices and loan officers should look at the dedicated suites.",
  },
  {
    q: "Are there usage charges beyond the monthly price?",
    a: "Yes. Messaging, calling, AI usage and implementation may carry additional charges. Confirm your total cost, limits and allowances with Studio Escrow before subscribing.",
  },
  {
    q: "How is the Medical Suite priced for multiple locations?",
    a: "The Medical Suite is $597 per month for each practice location, and every location is covered by a BAA. It works alongside your existing EHR, and your practice remains responsible for its HIPAA compliance program.",
  },
  {
    q: "What does the Mortgage Suite buildout include?",
    a: "House of Karma builds your branding, website, CRM setup and lead-source connections on the Scale plan. Buildouts start at $3,000 as a one-time cost, alongside Scale at $197 per month.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. You can move between plans as your business grows. Talk to the Studio Escrow team to plan the switch so your workflows carry over cleanly.",
  },
];

function PricingPage() {
  const [locations, setLocations] = useState(1);

  return (
    <div className={s.page}>
      {/* Blue Hero */}
      <section className={s.hero} aria-labelledby="pricing-title">
        <div className={s.heroInner}>
          <span className={s.eyebrow}>Pricing</span>
          <h1 id="pricing-title" className={s.heroTitle}>
            One platform.
            <br />A plan for every stage.
          </h1>
          <p className={s.heroSub}>
            Start with the connected foundation, scale into AI, or choose a suite built for your
            industry. Simple monthly pricing, no long-term contracts.
          </p>
        </div>
      </section>

      {/* Main Sheet */}
      <div className={s.sheet}>
        <div className={s.container}>
          {/* Plan Cards */}
          <ul className={s.cards}>
            {PLANS.map((plan) => {
              const isMedical = plan.id === "medical";
              const displayedPrice = isMedical ? plan.price * locations : plan.price;

              return (
                <li key={plan.id} className={`${s.card} ${plan.featured ? s.cardFeatured : ""}`}>
                  <div className={s.cardHead}>
                    <div className={s.cardTitleRow}>
                      <h3 className={s.cardName}>{plan.name}</h3>
                      {plan.featured ? <span className={s.popularBadge}>Most popular</span> : null}
                    </div>
                    <p className={s.cardTagline}>{plan.tagline}</p>
                  </div>

                  <div className={s.priceRow}>
                    <span className={s.amount}>${displayedPrice}</span>
                    <span className={s.unit}>{isMedical ? "/ month" : plan.unit}</span>
                  </div>

                  <p className={s.setupText}>{plan.setup || "\u00A0"}</p>

                  {isMedical ? (
                    <div className={s.stepper}>
                      <span className={s.stepperLabel}>Locations</span>
                      <div className={s.stepperControls}>
                        <button
                          type="button"
                          className={s.stepperBtn}
                          disabled={locations <= 1}
                          onClick={() => setLocations((n) => Math.max(1, n - 1))}
                          aria-label="Remove a location"
                        >
                          <Minus size={14} />
                        </button>
                        <span className={s.stepperCount}>{locations}</span>
                        <button
                          type="button"
                          className={s.stepperBtn}
                          onClick={() => setLocations((n) => n + 1)}
                          aria-label="Add a location"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className={s.stepperTotal}>
                        ${displayedPrice}
                        <small style={{ fontSize: "11px", fontWeight: 500, color: "var(--grey)" }}>
                          {" "}
                          / mo
                        </small>
                      </span>
                    </div>
                  ) : null}

                  <p className={s.audience}>{plan.audience}</p>

                  <ul className={s.featureList}>
                    {plan.features.map((feature) => (
                      <li key={feature} className={s.featureItem}>
                        <Check size={16} strokeWidth={2} className={s.checkIcon} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.cta.href}
                    className={`${s.cardCta} ${plan.featured ? s.cardCtaPrimary : ""}`}
                  >
                    <span>{plan.cta.label}</span>
                    <ArrowRight size={15} />
                  </a>
                </li>
              );
            })}
          </ul>

          <p className={s.pricingNote}>
            Prices in USD. Messaging, calling, AI usage and implementation may carry additional
            charges.
          </p>

          {/* Comparison Table */}
          <section className={s.compareSection} aria-labelledby="compare-title">
            <div className={s.sectionHead}>
              <h2 id="compare-title" className={s.sectionTitle}>
                Compare <strong>every plan</strong>
              </h2>
              <p className={s.sectionSub}>
                See what each plan includes, side by side. Confirm current inclusions and limits
                before subscribing.
              </p>
            </div>

            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "32%" }}>
                      Feature
                    </th>
                    <th scope="col">
                      <span className={s.thName}>Growth</span>
                      <span className={s.thPrice}>$97 / mo</span>
                    </th>
                    <th scope="col" className={s.colFeatured}>
                      <span className={s.thName}>Scale</span>
                      <span className={s.thPrice}>$197 / mo</span>
                    </th>
                    <th scope="col">
                      <span className={s.thName}>Medical Suite</span>
                      <span className={s.thPrice}>$597 / loc</span>
                    </th>
                    <th scope="col">
                      <span className={s.thName}>Mortgage Suite</span>
                      <span className={s.thPrice}>$197 / mo</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((group) => (
                    <Fragment key={group.group}>
                      <tr className={s.groupRow}>
                        <th scope="colgroup" colSpan={5}>
                          {group.group}
                        </th>
                      </tr>
                      {group.rows.map((row) => (
                        <tr key={row.name}>
                          <th scope="row" style={{ fontWeight: 500, color: "var(--ink)" }}>
                            {row.name}
                          </th>
                          <td>
                            <RenderCellValue val={row.growth} />
                          </td>
                          <td className={s.colFeatured}>
                            <RenderCellValue val={row.scale} />
                          </td>
                          <td>
                            <RenderCellValue val={row.medical} />
                          </td>
                          <td>
                            <RenderCellValue val={row.mortgage} />
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile plan-by-plan comparison */}
            <MobileCompare />
          </section>

          {/* Pay for What You Actually Use */}
          <section className={s.usageSection} aria-labelledby="usage-title">
            <div className={s.sectionHead}>
              <h2 id="usage-title" className={s.sectionTitle}>
                Pay for what you <strong>actually use</strong>
              </h2>
              <p className={s.sectionSub}>
                Your plan covers the platform. Usage-based services are billed separately so you
                never pay for capacity you do not need.
              </p>
            </div>

            <ul className={s.usageGrid}>
              {USAGE_ITEMS.map((item) => (
                <li key={item.title} className={s.usageCard}>
                  <h3 className={s.usageCardTitle}>{item.title}</h3>
                  <p className={s.usageCardBody}>{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className={s.faqSection} aria-labelledby="faq-title">
            <div className={s.faqGrid}>
              <h2 id="faq-title" className={s.faqTitle}>
                Questions, <strong>answered</strong>
              </h2>
              <div className={s.faqList}>
                {FAQS.map((faq) => (
                  <details key={faq.q} className={s.faqItem}>
                    <summary className={s.faqSummary}>
                      <span>{faq.q}</span>
                      <ChevronDown className={s.faqIcon} />
                    </summary>
                    <p className={s.faqAnswer}>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Closing Call to Action */}
      <section className={s.closing} aria-labelledby="closing-title">
        <div className={s.closingInner}>
          <h2 id="closing-title" className={s.closingTitle}>
            Not sure which plan fits?
            <strong>We will map it with you.</strong>
          </h2>
          <div className={s.closingActions}>
            <a href="https://studioescrow.cloud/schedule-demo" className={s.btnPrimary}>
              <span>Book a demo</span>
              <ArrowRight size={15} />
            </a>
            <a href="/features" className={s.btnGhost}>
              <span>Explore features</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function RenderCellValue({ val }: { val: TableValue }) {
  if (val === true) {
    return <Check size={18} strokeWidth={2} className={s.iconIncluded} />;
  }
  if (val === false) {
    return <Minus size={16} strokeWidth={1.5} className={s.iconNotIncluded} />;
  }
  return <span className={s.valueText}>{val}</span>;
}

function MobileCompare() {
  const [active, setActive] = useState(0);
  const col = PLAN_COLUMNS[active];

  return (
    <div className={s.mobileCompare} aria-label="Plan comparison">
      <div className={s.mobileTabs} role="tablist" aria-label="Choose a plan to compare">
        {PLAN_COLUMNS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={s.mobileTab}
            onClick={() => setActive(i)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className={s.mobilePlanCard} role="tabpanel">
        <div className={s.mobilePlanHead}>
          <span className={s.mobilePlanName}>{col.name}</span>
          <span className={s.mobilePlanPrice}>{col.price}</span>
        </div>
        <div className={s.mobilePlanBody}>
          {COMPARISON.map((group) => (
            <div key={group.group} className={s.mobileGroup}>
              <span className={s.mobileGroupLabel}>{group.group}</span>
              <dl className={s.mobileRows}>
                {group.rows.map((row) => (
                  <div key={row.name} className={s.mobileRow}>
                    <dt>{row.name}</dt>
                    <dd>
                      <RenderCellValue val={row[col.id]} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
