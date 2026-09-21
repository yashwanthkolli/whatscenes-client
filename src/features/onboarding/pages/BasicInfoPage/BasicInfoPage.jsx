import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import SingleLineTextInput from "@/components/ui/SingleLineTextInput"
import DateInput from "@/components/ui/DateInput"
import Select from "@/components/ui/Select"
import MultiSelectBadges from "@/components/ui/MultiSelectBadges"
import ProfilePictureUploader from "@/components/composed/ProfilePictureUploader"
import Button from "@/components/ui/Button"

import OnboardingStep from "./components/OnboardingStep/OnboardingStep"

import { updateBasicInfo } from "@/services/onboarding.service"
import { navigateTo } from "@/services/navigation.service"

import { useAuthStore } from "@/store/auth.store"

import "./BasicInfoPage.styles.scss"

const BASIC_INFO_QUESTIONS = [
  {
    id: "name",
    type: "singleLineText",
    text: "What do we call you?",
    description: "Official Name as mentioned on your government IDs.",
    placeholder: "Your name",
  },
  {
    id: "dateOfBirth",
    type: "date",
    text: "When were you born?",
    description: "As shown on your Aadhaar, this will be verified at your scene.",
  },
  {
    id: "gender",
    type: "singleSelect",
    text: "How do you identify?",
    description: "This shapes the group's seating.",
    options: [
      {
        value: "male",
        label: "Man",
      },
      {
        value: "female",
        label: "Woman",
      },
      {
        value: "non-binary",
        label: "Non-binary",
      },
      {
        value: "trans",
        label: "Trans",
      },
    ],
  },
  {
    id: "orientation",
    type: "singleSelect",
    text: "And your orientation?",
    description: "Another metric that helps us seat you with the right strangers.",
    options: [
      {
        value: "straight",
        label: "Straight",
      },
      {
        value: "gay",
        label: "Gay",
      },
      {
        value: "lesbian",
        label: "Lesbian",
      },
      {
        value: "bisexual",
        label: "Bisexual",
      },
      {
        value: "pansexual",
        label: "Pansexual",
      },
      {
        value: "asexual",
        label: "Asexual",
      },
      {
        value: "queer",
        label: "Queer",
      },
      {
        value: "other",
        label: "Other",
      },
    ],
  },
  {
    id: "education",
    type: "singleSelect",
    text: "What's the highest level of education you've completed?",
    description: "Your last checkpoint.",
    options: [
      {
        value: "below_graduate",
        label: "Below graduate",
      },
      {
        value: "undergraduate",
        label: "Undergraduate",
      },
      {
        value: "postgraduate",
        label: "Postgraduate",
      },
      {
        value: "doctorate",
        label: "Doctorate",
      },
      {
        value: "professional",
        label: "Professional (CA / CS / Bar)",
      },
    ],
  },
  {
    id: "occupation",
    type: "singleSelect",
    text: "Which best describes your work?",
    description: "Tell us what you do.",
    options: [
      {
        value: "employed",
        label: "Employed",
      },
      {
        value: "founder/own business",
        label: "Founder",
      },
      {
        value: "doctor/medical",
        label: "Doctor",
      },
      {
        value: "military/civil services",
        label: "Military / services",
      },
      {
        value: "lawyer/legal",
        label: "Lawyer",
      },
      {
        value: "freelancer",
        label: "Freelancer",
      },
      {
        value: "artist",
        label: "Artist",
      },
      {
        value: "influencer/creator",
        label: "Influencer",
      },
      {
        value: "na",
        label: "Not Applicable",
      },
      {
        value: "student",
        label: "Student",
      },
    ],
  },
  {
    id: "interests",
    type: "multiSelect",
    text: "What's your kind of experience?",
    description: "Pick everything you would genuinely say yes to.",
    options: [
      "Dinner",
      "Cafe hopping",
      "Adventure",
      "Sports",
      "Live music",
      "Games & puzzles",
      "Walks",
      "Late nights",
    ],
  },
  {
    id: "freeTime",
    type: "multiSelect",
    text: "When are you actually free?",
    description: "Be real. Fake availability wrecks the whole experience.",
    options: [
      "Weekday evening",
      "Friday evening",
      "Saturday day",
      "Saturday evening",
      "Sunday day",
      "Sunday evening",
    ],
  },
]

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(80, "Name is too long"),

  dateOfBirth: z.string().min(1, "Please enter your date of birth"),

  gender: z.string().min(1, "Please select your gender"),

  orientation: z.string().min(1, "Please select your orientation"),

  education: z.string().min(1, "Please select your education"),

  occupation: z.string().min(1, "Please select your occupation"),

  interests: z.array(z.string()).min(1, "Please select at least one option"),

  freeTime: z.array(z.string()).min(1, "Please select at least one time"),
})

