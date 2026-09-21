import clsx from "clsx"
import "./Textarea.styles.scss"

function Textarea({
  label,
  error,
  helperText,
  id,
  className,
  rows = 4,
  ...props
}) {
  const textareaId = id || props.name

  const classes = clsx(
    "textarea-field",
    {
      "is-error": error,
    },
    className
  )

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={textareaId} className="textarea-field__label">
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        className="textarea-field__textarea"
        aria-invalid={!!error}
        {...props}
      />

      {(error || helperText) && (
        <div className="textarea-field__message">
          {error || helperText}
        </div>
      )}
    </div>
  )
}

export default Textarea