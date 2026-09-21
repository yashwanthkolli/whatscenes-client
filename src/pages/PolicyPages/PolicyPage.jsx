import { Link } from "react-router-dom"

import "./PolicyPage.styles.scss"

const POLICY_ROUTES = {
  terms: "/policy/terms",
  privacy: "/policy/privacy",
  safety: "/policy/safety",
  refunds: "/policy/refunds",
  faq: "/policy/faq",
  contact: "/policy/contact",
}

export default function PolicyPage({ title, sections = [], currentPage }) {
  const relatedPages = Object.entries(POLICY_ROUTES)
    .filter(([key]) => key !== currentPage)
    .map(([key, path]) => ({
      key,
      path,
      label: getPolicyLabel(key),
    }))

  return (
    <main className="policy-page">
      <div className="policy-page__container">
        <Link to="/" className="policy-page__back">
          ← Back to home
        </Link>

        <div className="policy-page__eyebrow">Whatscenes</div>

        <h1 className="policy-page__title">{title}</h1>

        <div className="policy-page__sections">
          {sections.map((section, index) => (
            <section className="policy-page__section" key={`${section.h}-${index}`}>
              <h2 className="policy-page__section-title">{section.h}</h2>

              <p className="policy-page__section-copy">{section.p}</p>
            </section>
          ))}
        </div>

        <nav className="policy-page__related" aria-label="Related policies">
          {relatedPages.map((page) => (
            <Link key={page.key} to={page.path} className="policy-page__related-link">
              {page.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  )
}

function getPolicyLabel(key) {
  const labels = {
    terms: "Terms and conditions",
    privacy: "Privacy policy",
    safety: "Safety",
    refunds: "Refunds",
    faq: "FAQ",
    contact: "Contact us",
  }

  return labels[key]
}
