import clsx from "clsx"

import "./SingleLineTextInput.styles.scss"

export default function SingleLineTextInput({
  value = "",
  onChange,
  placeholder = "",
  name,
  id,
  type = "text",
  autoFocus = false,
  disabled = false,
  error,
  className,
  ...props
}) {
  const inputId = id || name

  return (
    <div
      className={clsx(
        "single-line-text-input",
        {
          "single-line-text-input--error": error,
          "single-line-text-input--disabled": disabled,
        },
        className
      )}
    >
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        aria-invalid={!!error}
        onChange={(event) => onChange?.(event.target.value)}
        {...props}
      />

      {error && <div className="single-line-text-input__error">{error}</div>}
    </div>
  )
}
