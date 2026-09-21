import BasicInfoGuard from "@/guards/BasicInfoGuard"
import ProtectedRoute from "@/guards/ProtectedRoute"
import { createLazyRoute } from "@/app/lazyRoute"

function QuestionnaireRouteGuard({ children }) {
  return (
    <ProtectedRoute>
      <BasicInfoGuard>{children}</BasicInfoGuard>
    </ProtectedRoute>
  )
}

export const onboardingRoutes = [
  {
    path: "/onboarding/basicInfo",
    lazy: createLazyRoute(() => import("./pages/BasicInfoPage/BasicInfoPage"), {
      guard: ProtectedRoute,
    }),
  },
  {
    path: "/onboarding/questionnaire",
    lazy: createLazyRoute(() => import("./pages/QuestionnairePage/QuestionnairePage"), {
      guard: QuestionnaireRouteGuard,
    }),
  },
]
