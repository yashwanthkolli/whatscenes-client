import clsx from "clsx"
import "./Input.styles.scss"

function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  size = "md",
  fullWidth = true,
  id,
  className,
  ...props
}) {
  const inputId = id || props.name

  const wrapperClass = clsx(
    "input-field",
    `input-field--${size}`,
    {
      "is-error": error,
      "is-full": fullWidth,
    },
    className
  )

  return (
    <div className={wrapperClass}>
      {label && (
        <label className="input-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className="input-field__control">
        {leftIcon && (
          <span className="input-field__icon input-field__icon--left">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          className="input-field__input"
          aria-invalid={!!error}
          {...props}
        />

        {rightIcon && (
          <span className="input-field__icon input-field__icon--right">
            {rightIcon}
          </span>
        )}
      </div>

      {(error || helperText) && (
        <div className="input-field__message">
          {error || helperText}
        </div>
      )}
    </div>
  )
}

export default Input