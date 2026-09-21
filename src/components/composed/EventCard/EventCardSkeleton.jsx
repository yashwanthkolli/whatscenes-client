import Card from "@/components/layout/Card"
import Skeleton from "@/components/feedback/Skeleton"

import "./EventCard.styles.scss"

function EventCardSkeleton({ variant = "vertical" }) {
  return (
    <Card className={`event-card event-card--${variant} event-card--skeleton`}>
      <div className="event-card__image">
        <Skeleton width="100%" height="100%" />
      </div>

      <div className="event-card__content">
        <div className="event-card__skeleton-eyebrow">
          <Skeleton width="72px" height="10px" />
          <Skeleton width="8px" height="10px" />
          <Skeleton width="76px" height="10px" />
        </div>

        <Skeleton width="58%" height="28px" />

        <div className="event-card__skeleton-description">
          <Skeleton width="72%" height="15px" />
        </div>

        <div className="event-card__skeleton-footer">
          <Skeleton width="72px" height="13px" />

          <Skeleton width="48px" height="13px" />
        </div>
      </div>
    </Card>
  )
}

export default EventCardSkeleton
