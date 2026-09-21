import Card from "@/components/layout/Card"
import Badge from "@/components/ui/Badge"
import Stack from "@/components/layout/Stack"

import { formatEventDate, formatEventTime } from "@/utils/dateTime"

import "./EventHero.styles.scss"

const EventHero = ({ event }) => {
  const { title, media, type, category, schedule, location } = event

  const startDate = formatEventDate(schedule?.startAt)
  const time = formatEventTime(schedule?.startAt)

  return (
    <Card className="event-hero">
      {/* Cover Image */}
      <div className="event-hero__image">
        {media?.coverImage && <img src={media.coverImage} alt={title} />}
        <div className="event-hero__overlay" />
      </div>

      {/* Content */}
      <div className="event-hero__content">
        <Stack gap="sm">
          {/* Tags */}
          <div className="event-hero__badges">
            <Badge variant="glass">{type}</Badge>
            <Badge variant="ghost">{category}</Badge>
          </div>

          {/* Title */}
          <h1 className="event-hero__title">{title}</h1>

          {/* Meta */}
          <div className="event-hero__meta">
            <span>{startDate}</span>
            <span>•</span>
            <span>{time}</span>
            <span>•</span>
            <span>
              {location?.area.name}, {location?.city}
            </span>
          </div>
        </Stack>
      </div>
    </Card>
  )
}

export default EventHero
