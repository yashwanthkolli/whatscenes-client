import { useEffect, useMemo, useRef, useState } from "react"

import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import EventList from "@/components/composed/EventList"

import {
  eventTypeTransition,
  moveTabHighlight,
} from "@/components/animations/sections/eventTypeTransition"

import "./EventTypeSection.styles.scss"

const TYPE_LABELS = {
  ALL: "All",
  LAID_BACK: "Laid back",
  ADRENALINE: "Adrenaline",
  IMMERSIVE: "Immersive",
  PUZZLE: "Puzzle",
}

export default function EventTypeSection({ byType = {}, loading }) {
  const listRef = useRef(null)
  const highlightRef = useRef(null)
  const tabRefs = useRef({})

  const availableTypes = Object.keys(byType)

  const types = useMemo(() => ["ALL", ...availableTypes], [availableTypes.join(",")])

  const [activeType, setActiveType] = useState("ALL")

  useEffect(() => {
    if (!types.includes(activeType)) {
      setActiveType("ALL")
    }
  }, [types, activeType])

  useEffect(() => {
    const tab = tabRefs.current[activeType]

    if (!tab || !highlightRef.current) return

    moveTabHighlight(highlightRef.current, tab)
  }, [activeType])

  const events = useMemo(() => {
    if (activeType === "ALL") {
      return Object.values(byType).flat()
    }

    return byType[activeType] || []
  }, [activeType, byType])

  function handleTabClick(type) {
    if (type === activeType) return

    eventTypeTransition(listRef.current, () => {
      setActiveType(type)
    })
  }

  if (!loading && !availableTypes.length) {
    return null
  }

  return (
    <Section className="event-type-section">
      <Container>
        <div className="event-type-tabs">
          <div ref={highlightRef} className="event-type-tabs__highlight" />

          {types.map((type) => (
            <button
              key={type}
              ref={(element) => {
                tabRefs.current[type] = element
              }}
              type="button"
              className={`event-type-tab ${activeType === type ? "event-type-tab--active" : ""}`}
              onClick={() => handleTabClick(type)}
            >
              {TYPE_LABELS[type] || type}
            </button>
          ))}
        </div>

        <div ref={listRef} className="event-type-list">
          <EventList events={events} loading={loading} />
        </div>
      </Container>
    </Section>
  )
}
