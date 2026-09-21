import clsx from "clsx"
import "./Card.styles.scss"

export default function Card({ children, className, onClick }) {
  return <div className={clsx("card", className)} onClick={onClick}>{children}</div>
}