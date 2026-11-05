'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, ArrowDown, Play, Pause, RotateCcw, Users, Globe, MessageSquare, CalendarDays, CreditCard, ChartNoAxesCombined, Workflow } from 'lucide-react'
import s from './features.module.css'
import c from './system-showcase.module.css'

const systems = [
 {name:'Lead to appointment',result:'Your next client arrives with context—not another spreadsheet.',steps:[['Website & lead capture','A visitor submits a consultation form. Their inquiry enters your workspace.'],['One contact record','The CRM links the inquiry, owner and follow-up preferences to the same person.'],['Conversation & booking','A configured response offers the next step. Your team takes over when the person replies.'],['Visibility & follow-through','The appointment and next task are visible to the team, with a record of the journey.']]},
 {name:'Proposal to payment',result:'Less chasing. A clearer path from agreement to payment.',steps:[['Proposal & agreement','Prepare a scoped proposal and send it through your approved signing workflow.'],['One contact record','Keep the agreement and opportunity linked to the client relationship.'],['Invoice & payment','Send an invoice through a connected payment service after the agreed approval.'],['Visibility & follow-through','Track supported payment events and create the next onboarding task.']]},
 {name:'Client to advocate',result:'The relationship continues after the work is done.',steps:[['Service milestone','A completed project or appointment triggers a configured check-in.'],['One contact record','Use the relationship history and communication preferences to guide outreach.'],['Feedback & reviews','Invite honest feedback without review gating. Draft a thoughtful reply for approval.'],['Visibility & follow-through','Log the response and assign any service issue to the right person.']]},
 {name:'Your custom system',result:'Build around the way your business actually operates.',steps:[['Your process & data','Map intake, approvals, documents and the data your team needs.'],['One connected workspace','Scope the CRM fields, permissions and supported data connections.'],['Portals & internal tools','Build a client portal, custom app or dashboard for the roles in your workflow.'],['Visibility & follow-through','Validate access and automations, then roll out the system with your team.']]},
]
const modules = [
 {name:'Websites & forms',icon:Globe,body:'Your front door. Capture inquiries and route supported submissions into a contact record.'},
 {name:'Conversations',icon:MessageSquare,body:'Your relationship history. Bring supported email, SMS and social conversations into context.'},
 {name:'Calendar & tasks',icon:CalendarDays,body:'Your next steps. Connect bookings, reminders and assigned follow-up to the contact.'},
 {name:'Payments & documents',icon:CreditCard,body:'Your commercial workflow. Link agreements, invoices and supported payment events.'},
 {name:'Workflows & custom apps',icon:Workflow,body:'Your operating process. Configure rules and scope custom portals and internal tools.'},
 {name:'Dashboards & reporting',icon:ChartNoAxesCombined,body:'Your shared view. Surface connected data and the next decision your team needs to make.'},
]
export function ConnectedSystem(){
 const [scenario,setScenario]=useState(0)
 const [step,setStep]=useState(0)
 const [playing,setPlaying]=useState(false)
 const [module,setModule]=useState(0)
 useEffect(()=>{
  if(!playing)return
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setPlaying(false);return}
  const timer=window.setTimeout(()=>{if(step===3)setPlaying(false);else setStep(step+1)},2200)
  return ()=>window.clearTimeout(timer)
 },[playing,step])
 const flow=systems[scenario]
 return <section id="connected" className={`${s.connected} ${c.section}`}>
  <div className={c.intro}><div><span className={s.eyebrow}>Different jobs. One shared picture.</span><h2>Your whole business.<br/><span>Finally, connected.</span></h2><p>A website brings someone in. A conversation builds trust. A booking, a payment, a follow-up moves the relationship forward. Your CRM is the thread that connects it all.</p><a className={s.primary} href="/crm-automations">Explore CRM &amp; Automations <ArrowRight size={18}/></a></div><Image src="/features/connected-workspace.png" alt="Blue glass contact hub connected to messaging, calendar, website, payment and reporting modules" width={1536} height={1024} sizes="(max-width:760px) 100vw, 45vw"/></div>
  <div className={c.map}>
   <div className={c.mapHeader}><span className={s.eyebrow}>Explore your connected workspace</span><span>Select a part of your business</span></div>
   <div className={c.mapLayout}><div className={c.moduleColumn}>{modules.slice(0,3).map((m,i)=><button key={m.name} aria-pressed={module===i} aria-controls="module-explanation" onClick={()=>setModule(i)}><m.icon size={21}/><span>{m.name}</span><ArrowRight size={16}/></button>)}</div><div className={c.hub}><Users size={28}/><strong>One CRM.</strong><span>One relationship history.</span><small>Contacts · context · next steps</small></div><div className={c.moduleColumn}>{modules.slice(3).map((m,i)=><button key={m.name} aria-pressed={module===i+3} aria-controls="module-explanation" onClick={()=>setModule(i+3)}><m.icon size={21}/><span>{m.name}</span><ArrowRight size={16}/></button>)}</div></div>
   <div id="module-explanation" className={c.moduleExplanation} aria-live="polite"><strong>{modules[module].name}</strong><p>{modules[module].body}</p></div>
  </div>
  <div className={c.walkthrough}><div className={c.flowHeading}><div><span className={s.eyebrow}>See the handoffs, not just the tools</span><h3>Watch one action become the next.</h3></div><button className={c.play} onClick={()=>{if(playing){setPlaying(false);return}if(step===3)setStep(0);if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setStep(value=>(value+1)%4);return}setPlaying(true)}}>{playing?<Pause size={16}/>:<Play size={16}/>}<span>{playing?'Pause walkthrough':'Play walkthrough'}</span></button></div>
   <div className={s.filters} aria-label="Choose a connected workflow">{systems.map((item,i)=><button key={item.name} aria-pressed={scenario===i} onClick={()=>{setScenario(i);setStep(0);setPlaying(false)}}>{item.name}</button>)}</div>
   <ol className={c.flowNodes}>{flow.steps.map(([title],i)=><li key={title}><button aria-current={step===i?'step':undefined} onClick={()=>{setStep(i);setPlaying(false)}} data-complete={i<step}><span>{String(i+1).padStart(2,'0')}</span><strong>{title}</strong></button>{i<3&&<ArrowRight className={c.connector} size={20} aria-hidden="true"/>}</li>)}</ol>
   <div className={c.stepDetail} aria-live="polite"><span className={c.stepCount}>STEP {step+1} OF 4</span><div><h4>{flow.steps[step][0]}</h4><p>{flow.steps[step][1]}</p></div><button aria-label={step===3?'Restart workflow':'Next workflow step'} onClick={()=>{setPlaying(false);setStep((step+1)%4)}}>{step===3?<RotateCcw size={20}/>:<ArrowRight size={20}/>}</button></div>
   <p className={c.outcome}><ArrowDown size={18}/>{flow.result}</p>
  </div><p className={s.note}>Illustrative system map, not a live account. Connections, sync direction and workflow actions depend on supported providers, plans and configuration. Custom systems are scoped separately.</p>
 </section>
}
