import Card from "@/components/layout/Card"
import Grid from "@/components/layout/Grid"
import Stack from "@/components/layout/Stack"

import { formatEventDateFull, formatEventTime } from "@/utils/dateTime"

import "./EventMeta.styles.scss"

const MetaItem = ({ label, value }) => (
  <Stack gap="xs" className="event-meta__item">
    <span className="event-meta__label">{label}</span>
    <span className="event-meta__value">{value}</span>
  </Stack>
)

const EventMeta = ({ event }) => {
  const { schedule, location, pricing } = event

  const date = formatEventDateFull(schedule?.startAt)
  const time = formatEventTime(schedule?.startAt)

  return (
    <Card className="event-meta">
      <Grid columns={3} gap="md">
        <MetaItem label="Date & Time" value={date + " - " + time} />

        <MetaItem label="Price" value={`₹${pricing.price}`} />

        <MetaItem label="City" value={location?.area.name + ", " + location?.city} />
      </Grid>
    </Card>
  )
}

export default EventMeta
