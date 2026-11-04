import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      {
        title: "Features | Studio Escrow — All-in-One CRM, AI & Automation",
      },
      {
        name: "description",
        content:
          "Explore Studio Escrow CRM, communications, workflow automation, AI Studio, websites, scheduling, and business tools in one connected platform.",
      },
      {
        property: "og:title",
        content: "Features | Studio Escrow — All-in-One CRM, AI & Automation",
      },
      {
        property: "og:description",
        content:
          "Explore Studio Escrow CRM, communications, workflow automation, AI Studio, websites, scheduling, and business tools in one connected platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeaturesPage,
});

const features = [
  {
    title: "CRM & Pipeline",
    description:
      "Organize contacts, track opportunities, and move deals through visual pipelines. Keep calls, emails, notes, and tasks together in a complete contact timeline.",
  },
  {
    title: "Unified Inbox",
    description:
      "Manage SMS, email, and supported social conversations in one inbox. See the context behind each message without switching between disconnected tools.",
  },
  {
    title: "Workflow Automation",
    description:
      "Build multi-step workflows triggered by forms, bookings, tags, dates, or payment events. Coordinate follow-up with conditions and wait steps.",
  },
  {
    title: "Websites & Funnels",
    description:
      "Build landing pages, websites, and sales funnels with a drag-and-drop editor. Connect forms directly to your CRM and test customer journeys.",
  },
  {
    title: "AI Studio",
    description:
      "Use AI Studio and the Claude integration to support content, conversations, and workflow creation. Available capabilities depend on your plan.",
  },
  {
    title: "AI Receptionist",
    description:
      "Support inquiries, lead qualification, and appointment booking around the clock. Configure the experience around your business and connect it to your CRM.",
  },
  {
    title: "Booking & Calendars",
    description:
      "Let clients book directly into your calendar. Connect scheduling with reminders and follow-up workflows so appointments stay on track.",
  },
  {
    title: "Medical Suite",
    description:
      "Connect a HIPAA-ready CRM, secure communications, scheduling, and referral tracking with a BAA. Works alongside your EHR.",
  },
  {
    title: "Email Marketing",
    description:
      "Build email campaigns and automated nurture sequences. Segment contacts, personalize outreach, and keep campaign activity connected to your CRM.",
  },
  {
    title: "Reputation Management",
    description:
      "Request reviews after service, monitor Google and Facebook feedback, and manage responses alongside your customer records.",
  },
  {
    title: "Document Signing",
    description:
      "Send documents and contracts for electronic signature and track engagement. Keep the administrative steps of your sales process connected.",
  },
  {
    title: "Courses & Memberships",
    description:
      "Create courses, membership experiences, and gated content. Connect your audience, communication, and customer journey in one platform.",
  },
  {
    title: "Social Scheduling",
    description:
      "Plan and schedule social content alongside your other marketing activity. Keep customer acquisition and follow-up connected to your business workspace.",
  },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#f8f9f7] text-[#151719] font-sans antialiased">
      {/* Navigation Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#dedfdb] px-6 sm:px-12 md:px-20 py-6">
        <a href="/" className="text-2xl font-bold tracking-tight text-foreground hover:opacity-90">
          Studio Escrow
          <span className="block text-xs font-normal tracking-wider text-[#595e61] mt-0.5">
            One connected platform.
          </span>
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </a>
          <a
            href="/features"
            aria-current="page"
            className="text-foreground underline underline-offset-8 font-semibold"
          >
            Features
          </a>
          <a
            href="/#plans"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <a
            href="https://studioescrow.cloud/schedule-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#151719] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#343a3d]"
          >
            Book a Demo
          </a>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 sm:px-12 md:px-20 py-20 md:py-28">
          <p className="text-xs font-bold tracking-[0.18em] text-[#60796c] uppercase">
            THE STUDIO ESCROW PLATFORM
          </p>
          <h1 className="mt-6 mb-6 text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.05]">
            Your business tools. <br />
            <span className="text-[#717a73]">Better together.</span>
          </h1>
          <p className="max-w-xl text-lg sm:text-xl text-[#595e61] leading-relaxed mb-8">
            Connect your CRM, marketing, conversations, and AI. Less switching between tools. More
            time for the work that matters.
          </p>
          <a
            href="#capabilities"
            className="inline-flex items-center gap-3 rounded-full bg-[#151719] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#343a3d]"
          >
            Explore the features <span aria-hidden="true">↓</span>
          </a>
        </section>

        {/* Feature Capabilities Grid */}
        <section
          id="capabilities"
          className="border-t border-[#dedfdb] px-6 sm:px-12 md:px-20 py-16 scroll-mt-6"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
                One connected workspace.
              </h2>
              <p className="max-w-md text-sm text-[#595e61] leading-relaxed">
                Capabilities vary by plan and configuration. Confirm inclusions, limits, and usage
                charges before subscribing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((item, index) => (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-[#dedfdb] bg-white p-8 transition-shadow hover:shadow-md"
                >
                  <span className="text-xs font-mono tracking-widest text-[#626c65]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 mb-3 text-xl font-medium tracking-tight text-[#151719]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#595e61]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#e8ece7] px-6 sm:px-12 py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-bold tracking-[0.16em] text-[#60796c] uppercase">
              BUILT AROUND YOUR BUSINESS
            </p>
            <h2 className="mt-4 mb-4 text-3xl sm:text-5xl font-medium tracking-tight text-[#151719]">
              Find your connected setup.
            </h2>
            <p className="text-base sm:text-lg text-[#595e61] mb-8">
              Explore Growth, Scale, and industry-specific suites.
            </p>
            <a
              href="/#plans"
              className="inline-flex items-center gap-3 rounded-full bg-[#151719] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#343a3d]"
            >
              Compare plans <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#dedfdb] px-6 sm:px-12 md:px-20 py-8 text-xs text-[#595e61]">
        <a href="/" className="font-bold text-[#151719] text-sm">
          Studio Escrow
        </a>
        <p>© 2026 Studio Escrow. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
