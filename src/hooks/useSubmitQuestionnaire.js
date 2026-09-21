import { useMutation } from "@tanstack/react-query"
import { submitQuestionnaire } from "@/services/questionnaire.service"

export default function useSubmitQuestionnaire() {
  return useMutation({
    mutationFn: submitQuestionnaire,
  })
}
