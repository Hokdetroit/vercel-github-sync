/** Four-point marker used where lines meet a milestone. */
export function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" className={className} aria-hidden="true" focusable="false">
      <path d="M5 0Q5.6 4.4 10 5Q5.6 5.6 5 10Q4.4 5.6 0 5Q4.4 4.4 5 0Z" fill="currentColor" />
    </svg>
  )
}
