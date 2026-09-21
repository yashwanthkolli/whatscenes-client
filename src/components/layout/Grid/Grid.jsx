import clsx from "clsx"
import "./Grid.styles.scss"

export default function Grid({
  children,
  columns = 3,
  gap = "md",
  className,
}) {
  return (
    <div
      className={clsx(
        "grid",
        `grid--cols-${columns}`,
        `grid--gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  )
}