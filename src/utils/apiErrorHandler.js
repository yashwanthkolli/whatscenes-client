import { getErrorMessage } from "./getErrorMessage"
import { useToastStore } from "@/store/toast.store"

const EXCLUDED_ENDPOINTS = ["/auth/refresh", "/auth/me"]

const ERROR_COOLDOWN = 2000

let lastErrorMessage = null
let lastErrorTime = 0

export function handleApiError(error) {
  const url = error?.config?.url || ""

  if (error.config?._retry) return

  if (EXCLUDED_ENDPOINTS.some((e) => url.includes(e))) {
    return
  }

  const message = getErrorMessage(error)

  const now = Date.now()

  if (message === lastErrorMessage && now - lastErrorTime < ERROR_COOLDOWN) {
    return
  }

  lastErrorMessage = message
  lastErrorTime = now

  const { addToast } = useToastStore.getState()

  addToast({
    type: "error",
    message,
  })
}
