import Section from "@/components/layout/Section"
import Stack from "@/components/layout/Stack"

import "./EventCapacity.styles.scss"

const EventCapacity = ({ event }) => {
  const { capacity } = event

  const { total, booked, spotsLeft, genderSplit } = capacity

  const percentage = total ? Math.round((booked / total) * 100) : 0

  const isLow = spotsLeft <= 5

  return (
    <Section className="event-capacity">
      <Stack gap="sm">
        {/* Header */}
        <div className="event-capacity__header">
          <span className="event-capacity__title">{spotsLeft} spots left</span>

          {isLow && <span className="event-capacity__warning">Filling fast ⚡</span>}
        </div>

        {/* Progress Bar */}
        <div className="event-capacity__bar">
          <div className="event-capacity__fill" style={{ width: `${percentage}%` }} />
        </div>

        {/* Gender Ratio */}
        <div className="event-capacity__gender">
          <span>👨 {genderSplit?.male || 0}</span>
          <span>👩 {genderSplit?.female || 0}</span>
        </div>
      </Stack>
    </Section>
  )
}

export default EventCapacity
