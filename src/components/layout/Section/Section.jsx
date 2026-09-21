import clsx from "clsx"
import "./Section.styles.scss"

export default function Section({ children, className }) {
  return <section className={clsx("section", className)}>{children}</section>
}