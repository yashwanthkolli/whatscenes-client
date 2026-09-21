import apiClient from "./apiClient"

export const initializeLocation = async (payload) => {
  const res = await apiClient.post("/location/initialize", payload)
  return res.data.location
}
