import Stack from "@/components/layout/Stack"
import Input from "@/components/ui/Input/Input"

export default function SingleLineText({ question, value, onChange }) {
  return (
    <Stack gap="lg" className="single-line-text-question">
      <div className="single-line-text-question__header">
        <h3>{question.text}</h3>

        {question.description && <p>{question.description}</p>}
      </div>

      <Input
        type="text"
        name={question.id}
        value={value ?? ""}
        placeholder={question.placeholder || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </Stack>
  )
}
