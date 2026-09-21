import { Link } from "react-router-dom"

import Section from "@/components/layout/Section"
import Stack from "@/components/layout/Stack"
import Card from "@/components/layout/Card"

import PageHeader from "@/components/typography/PageHeader"

import Button from "@/components/ui/Button"

export default function ErrorFallback({ error, reset }) {
  return (
    <Section className="error-page">
      <Card>
        <Stack gap="lg">

          <PageHeader
            title="Something went wrong"
            description="An unexpected error occurred. You can reload the page or return home."
          />

          <Stack gap="sm" className="error-page__actions">

            <Button onClick={() => window.location.reload()}>
              Reload
            </Button>

            <Button as={Link} to="/" variant="secondary">
              Go Home
            </Button>

          </Stack>

        </Stack>
      </Card>
    </Section>
  )
}