import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"

export default function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const logoutStore = useAuthStore((s) => s.logout)

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logoutStore()

      queryClient.clear()

      navigate("/", { replace: true })
    },
  })

  return logoutMutation
}
