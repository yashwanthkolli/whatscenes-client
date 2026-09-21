import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"
import api from "@/services/apiClient"
import useSessionValidation from "@/hooks/useSessionValidation"
import LocationBootstrap from "./LocationBootstrap"

export default function AppBootstrap() {
  const setUser = useAuthStore((s) => s.setUser)
  const setBootstrapping = useAuthStore((s) => s.setBootstrapping)

  useSessionValidation()

  const initAuth = async () => {
    try {
      const res = await api.get("/auth/me")
      setUser(res.data.data)
    } catch {
      setUser(null)
    } finally {
      setBootstrapping(false)
    }
  }

  useEffect(() => {
    initAuth()

    const handlePageShow = (event) => {
      if (event.persisted) {
        initAuth()
      }
    }

    window.addEventListener("pageshow", handlePageShow)

    return () => {
      window.removeEventListener("pageshow", handlePageShow)
    }
  }, [])

  return (
    <LocationBootstrap>
      <Outlet />
    </LocationBootstrap>
  )
}
