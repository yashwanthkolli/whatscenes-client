import clsx from "clsx"
import "./PageHeader.styles.scss"

export default function PageHeader({
  title,
  description,
  className,
}) {
  return (
    <div className={clsx("page-header", className)}>
      <h1 className="page-header__title">{title}</h1>

      {description && (
        <p className="page-header__description">
          {description}
        </p>
      )}
    </div>
  )
}