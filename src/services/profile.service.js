import api from "./apiClient"

export async function getProfileSummary() {
  const res = await api.get("/user/profile-summary")
  return res.data.data
}
