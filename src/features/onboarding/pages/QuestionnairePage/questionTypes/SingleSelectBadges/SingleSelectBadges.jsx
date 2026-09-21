import Stack from "@/components/layout/Stack"
import Badge from "@/components/ui/Badge"

import "./SingleSelectBadges.styles.scss"

export default function SingleSelectBadges({ question, value, onChange }) {

  const options = question.answerSchema.options || []

  return (
    <Stack gap="lg" className="single-select-badges">
      <div className="single-select-badges__header">
        <h3>{question.text}</h3>
        {question.description && (
          <p>{question.description}</p>
        )}
      </div>

      <div className="single-select-badges__options">
        {options.map((option) => {
          const selected = value === option

          return (
            <Badge
              key={option}
              variant={selected ? "primary" : "ghost"}
              size="md"
              className={`single-select-badges__option ${
                selected ? "is-selected" : ""
              }`}
              onClick={() => onChange(option)}
            >
              {option.replaceAll("_", " ")}
            </Badge>
          )
        })}
      </div>
    </Stack>
  )
}