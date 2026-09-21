import clsx from "clsx"

import "./Select.styles.scss"

function Select({
  label,
  error,
  helperText,
  id,
  name,
  options = [],
  placeholder,
  value,
  mode = "single",
  className,
  disabled = false,
  onChange,
}) {
  const selectId = id || name
  const isMultiple = mode === "multiple"

  const normalizedValue = isMultiple ? (Array.isArray(value) ? value : []) : (value ?? "")

  const isSelected = (optionValue) => {
    if (isMultiple) {
      return normalizedValue.includes(optionValue)
    }

    return normalizedValue === optionValue
  }

  const handleOptionClick = (optionValue) => {
    if (disabled) return

    if (isMultiple) {
      const currentValues = Array.isArray(normalizedValue) ? normalizedValue : []

      const nextValues = currentValues.includes(optionValue)
        ? currentValues.filter((item) => item !== optionValue)
        : [...currentValues, optionValue]

      onChange?.(nextValues)
      return
    }

    onChange?.(optionValue)
  }

  const handleKeyDown = (event, optionValue) => {
    if (event.key !== "Enter" && event.key !== " ") return

    event.preventDefault()
    handleOptionClick(optionValue)
  }

  return (
    <div
      className={clsx(
        "select-field",
        {
          "is-error": error,
          "is-disabled": disabled,
          "is-multiple": isMultiple,
        },
        className
      )}
    >
      {label && (
        <label className="select-field__label" htmlFor={selectId}>
          {label}
        </label>
      )}

      {placeholder && !normalizedValue?.length && (
        <div className="select-field__placeholder">{placeholder}</div>
      )}

      <div
        id={selectId}
        className="select-field__options"
        role={isMultiple ? "group" : "radiogroup"}
        aria-label={label || name}
        aria-disabled={disabled}
      >
        {options.map((option, index) => {
          const optionValue = typeof option === "string" ? option : option.value

          const optionLabel = typeof option === "string" ? option : option.label

          const selected = isSelected(optionValue)

          return (
            <button
              key={optionValue ?? index}
              type="button"
              className={clsx("select-field__option", {
                "select-field__option--selected": selected,
              })}
              role={isMultiple ? "checkbox" : "radio"}
              aria-checked={selected}
              disabled={disabled}
              onClick={() => handleOptionClick(optionValue)}
              onKeyDown={(event) => handleKeyDown(event, optionValue)}
            >
              <span className="select-field__option-label">{optionLabel}</span>

              <span className="select-field__option-indicator" aria-hidden="true">
                {selected ? "✓" : ""}
              </span>
            </button>
          )
        })}
      </div>

      {(error || helperText) && <div className="select-field__message">{error || helperText}</div>}
    </div>
  )
}

export default Select
