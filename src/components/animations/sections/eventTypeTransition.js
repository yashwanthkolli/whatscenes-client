import gsap from "gsap"

export function eventTypeTransition(element, onComplete) {
  if (!element) {
    onComplete?.()
    return
  }

  gsap.killTweensOf(element)

  gsap.to(element, {
    opacity: 0,
    y: 8,
    duration: 0.18,
    ease: "power2.out",
    onComplete: () => {
      onComplete?.()

      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.28,
        ease: "power2.out",
      })
    },
  })
}

export function moveTabHighlight(highlight, tab) {
  if (!highlight || !tab) return

  const parent = highlight.parentElement

  const parentRect = parent.getBoundingClientRect()
  const tabRect = tab.getBoundingClientRect()

  gsap.to(highlight, {
    x: tabRect.left - parentRect.left,
    width: tabRect.width,
    duration: 0.3,
    ease: "power3.out",
  })
}
