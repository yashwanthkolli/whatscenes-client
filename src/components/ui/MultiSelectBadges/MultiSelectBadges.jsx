import { useCallback } from "react"

import "./MultiSelectBadges.styles.scss"

export default function MultiSelectBadges({
  options = [],
  value = [],
  onChange,
  maxSelections,
  className = "",
}) {
  const toggleOption = useCallback(
    (option) => {
      if (!onChange) return

      const isSelected = value.includes(option)

      if (isSelected) {
        onChange(value.filter((item) => item !== option))
        return
      }

      if (maxSelections && value.length >= maxSelections) {
        return
      }

      onChange([...value, option])
    },
    [value, onChange, maxSelections]
  )

  return (
    <div className={`multi-select-badges ${className}`}>
      {options.map((option) => {
        const isSelected = value.includes(option)

        return (
          <button
            key={option}
            type="button"
            className={[
              "multi-select-badges__item",
              isSelected ? "multi-select-badges__item--selected" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={isSelected}
            onClick={() => toggleOption(option)}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
