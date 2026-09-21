import clsx from "clsx"
import "./Avatar.styles.scss"
import { User } from "lucide-react"

function Avatar({
  src,
  alt,
  name,
  size = "md",
  className,
}) {
  const classes = clsx(
    "avatar",
    `avatar--${size}`,
    className
  )

  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?"

  return (
    <div className={classes}>
      {src ? (
        <img src={src} alt={alt || name} />
      ) : (
        name ? (
          <span className="avatar__fallback">{initials}</span>
        ) : (
          <User className="avatar__fallback_icon" />
        )
      )}
    </div>
  )
}

export default Avatar