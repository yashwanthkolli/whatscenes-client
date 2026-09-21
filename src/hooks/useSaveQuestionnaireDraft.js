import { useMutation } from "@tanstack/react-query"
import { saveQuestionnaireDraft } from "@/services/questionnaire.service"

export default function useSaveQuestionnaireDraft() {
  return useMutation({
    mutationFn: saveQuestionnaireDraft,
  })
}