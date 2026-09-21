import clsx from "clsx"
import "./Checkbox.styles.scss"

function Checkbox({
  label,
  error,
  id,
  className,
  ...props
}) {
  const checkboxId = id || props.name

  const classes = clsx(
    "checkbox",
    {
      "is-error": error,
    },
    className
  )

  return (
    <label htmlFor={checkboxId} className={classes}>
      <input
        id={checkboxId}
        type="checkbox"
        className="checkbox__input"
        {...props}
      />

      <span className="checkbox__box" />

      {label && <span className="checkbox__label">{label}</span>}
    </label>
  )
}

export default Checkbox