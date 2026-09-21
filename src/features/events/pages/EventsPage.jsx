import Container from "@/components/layout/Container"
import Section from "@/components/layout/Section"
import Stack from "@/components/layout/Stack"
import PageHeader from "@/components/typography/PageHeader"
import EmptyState from "@/components/feedback/EmptyState"

export default function EventsPage() {
  return (
    <Section>
      <Container>
        <Stack gap="lg">
          <PageHeader title="Events" description="Explore curated social experiences" />

          <EmptyState
            title="No results found"
            description="Try a different search term."
          />
        </Stack>
      </Container>
    </Section>
  )
}
