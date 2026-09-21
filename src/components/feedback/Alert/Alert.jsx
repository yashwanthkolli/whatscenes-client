import clsx from "clsx"
import "./Alert.styles.scss"

export default function Alert({ variant = "info", children }) {
  return (
    <div className={clsx("alert", `alert--${variant}`)}>
      {children}
    </div>
  )
}