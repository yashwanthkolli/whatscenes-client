import Section from "@/components/layout/Section"
import Stack from "@/components/layout/Stack"
import Badge from "@/components/ui/Badge"
import SectionHeader from "@/components/Typography/SectionHeader"

import "./EventEligibility.styles.scss"

const EventEligibility = ({ event }) => {
  const { eligibility } = event

  if (!eligibility) return null

  const { minAge, maxAge, genderRestrictions, minQualityScore, womenPriority } = eligibility

  if (!(minAge || maxAge || genderRestrictions.length || minQualityScore || womenPriority)) {
    return null
  }

  return (
    <Section className="event-eligibility">
      <Stack gap="md">
        <SectionHeader
          title="Who can join"
          description="Basic eligibility criteria for this event"
        />

        <div className="event-eligibility__items">
          {minAge && maxAge && (
            <Badge variant="glass">
              Age: {minAge}–{maxAge}
            </Badge>
          )}

          {genderRestrictions?.length > 0 && (
            <Badge variant="glass">Gender: {genderRestrictions.join(", ")}</Badge>
          )}

          {minQualityScore > 0 && <Badge variant="glass">Min Score: {minQualityScore}+</Badge>}

          {womenPriority && <Badge variant="warning">Women Priority</Badge>}
        </div>
      </Stack>
    </Section>
  )
}

export default EventEligibility
