import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import Grid from "@/components/layout/Grid"
import Card from "@/components/layout/Card"

import SectionHeader from "@/components/typography/SectionHeader"

import "./HowItWorksSection.styles.scss"

const steps = [
  {
    title: "Create Your Profile",
    description:
      "Join the community and tell us what interests you."
  },
  {
    title: "Discover Events",
    description:
      "Explore curated meetups, treks, dinners and hackathons."
  },
  {
    title: "Meet Like-Minded People",
    description:
      "Connect with people who share your vibe and interests."
  }
]

export default function HowItWorksSection() {

  return (
    <Section className="how-it-works-section">

      <Container>

        <SectionHeader
          title="How It Works"
          subtitle="Getting started is simple"
        />

        <Grid
          className="how-it-works-grid"
          columns={3}
        >

          {steps.map((step, index) => (

            <Card
              key={index}
              className="how-it-works-card"
            >

              <div className="how-it-works-step">
                {index + 1}
              </div>

              <h3 className="how-it-works-title">
                {step.title}
              </h3>

              <p className="how-it-works-description">
                {step.description}
              </p>

            </Card>

          ))}

        </Grid>

      </Container>

    </Section>
  )
}