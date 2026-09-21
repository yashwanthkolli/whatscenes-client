import { useHeaderStore } from "@/store/header.store"
import NavBar from "./NavBar"
import "./Header.styles.scss"

export default function Header() {
  const config = useHeaderStore((s) => s.config)

  if (!config.visible) return null

  return (
    <header
      className={[
        "header",
        config.variant === "transparent" ? "header--transparent" : "header--default",
        config.sticky ? "header--sticky" : "",
      ].join(" ")}
    >
      <NavBar />
    </header>
  )
}