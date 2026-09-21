import { useNavigate, useParams } from "react-router-dom"
import { useEventDetails } from "@/hooks/useEventDetails"
import { useJoinPrelaunchWaitlist } from "@/hooks/useJoinPrelaunchWaitlist"
import { useAuthStore } from "@/store/auth.store"

import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import ErrorFallback from "@/components/error/ErrorFallback"
import EventDetailsSkeleton from "./skeletons/EventDetailsSkeleton"

import "./EventDetailsPage.styles.scss"

const EventDetailsPage = () => {
  const { city, slug } = useParams()
  const { user } = useAuthStore()

  const navigate = useNavigate()

  const { data: event, isLoading, isError, error } = useEventDetails({ city, slug })

  const { mutate: joinPrelaunchWaitlist, isPending: isJoiningWaitlist } = useJoinPrelaunchWaitlist()

  if (isLoading) {
    return <EventDetailsSkeleton />
  }

  if (isError || !event) {
    return <ErrorFallback error={error} />
  }

  const price = `₹${event.pricing.price.toLocaleString("en-IN")}`
  const originalPrice = event.pricing.hasDiscount
    ? `₹${event.pricing.originalPrice.toLocaleString("en-IN")}`
    : null

  const typeLabel = event.type
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())

  const openingText = event.schedule?.startAt
    ? new Date(event.schedule.startAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "A few weeks"

  const profileIncomplete =
    user?.profileCompletion?.basicInfo === false || user?.profileCompletion?.photos === false

  const questionnaireIncomplete = user?.profileCompletion?.questionnaire === false

  let ctaLabel = "Join the waitlist"
  let ctaAction = null
  let ctaDisabled = false
  let ctaNote = "Answer the questions, then join the waitlist. Nothing is charged now."

  if (!user) {
    ctaLabel = "Login"
    ctaAction = () => navigate("/auth/login")
    ctaDisabled = false
    ctaNote = "Login to continue."
  } else if (profileIncomplete) {
    ctaLabel = "Complete Profile"
    ctaAction = () => navigate("/onboarding/basicInfo")
    ctaDisabled = false
    ctaNote = "Complete your profile before answering the questions."
  } else if (questionnaireIncomplete) {
    ctaLabel = "Answer the questions"
    ctaAction = () => navigate("/onboarding/questionnaire")
    ctaDisabled = false
    ctaNote = "20 questions, one at a time. The waitlist comes after."
  } else if (event.userContext?.cta === "PRELAUNCH_WAITLISTED") {
    ctaLabel = "You're on the waitlist"
    ctaAction = null
    ctaDisabled = true
    ctaNote = "You're on the list. We'll let you know when the scene is ready."
  } else {
    ctaLabel = "Join the waitlist"
    ctaAction = () => joinPrelaunchWaitlist({ eventId: event.id })
    ctaDisabled = false
    ctaNote = "Join the waitlist. Nothing is charged now."
  }

  const description =
    event.description ||
    "Seven strangers, one evening, one host. The first Whatscenes scene in Hyderabad."

  const nextSteps = questionnaireIncomplete
    ? [
        "20 questions, one at a time",
        "The list forms in order of joining",
        `${price} charged when the match is released`,
      ]
    : [
        "The list forms in order of joining",
        `${price} charged when the match is released`,
        "Experience begins",
      ]

  return (
    <Section className="event-details-page">
      <Container>
        <div className="event-details">
          <main className="event-details__main">
            <a href={`/app`} className="event-details__back">
              ← All scenes
            </a>

            <header className="event-details__header">
              <div className="event-details__eyebrow">
                <span>{typeLabel}</span>
                <span>/</span>
                <span>{event.location.city}</span>
              </div>

              <h1>{event.title}</h1>

              <p className="event-details__tagline">
                {event.tagline || `Opening on ${openingText}`}
              </p>
            </header>

            <div className="event-details__visual">
              {event.media?.coverImage ? (
                <img src={event.media.coverImage} alt={event.title} />
              ) : (
                <div className="event-details__visual-placeholder" />
              )}
            </div>

            <section className="event-details__section event-details__night">
              <div className="event-details__label">The night</div>

              <div className="event-details__copy">
                <p>{description}</p>
              </div>
            </section>

            <section className="event-details__section">
              <div className="event-details__label">The detail</div>

              <div className="event-details__facts">
                <div className="event-details__fact">
                  <span>Seats</span>
                  {/* <strong>{event.capacity.total}</strong> */}
                  <strong>7 + the host</strong>
                </div>

                <div className="event-details__fact">
                  <span>Runs</span>
                  <strong>{event.runtime}</strong>
                </div>

                <div className="event-details__fact">
                  <span>City</span>
                  <strong>{event.location.city}</strong>
                </div>

                <div className="event-details__fact">
                  <span>Area</span>
                  <strong>{event.location.area.name}</strong>
                </div>
              </div>
            </section>

            <section className="event-details__section">
              <div className="event-details__label">The host</div>

              <div className="event-details__copy">
                <p>
                  Every scene has a trained host who sets the pace and opens each round of
                  questions. Yours is picked for the group once the seats are matched, and their
                  name reaches you with the scene details.
                </p>
              </div>
            </section>
          </main>

          <aside className="event-details__aside">
            <div className="event-details__purchase">
              <div className="event-details__price-row">
                <div className="event-details__prices">
                  <strong>{price} /</strong>
                  <br />
                  <strong style={{ lineHeight: "50%" }}>{originalPrice}</strong>

                  {/* {originalPrice && <del>{originalPrice}</del>} */}
                </div>

                <span className="event-details__price-note">Women / men</span>
              </div>

              <div className="event-details__availability">
                <span />
                {event.timeline?.isSoldOut
                  ? "Sold out"
                  : `${event.capacity.spotsLeft} seats · list open`}
              </div>

              <button className="event-details__cta" disabled={ctaDisabled} onClick={ctaAction}>
                {ctaLabel}
              </button>

              <p className="event-details__cta-note">{ctaNote}</p>
            </div>

            <div className="event-details__next">
              <div className="event-details__next-title">What happens next</div>

              <div className="event-details__next-list">
                {nextSteps.map((step, index) => (
                  <div className="event-details__next-item" key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  )
}

export default EventDetailsPage
