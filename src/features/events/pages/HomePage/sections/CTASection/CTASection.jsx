import { Link } from "react-router-dom"
import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import Button from "@/components/ui/Button"

import "./CTASection.styles.scss"

export default function CTASection() {

  return (
    <Section className="cta-section">
      <Container>
        <div className="cta-box">
          <h2 className="cta-title">
            Ready to Meet Amazing People?
          </h2>

          <p className="cta-subtitle">
            Discover curated events and connect with
            like-minded people around you.
          </p>

          <div className="cta-actions">
            <Button
              as={Link}
              to="/events"
              size="md"
            >
              Explore Events
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}