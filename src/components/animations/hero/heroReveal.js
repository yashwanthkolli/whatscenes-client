import gsap from "gsap"

export function heroReveal(content, cards) {

  const tl = gsap.timeline()

  tl.from(content, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out"
  })

  tl.from(cards, {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.6
  }, "-=0.4")

}