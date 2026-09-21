import Container from "@/components/layout/Container"
import { navigateTo } from "@/services/navigation.service"

import "./Footer.styles.scss"

export default function Footer() {

  return (
    <footer className="footer">

      <Container>

        <div className="footer__inner">

          {/* BRAND */}

          <div className="footer__brand">

            <h3 className="footer__logo">
              What Scenes
            </h3>

            <p className="footer__tagline">
              Discover curated events and connect with
              like-minded people through curated social
              experiences.
            </p>

            {/* SOCIALS */}

            <div className="footer__social">

              <a href="#" target="_blank" rel="noreferrer">
                Twitter
              </a>

              <a href="#" target="_blank" rel="noreferrer">
                Instagram
              </a>

              <a href="#" target="_blank" rel="noreferrer">
                LinkedIn
              </a>

            </div>

          </div>

          {/* NAVIGATION */}

          <div className="footer__nav">

            {/* EXPLORE */}

            <div className="footer__column">

              <h4>Explore</h4>

              <button onClick={() => navigateTo("/events")}>
                Events
              </button>

              <button onClick={() => navigateTo("/events?filter=upcoming")}>
                Upcoming
              </button>

              <button onClick={() => navigateTo("/events?filter=live")}>
                Live Events
              </button>

            </div>

            {/* COMPANY */}

            <div className="footer__column">

              <h4>Company</h4>

              <button onClick={() => navigateTo("/about")}>
                About
              </button>

              <button onClick={() => navigateTo("/contact")}>
                Contact
              </button>

            </div>

            {/* LEGAL */}

            <div className="footer__column">

              <h4>Legal</h4>

              <button onClick={() => navigateTo("/terms")}>
                Terms of Service
              </button>

              <button onClick={() => navigateTo("/privacy")}>
                Privacy Policy
              </button>

              <button onClick={() => navigateTo("/guidelines")}>
                Community Guidelines
              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="footer__bottom">

          <p>
            © {new Date().getFullYear()} What Scenes — Curated Social Experiences
          </p>

        </div>

      </Container>

    </footer>
  )
}