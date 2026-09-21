import Stack from "@/components/layout/Stack"

import "./NumberInputQuestion.styles.scss"

export default function NumberInputQuestion({ question, value, onChange }) {
  const { min, max, step = 1 } = question.answerSchema || {}

  const handleChange = (event) => {
    const nextValue = event.target.value

    // Keep empty input empty so the page can correctly
    // validate a required question.
    if (nextValue === "") {
      onChange("")
      return
    }

    onChange(Number(nextValue))
  }

  return (
    <Stack gap="lg" className="questionnaire-number-input">
      <div className="questionnaire-number-input__header">
        <span className="questionnaire-number-input__eyebrow">{question.section}</span>

        <h3 className="questionnaire-number-input__title">{question.text}</h3>

        {question.description && (
          <p className="questionnaire-number-input__description">{question.description}</p>
        )}
      </div>

      <div className="questionnaire-number-input__field">
        <input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={value ?? ""}
          onChange={handleChange}
          className="questionnaire-number-input__input"
          autoComplete="off"
        />
      </div>
    </Stack>
  )
}
