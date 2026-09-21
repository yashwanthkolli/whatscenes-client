import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { setNavigator } from "@/services/navigation.service"

export default function NavigationProvider({ children }) {
  const navigate = useNavigate()

  useEffect(() => {
    setNavigator(navigate)
  }, [navigate])

  return children
}
