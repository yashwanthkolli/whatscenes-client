import Stack from "@/components/layout/Stack"
import Card from "@/components/layout/Card"

import "./MultiSelectCards.styles.scss"

export default function MultiSelectCardsQuestion({
  question,
  value = [],
  onChange
}) {

  const options = question.answerSchema.options || []
  const maxSelections = question.answerSchema.maxSelections

  const toggleOption = (option) => {

    const isSelected = value.includes(option)

    if (isSelected) {
      onChange(value.filter(v => v !== option))
      return
    }

    if (maxSelections && value.length >= maxSelections) {
      return
    }

    onChange([...value, option])
  }

  return (
    <Stack gap="lg" className="multi-select-cards-question">

      <div className="multi-select-cards-question__header">
        <h3>{question.text}</h3>

        {question.description && (
          <p>{question.description}</p>
        )}
      </div>

      <div className="multi-select-cards-question__options">

        {options.map((option) => {

          const selected = value.includes(option)

          return (
            <Card
              key={option}
              onClick={() => toggleOption(option)}
              className={`multi-select-cards-question__card ${
                selected ? "is-selected" : ""
              }`}
            >
              {option.replaceAll("_", " ")}
            </Card>
          )

        })}

      </div>

    </Stack>
  )
}