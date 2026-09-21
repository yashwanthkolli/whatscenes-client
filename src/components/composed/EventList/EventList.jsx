import Grid from "@/components/layout/Grid"
import EmptyState from "@/components/feedback/EmptyState"

import EventCard from "@/components/composed/EventCard"
import { EventCardSkeleton } from "@/components/composed/EventCard"

import "./EventList.styles.scss"

function EventList({ events = [], loading = false, variant = "grid", cardVariant }) {
  const isList = variant === "list"

  const resolvedCardVariant = cardVariant || (isList ? "horizontal" : "vertical")

  if (loading) {
    return (
      <Grid columns={isList ? 1 : 3} gap="md" className={`event-list event-list--${variant}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={index} variant={resolvedCardVariant} />
        ))}
      </Grid>
    )
  }

  if (!events.length) {
    return <EmptyState title="No events found" description="Check back later for new events." />
  }

  return (
    <Grid columns={isList ? 1 : 3} gap="md" className={`event-list event-list--${variant}`}>
      {events.map((event) => (
        <EventCard key={event._id} event={event} variant={resolvedCardVariant} />
      ))}
    </Grid>
  )
}

export default EventList
