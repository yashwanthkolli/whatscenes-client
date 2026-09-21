import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import SectionHeader from "@/components/typography/SectionHeader"

import EventList from "@/components/composed/EventList"

import "./PopularEventsSection.styles.scss"

export default function PopularEventsSection({ events = [], loading }) {

  if (!loading && events.length === 0) return null

  return (
    <Section className="popular-events-section">

      <Container>

        <SectionHeader
          title="Popular Events"
          description="Discover events people are excited about"
        />

        <div className="popular-events__list">

          <EventList
            events={events}
            loading={loading}
          />

        </div>

      </Container>

    </Section>
  )
}