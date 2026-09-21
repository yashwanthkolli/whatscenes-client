import { NavLink } from "react-router-dom"
import "./Header.styles.scss"

const navItems = [
  {
    label: "Discover",
    to: "/app",
  },
  {
    label: "My scenes",
    to: "/my-scenes",
  },
  {
    label: "Connections",
    to: "/connections",
  },
  {
    label: "My account",
    to: "/profile",
  },
]

export default function NavLinks() {
  return (
    <nav className="nav-links" aria-label="Primary navigation">
      {navItems.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `nav-links__link${isActive ? " nav-links__link--active" : ""}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