function Under21Screen({ onBack }) {
  return (
    <div className="under-21-screen">
      <div className="under-21-screen__content">
        <div className="under-21-screen__inner">
          <div className="under-21-screen__indicator" aria-hidden="true" />

          <h1 className="under-21-screen__title">21 is the minimum age</h1>

          <p className="under-21-screen__description">
            Every scene is adults meeting adults. Minors, you can wait it out.
          </p>

          <button type="button" className="under-21-screen__back" onClick={onBack}>
            Back to date of birth
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BasicInfoPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isUnder21, setIsUnder21] = useState(false)
  const [showPhotoUpload, setShowPhotoUpload] = useState(false)

  const { user, setUser } = useAuthStore()

  const profilePictures = user?.profilePictures || []

  const hasThreePhotos = profilePictures.length >= 3

  const form = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      name: user?.name || "",
      dateOfBirth: user?.dateOfBirth || "",
      gender: user?.gender || "",
      orientation: user?.orientation || "",
      education: user?.education || "",
      occupation: user?.occupation || "",
      interests: user?.interests || [],
      freeTime: user?.freeTime || [],
    },
  })

  const updateBasicInfoMutation = useMutation({
    mutationFn: updateBasicInfo,

    onSuccess: (user) => {
      setUser(user)
    },
  })

  const getAge = (dateOfBirth) => {
    const birthDate = new Date(`${dateOfBirth}T00:00:00`)
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()

    const birthdayHasPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

    if (!birthdayHasPassed) {
      age -= 1
    }

    return age
  }

  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form

  const currentQuestion = BASIC_INFO_QUESTIONS[currentStep - 1]

  const currentValue = watch(currentQuestion.id)

  const handleChange = (value) => {
    setValue(currentQuestion.id, value, {
      shouldDirty: true,
      shouldValidate: false,
    })
  }

  const handleNext = async () => {
    const valid = await trigger(currentQuestion.id)

    if (!valid) return

    if (currentQuestion.id === "dateOfBirth") {
      const age = getAge(currentValue)

      if (age < 21) {
        setIsUnder21(true)
        return
      }
    }

    const completedQuestionIds = BASIC_INFO_QUESTIONS.slice(0, currentStep).map(
      (question) => question.id
    )

    const values = form.getValues()

    const data = Object.fromEntries(completedQuestionIds.map((id) => [id, values[id]]))

    try {
      await updateBasicInfoMutation.mutateAsync(data)
    } catch (error) {
      return
    }

    if (currentStep < BASIC_INFO_QUESTIONS.length) {
      setCurrentStep((step) => step + 1)
      return
    }

    setShowPhotoUpload(true)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1)
    }
  }

  const handlePhotosComplete = () => {
    if (!hasThreePhotos) return

    navigateTo("/app")
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "singleLineText":
        return (
          <SingleLineTextInput
            name={currentQuestion.id}
            value={currentValue}
            placeholder={currentQuestion.placeholder}
            onChange={handleChange}
            error={errors[currentQuestion.id]?.message}
            autoFocus
          />
        )

      case "date":
        return (
          <DateInput
            name={currentQuestion.id}
            value={currentValue}
            onChange={handleChange}
            error={errors[currentQuestion.id]?.message}
            autoFocus
          />
        )

      case "singleSelect":
        return (
          <Select
            name={currentQuestion.id}
            mode="single"
            value={currentValue}
            options={currentQuestion.options}
            onChange={handleChange}
            error={errors[currentQuestion.id]?.message}
          />
        )

      case "multiSelect":
        return (
          <MultiSelectBadges
            options={currentQuestion.options}
            value={currentValue || []}
            onChange={handleChange}
            className="basic-info-page__multi-select"
          />
        )

      default:
        return null
    }
  }

  if (showPhotoUpload) {
    return (
      <div className="basic-info-page">
        <div className="basic-info-page__photos">
          <h1>Three photos and you are done.</h1>

          <p>Verification only. The experience never sees your face first.</p>

          <div className="basic-info-page__photo-grid">
            <ProfilePictureUploader index={0} />
            <ProfilePictureUploader index={1} />
            <ProfilePictureUploader index={2} />
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!hasThreePhotos}
            onClick={handlePhotosComplete}
          >
            Finish Profile
          </Button>
          <button
            type="button"
            className="onboarding-step__back"
            onClick={() => setShowPhotoUpload(false)}
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="basic-info-page">
      {isUnder21 ? (
        <Under21Screen onBack={() => setIsUnder21(false)} />
      ) : (
        <OnboardingStep
          currentStep={currentStep}
          totalSteps={BASIC_INFO_QUESTIONS.length}
          title={currentQuestion.text}
          description={currentQuestion.description}
          onNext={handleNext}
          onBack={handleBack}
          showBack={currentStep > 1}
        >
          {renderQuestion()}
        </OnboardingStep>
      )}
    </div>
  )
}
