import Button from "@/components/ui/Button"

import "./OnboardingStep.styles.scss"

export default function OnboardingStep({
  currentStep,
  totalSteps,

  title,
  description,

  children,

  onNext,
  onBack,

  nextLabel = "Continue",
  nextDisabled = false,
  isSubmitting = false,

  showBack = true,
}) {
  const progress = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100))

  return (
    <section className="onboarding-step">
      <div className="onboarding-step__progress" aria-hidden="true">
        <div className="onboarding-step__progress-value" style={{ width: `${progress}%` }} />
      </div>

      <div className="onboarding-step__header">
        <h1 className="onboarding-step__title">{title}</h1>

        {description && <p className="onboarding-step__description">{description}</p>}
      </div>

      <div className="onboarding-step__answer">{children}</div>

      <div className="onboarding-step__actions">
        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          disabled={nextDisabled}
          loading={isSubmitting}
          onClick={onNext}
        >
          {nextLabel}
        </Button>

        {showBack && (
          <button type="button" className="onboarding-step__back" onClick={onBack}>
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </button>
        )}
      </div>
    </section>
  )
}
