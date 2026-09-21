import { NavLink } from "react-router-dom"
import { Compass, Ticket, UsersRound, UserRound } from "lucide-react"

import "./Header.styles.scss"

const navItems = [
  {
    label: "Discover",
    to: "/app",
    icon: Compass,
  },
  {
    label: "My scenes",
    to: "/my-scenes",
    icon: Ticket,
  },
  {
    label: "Connections",
    to: "/connections",
    icon: UsersRound,
  },
  {
    label: "Account",
    to: "/profile",
    icon: UserRound,
  },
]

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {navItems.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `mobile-nav__item${isActive ? " mobile-nav__item--active" : ""}`
          }
        >
          <Icon className="mobile-nav__icon" strokeWidth={1.8} />

          <span className="mobile-nav__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
