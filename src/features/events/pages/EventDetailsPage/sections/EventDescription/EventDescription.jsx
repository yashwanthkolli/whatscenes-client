import { useState } from "react"

import Section from "@/components/layout/Section"
import Stack from "@/components/layout/Stack"
import Button from "@/components/ui/Button"
import SectionHeader from "@/components/Typography/SectionHeader"

import "./EventDescription.styles.scss"

const EventDescription = ({ event }) => {
  const [expanded, setExpanded] = useState(false)

  const { description } = event

  if (!description) return null

  return (
    <Section className="event-description">
      <Stack gap="md">
        <SectionHeader title="About this event" />

        <p className={`event-description__text ${expanded ? "expanded" : ""}`}>{description}</p>

        {!expanded && (
          <Button variant="ghost" size="sm" onClick={() => setExpanded(true)}>
            Read more
          </Button>
        )}
      </Stack>
    </Section>
  )
}

export default EventDescription
