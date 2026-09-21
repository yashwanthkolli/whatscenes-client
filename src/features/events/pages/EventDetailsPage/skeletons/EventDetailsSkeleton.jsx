import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import Stack from "@/components/layout/Stack"
import Card from "@/components/layout/Card"
import Skeleton from "@/components/feedback/Skeleton"

const EventDetailsSkeleton = () => {
  return (
    <Section>
      <Container>
        <Stack gap="lg">
          {/* Hero */}
          <Card>
            <Skeleton height="260px" />
          </Card>

          {/* Meta */}
          <Card>
            <Stack gap="md">
              <Skeleton height="20px" width="40%" />
              <Skeleton height="20px" width="60%" />
              <Skeleton height="20px" width="50%" />
            </Stack>
          </Card>

          {/* Capacity */}
          <Card>
            <Stack gap="sm">
              <Skeleton height="16px" width="30%" />
              <Skeleton height="8px" width="100%" />
              <Skeleton height="14px" width="50%" />
            </Stack>
          </Card>

          {/* Eligibility */}
          <Card>
            <Stack gap="sm">
              <Skeleton height="16px" width="40%" />
              <Skeleton height="24px" width="80%" />
            </Stack>
          </Card>

          {/* Description */}
          <Card>
            <Stack gap="sm">
              <Skeleton height="16px" width="50%" />
              <Skeleton height="12px" width="100%" />
              <Skeleton height="12px" width="95%" />
              <Skeleton height="12px" width="90%" />
            </Stack>
          </Card>

          {/* CTA */}
          <Card>
            <Stack gap="md">
              <Skeleton height="20px" width="30%" />
              <Skeleton height="44px" width="100%" />
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Section>
  )
}

export default EventDetailsSkeleton
