import { useQuery } from "@tanstack/react-query"
import { getProfileSummary } from "@/services/profile.service"

export function useProfileSummary() {
  return useQuery({
    queryKey: ["profile-summary"],
    queryFn: getProfileSummary,
  })
}
