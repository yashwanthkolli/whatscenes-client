import Stack from "@/components/layout/Stack"
import MultiSelectBadges from "@/components/ui/MultiSelectBadges"

import "./MultiSelectBadgesQuestion.styles.scss"

export default function MultiSelectBadgesQuestion({ question, value = [], onChange }) {
  const options = question.answerSchema?.options || []
  const maxSelections = question.answerSchema?.maxSelections ?? null
  const minSelections = question.answerSchema?.minSelections ?? 0

  return (
    <Stack gap="lg" className="questionnaire-multiselect-badges">
      <div className="questionnaire-multiselect-badges__header">
        <span className="questionnaire-multiselect-badges__eyebrow">{question.section}</span>

        <h3 className="questionnaire-multiselect-badges__title">{question.text}</h3>

        {question.description && (
          <p className="questionnaire-multiselect-badges__description">{question.description}</p>
        )}
      </div>

      <MultiSelectBadges
        options={options}
        value={value}
        onChange={onChange}
        maxSelections={maxSelections}
        className="questionnaire-multiselect-badges__options"
      />

      {question.answerSchema?.note && (
        <p className="questionnaire-multiselect-badges__note">{question.answerSchema.note}</p>
      )}
    </Stack>
  )
}
