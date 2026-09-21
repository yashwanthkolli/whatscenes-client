import api from "./apiClient"

export const uploadProfilePicture = async (file) => {
  const formData = new FormData()
  formData.append("image", file)

  const res = await api.post("/user/profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return res.data
}

export const updateBasicInfo = async (data) => {
  const res = await api.patch("/user/basic-info", data)

  return res.data.data
}
