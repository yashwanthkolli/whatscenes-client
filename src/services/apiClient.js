import axios from "axios"
import { useAuthStore } from "@/store/auth.store"
import { handleApiError } from "../utils/apiErrorHandler"
import { navigateTo } from "./navigation.service"
import { startLoading, stopLoading } from "./loading.service"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

const activeRequests = new Map()

api.interceptors.request.use((config) => {
  startLoading()

  const key = `${config.method}:${config.url}`

  if (activeRequests.has(key)) {
    const controller = activeRequests.get(key)
    controller.abort()
  }

  const controller = new AbortController()

  config.signal = controller.signal

  activeRequests.set(key, controller)

  return config
})

let refreshPromise = null

api.interceptors.response.use(
  (response) => {
    const key = `${response.config.method}:${response.config.url}`
    activeRequests.delete(key)
    stopLoading()
    return response
  },

  async (error) => {
    stopLoading()
    const originalRequest = error.config

    // Ignore cancelled requests
    if (error.code === "ERR_CANCELED") {
      return Promise.reject(error)
    }

    if (!error.response) {
      if (!originalRequest._skipErrorHandler) {
        handleApiError(error)
      }
      return Promise.reject(error)
    }

    const status = error.response.status
    const url = originalRequest.url

    // Only handle 401
    if (status !== 401) {
      if (!originalRequest._skipErrorHandler) {
        handleApiError(error)
      }
      return Promise.reject(error)
    }

    // Auth Endpoints do not trigger refresh
    if (url.includes("/auth/login") || url.includes("/auth/otp/send")) {
      handleApiError(error)
      return Promise.reject(error)
    }

    // Do NOT refresh for these endpoints
    if (url.includes("/auth/me")) {
      useAuthStore.getState().logout()
      // window.location.href = "/auth/login"
      return Promise.reject(error)
    }

    // Avoid retry loops
    if (originalRequest._retry) {
      if (!originalRequest._skipErrorHandler) {
        handleApiError(error)
      }
      return Promise.reject(error)
    }

    // Do not retry refresh endpoint
    if (originalRequest.url.includes("/auth/refresh")) {
      // useAuthStore.getState().logout()
      // navigateTo("/auth/login")
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = api.post("/auth/refresh").finally(() => {
          refreshPromise = null
        })
      }

      await refreshPromise

      // Retry original request without triggering error handler
      originalRequest._skipErrorHandler = true

      return api(originalRequest)
    } catch (refreshError) {
      useAuthStore.getState().logout()
      // navigateTo("/auth/login")

      return Promise.reject(refreshError)
    }
  }
)

export default api
