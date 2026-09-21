import { useHomepageEvents } from "@/hooks/useHomepageEvents"

import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import EventList from "@/components/composed/EventList"

import "./HomePage.styles.scss"
import EventTypeSection from "./sections/EventTypeSection/EventTypeSection"

export default function HomePage() {
  const { data, isLoading } = useHomepageEvents()

  const byType = data?.byType || {}

  return (
    <main className="home-page">
      <Section className="home-page__intro">
        <Container>
          <div className="home-page__eyebrow">HYDERABAD · OPENING SOON</div>

          <h1 className="home-page__title">Explore scenes</h1>

          <p className="home-page__subtitle">
            One is open right now. More drop as the city fills up.
          </p>
        </Container>
      </Section>

      <EventTypeSection byType={byType} loading={isLoading} />
    </main>
  )
}
