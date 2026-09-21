import { useEffect } from "react"
import api from "@/services/apiClient"
import { useAuthStore } from "@/store/auth.store"

export default function useSessionValidation() {
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/auth/me")
        setUser(res.data.data)
      } catch {
        setUser(null)
      }
    }

    const interval = setInterval(checkSession, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [setUser])
}
