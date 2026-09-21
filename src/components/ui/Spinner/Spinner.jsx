import clsx from "clsx"
import "./Spinner.styles.scss"

function Spinner({
  size = "md",
  className,
}) {
  const classes = clsx(
    "spinner",
    `spinner--${size}`,
    className
  )

  return <span className={classes} aria-hidden="true" />
}

export default Spinner