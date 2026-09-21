import Stack from "@/components/layout/Stack"

import "./SingleSelectCardQuestion.styles.scss"

export default function SingleSelectCardQuestion({ question, value, onChange }) {
  const options = question.answerSchema?.options || []

  const handleSelect = (option) => {
    onChange(option)
  }

  return (
    <Stack gap="lg" className="questionnaire-single-select-cards">
      <div className="questionnaire-single-select-cards__header">
        <span className="questionnaire-single-select-cards__eyebrow">{question.section}</span>

        <h3 className="questionnaire-single-select-cards__title">{question.text}</h3>

        {question.description && (
          <p className="questionnaire-single-select-cards__description">{question.description}</p>
        )}
      </div>

      <div className="questionnaire-single-select-cards__options">
        {options.map((option, index) => {
          const selected = value === option

          return (
            <button
              key={option}
              type="button"
              className={["questionnaire-single-select-cards__option", selected && "is-selected"]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleSelect(option)}
            >
              <span className="questionnaire-single-select-cards__number">{index + 1}</span>

              <span className="questionnaire-single-select-cards__label">
                {option.replaceAll("_", " ")}
              </span>
            </button>
          )
        })}
      </div>
    </Stack>
  )
}
