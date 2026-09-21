import { useNavigate } from "react-router-dom"

import Card from "@/components/layout/Card"

import { formatEventDayDate } from "@/utils/dateTime"

import "./EventCard.styles.scss"

function EventCard({ event, variant = "vertical" }) {
  const navigate = useNavigate()

  const {
    title,
    slug,
    tagline,
    cover_image,
    event_type,
    interest_tags,
    area,
    city,
    event_start_at,
    registration_open_at,
  } = event

  const handleNavigate = () => {
    if (!city?.normalizedName || !slug) return

    navigate(`/events/${city.normalizedName}/${slug}`)
  }

  const formattedDate = formatEventDayDate(event_start_at)

  const formattedType = event_type
    ?.replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())

  const formattedCity = city?.name || ""
  const formattedArea = area?.name || ""

  return (
    <Card className={`event-card event-card--${variant}`} onClick={handleNavigate}>
      <div className="event-card__image">
        {cover_image?.url ? (
          <img src={cover_image.url} alt={title} loading="lazy" />
        ) : (
          <div className="event-card__image-placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="event-card__content">
        <div className="event-card__eyebrow">
          <span>{formattedType}</span>

          {formattedCity && (
            <>
              <span className="event-card__separator">/</span>
              <span className="event-card__city">{formattedCity}</span>
            </>
          )}
        </div>

        <h3 className="event-card__title">{title}</h3>

        <div className="event-card__description">{tagline}</div>

        <div className="event-card__footer">
          <span className="event-card__location">{formattedArea}</span>

          {interest_tags?.length > 0 && <span className="event-card__tag">{interest_tags[0]}</span>}
        </div>
      </div>
    </Card>
  )
}

export default EventCard
