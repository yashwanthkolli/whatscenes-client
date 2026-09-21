import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"

export default function BasicInfoGuard({ children }) {
  const user = useAuthStore((s) => s.user)

  if (!user?.profileCompletion?.basicInfo || !user?.profileCompletion?.photos) {
    return <Navigate to="/onboarding/basicInfo" replace />
  }

  return children
}
