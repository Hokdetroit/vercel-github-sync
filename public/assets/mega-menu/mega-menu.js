(() => {
  // Built paths come from lib/routes.ts (injected into <head>); anything else resolves to the live site.
  const SITE = window.__SE_SITE__ || 'https://studioescrow.cloud'
  const u = path => path === '/crm-automations' || (window.__SE_BUILT_PATHS__ || []).includes(path) ? path : `${SITE}${path}`
  const esc = value => String(value).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
  const external = url => /^https?:/.test(url)
  const attrs = url => `href="${esc(url)}"${external(url) ? ' target="_blank" rel="noopener noreferrer"' : ''}`
  const tabHint = url => external(url) ? '<span class="se-sr"> (opens in a new tab)</span>' : ''
  const groups = [
    { id: 'platform', label: 'Platform', headline: 'A little less scattered.', description: 'One connected workspace. A lot more possibility.', image: '/images/social-scheduling.png', feature: 'Your entire toolkit. Together.', featureText: 'Meet the tools behind your next chapter.', featurePath: '/features', links: [
      ['All features', 'Explore the complete platform', '/features'], ['CRM & Automations', 'Keep every relationship moving', '/crm-automations'], ['AI Studio', 'Put your ideas and workflows to work', '/ai-studio'], ['Unified Inbox', 'Every conversation, one place', '/unified-inbox'], ['Websites & Funnels', 'Turn attention into opportunity', '/website-funnel-builder'], ['AI Agents', 'A helping hand for your team', '/ai-agents'], ['Reputation', 'Build trust with every review', '/reputation'], ['Integrations', 'Bring your favorite tools along', '/integrations'],
    ] },
    { id: 'solutions', label: 'Solutions', headline: 'Built around your world.', description: 'Your industry. Your relationships. Your way of working.', image: '/mortgage-suite/intro.png', feature: 'A home for every relationship.', featureText: 'Explore the Mortgage Suite.', featurePath: '/mortgage-suite', links: [
      ['Medical Suite', 'Care-first scheduling and communications', '/medical-suite'], ['Mortgage Suite', 'From first inquiry to lasting relationships', '/mortgage-suite'], ['Real Estate Suite', 'Buyer, seller and past-client relationships', '/real-estate-suite'], ['Agencies & Consultants', 'More client work, less juggling', '/agencies-consultants'], ['Do It For You', 'Let our team build your setup', '/do-it-for-you'],
    ] },
    { id: 'plans', label: 'Plans & value', headline: 'Find your next right move.', description: 'Clear choices for where you are—and where you’re going.', image: '/images/social-scheduling.png', feature: 'See it in your own context.', featureText: 'A personal walkthrough. Built around your team.', featurePath: '/schedule-demo', links: [
      ['Pricing', 'Find the right plan for your team', '/pricing'], ['Enterprise Pricing', 'More flexibility for bigger ambitions', '/enterprise-pricing'], ['Savings Calculator', 'Put your software spend in perspective', '/calculator'], ['Compare platforms', 'Explore your options side by side', '/compare'], ['Book a Demo', 'Let’s find your best fit together', '/schedule-demo'],
    ] },
    { id: 'resources', label: 'Resources', headline: 'A little clarity goes a long way.', description: 'Answers, ideas and real-world inspiration.', image: '/ai-studio/studio-poster.jpg', feature: 'See what’s possible with AI.', featureText: 'Take a closer look at AI Studio.', featurePath: '/ai-studio', links: [
      ['Knowledge Base', 'Find your next how-to', '/knowledge-base'], ['Case Studies', 'Explore workflows in the real world', '/case-studies'], ['FAQ', 'Good questions. Clear answers.', '/faq'], ['Contact', 'Talk to someone on our team', '/contact'],
    ] },
    { id: 'company', label: 'Company', headline: 'Good people. Connected work.', description: 'Get to know the team behind Studio Escrow.', image: '/medical-suite/intro.png', feature: 'Better systems. More human.', featureText: 'Get to know Studio Escrow.', featurePath: '/about', links: [
      ['About', 'Our story and what we believe', '/about'], ['Contact', 'Start a conversation', '/contact'], ['Careers', 'Explore opportunities with our team', '/careers'], ['Compliance & Security', 'Understand how we approach trust', '/compliance-security'], ['Privacy Policy', 'How your information is handled', '/privacy'], ['Terms of Service', 'The details of using our platform', '/terms'],
    ] },
  ]
  const currentPath = location.pathname.replace(/\/mirror\/index\.html$/, '/')
  const renderGroup = (group, index) => `<section class="se-explore-content" id="se-content-${group.id}" role="tabpanel" aria-labelledby="se-tab-${group.id}"${index ? ' hidden' : ''}>
    <div class="se-links-area"><div class="se-content-heading"><h2>${esc(group.headline)}</h2><p>${esc(group.description)}</p></div>
    <ul class="se-link-grid">${group.links.map(([label, description, path], i) => `<li style="--se-order:${i}"><a class="se-destination" ${attrs(u(path))}${currentPath === path ? ' aria-current="page"' : ''}><span><strong>${esc(label)}</strong><span>${esc(description)}</span></span><span class="se-link-arrow" aria-hidden="true">→</span>${tabHint(u(path))}</a></li>`).join('')}</ul></div>
    <a class="se-story" ${attrs(u(group.featurePath))}><span class="se-story-image"><img src="${group.image}" alt="" width="600" height="450" loading="lazy" decoding="async"></span><span class="se-story-copy"><span class="se-kicker">In the spotlight</span><strong>${esc(group.feature)}</strong><span>${esc(group.featureText)}</span><span class="se-story-cta">Take a look <span aria-hidden="true">→</span></span></span>${tabHint(u(group.featurePath))}</a>
  </section>`

  function mount(root) {
    root.classList.add('se-nav')
    const main = document.querySelector('main, #main-content')
    if (main && !main.id) main.id = 'main-content'
    root.innerHTML = `<a class="se-skip" href="#${esc(main?.id || 'main-content')}">Skip to content</a>
      <div class="se-bar"><a class="se-brand" href="/" aria-label="Studio Escrow home"><span class="se-mark" aria-hidden="true"></span>Studio Escrow</a>
      <span class="se-bar-note">Your business. Better connected.</span>
      <button class="se-explore-trigger" type="button" aria-expanded="false" aria-controls="se-explore"><span class="se-trigger-label">Menu</span><span class="se-toggle-mark" aria-hidden="true"><i></i><i></i></span></button></div>
      <div class="se-backdrop" hidden></div>
      <div class="se-explore" id="se-explore" hidden><div class="se-explore-top"><span class="se-kicker">Make yourself at home</span><a ${attrs('https://the.studioescrow.cloud/')} class="se-sign-in">Log in <span aria-hidden="true">→</span>${tabHint('https://the.studioescrow.cloud/')}</a></div>
      <nav class="se-explore-layout" aria-label="Main navigation"><div class="se-categories" role="tablist" aria-label="Explore Studio Escrow" aria-orientation="vertical">${groups.map((g, i) => `<button type="button" role="tab" id="se-tab-${g.id}" aria-controls="se-content-${g.id}" aria-selected="${!i}" tabindex="${i ? '-1' : '0'}"><span>${g.label}</span><span aria-hidden="true">→</span></button>`).join('')}</div><div class="se-panels">${groups.map(renderGroup).join('')}</div></nav>
      <div class="se-explore-bottom"><a href="/" class="se-home-link">Back to home <span aria-hidden="true">→</span></a><span>Not sure where to start?</span><a class="se-demo-link" ${attrs(u('/schedule-demo'))}>Let’s talk about your business <span aria-hidden="true">→</span>${tabHint(u('/schedule-demo'))}</a></div></div>`

    const trigger = root.querySelector('.se-explore-trigger')
    const panel = root.querySelector('.se-explore')
    const backdrop = root.querySelector('.se-backdrop')
    const tabs = [...root.querySelectorAll('[role=tab]')]
    const tablist = root.querySelector('[role=tablist]')
    const narrow = matchMedia('(max-width: 760px)')
    let previousOverflow = ''
    let isOpen = false
    const setOpen = open => {
      if (open === isOpen) return
      isOpen = open
      trigger.setAttribute('aria-expanded', String(open))
      trigger.querySelector('.se-trigger-label').textContent = open ? 'Close menu' : 'Menu'
      panel.hidden = !open
      backdrop.hidden = !open
      root.classList.toggle('has-open', open)
      if (open) {
        previousOverflow = document.documentElement.style.overflow
        document.documentElement.style.overflow = 'hidden'
      } else document.documentElement.style.overflow = previousOverflow
    }
    const selectTab = index => {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index))
        tab.tabIndex = i === index ? 0 : -1
        root.querySelector(`#${tab.getAttribute('aria-controls')}`).hidden = i !== index
      })
    }
    trigger.addEventListener('click', () => setOpen(!isOpen))
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); tabs.find(tab => tab.tabIndex === 0)?.focus() }
    })
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => selectTab(i))
      tab.addEventListener('keydown', event => {
        const nextKey = narrow.matches ? 'ArrowRight' : 'ArrowDown'
        const previousKey = narrow.matches ? 'ArrowLeft' : 'ArrowUp'
        let next = i
        if (event.key === nextKey) next = (i + 1) % tabs.length
        else if (event.key === previousKey) next = (i - 1 + tabs.length) % tabs.length
        else if (event.key === 'Home') next = 0
        else if (event.key === 'End') next = tabs.length - 1
        else return
        event.preventDefault(); selectTab(next); tabs[next].focus()
      })
    })
    const orientation = () => tablist.setAttribute('aria-orientation', narrow.matches ? 'horizontal' : 'vertical')
    orientation()
    narrow.addEventListener('change', orientation)
    backdrop.addEventListener('click', () => { setOpen(false); trigger.focus() })
    root.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false) })
    root.addEventListener('focusout', event => { if (isOpen && event.relatedTarget && !root.contains(event.relatedTarget)) setOpen(false) })
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && isOpen) { setOpen(false); trigger.focus() }
    })
    window.addEventListener('pagehide', () => setOpen(false))
  }

  const init = () => document.querySelectorAll('[data-se-megamenu]:not(.se-nav)').forEach(mount)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init)
  else init()
  window.__seMegaMenuInit = init
})()
