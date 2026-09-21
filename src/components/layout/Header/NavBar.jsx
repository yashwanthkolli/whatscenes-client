import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"

import LocationSwitcher from "@/components/composed/LocationSwitcher/LocationSwitcher"
import Container from "@/components/layout/Container"
import Button from "@/components/ui/Button"

import NavLinks from "./NavLinks"
import ProfileMenu from "./ProfileMenu"
import MobileNav from "./MobileNav"

import Logo from "@/assets/logoFull.png"

import "./Header.styles.scss"

export default function NavBar() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping)

  if (isBootstrapping) return null

  return (
    <>
      <Container>
        <div className="navbar">
          <Link to="/app" className="navbar__logo" aria-label="Whatscenes">
            <span
              className="navbar__wordmark"
              style={{
                WebkitMaskImage: `url(${Logo})`,
                maskImage: `url(${Logo})`,
              }}
            />
          </Link>

          <NavLinks />

          <div className="navbar__actions">
            <LocationSwitcher />

            <div className="navbar__desktop-profile">
              {isAuthenticated ? (
                <ProfileMenu />
              ) : (
                <Button
                  className="profile-menu__login-button"
                  as={Link}
                  to="/auth/login"
                  variant="primary"
                  size="sm"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>

      <MobileNav />
    </>
  )
}
