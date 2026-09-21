import { useQuery } from "@tanstack/react-query"
import { fetchProfileQuestionnaire } from "@/services/questionnaire.service"

export default function useProfileQuestionnaire() {
  return useQuery({
    queryKey: ["profile-questionnaire"],
    queryFn: fetchProfileQuestionnaire,
    staleTime: 1000 * 60 * 5,
  })
}