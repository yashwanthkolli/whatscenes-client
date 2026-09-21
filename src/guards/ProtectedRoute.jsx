import { Navigate, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuthStore()
  const location = useLocation()

  console.log(isAuthenticated, "and", isBootstrapping)

  if (isBootstrapping) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return children
}
