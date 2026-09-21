import { useEffect } from "react"
import { useAuthStore } from "@/store/auth.store"
import useInitializeLocation from "@/hooks/useInitializeLocation"

export default function LocationBootstrap({ children }) {
  const user = useAuthStore((s) => s.user)
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping)

  // Only run AFTER auth is resolved
  useInitializeLocation(user, isBootstrapping)

  return children
}
