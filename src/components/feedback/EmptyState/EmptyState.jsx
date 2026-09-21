import clsx from "clsx"
import "./EmptyState.styles.scss"

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div className={clsx("empty-state", className)}>
      {icon && <div className="empty-state__icon">{icon}</div>}

      {title && <h3 className="empty-state__title">{title}</h3>}

      {description && (
        <p className="empty-state__description">
          {description}
        </p>
      )}

      {action && (
        <div className="empty-state__action">
          {action}
        </div>
      )}
    </div>
  )
}