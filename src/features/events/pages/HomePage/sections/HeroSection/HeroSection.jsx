import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Link } from "react-router-dom"

import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"


import { floatingCards } from "@/components/animations/hero/floatingCards"
import { heroReveal } from "@/components/animations/hero/heroReveal"

import "./HeroSection.styles.scss"

export default function HeroSection() {
  const cardsRef = useRef([])
  const contentRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      heroReveal(contentRef.current, cardsRef.current)
      floatingCards(cardsRef.current)
    })

    return () => ctx.revert()
  }, [])

  return (
    <Section className="hero-section">
      <Container>

        <div className="hero">

          <div className="hero__glow" ref={glowRef} />

          {/* LEFT CONTENT */}

          <div ref={contentRef} className="hero__content">

            <h1 className="hero__headline">
              Discover Events.
              <br />
              Meet People Like You.
            </h1>

            <p className="hero__subtitle">
              Curated meetups, treks, dinners and hackathons
              for curious people who want to connect.
            </p>

            <div className="hero__actions">

              <Button as={Link} to="/events" size="lg">
                Explore Events
              </Button>

              <Button size="lg" variant="ghost">
                How it works?
              </Button>

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="hero__visual">

            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="hero-card hero-card--1"
            >
              <Badge variant='glass'>Mixer</Badge>
              <h4>Friday Tech Mixer</h4>
              <span className="hero-card--info">Apr 20 • 6:30 PM</span>
              <span className="hero-card--info">Hyderabad</span>
            </div>

            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="hero-card hero-card--2"
            >
              <Badge variant='glass'>Trekking</Badge>
              <h4>Sunrise Trek</h4>
              <span className="hero-card--info">Apr 25 • 5:00 AM</span>
              <span className="hero-card--info">Nandi Hills</span>
            </div>

            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="hero-card hero-card--3"
            >
              <Badge variant='glass'>Dinner</Badge>
              <h4>Founders Dinner</h4>
              <span className="hero-card--info">Apr 28 • 8:00 PM</span>
              <span className="hero-card--info">Bangalore</span>
            </div>

          </div>

        </div>

      </Container>
    </Section>
  )
}