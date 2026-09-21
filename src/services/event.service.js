import api from "./apiClient"

export async function getHomepageEvents(cityId) {
  const res = await api.post("/events/home", { cityId })
  return res.data.data
}

export async function getEventDetails(city, slug) {
  if (!city || !slug) {
    throw new Error("City and slug are required")
  }

  const res = await api.get(`/events/${city}/${slug}`)
  return res.data?.data
}

export const registerForEvent = async (eventId, payload) => {
  const res = await api.post(`/registrations/events/${eventId}/register`, payload)
  return res.data?.data
}

export const joinPrelaunchWaitlistForEvent = async (eventId) => {
  const res = await api.post(`/prelaunch/${eventId}/prelaunch-waitlist`)
  return res.data?.data
}

export const initiatePayment = async (registrationId) => {
  const res = await api.post(`/registrations/${registrationId}/initiate-payment`)
  return res.data?.data
}

export const paymentSuccess = async (registrationId) => {
  const res = await api.post(`/registrations/${registrationId}/payment-success`)
  return res.data
}

export const paymentFailure = async (registrationId) => {
  const res = await api.post(`/registrations/${registrationId}/payment-failure`)
  return res.data
}
