import clsx from "clsx"
import "./Stack.styles.scss"

export default function Stack({
  children,
  gap = "md",
  className,
}) {
  return (
    <div className={clsx("stack", `stack--${gap}`, className)}>
      {children}
    </div>
  )
}