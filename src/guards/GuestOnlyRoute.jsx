import { Navigate, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"

export default function GuestOnlyRoute({ children }) {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping)

  const location = useLocation()

  if (isBootstrapping) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) return children

  // Skip landing page if user is logged in
  if (location.pathname === "/") {
    return <Navigate to="/app" replace />
  }

  // If onboarding not completed
  if (!user?.profileCompletion?.basicInfo) {
    return <Navigate to="/onboarding/basicInfo" replace />
  }

  if (!user?.profileCompletion?.questionnaire) {
    return <Navigate to="/onboarding/questionnaire" replace />
  }

  // Fully onboarded users
  const redirectPath = location.state?.from?.pathname || "/app"
  return <Navigate to={redirectPath} replace />
}
