import { Link } from "react-router-dom"

import "./MyEventItem.styles.scss"

function formatEventDate(date) {
  if (!date) {
    return {
      day: "",
      date: "",
    }
  }

  const eventDate = new Date(date)

  return {
    day: new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      timeZone: "Asia/Kolkata",
    })
      .format(eventDate)
      .toUpperCase(),

    date: new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(eventDate),
  }
}

function getCityName(city) {
  if (!city) return ""

  if (typeof city === "string") {
    return city
  }

  return city.name || ""
}

function getAreaName(area) {
  if (!area) return ""

  if (typeof area === "string") {
    return area
  }

  return area.name || ""
}

function getStatusLabel(status) {
  const labels = {
    WAITLISTED: "On waitlist",
    CONFIRMED: "Confirmed",
    CANCELLED: "Cancelled",
    SELECTED: "Selected",
    REFUNDED: "Refunded",
  }

  return labels[status] || status
}

function getStatusClass(status) {
  const classes = {
    WAITLISTED: "my-event-item--waitlisted",
    CONFIRMED: "my-event-item--confirmed",
    CANCELLED: "my-event-item--cancelled",
    SELECTED: "my-event-item--selected",
    REFUNDED: "my-event-item--cancelled",
  }

  return classes[status] || ""
}

export default function MyEventItem({ registration }) {
  const event = registration?.event

  if (!event) {
    return null
  }

  const { day, date } = formatEventDate(event.event_start_at)

  const cityName = getCityName(event.city)
  const areaName = getAreaName(event.area)

  const location = [areaName, cityName].filter(Boolean).join(", ")

  const eventUrl = `/events/${event.city?.name?.toLowerCase()}/${event.slug}`

  const statusLabel = getStatusLabel(registration.status)
  const statusClass = getStatusClass(registration.status)

  return (
    <Link
      to={eventUrl}
      className={`my-event-item ${statusClass}`}
      aria-label={`${event.title}, ${date}, ${statusLabel}`}
    >
      <div className="my-event-item__date">
        <span className="my-event-item__day">{day}</span>

        <span className="my-event-item__date-value">{date}</span>
      </div>

      <div className="my-event-item__details">
        <h2 className="my-event-item__title">{event.title}</h2>

        {location && <p className="my-event-item__location">{location}</p>}

        {event.venue_name && <p className="my-event-item__venue">{event.venue_name}</p>}
      </div>

      <span className="my-event-item__status">{statusLabel}</span>
    </Link>
  )
}
