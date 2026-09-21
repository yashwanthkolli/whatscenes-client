import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registerForEvent } from "@/services/event.service"

export const useRegisterEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ eventId, groupSize }) => registerForEvent(eventId, { group_size: groupSize }),

    onSuccess: () => {
      // refresh event details → updates CTA
      queryClient.invalidateQueries(["event-details", "profile-summary"])
    },
  })
}
