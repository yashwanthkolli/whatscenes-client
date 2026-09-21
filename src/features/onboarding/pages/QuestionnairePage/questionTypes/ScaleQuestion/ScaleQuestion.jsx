import { useEffect, useRef, useState } from "react"
import Stack from "@/components/layout/Stack"

import { questionReveal } from "@/components/animations/micro/questionReveal"

import "./ScaleQuestion.styles.scss"

export default function ScaleQuestion({ question, value, onChange }) {
  const { min, max, minLabel, maxLabel } = question.answerSchema

  const ref = useRef(null)

  const [localValue, setLocalValue] = useState(value ?? min)

  useEffect(() => {
    if (ref.current) {
      questionReveal(ref.current)
    }
  }, [])

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setLocalValue(value)
    }
  }, [value])

  const handleChange = (e) => {
    const newValue = Number(e.target.value)
    setLocalValue(newValue)
    onChange(newValue)
  }

  const percentage = ((localValue - min) / (max - min)) * 100

  return (
    <Stack gap="lg" className="scale-question" ref={ref}>
      <div className="scale-question__header">
        <h3 className="scale-question__title">{question.text}</h3>

        {question.description && (
          <p className="scale-question__description">
            {question.description}
          </p>
        )}
      </div>

      <div className="scale-question__slider-wrapper">
        <input
          type="range"
          min={min}
          max={max}
          step="1"
          value={localValue}
          onChange={handleChange}
          className="scale-question__slider"
          style={{
            background: `linear-gradient(
              to right,
              #a78bfa ${percentage}%,
              #2a2f3a ${percentage}%
            )`,
          }}
        />

        <div key={localValue} className="scale-question__value">
          {localValue}
        </div>
      </div>

      <div className="scale-question__labels">
        <span>{minLabel || "Low"}</span>
        <span>{maxLabel || "High"}</span>
      </div>
    </Stack>
  )
}