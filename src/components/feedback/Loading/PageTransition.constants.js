export const PAGE_TRANSITION_TIMINGS = Object.freeze({
  enter: 300,
  coverUntil: 1020,
  exit: 320,
  exitFallback: 420,
  markRotation: 900,
})

export const PAGE_TRANSITION_CSS_VARIABLES = Object.freeze({
  "--page-transition-enter-duration": `${PAGE_TRANSITION_TIMINGS.enter}ms`,
  "--page-transition-exit-duration": `${PAGE_TRANSITION_TIMINGS.exit}ms`,
  "--page-transition-mark-duration": `${PAGE_TRANSITION_TIMINGS.markRotation}ms`,
})
