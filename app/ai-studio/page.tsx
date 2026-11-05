import { routeMetadata, href } from '@/lib/routes'
import { StudioExplorer } from '@/components/ai-studio/studio-explorer'
import { StudioFilm } from '@/components/ai-studio/studio-film'
import s from '@/components/ai-studio/studio.module.css'

export const metadata = routeMetadata('aiStudio')

const capabilities = [
  ['No-code designer', 'Bring an idea to life.', 'Build websites and experiences with visual tools and natural-language direction, without starting from a blank codebase.'],
  ['Workflow automation', 'Make the next step happen.', 'Connect triggers, follow-ups and handoffs to the CRM records your team already works with.'],
  ['Connected tools', 'Keep your context.', 'Bring business knowledge, contact history and connected services into the same workflow. Scope API access around the task.'],
  ['Analytics & reporting', 'See what is working.', 'Turn business data into reports your team can use to understand activity and decide what to improve.'],
]

export default function AIStudioPage() {
  return <main id="main" className={`${s.page} font-sans`}>
    <section className={s.hero}>
      <div className={s.heroTop}><span>Studio Escrow / AI Studio</span><a href="#explore">Explore the possibilities ↓</a></div>
      <div className={s.heroTitle}><h1>AI Studio<span>.</span></h1><p>Less busywork.<br />More possibility.</p></div>
      <div className={s.heroBottom}><span className={s.eyebrow}>Intelligence, built into your business</span><div><p>Ask in plain English. Put your CRM, knowledge and workflows to work. From the first lead to the next big idea, meet an AI workspace that connects the dots.</p><div className={s.actions}><a className={s.primary} href={href('scheduleDemo')}>Explore AI with us <span aria-hidden="true">→</span></a><a className={s.textLink} href="#studio-film">Watch the studio film</a></div></div></div>
    </section>
    <section id="studio-film" className={s.filmSection} aria-label="AI Studio video"><StudioFilm /><div className={s.filmCaption}><span>Meet your next way of working.</span><span>The original AI Studio film · 20 seconds</span></div></section>
    <nav className={s.sectionNav} aria-label="AI Studio sections"><a href="#explore">Ask AI</a><a href="#capabilities">Build without code</a><a href="#knowledge">Your knowledge</a><a href="#workforce">Your workforce</a></nav>
    <StudioExplorer />
    <section id="capabilities" className={s.section}><div className={s.sectionIntro}><span className={s.eyebrow}>An idea is a great starting point</span><h2>From “what if”<br />to what&apos;s next.</h2><p>Design, automate, connect and understand. Four building blocks in one workspace, so your best ideas do not get lost between tools.</p></div><div className={s.capabilities}>{capabilities.map(([label,title,body]) => <article key={label}><span className={s.eyebrow}>{label}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section id="knowledge" className={s.knowledge}><div><span className={s.eyebrow}>Your business is the context</span><h2>Not just answers.<br />Your answers.</h2><p>Give your assistant the knowledge that makes your business yours. Connect approved FAQs, documents and website content, then test the experience before putting it to work.</p><a className={s.textLink} href={href('scheduleDemo')}>See how training works →</a></div><ol className={s.steps}><li><span>01</span><div><h3>Connect your knowledge</h3><p>Choose the sources your assistant should use: business FAQs, service details and relevant documents.</p></div></li><li><span>02</span><div><h3>Test real questions</h3><p>Review answers against your source material. Refine instructions and decide what the assistant should not handle.</p></div></li><li><span>03</span><div><h3>Keep a human in the loop</h3><p>Define escalation rules, notify your team and route conversations to the right person when judgment is needed.</p></div></li></ol></section>
    <section id="workforce" className={s.workforce}><span className={s.eyebrow}>Built-in, not bolted on</span><h2>A connected team.<br />With a little more capacity.</h2><p>Define the outcome. Give each agent a role. Connect the tools and business context it needs, with clear boundaries and a place for your team to oversee the work.</p><div className={s.workforceGrid}>{[['Define the role','Set purpose, instructions and responsibilities in natural language.'],['Coordinate the work','Bring specialist agents and multi-step workflows together around an objective.'],['Stay in control','Manage tools, permissions and handoffs from a connected control layer.']].map(([title,body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div><a className={s.lightButton} href={href('scheduleDemo')}>Plan your AI workspace <span aria-hidden="true">→</span></a></section>
    <section className={s.faq}><div><span className={s.eyebrow}>A few helpful answers</span><h2>Start with clarity.</h2></div><div>{[
      ['Is the interactive preview a live AI assistant?', 'No. The walkthroughs on this page are illustrative examples of how a configured workflow can operate. They do not access your contacts, send messages or execute tasks. Book a demo to see AI Studio in the platform.'],
      ['What can Ask AI help with?', 'The original AI Studio page describes retrieving client information, scheduling tasks, lead follow-up, workflow building and website generation. Available actions depend on your setup, connected tools and permissions.'],
      ['Do I need to know how to code?', 'The core experience uses natural-language instructions and visual, no-code tools. More advanced integrations may require API configuration or technical implementation support.'],
      ['Can a person take over?', 'Yes. Human handoffs and inquiry-based routing are part of the experience described on the original page. Define escalation rules during setup and test them before launching.'],
    ].map(([q,a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
  </main>
}
