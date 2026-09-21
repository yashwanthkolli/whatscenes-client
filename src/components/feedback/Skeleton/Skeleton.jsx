import clsx from "clsx"
import "./Skeleton.styles.scss"

export default function Skeleton({
  width,
  height = 16,
  circle = false,
  className,
}) {
  const style = {
    width,
    height,
  }

  return (
    <div
      className={clsx(
        "skeleton",
        {
          "skeleton--circle": circle,
        },
        className
      )}
      style={style}
    />
  )
}