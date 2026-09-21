import clsx from "clsx"
import "./Badge.styles.scss"

function Badge({
  children,
  variant = "neutral",
  size = "md",
  className,
  onClick
}) {
  const classes = clsx(
    "badge",
    `badge--${variant}`,
    `badge--${size}`,
    className
  )

    const handleClick = (e) => {
      if (!onClick) return
      
      e.stopPropagation();
      onClick?.(e)
    }

  return <span className={classes} onClick={handleClick}>{children}</span>
}

export default Badge