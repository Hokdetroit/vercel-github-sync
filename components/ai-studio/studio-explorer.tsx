'use client'

import { useState } from 'react'
import s from './studio.module.css'

const examples = [
  { name: 'Follow up with leads', prompt: 'Help me reconnect with leads who asked about a demo.', title: 'Keep the conversation moving.', description: 'Bring contact context and your follow-up process together, without starting every conversation from scratch.', steps: [['Find the right contacts', 'Review the relevant CRM stage and recent conversation history.'], ['Prepare a thoughtful follow-up', 'Draft a message with the context your team needs to review it.'], ['Choose the next action', 'Approve the message and define the follow-up or human handoff.']] },
  { name: 'Find client context', prompt: 'Bring me up to speed before my next client conversation.', title: 'Arrive with the full picture.', description: 'Spend less time piecing together notes and more time having a useful conversation.', steps: [['Locate the contact', 'Identify the correct CRM record and check the available context.'], ['Connect the history', 'Bring together relevant notes, conversations and open tasks.'], ['Review the briefing', 'Check the summary against the source records before the meeting.']] },
  { name: 'Build a workflow', prompt: 'Create a follow-up process for new website inquiries.', title: 'Turn a repeatable task into a process.', description: 'Describe the goal, map the steps and review the logic before you launch.', steps: [['Define the trigger', 'Start when a new inquiry arrives through a connected form.'], ['Map the next steps', 'Create a contact, assign an owner and prepare a response.'], ['Review before launch', 'Test the branches, timing and handoff rules with your team.']] },
  { name: 'Create a website', prompt: 'Help me build a website for my business.', title: 'Give your idea a first home.', description: 'Start with your audience and offer, then shape a website around them.', steps: [['Describe the brief', 'Define your business, audience and the action visitors should take.'], ['Shape the experience', 'Build a first direction for page structure and content.'], ['Make it yours', 'Review the copy, refine the design and check the experience before publishing.']] },
]

export function StudioExplorer() {
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(0)
  const example = examples[active]
  return <section id="explore" className={s.explorer}>
    <div className={s.explorerIntro}><span className={s.eyebrow}>Meet Ask AI</span><h2>Say the word.<br />See the next step.</h2><p>Explore a few ways AI can work alongside your team. Choose a task, then walk through the process.</p><div className={s.choices} aria-label="Choose a workflow">{examples.map((item,i) => <button key={item.name} type="button" aria-pressed={active === i} aria-controls="workflow-preview" onClick={() => {setActive(i);setStep(0)}}>{item.name}<span aria-hidden="true">→</span></button>)}</div></div>
    <div id="workflow-preview" className={s.preview}><div className={s.previewHeader}><strong>Ask AI</strong><span>Interactive walkthrough</span></div><div className={s.prompt}>{example.prompt}</div><div className={s.response} aria-live="polite" aria-atomic="true"><span className={s.eyebrow}>An example of the process</span><h3>{example.title}</h3><p>{example.description}</p><ol className={s.previewSteps}>{example.steps.map(([title,body],i) => <li key={title} data-active={step === i} data-complete={i < step}><span aria-hidden="true">{i < step ? '✓' : `0${i+1}`}</span><div><strong>{title}</strong>{step === i && <p>{body}</p>}</div></li>)}</ol></div><div className={s.previewBottom}><span>Step {step+1} of 3</span><button type="button" onClick={() => setStep((step+1)%3)}>{step === 2 ? 'Start again' : 'Next step'} <span aria-hidden="true">→</span></button></div><p className={s.disclaimer}>Illustrative preview. No live AI calls or changes to your CRM.</p></div>
  </section>
}
