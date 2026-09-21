import { useEffect, useRef, useState } from "react"
import clsx from "clsx"

import "./DateInput.styles.scss"

const EMPTY_DATE = {
  day: "",
  month: "",
  year: "",
}

function parseValue(value) {
  if (!value) return EMPTY_DATE

  // Accept both:
  // YYYY-MM-DD
  // YYYY-MM-DDTHH:mm:ss.sssZ
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value))

  if (!match) return EMPTY_DATE

  return {
    year: match[1],
    month: match[2],
    day: match[3],
  }
}

function isValidDate(day, month, year) {
  if (!day || !month || !year || day.length !== 2 || month.length !== 2 || year.length !== 4) {
    return false
  }

  const dayNumber = Number(day)
  const monthNumber = Number(month)
  const yearNumber = Number(year)

  if (
    !Number.isInteger(dayNumber) ||
    !Number.isInteger(monthNumber) ||
    !Number.isInteger(yearNumber)
  ) {
    return false
  }

  if (monthNumber < 1 || monthNumber > 12) return false
  if (yearNumber < 1) return false

  const date = new Date(yearNumber, monthNumber - 1, dayNumber)

  return (
    date.getFullYear() === yearNumber &&
    date.getMonth() === monthNumber - 1 &&
    date.getDate() === dayNumber
  )
}

function formatValue({ day, month, year }) {
  if (!isValidDate(day, month, year)) {
    return ""
  }

  return `${year}-${month}-${day}`
}

export default function DateInput({
  value = "",
  onChange,
  name,
  error,
  disabled = false,
  autoFocus = false,
  className,
}) {
  const [date, setDate] = useState(() => parseValue(value))

  const dayRef = useRef(null)
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  useEffect(() => {
    setDate(parseValue(value))
  }, [value])

  useEffect(() => {
    if (autoFocus) {
      dayRef.current?.focus()
    }
  }, [autoFocus])

  const updatePart = (part, rawValue) => {
    const value = rawValue.replace(/\D/g, "")

    const nextDate = {
      ...date,
      [part]: value,
    }

    setDate(nextDate)

    const formattedValue = formatValue(nextDate)

    onChange?.(formattedValue)
  }

  const handleKeyDown = (event, part) => {
    if (event.key === "Backspace" && !date[part]) {
      if (part === "month") {
        dayRef.current?.focus()
      }

      if (part === "year") {
        monthRef.current?.focus()
      }
    }

    if (event.key === "ArrowLeft") {
      if (part === "month") {
        dayRef.current?.focus()
      }

      if (part === "year") {
        monthRef.current?.focus()
      }
    }

    if (event.key === "ArrowRight") {
      if (part === "day") {
        monthRef.current?.focus()
      }

      if (part === "month") {
        yearRef.current?.focus()
      }
    }
  }

  const handleInput = (event, part, maxLength, nextRef) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, maxLength)

    updatePart(part, value)

    if (value.length === maxLength) {
      nextRef?.current?.focus()
    }
  }

  return (
    <div
      className={clsx(
        "date-input",
        {
          "date-input--error": error,
          "date-input--disabled": disabled,
        },
        className
      )}
    >
      <div className="date-input__fields">
        <input
          ref={dayRef}
          id={`${name}-day`}
          name={`${name}-day`}
          type="text"
          inputMode="numeric"
          autoComplete="bday-day"
          placeholder="DD"
          maxLength={2}
          value={date.day}
          disabled={disabled}
          aria-label="Day"
          onChange={(event) => handleInput(event, "day", 2, monthRef)}
          onKeyDown={(event) => handleKeyDown(event, "day")}
        />

        <span className="date-input__separator">/</span>

        <input
          ref={monthRef}
          id={`${name}-month`}
          name={`${name}-month`}
          type="text"
          inputMode="numeric"
          autoComplete="bday-month"
          placeholder="MM"
          maxLength={2}
          value={date.month}
          disabled={disabled}
          aria-label="Month"
          onChange={(event) => handleInput(event, "month", 2, yearRef)}
          onKeyDown={(event) => handleKeyDown(event, "month")}
        />

        <span className="date-input__separator">/</span>

        <input
          ref={yearRef}
          id={`${name}-year`}
          name={`${name}-year`}
          type="text"
          inputMode="numeric"
          autoComplete="bday-year"
          placeholder="YYYY"
          maxLength={4}
          value={date.year}
          disabled={disabled}
          aria-label="Year"
          onChange={(event) => handleInput(event, "year", 4)}
          onKeyDown={(event) => handleKeyDown(event, "year")}
        />
      </div>

      <div className="date-input__line" />

      {error && <div className="date-input__error">{error}</div>}
    </div>
  )
}
