import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import SectionHeader from "@/components/typography/SectionHeader"

import EventList from "@/components/composed/EventList"

import "./LiveEventsSection.styles.scss"

export default function LiveEventsSection({ events = [], loading }) {

  if (!loading && events.length === 0) return null

  return (
    <Section className="live-events-section">
      <Container>
        <SectionHeader
          title="Live & Happening Soon"
          description="Don't miss events starting shortly"
        />

        <div className="live-events__highlight">
          <EventList
            events={events}
            loading={loading}
            variant="list"
            isLive
          />
        </div>
      </Container>
    </Section>
  )
}