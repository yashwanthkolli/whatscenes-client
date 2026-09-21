import gsap from "gsap"

export function floatingCards(cards) {

  cards.forEach((card) => {

    gsap.to(card, {
      y: gsap.utils.random(-15, 15),
      x: gsap.utils.random(-8, 8),
      rotation: gsap.utils.random(-2, 2),
      duration: gsap.utils.random(5, 7),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    })

  })

}