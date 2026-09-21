import api from "./apiClient"

export const sendOtp = async ({ countryCode, phone }) => {
  const res = await api.post("/auth/otp/send", {
    countryCode,
    phone,
    purpose: "login",
  })
  return res.data
}

export const loginWithOtp = async ({ countryCode, phone, otp }) => {
  const res = await api.post("/auth/login/otp", {
    countryCode,
    phone,
    otp,
  })
  return res.data
}

export const logoutUser = async () => {
  const res = await api.post("/auth/logout")
  return res.data
}
