import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"

export default function QuestionnaireGuard({ children }) {
  const user = useAuthStore((s) => s.user)

  if (!user?.profileCompletion?.questionnaire) {
    return <Navigate to="/onboarding/questionnaire" replace />
  }

  return children
}
