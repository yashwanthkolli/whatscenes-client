import { Link } from "react-router-dom"

import AccountSidebar from "@/components/composed/AccountSidebar"

import "./ConnectionsPage.styles.scss"

export default function ConnectionsPage() {
  return (
    <div className="connections-page">
      <AccountSidebar activeItem="connections" />

      <section className="connections-page__main">
        <header className="connections-page__header">
          <h1 className="connections-page__title">Connections</h1>

          <p className="connections-page__subtitle">
            Both of you asked. That is the only way a number moves.
          </p>
        </header>

        <div className="connections-page__empty">
          <div className="connections-page__eyebrow">
            <span className="connections-page__eyebrow-dot" />
            <span>PRELAUNCH</span>
          </div>

          <h2 className="connections-page__empty-title">Connections open with the first scene</h2>

          <p className="connections-page__empty-description">
            A number moves only when you and someone from your scene both ask for it afterwards.
            Nobody has sat down yet, so there is nothing here. The first Hyderabad scene opens in a
            few weeks.
          </p>

          <Link to="/app" className="connections-page__cta">
            See the open scene
          </Link>
        </div>
      </section>
    </div>
  )
}
