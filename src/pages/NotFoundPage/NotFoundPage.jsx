import { Link } from "react-router-dom"

import Section from "@/components/layout/Section"
import Container from "@/components/layout/Container"
import Stack from "@/components/layout/Stack"

import Button from "@/components/ui/Button"

import "./NotFoundPage.styles.scss"

export default function NotFoundPage() {
  return (
    <Section className="not-found">
      <Container>
        <Stack gap="lg" className="not-found__content">
          <h1 className="not-found__code">404</h1>

          <p className="not-found__message">
            The page you are looking for does not exist.
          </p>

          <Button as={Link} to="/">
            Go Home
          </Button>
        </Stack>
      </Container>
    </Section>
  )
}