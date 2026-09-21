import api from "./apiClient"

export const fetchProfileQuestionnaire = async () => {
  const response = await api.get("/questionnaires/profile_main")
  return response.data.data
}

export const saveQuestionnaireDraft = async ({
  questionnaireKey,
  answers,
}) => {
  const res = await api.patch(
    `/questionnaires/${questionnaireKey}/draft`,
    { answers }
  )

  return res.data
}

export const submitQuestionnaire = async (questionnaireKey) => {
  const res = await api.post(
    `/questionnaires/${questionnaireKey}/submit`
  )

  return res.data
}