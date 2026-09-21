import clsx from "clsx"
import "./SectionHeader.styles.scss"

export default function SectionHeader({
  title,
  description,
  actions,
  className,
}) {
  return (
    <div className={clsx("section-header", className)}>
      <div className="section-header__content">
        <h2 className="section-header__title">{title}</h2>

        {description && (
          <p className="section-header__description">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="section-header__actions">
          {actions}
        </div>
      )}
    </div>
  )
}