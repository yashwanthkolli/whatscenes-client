import { useMemo, useRef, useState } from "react"
import Stack from "@/components/layout/Stack"

import "./SearchSelectQuestion.styles.scss"

function normalize(value) {
  return value.toLowerCase().trim().replace(/\s+/g, " ")
}

function getSimilarity(query, option) {
  const normalizedQuery = normalize(query)
  const normalizedOption = normalize(option)

  if (!normalizedQuery) return 0

  // Exact match
  if (normalizedOption === normalizedQuery) {
    return 100
  }

  // Starts with what the user typed
  if (normalizedOption.startsWith(normalizedQuery)) {
    return 90
  }

  // Contains what the user typed
  if (normalizedOption.includes(normalizedQuery)) {
    return 70
  }

  // Word-level matching
  const queryWords = normalizedQuery.split(" ")
  const optionWords = normalizedOption.split(" ")

  const matchingWords = queryWords.filter((queryWord) =>
    optionWords.some(
      (optionWord) => optionWord.startsWith(queryWord) || queryWord.startsWith(optionWord)
    )
  )

  if (matchingWords.length > 0) {
    return 50 + matchingWords.length
  }

  return 0
}

export default function SearchSelectQuestion({ question, value = "", onChange }) {
  const inputRef = useRef(null)

  const [isFocused, setIsFocused] = useState(false)

  const options = question.answerSchema?.options || []

  const suggestions = useMemo(() => {
    const query = value.trim()

    /*
     * No query:
     * show a small curated set of options.
     *
     * We deliberately don't show the entire list.
     */
    if (!query) {
      return options.slice(0, 6)
    }

    return options
      .map((option) => ({
        option,
        score: getSimilarity(query, option),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ option }) => option)
  }, [options, value])

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  const handleSuggestionClick = (option) => {
    onChange(option)

    requestAnimationFrame(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(option.length, option.length)
    })
  }

  return (
    <Stack gap="lg" className="search-select-question">
      <div className="search-select-question__header">
        <span className="search-select-question__eyebrow">{question.section}</span>

        <h3 className="search-select-question__title">{question.text}</h3>

        {question.description && (
          <p className="search-select-question__description">{question.description}</p>
        )}
      </div>

      <div
        className={["search-select-question__field", isFocused && "is-focused"]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="search-select-question__input"
          placeholder="Start typing..."
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      {suggestions.length > 0 && (
        <div
          className={["search-select-question__suggestions", isFocused && "is-focused"]
            .filter(Boolean)
            .join(" ")}
        >
          {suggestions.map((option) => {
            const selected = value === option

            return (
              <button
                key={option}
                type="button"
                className={["search-select-question__badge", selected && "is-selected"]
                  .filter(Boolean)
                  .join(" ")}
                onMouseDown={(event) => {
                  /*
                   * Prevent input blur before the click
                   * is handled.
                   */
                  event.preventDefault()
                }}
                onClick={() => handleSuggestionClick(option)}
              >
                {option}
              </button>
            )
          })}
        </div>
      )}
    </Stack>
  )
}
