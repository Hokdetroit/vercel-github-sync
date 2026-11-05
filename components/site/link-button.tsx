import type { ReactNode } from 'react'

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

const isExternal = (href: string) => /^https?:/.test(href)

export function LinkButton({
  href,
  children,
  variant = 'pill',
}: {
  href: string
  children: ReactNode
  variant?: 'pill' | 'ghost' | 'text'
}) {
  return (
    <a
      href={href}
      className={`ma3IoW_link ma3IoW_link_${variant}`}
      {...(isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      <span className="ma3IoW_linkIcon">
        <ArrowIcon />
      </span>
    </a>
  )
}
