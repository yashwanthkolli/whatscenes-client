import { Outlet, Link, useLocation } from "react-router-dom"

import ToastContainer from "@/components/feedback/toast/ToastContainer"
import ModalRoot from "@/components/feedback/modal/ModalRoot"
import LocationSwitcher from "@/components/composed/LocationSwitcher/LocationSwitcher"

import Logo from "@/assets/logo.png"

import "./MinimalLayout.styles.scss"

export default function MinimalLayout() {
  const location = useLocation()

  const isAuthRoute = location.pathname.startsWith("/auth")
  const logoTo = isAuthRoute ? "/" : "/app"

  return (
    <div className="minimal-layout">
      <header className="minimal-header">
        <div className="minimal-header__inner">
          <Link to={logoTo} className="minimal-header__logo" aria-label="Whatscenes">
            <span
              className="minimal-header__logo-mark"
              style={{
                WebkitMaskImage: `url(${Logo})`,
                maskImage: `url(${Logo})`,
              }}
            />
          </Link>

          <div className="minimal-header__actions">
            <LocationSwitcher />

            <Link to="/app" className="minimal-header__home-link">
              <span aria-hidden="true">←</span>
              <span>Back to home</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="minimal-layout__content">
        <Outlet />
      </main>

      <ToastContainer />
      <ModalRoot />
    </div>
  )
}
