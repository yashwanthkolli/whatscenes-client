import { NavLink, useLocation } from "react-router-dom"
import useLogout from "@/hooks/useLogout"

import "./AccountSidebar.styles.scss"

const SIDEBAR_ITEMS = [
  {
    label: "My account",
    to: "/profile",
    key: "account",
  },
  {
    label: "My scenes",
    to: "/my-scenes",
    key: "scenes",
  },
  {
    label: "Connections",
    to: "/connections",
    key: "connections",
  },
  {
    label: "Edit profile",
    to: "/profile/edit",
    key: "edit-profile",
  },
  {
    label: "Settings",
    to: "/profile/settings",
    key: "settings",
  },
]

export default function AccountSidebar({ activeItem }) {
  const location = useLocation()
  const logoutMutation = useLogout()

  const isItemActive = (item) => {
    if (activeItem) {
      return activeItem === item.key
    }

    if (item.key === "account") {
      return location.pathname === "/profile" || location.pathname.startsWith("/profile/")
    }

    return location.pathname === item.to
  }

  return (
    <aside className="account-sidebar">
      <nav className="account-sidebar__nav" aria-label="Account navigation">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            className={[
              "account-sidebar__link",
              isItemActive(item) ? "account-sidebar__link--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className="account-sidebar__logout"
        disabled={logoutMutation.isPending}
        onClick={() => logoutMutation.mutate()}
      >
        {logoutMutation.isPending ? "Logging out…" : "Log out"}
      </button>
    </aside>
  )
}
