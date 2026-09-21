import { useState } from "react"
import Stack from "@/components/layout/Stack"

import "./CurrencyInputQuestion.styles.scss"

export default function CurrencyInputQuestion({ question, value, onChange }) {
  const schema = question.answerSchema || {}

  const currency = schema.currency || "INR"
  const min = schema.min ?? 0
  const max = schema.max ?? undefined

  const [focused, setFocused] = useState(false)

  const handleChange = (event) => {
    const rawValue = event.target.value

    if (rawValue === "") {
      onChange("")
      return
    }

    onChange(Number(rawValue))
  }

  const isPreferNotToSay = schema.allowPreferNotToSay && value === schema.preferNotToSayValue

  return (
    <Stack gap="lg" className="questionnaire-currency-input">
      <div className="questionnaire-currency-input__header">
        <span className="questionnaire-currency-input__eyebrow">{question.section}</span>

        <h3 className="questionnaire-currency-input__title">{question.text}</h3>

        {question.description && (
          <p className="questionnaire-currency-input__description">{question.description}</p>
        )}
      </div>

      <div
        className={[
          "questionnaire-currency-input__field",
          focused && "is-focused",
          isPreferNotToSay && "is-prefer-not-to-say",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="questionnaire-currency-input__symbol">₹</span>

        <input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value ?? ""}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="questionnaire-currency-input__input"
          autoComplete="off"
        />
      </div>

      {schema.note && <p className="questionnaire-currency-input__note">{schema.note}</p>}
    </Stack>
  )
}
