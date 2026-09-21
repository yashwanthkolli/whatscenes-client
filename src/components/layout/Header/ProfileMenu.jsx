import { Bell, Menu } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"

import Button from "@/components/ui/Button"

import useLogout from "@/hooks/useLogout"
import Avatar from "@/components/ui/Avatar"

import "./Header.styles.scss"

const MENU_ITEMS = [
  { label: "My account", to: "/profile" },
  { label: "My scenes", to: "/my-scenes" },
  { label: "Connections", to: "/connections" },
  { label: "Edit profile", to: "/profile/edit" },
  { label: "Settings", to: "/profile/settings" },
  { label: "Help & policies", to: "/policy/faq" },
]

export default function ProfileMenu() {
  const [open, setOpen] = useState(false)

  const menuRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()

  const logoutMutation = useLogout()

  useEffect(() => {
    if (!open) return

    const handleOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className="profile-menu" ref={menuRef}>
      <Button
        variant="ghost"
        size="sm"
        className="profile-menu__button"
        aria-label="Notifications"
        onClick={() => navigate("/notifications")}
      >
        <Bell className="profile-menu__icon" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={["profile-menu__trigger", open ? "profile-menu__trigger--open" : ""]
          .filter(Boolean)
          .join(" ")}
        aria-label={open ? "Close account menu" : "Open account menu"}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <Menu className="profile-menu__icon profile-menu__hamburger" />
      </Button>

      {open && (
        <div className="profile-menu__panel" role="menu" aria-label="Account menu">
          <div className="profile-menu__identity">
            <Avatar size="sm" />

            <div className="profile-menu__identity-copy">
              <span className="profile-menu__name">You</span>
              <span className="profile-menu__meta">Number not set</span>
            </div>
          </div>

          <nav className="profile-menu__nav">
            {MENU_ITEMS.map((item) => {
              const active =
                location.pathname === item.to ||
                (item.to === "/profile" && location.pathname.startsWith("/profile/"))

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  role="menuitem"
                  className={["profile-menu__link", active ? "profile-menu__link--active" : ""]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="profile-menu__divider" />

          <button
            type="button"
            className="profile-menu__logout"
            disabled={logoutMutation.isPending}
            onClick={handleLogout}
          >
            {logoutMutation.isPending ? "Logging out…" : "Log out"}
          </button>
        </div>
      )}
    </div>
  )
}
