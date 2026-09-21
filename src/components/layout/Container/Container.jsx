import clsx from "clsx"
import "./Container.styles.scss"

export default function Container({ children, className }) {
  return <div className={clsx("container", className)}>{children}</div>
}