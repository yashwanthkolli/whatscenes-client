import { useEffect, useMemo, useState } from "react"

import Container from "@/components/layout/Container"
import Button from "@/components/ui/Button"
import Spinner from "@/components/ui/Spinner"

import useProfileQuestionnaire from "@/hooks/useProfileQuestionnaire"
import useSaveQuestionnaireDraft from "@/hooks/useSaveQuestionnaireDraft"
import useSubmitQuestionnaire from "@/hooks/useSubmitQuestionnaire"

import { useAuthStore } from "@/store/auth.store.js"

import { navigateTo } from "@/services/navigation.service"

import QuestionRenderer from "./components/QuestionRenderer/QuestionRenderer"
import ProgressBar from "./components/ProgressBar/ProgressBar"

import { buildDraftAnswer, findResumeIndex } from "@/utils/questionnaireHelper"

import "./QuestionnairePage.styles.scss"

function isAnswerEmpty(value) {
  if (value === undefined || value === null) return true
  if (typeof value === "string") return value.trim() === ""
  if (Array.isArray(value)) return value.length === 0

  return false
}

export default function QuestionnairePage() {
  const { data, isLoading } = useProfileQuestionnaire()

  const { user, setUser } = useAuthStore()

  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const draftMutation = useSaveQuestionnaireDraft()
  const submitMutation = useSubmitQuestionnaire()

  useEffect(() => {
    if (!data?.questions) return

    const initialAnswers = {}

    data.questions.forEach((question) => {
      if (question.previousAnswer !== null) {
        initialAnswers[question.questionKey] = question.previousAnswer
      }
    })

    setAnswers(initialAnswers)
    setCurrentIndex(findResumeIndex(data.questions))
  }, [data])

  const questions = data?.questions ?? []
  const question = questions[currentIndex]

  const answeredCount = questions.filter(
    (item) => answers[item.questionKey] !== undefined && answers[item.questionKey] !== null
  ).length

  const sections = useMemo(() => {
    const uniqueSections = []

    questions.forEach((item) => {
      if (item.section && !uniqueSections.includes(item.section)) {
        uniqueSections.push(item.section)
      }
    })

    return uniqueSections
  }, [questions])

  const currentSectionIndex = question?.section ? sections.indexOf(question.section) : -1

  const isLastQuestion = currentIndex === questions.length - 1

  const currentValue = question ? answers[question.questionKey] : undefined

  const isCurrentQuestionEmpty = isAnswerEmpty(currentValue)

  const handleAnswer = async (value) => {
    if (!question) return

    setAnswers((previous) => ({
      ...previous,
      [question.questionKey]: value,
    }))

    if (question.uiType === "single_select_cards" || question.uiType === "single_select_badges") {
      try {
        await draftMutation.mutateAsync({
          questionnaireKey: data.questionnaireKey,
          answers: [buildDraftAnswer(question, value)],
        })

        if (isLastQuestion) {
          await submitMutation.mutateAsync(data.questionnaireKey)

          setUser({
            ...user,
            profileCompletion: {
              ...user.profileCompletion,
              questionnaire: true,
            },
          })

          navigateTo("/app")
          return
        }

        setCurrentIndex((index) => index + 1)
      } catch (error) {
        console.error("Submission error", error)
      }
    }
  }

  const handleNext = async () => {
    if (!question || (isCurrentQuestionEmpty && question.required)) {
      return
    }

    try {
      const draftAnswers = isLastQuestion
        ? questions.map((item) => buildDraftAnswer(item, answers[item.questionKey]))
        : [buildDraftAnswer(question, answers[question.questionKey])]

      await draftMutation.mutateAsync({
        questionnaireKey: data.questionnaireKey,
        answers: draftAnswers,
      })

      if (isLastQuestion) {
        await submitMutation.mutateAsync(data.questionnaireKey)

        setUser({
          ...user,
          profileCompletion: {
            ...user.profileCompletion,
            questionnaire: true,
          },
        })

        navigateTo("/app")
        return
      }

      setCurrentIndex((index) => index + 1)
    } catch (error) {
      console.error("Submission error", error)
    }
  }

  const handlePrev = () => {
    if (currentIndex === 0) return

    setCurrentIndex((index) => index - 1)
  }

  if (isLoading) {
    return (
      <div className="questionnaire-loading">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!data || !questions.length || !question) {
    return null
  }

  const isSubmitting = draftMutation.isPending || submitMutation.isPending

  return (
    <div className="questionnaire-page">
      <ProgressBar answered={answeredCount} total={questions.length} />

      <main className="questionnaire-content">
        <div className="questionnaire-content__inner">
          <section className="questionnaire-viewport">
            <div key={question.questionKey} className="questionnaire-question">
              <QuestionRenderer question={question} value={currentValue} onChange={handleAnswer} />

              {question.uiType !== "single_select_cards" &&
                question.uiType !== "single_select_badges" && (
                  <div className="questionnaire-navigation">
                    <Button
                      onClick={handleNext}
                      loading={isSubmitting}
                      disabled={question.required && isCurrentQuestionEmpty}
                      className="questionnaire-navigation__next"
                    >
                      {isLastQuestion ? "Finish" : "Continue"}
                    </Button>
                  </div>
                )}

              {currentIndex > 0 && (
                <button
                  type="button"
                  className="questionnaire-navigation__back"
                  onClick={handlePrev}
                  disabled={isSubmitting}
                >
                  ← Back
                </button>
              )}
            </div>
          </section>

          {sections.length > 0 && (
            <aside className="questionnaire-rail">
              <div className="questionnaire-rail__title">The sections</div>

              <div className="questionnaire-rail__items">
                {sections.map((section, index) => {
                  const isActive = index === currentSectionIndex
                  const isComplete = index < currentSectionIndex

                  return (
                    <div
                      key={section}
                      className={[
                        "questionnaire-rail__item",
                        isActive && "is-active",
                        isComplete && "is-complete",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span className="questionnaire-rail__dot" />

                      <span className="questionnaire-rail__name">{section}</span>
                    </div>
                  )
                })}
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}
