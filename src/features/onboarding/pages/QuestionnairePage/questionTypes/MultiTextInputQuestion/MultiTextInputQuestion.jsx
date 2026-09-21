import Stack from "@/components/layout/Stack"

import "./MultiTextInputQuestion.styles.scss"

export default function MultiTextInputQuestion({ question, value = [], onChange }) {
  const fields = question.answerSchema?.fields || []

  const values = Array.isArray(value) ? value : []

  const handleChange = (index, nextValue) => {
    const nextValues = [...values]

    nextValues[index] = nextValue

    onChange(nextValues)
  }

  return (
    <Stack gap="lg" className="questionnaire-multitext-input">
      <div className="questionnaire-multitext-input__header">
        <span className="questionnaire-multitext-input__eyebrow">{question.section}</span>

        <h3 className="questionnaire-multitext-input__title">{question.text}</h3>

        {question.description && (
          <p className="questionnaire-multitext-input__description">{question.description}</p>
        )}
      </div>

      <div className="questionnaire-multitext-input__fields">
        {fields.map((field, index) => (
          <label key={field._id || index} className="questionnaire-multitext-input__field">
            <span className="questionnaire-multitext-input__number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <input
              type="text"
              value={values[index] ?? ""}
              onChange={(event) => handleChange(index, event.target.value)}
              placeholder={field.placeholder || ""}
              className="questionnaire-multitext-input__input"
              autoComplete="off"
            />
          </label>
        ))}
      </div>

      {question.answerSchema?.note && (
        <p className="questionnaire-multitext-input__note">{question.answerSchema.note}</p>
      )}
    </Stack>
  )
}
