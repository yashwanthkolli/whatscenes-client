import Skeleton from "@/components/feedback/Skeleton"

import "./MyEventsSkeleton.styles.scss"

export default function MyEventsSkeleton({ count = 4 }) {
  return (
    <div className="my-events-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <div className="my-events-skeleton__item" key={index}>
          <div className="my-events-skeleton__date">
            <Skeleton width="46px" height="16px" />
            <Skeleton width="60px" height="12px" />
          </div>

          <div className="my-events-skeleton__content">
            <Skeleton width="220px" height="23px" />
            <Skeleton width="280px" height="14px" />
          </div>

          <Skeleton width="80px" height="12px" />
        </div>
      ))}
    </div>
  )
}
